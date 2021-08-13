import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { CategoriesGrid } from "../../components/categories-grid";
import { Pagination } from "../../components/pagination";
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
          <Pagination 
            page={page} 
            totalPages={data?.category.totalPages}
            onPrevPageClick={onPrevPageClick}
            onNextPageClick={onNextPageClick}
          />
        </div>
      )}
    </div>
  );
}