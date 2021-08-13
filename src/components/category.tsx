import React from "react";
import { Link } from "react-router-dom";

interface ICategoryProps {
  id: number;
  name: string;
  slug: string;
  coverImg: string | null;
}

export const Category: React.FC<ICategoryProps> = ({
  id,
  name,
  slug,
  coverImg,
}) => {
  return (
    <Link key={id} to={`/category/${slug}`}>
      <div className="flex flex-col items-center group cursor-pointer">
        <div 
          className="w-16 h-16 rounded-full bg-cover group-hover:bg-gray-100" 
          style={{backgroundImage: `url(${coverImg})`}}
        >
        </div>
        <span className="mt-1 text-sm text-center font-medium">{name}</span>
      </div>
    </Link>
  );
}