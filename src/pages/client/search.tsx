import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
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
  console.log(loading, data, called);

  return (
    <div>
      <Helmet>
        <title>Search | Dsuber Eats</title>
      </Helmet>
      <h1>Search Page</h1>
    </div>
  );
}