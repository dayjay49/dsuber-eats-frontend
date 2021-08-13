import React from "react";
import { restaurantsPageQuery_allCategories_categories } from "../__generated__/restaurantsPageQuery";
import { Category } from "./category";

interface ICategoriesProps {
  categoriesData: restaurantsPageQuery_allCategories_categories[] | null | undefined;
}

export const CategoriesGrid: React.FC<ICategoriesProps> = ({categoriesData}) => {
  return (
    <div className="flex justify-around max-w-lg mx-auto">
      {categoriesData?.map((category, i) => 
        <Category 
          key={i}
          id={category.id}
          name={category.name}
          slug={category.slug}
          coverImg={category.coverImg}
        />
      )}
    </div>
  );
};


