import React from "react";
import { category_category_restaurants } from "../__generated__/category";
import { restaurantsPageQuery_allRestaurants_results } from "../__generated__/restaurantsPageQuery";
import { Restaurant } from "./restaurant";

interface IRestaurantsProps {
  restaurantsData: restaurantsPageQuery_allRestaurants_results[] | category_category_restaurants[] | null | undefined;
}

export const RestaurantsGrid: React.FC<IRestaurantsProps> = ({restaurantsData}) => {
  return (
    <div className="mt-5 grid md:grid-cols-3 gap-x-4 gap-y-10">
      {restaurantsData?.map(restaurant => 
        <Restaurant 
          key={restaurant.id}
          id={restaurant.id + ""}
          coverImg={restaurant.coverImg}
          name={restaurant.name}
          categoryName={restaurant.category?.name}
        />
      )}
    </div>
  );
};