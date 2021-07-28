import { useMutation, gql } from "@apollo/client";
import React from "react";
import Helmet from "react-helmet";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { Button } from "../components/button";
import { Link, useHistory } from "react-router-dom";
import { UserRole } from "../__generated__/globalTypes";
import { createAccountMutation, createAccountMutationVariables } from "../__generated__/createAccountMutation";
import { Logo } from "../components/logo";

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
  const { register, handleSubmit, getValues, formState } = useForm<ICreateAccountForm>({
    mode: "onChange", // or onBlur
    defaultValues: {
      role: UserRole.Client,
    },
  });
  const history = useHistory();
  const onCompleted = (data: createAccountMutation) => {
    const { createAccount: { ok }} = data;
    if (ok) {
      alert("Account Created! Log in now!");
      // Redirect to login page
      history.push("/");
    }
  };

  const [ 
    createAccountMutation,
    { loading, data: createAccountMutationResult }
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );
  const onValidSubmit = () => {
    if(!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: {
            email, 
            password,
            role,
          },
        },
      });
    }
  };
  
  return (
    <div className="h-screen flex flex-col items-center mt-7 md:mt-20">
      <Helmet>
        <title>Create Account | Dsuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <Logo tailwindClassNames="w-44 mb-16"/>
        <h4 className="w-full font-medium text-left text-2xl">Let's get started</h4>
        <form 
          onSubmit={handleSubmit(onValidSubmit)}
          className="grid gap-3 mt-5 w-full mb-3"
        >
          <input 
            {...register('email', {
              required: "Email is required",
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
          {formState.errors.email?.type === "pattern" && (
            <FormError errorMessage={"Please enter a valid email"} />
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
          <Button canClick={formState.isValid} loading={loading} actionText={"Create Account"} />
          {createAccountMutationResult?.createAccount.error && (
            <FormError errorMessage={createAccountMutationResult.createAccount.error}/>
          )}
        </form>
        <div>
          Already have an account? <Link to="/" className=" text-lime-600 hover:underline">Log in now</Link> 
        </div>
      </div>
    </div>
  );
}