import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import { CategoriesGrid } from "../../components/categories-grid";
import { Restaurant } from "../../components/restaurant";
import { RestaurantsGrid } from "../../components/restaurants-grid";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { category, categoryVariables } from "../../__generated__/category";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

export const Category = () => {
  const params = useParams<ICategoryParams>();
  const [ page, setPage ] = useState(1);
  const { data, loading } = useQuery<
    category,
    categoryVariables
  >(CATEGORY_QUERY,
    {
      variables: {
        input: {
          page,
          slug: params.slug,
        },
      },
    }
  );
  console.log(data);
  console.log(loading);

  const onNextPageClick = () => setPage(current => current + 1);
  const onPrevPageClick = () => setPage(current => current - 1);

  return (
    <div>
      <Helmet>
        {data && data.category.category && <title>{data?.category.category?.name} | Dsuber Eats</title>}
      </Helmet>
      {!loading && (
        <div className="max-w-screen-lg mx-auto mt-5">
          <CategoriesGrid categoriesData={data?.allCategories.categories} />
          <RestaurantsGrid restaurantsData={data?.category.restaurants} />
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
              Page {page} of {data?.category.totalPages}
            </span>
            {page !== data?.category.totalPages ? (
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