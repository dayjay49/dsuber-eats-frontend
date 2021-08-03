import React from "react";

interface IRestaurantProps {
  id: string;
  coverImg: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  coverImg,
  name,
  categoryName,
}) => (
  <div className="flex flex-col">
    <div 
      style={{backgroundImage: `url(${coverImg})`}}
      className="bg-red-500 py-24 bg-cover bg-center mb-2"
    ></div>
    <h3 className="text-xl">{name}</h3>
    <span className="border-t-2 mt-2 py-2 border-gray-300 text-xs opacity-50">
      {categoryName}
    </span>
  </div>
);