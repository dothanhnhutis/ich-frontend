"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

const PasswordInput = (
  props: {
    open?: boolean;
    onOpenChange?(open: boolean): void;
  } & React.InputHTMLAttributes<HTMLInputElement>
) => {
  const { className, open, onOpenChange, ...ps } = props;
  const [isPassword, setIsPassword] = useState<boolean>(open || true);
  const handleToggleBtn = () => {
    if (onOpenChange) {
      onOpenChange(isPassword);
    } else {
      setIsPassword((prev) => !prev);
    }
  };

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
      {open || isPassword ? (
        <PiEyeClosedBold
          onClick={handleToggleBtn}
          className="flex flex-shrink-0 size-5 cursor-pointer ml-3"
        />
      ) : (
        <PiEyeBold
          onClick={handleToggleBtn}
          className="flex flex-shrink-0 size-5 cursor-pointer ml-3"
        />
      )}
    </div>
  );
};

export default PasswordInput;
