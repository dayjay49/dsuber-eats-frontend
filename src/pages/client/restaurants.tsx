import { gql, useQuery } from "@apollo/client";
import React from "react";
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
          <div className="flex justify-around max-w-sm mx-auto">
          {data?.allCategories.categories?.map((category, i) => 
            <div key={i} className="flex flex-col items-center">
              <div 
                className="w-14 h-14 rounded-full bg-cover hover:bg-gray-100 cursor-pointer" 
                style={{backgroundImage: `url(${category.coverImg})`}}
              >
              </div>
              <span className="mt-1 text-sm text-center font-medium">{category.name}</span>
            </div>
          )}
          </div>
        </div>
      )}
    </div>
  );
}