import React from "react";
import { Link } from "react-router-dom";
import dsuberLogo from "../images/logo.svg";

interface ILogoProp {
  tailwindClassNames: string;
}

export const Logo: React.FC<ILogoProp> = ({ tailwindClassNames }) => (
  <Link to="/">
    <img src={dsuberLogo} alt="Dsuber Eats" className={tailwindClassNames} />
  </Link>
);