import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { RestaurantsGrid } from "../../components/restaurants-grid";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { searchRestaurant, searchRestaurantVariables } from "../../__generated__/searchRestaurant";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  // Using LazyQuery!!
  const [callQueryToFetch, { loading, data, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);

  useEffect(() => {
    const [_, searchTerm] = location.search.split("?term=");
    // if user tries to get to `/search` without a search term
    if (!searchTerm) {
      return history.replace("/");
    }
    // run the query
    callQueryToFetch({
      variables: {
        input: {
          page: 1,
          query: searchTerm,
        },
      },
    });
  }, [history, location, callQueryToFetch]);

  const [_, searchTerm] = location.search.split("?term=");
  console.log(loading, data, called, searchTerm);

  return (
    <div>
      <Helmet>
        <title>Search | Dsuber Eats</title>
      </Helmet>
      {!loading && called && (
        <div className="max-w-screen-lg mx-auto mt-5">
          <h3>Showing restaurants for `{searchTerm}`:</h3>
          <RestaurantsGrid restaurantsData={data?.searchRestaurant.restaurants} />
        </div>
      )}
    </div>
  );
}