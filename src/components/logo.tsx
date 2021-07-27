import React from "react";
import dsuberLogo from "../images/logo.svg";

interface ILogoProp {
  tailwindClassNames: string;
}

export const Logo: React.FC<ILogoProp> = ({ tailwindClassNames }) => (
  <img src={dsuberLogo} alt="Dsuber Eats" className={tailwindClassNames} />
);