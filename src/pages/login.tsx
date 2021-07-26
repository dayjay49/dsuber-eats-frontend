import { useMutation, gql } from "@apollo/client";
import React from "react";
import { useForm, useFormState } from "react-hook-form";
import { FormError } from "../components/form-error";
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";
import dsuberLogo from "../images/logo.svg";
import { Button } from "../components/button";
import { Link } from "react-router-dom";

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
  const { register, getValues, handleSubmit, formState } = useForm<ILoginForm>({
    mode: "onChange" // or onBlur
  });
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
    <div className="h-screen flex flex-col items-center mt-7 md:mt-20">
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={dsuberLogo} className="w-44 mb-16"/>
        <h4 className="w-full font-medium text-left text-2xl">Welcome back</h4>
        <form 
          onSubmit={handleSubmit(onValidSubmit)}
          className="grid gap-3 mt-5 w-full mb-3"
        >
          <input 
            {...register('email', {
              required: "Email is required",
            })} 
            name="email"
            required
            type="email"
            placeholder="Email"
            className="input"
          />
          {formState.errors.email?.message && (
            <FormError errorMessage={formState.errors.email?.message} />
          )}
          <input 
            {...register('password', {
              required: "Password is required",
              minLength: 5,
            })} 
            name="password"
            required
            type="password"
            placeholder="Password"
            className="input"
          />
          {formState.errors.password?.message && (
            <FormError errorMessage={formState.errors.password?.message} />
          )}
          {formState.errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 5 characters."/>
          )}
          <Button canClick={formState.isValid} loading={loading} actionText={"Log In"} />
          {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult.login.error}/>}
        </form>
        <div>
          New to Dsuber? <Link to="/signup" className=" text-lime-600 hover:underline">Create an Account</Link> 
        </div>
      </div>
    </div>
  );
}