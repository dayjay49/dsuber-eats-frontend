import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { CategoriesGrid } from "../../components/categories-grid";
import { Restaurant } from "../../components/restaurant";
import { RestaurantsGrid } from "../../components/restaurants-grid";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { restaurantsPageQuery, restaurantsPageQueryVariables } from "../../__generated__/restaurantsPageQuery";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: AllRestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    allRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ISearchFormProps {
  searchTerm: string;
}

export const Restaurants = () => {
  const [ page, setPage ] = useState(1);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });

  const onNextPageClick = () => setPage(current => current + 1);
  const onPrevPageClick = () => setPage(current => current - 1);
  
  const { register, handleSubmit, getValues } = useForm<ISearchFormProps>();
  const history = useHistory();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname:"/search",
      search: `?term=${searchTerm}`,
      // state: { searchTerm },
    });
  }
  return (
    <div>
      <Helmet>
        <title>Home | Dsuber Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)} 
        className="bg-gray-800 w-full py-40 flex items-center justify-center"
      >
        <input
          {...register('searchTerm', {
            required: true,
            min: 3,
          })}
          
          className="input rounded-md border-0 w-2/3 md:w-3/12"
          type="Search" 
          placeholder="Search restaurants..." 
        />
      </form>
      {!loading && (
        <div className="max-w-screen-lg mx-auto mt-5">
          <CategoriesGrid categoriesData={data?.allCategories.categories} />
          <RestaurantsGrid restaurantsData={data?.allRestaurants.results} />
          {/* Pagination below */}
          <div className="grid grid-cols-3 text-center max-w-sm mx-auto items-center mt-10">
            {page > 1 ? (
              <button 
                onClick={onPrevPageClick}
                className="focus:outline-none font-medium text-2xl">
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span className="mx-5">
              Page {page} of {data?.allRestaurants.totalPages}
            </span>
            {page !== data?.allRestaurants.totalPages ? (
              <button 
                onClick={onNextPageClick}
                className="focus:outline-none font-medium text-2xl">
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}