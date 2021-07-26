import React from "react";

export const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg px-10 py-10 rounded-lg text-center">
        <h3 className="text-3xl text-gray-800">Login</h3>
        <form className="flex flex-col mt-5 px-5">
          <input
            placeholder="Email"
            className="bg-gray-100 shadow-inner focus:outline-none border focus:border-opacity-50 focus:border-green-600 mb-2 py-3 px-5 rounded-lg"/>
          <input
            placeholder="Password"
            className="bg-gray-100 shadow-inner focus:outline-none border focus:border-opacity-50 focus:border-green-600  py-3 px-5 rounded-lg"/>
          <button className="mt-2 py-3 px-5 rounded-lg bg-gray-800 text-white text-lg focus:outline-none hover:opacity-90">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}