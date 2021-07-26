import React from "react";
import { useForm } from "react-hook-form";

interface ILoginForm {
  email?: string;
  password?: string;
}

export const Login = () => {
  const { register, getValues, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
  const onValidSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg px-6 pt-6 pb-6 rounded-lg text-center">
        <h3 className="text-3xl text-gray-800">Login</h3>
        <form 
          onSubmit={handleSubmit(onValidSubmit)}
          className="grid gap-3 mt-5 px-5"
        >
          <input 
            {...register('email', {
              required: "Email is required",
            })} 
            name="email"
            required
            type="email"
            placeholder="Email" className="mb-2 input"
          />
          {errors.email?.message && (
            <span className="font-medium text-red-500">
              {errors.email?.message}
            </span>
          )}
          <input 
            {...register('password', {
              required: "Password is required",
              minLength: 5,
            })} 
            name="password"
            required
            type="password"
            placeholder="Password" className="input"
          />
          {errors.password?.message && (
            <span className="font-medium text-red-500">
              {errors.password?.message}
            </span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="font-medium text-red-500">
              Password must be more than 5 characters.
            </span>
          )}
          <button className="mt-2 btn">Log In</button>
        </form>
      </div>
    </div>
  );
}