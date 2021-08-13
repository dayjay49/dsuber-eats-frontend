import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { restaurant, restaurantVariables } from "../../__generated__/restaurant";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;


interface IRestaurantParams {
  id: string;
}

export const Restaurant = () => {
  const params = useParams<IRestaurantParams>();
  const { data, loading } = useQuery<
    restaurant,
    restaurantVariables
  >(RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +params.id,
        }
      }
    }
  );

  return (
    <div>
      <Helmet>
        {data && data.restaurant && <title>{data?.restaurant.restaurant?.name} | Dsuber Eats</title>}
      </Helmet>
      {!loading && (
        <div>
          <div 
            className="bg-gray-300 py-32 bg-center bg-cover" 
            style={{backgroundImage:`url(${data?.restaurant.restaurant?.coverImg})`}}
          >
            <div className="bg-white w-1/3 py-5 px-5">
              <h4 className="text-2xl mb-1 font-semibold">{data?.restaurant.restaurant?.name}</h4>
              <h5 className="text-sm font-light">
                <Link to={`/category/${data?.restaurant.restaurant?.category?.slug}`}>
                  <span>
                    {data?.restaurant.restaurant?.category?.name}
                  </span>
                </Link>
              </h5>
              <h6 className="text-sm font-light">{data?.restaurant.restaurant?.address}</h6>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}