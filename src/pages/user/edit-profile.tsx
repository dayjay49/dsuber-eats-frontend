import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { FormTitle } from "../../components/form-title";
import { useMe } from "../../hooks/useMe";
import { editProfile, editProfileVariables } from "../../__generated__/editProfile";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IEditFormProps {
  email?: string;
  password?: string;
}

export const EditProfile = () => {
  const { data: userData } = useMe();
  const onCompleted = (data: editProfile) => {
    const { editProfile: { ok } } = data;
    if (ok) {
      // update the cache
      
    } 
  };
  const [ editProfile, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, getValues, formState } = useForm<IEditFormProps>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
    },
  });
  const onValidSubmit = () => {
    const { email, password } = getValues();
    // call mutation to backend
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }),
        },
      },
    });
  };
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <FormTitle name="Edit Profile"/>
      <form 
        onSubmit={handleSubmit(onValidSubmit)}
        className="grid gap-3 max-w-screen-sm mt-5 w-full mb-5"
      >
        <input 
          {...register('email', {
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          name="email"
          className="input" 
          type="email" 
          placeholder="Email" />
        <input 
          {...register('password')}
          name="password"
          className="input"
          type="password"
          placeholder="Password" />
        <Button loading={loading} canClick={formState.isValid} actionText="Update Profile" />
      </form>
    </div>
  );
};