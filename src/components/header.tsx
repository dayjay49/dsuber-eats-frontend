import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { Logo } from "./logo";

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <header className="py-4">
      <div className="w-full px-5 lg:px-0 max-w-screen-lg mx-auto flex justify-between items-center">
        <Logo tailwindClassNames="w-28"/>
        <span className="text-sm">
          <Link to="/my-profile">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </Link>
        </span>
      </div>
    </header>
  )
};