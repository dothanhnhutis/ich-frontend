import { cookies } from "next/headers";
import { SignInForm } from "./signin-form";
import { RedirectType, redirect } from "next/navigation";

const SignInPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const data: { email: string; type: string } = JSON.parse(
    cookies().get("oauth2")?.value || '{"type":"","email":""}'
  );

  return <SignInForm email={data.email} noLink={data.type == "nolink"} />;
};

export default SignInPage;
