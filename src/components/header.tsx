import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { Logo } from "./logo";

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 py-3 px-3 text-center text-sm text-white">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-5 lg:px-0 max-w-screen-lg mx-auto flex justify-between items-center">
          <Logo tailwindClassNames="w-28"/>
          <div>
            <span className="text-sm mr-3">
              <Link to="/edit-profile">
                <FontAwesomeIcon icon={faUser} className="text-xl" />
              </Link>
            </span>
          </div>
        </div>
      </header>
    </>
  )
};