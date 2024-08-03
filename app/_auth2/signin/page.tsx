import { cookies } from "next/headers";
import { SignInForm } from "./signin-form";

const SignInPage = () => {
  const data: { email: string; type: string } = JSON.parse(
    cookies().get("oauth2")?.value || '{"type":"","email":""}'
  );

  return <SignInForm email={data.email} noLink={data.type == "nolink"} />;
};

export default SignInPage;
