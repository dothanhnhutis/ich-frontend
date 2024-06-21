import React from "react";
import { SignInGoogleBtn } from "../signin-google-btn";
import { SignUpForm } from "./signup-form";

const SignUpPage = () => {
  return (
    <div className="flex flex-col flex-grow mx-auto w-full sm:max-w-[500px] p-4 transition-all">
      <div className="flex flex-col flex-grow space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight text-center mt-4">
          <span>Sign up to make Product</span>
        </h1>

        <SignInGoogleBtn />

        <div className="relative my-2 py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
