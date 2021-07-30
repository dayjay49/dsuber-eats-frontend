import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Categories } from "../../components/categories";
import { restaurantsPageQuery, restaurantsPageQueryVariables } from "../../__generated__/restaurantsPageQuery";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: AllRestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    allRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });

  return (
    <div>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          className="input w-3/12 rounded-md border-0"
          type="Search" 
          placeholder="Search restaurants..." 
        />
      </form>
      {!loading && (
        <div className="max-w-screen-lg mx-auto mt-5">
          <Categories categoriesData={data?.allCategories.categories} />
          <div className="mt-5 grid grid-cols-3 gap-x-4 gap-y-10">
            {data?.allRestaurants.results?.map(restaurant => 
              <div>
                <div 
                  style={{backgroundImage: `url(${restaurant.coverImg})`}}
                  className="bg-red-500 py-24 bg-cover bg-center mb-2"
                ></div>
                <h3>{restaurant.name}</h3>
                <span className="border-t-2 border-gray-200">
                  {restaurant.category?.name}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}