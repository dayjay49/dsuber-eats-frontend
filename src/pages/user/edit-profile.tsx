import React from "react";
import { Button } from "../../components/button";
import { FormTitle } from "../../components/form-title";
import { useMe } from "../../hooks/useMe";

export const EditProfile = () => {
  const { data: userData } = useMe();
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <FormTitle name="Edit Profile"/>
      <form className="grid gap-3 max-w-screen-sm mt-5 w-full mb-5">
        <input className="input" type="email" placeholder="Email" />
        <input className="input" type="password" placeholder="Password" />
        <Button loading={false} canClick={true} actionText="Update Profile" />
      </form>
    </div>
  );
};