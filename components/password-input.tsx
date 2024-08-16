"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

const PasswordInput = ({
  className,
  defaultOpen,
  open,
  onOpenChange,
  ...props
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [isPassword, setIsPassword] = React.useState<boolean | undefined>(
    defaultOpen
  );

  const handleToggleBtn = () => {
    setIsPassword((prev) => !prev);
  };

  // React.useEffect(() => {
  //   if (onOpenChange) onOpenChange(open || isPassword);
  // }, [isPassword]);

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
        {...props}
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
