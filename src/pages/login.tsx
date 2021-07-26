import { useMutation, gql } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
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
  const onCompleted = (data: loginMutation) => {
    if (data.login.ok) {
      const { login: { ok, token, error} } = data;
      if (ok) {
        console.log(token);
      } else {
        if (error) {
          console.log();
        }
      }
    }
  };
  const [ loginMutation, { data: loginMutationResult, loading } ] = useMutation<
    loginMutation, 
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onValidSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          }
        },
      });
    }
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
          <button className="mt-2 btn">
            {loading ? "Loading..." : "Log In"}
          </button>
          {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult.login.error}/>}
        </form>
      </div>
    </div>
  );
}