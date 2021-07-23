
import React from "react";
import { useForm } from "react-hook-form";

export const LoggedOutRouter = () => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = () => {
    console.log(watch());
  }
  const onInvalid = () => {
    console.log(errors);
    console.log("Can't create account");
  };
  return(
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            {...register('email', {
              required: "This is required",
              // validate: (email: string) => email.includes('@gmail.com'),
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
            })}
            name="email"
            type="email"
            placeholder="email"
          />
        </div>
        <div>
          <input
            {...register('password', {
              required: true,
            })}
            name="password"
            type="password"
            required
            placeholder="password"
          />
        </div>
        <button className="bg-yellow-300 text-white">Submit</button>
      </form>
    </div>
  );
}