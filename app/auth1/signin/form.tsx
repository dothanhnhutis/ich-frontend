"use client";
import { signIn } from "../actions";
import { useServerAction } from "zsa-react";

export const SignInForm = () => {
  const { isPending, isSuccess, data, error, isError, executeFormAction } =
    useServerAction(signIn);
  console.log(data, error);
  return (
    <form className="flex flex-col" action={executeFormAction}>
      <input placeholder="email" type="text" name="email" id="email" />
      <input
        placeholder="password"
        type="password"
        name="password"
        id="password"
      />
      {isPending && <div>Loading...</div>}
      {isSuccess && <div>Success: {JSON.stringify(data)}</div>}
      {isError && <div>Error: {JSON.stringify(error.fieldErrors)}</div>}
      <button type="submit">signin</button>
    </form>
  );
};
