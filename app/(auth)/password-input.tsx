"use client";
import { cn } from "@/lib/utils";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import React, { useState } from "react";

const PasswordInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const handleToggleBtn = () => {
    setIsPassword((prev) => !prev);
  };
  const { className, ...ps } = props;

  return (
    <div
      className={cn(
        "flex items-center py-2 px-3 border rounded-md h-10",
        className
      )}
    >
      <input
        type={isPassword ? "password" : "text"}
        className="bg-transparent w-full outline-0 text-sm"
        {...ps}
      />
      {isPassword ? (
        <EyeOffIcon
          onClick={handleToggleBtn}
          className="flex flex-shrink-0 size-5 cursor-pointer ml-3"
        />
      ) : (
        <EyeIcon
          onClick={handleToggleBtn}
          className="flex flex-shrink-0 size-5 cursor-pointer ml-3"
        />
      )}
    </div>
  );
};

export default PasswordInput;
