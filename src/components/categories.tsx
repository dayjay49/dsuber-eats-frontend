import React from "react";
import { Link } from "react-router-dom";
import { restaurantsPageQuery_allCategories_categories } from "../__generated__/restaurantsPageQuery";

interface ICategoriesProps {
  categoriesData: restaurantsPageQuery_allCategories_categories[] | null | undefined;
}

export const Categories: React.FC<ICategoriesProps> = ({categoriesData}) => {
  return (
    <div className="flex justify-around max-w-lg mx-auto">
      {categoriesData?.map((category, i) => 
        <Link key={category.id} to={`/category/${category.slug}`}>
          <div className="flex flex-col items-center group cursor-pointer">
            <div 
              className="w-16 h-16 rounded-full bg-cover group-hover:bg-gray-100" 
              style={{backgroundImage: `url(${category.coverImg})`}}
            >
            </div>
            <span className="mt-1 text-sm text-center font-medium">{category.name}</span>
          </div>
        </Link>
      )}
    </div>
  );
};


