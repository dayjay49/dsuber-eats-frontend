import React from "react";
import { Logo } from "./logo";

export const Header = () => (
  <header className="py-4">
    <div className="w-full max-w-screen-lg mx-auto">
      <Logo tailwindClassNames="w-40 mb-10" />
      I am the Header
    </div>
  </header>
);