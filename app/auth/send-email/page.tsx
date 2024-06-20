import React from "react";
import EmailSVG1 from "@/assets/svgs/email1";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SendEmailReactivePage = async () => {
  // const allCookies = cookies().getAll();
  // if (!cookies().has("eid")) notFound();
  // await http.get<{}>("/auth/reactivate", {
  //   headers: {
  //     Cookie: allCookies
  //       .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
  //       .join("; "),
  //   },
  //   credentials: "include",
  // });
  // cookies().set("eid", "", { maxAge: 0 });

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col items-center gap-6 sm:border sm:rounded-xl sm:max-w-[570px] sm:mx-auto sm:px-12 sm:py-4 transition-all">
        <div className="inline-block mx-auto w-[145px] h-[130px] min-w-[145px] min-h-[130px]">
          <EmailSVG1 />
        </div>
        <h2 className="font-bold text-5xl text-center">Email sent</h2>
        <p className="">
          We’ve sent an email to your email address. Follow the steps provided
          in the email to reactivate your account.
        </p>
        <Button asChild>
          <Link href={"/auth/signin"} className="my-10 px-6 rounded-xl">
            Sign in
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SendEmailReactivePage;
