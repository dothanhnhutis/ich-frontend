"use client";
import { sendMail } from "@/actions/auth";
import useCountDown from "@/hook/useCountDown";
import { cn } from "@/lib/utils";
import React, { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SendMailButtom = ({
  email,
  setisExistEmail,
}: {
  email: string;
  setisExistEmail: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [count, setCount] = useCountDown("sms-send", email);
  const [isPending, startTransistion] = useTransition();

  const handleSend = () => {
    if (!count && !isPending && email.length > 0) {
      startTransistion(() => {
        sendMail(email)
          .then((data) => {
            if (data.error) {
              setisExistEmail(true);
            } else {
              setCount();
            }
          })
          .catch((e) => {
            console.log(e);
          });
      });
    }
  };

  return (
    <p
      onClick={handleSend}
      className={cn(
        "flex items-center justify-center w-10 h-full border-l px-3",
        !count && !isPending && email.length > 0 && "cursor-pointer",
        !email.length && "opacity-50"
      )}
    >
      {count > 0 && (
        <span className="text-center text-muted-foreground text-sm">
          {count}s
        </span>
      )}
      {isPending && (
        <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0" />
      )}
      {!count && !isPending && (
        <span className="text-center text-muted-foreground text-sm">Send</span>
      )}
    </p>
  );
};

export default SendMailButtom;
