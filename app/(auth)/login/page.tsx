import React from "react";
import { SignInForm } from "./form";
import { cookies } from "next/headers";

const LoginPage = () => {
  return <SignInForm registered={cookies().get("registered")?.value} />;
};

export default LoginPage;
