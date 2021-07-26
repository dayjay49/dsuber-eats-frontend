import { useMutation, gql } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";

const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(input: {
      email: $email,
      password: $password,
    }) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, getValues, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
  const [ loginMutation, { loading, error, data } ] = useMutation<
    loginMutation, 
    loginMutationVariables,
  >(LOGIN_MUTATION);
  const onValidSubmit = () => {
    const { email, password } = getValues();
    loginMutation({
      variables: {
        email,
        password,
      },
    });
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
            <FormError errorMessage={errors.email?.message} />
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
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 5 characters."/>
          )}
          <button className="mt-2 btn">Log In</button>
        </form>
      </div>
    </div>
  );
}