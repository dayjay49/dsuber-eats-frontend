import React from "react";

interface IFormTitleProp {
  name: string;
  additionalStyling?: string;
}

export const FormTitle: React.FC<IFormTitleProp> = ({ name, additionalStyling }) => (
  <h4 className={`font-semibold text-2xl ${additionalStyling}`}>{name}</h4>
);