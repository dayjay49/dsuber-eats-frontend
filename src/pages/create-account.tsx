import { useMutation, gql } from "@apollo/client";
import React from "react";
import Helmet from "react-helmet";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import dsuberLogo from "../images/logo.svg";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { UserRole } from "../__generated__/globalTypes";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const { register, handleSubmit, watch, formState } = useForm<ICreateAccountForm>({
    mode: "onChange", // or onBlur
    defaultValues: {
      role: UserRole.Client,
    },
  });
  const [ createAccountMutation ] = useMutation(CREATE_ACCOUNT_MUTATION);
  const onValidSubmit = () => {
    
  };
  console.log(watch());
  return (
    <div className="h-screen flex flex-col items-center mt-7 md:mt-20">
      <Helmet>
        <title>Create Account | Dsuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={dsuberLogo} className="w-44 mb-16"/>
        <h4 className="w-full font-medium text-left text-2xl">Let's get started</h4>
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
          <select {...register('role', { required: true })} name="role" className="input">
            {Object.keys(UserRole).map((role, index) => 
              <option key={index}>{role}</option>
            )}
          </select>
          <Button canClick={formState.isValid} loading={false} actionText={"Create Account"} />
        </form>
        <div>
          Already have an account? <Link to="/login" className=" text-lime-600 hover:underline">Log in now</Link> 
        </div>
      </div>
    </div>
  );
}