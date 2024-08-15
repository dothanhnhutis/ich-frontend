import { Button } from "@/components/ui/button";
import configs from "@/config";
import { cn } from "@/lib/utils";
import React from "react";

const ContinueBtn = ({
  redir,
  label = "Sign up with Google",
  className,
}: {
  redir?: string;
  label?: string;
  className?: string;
}) => {
  const handleSigUpWithGoogle = () => {
    document.location.href = `${
      configs.NEXT_PUBLIC_SERVER_URL
    }/api/v1/auth/google${redir ? "?redir=" + redir : ""}`;
  };
  return (
    <Button
      variant="outline"
      className={className}
      onClick={handleSigUpWithGoogle}
    >
      {label}
    </Button>
  );
};

export default ContinueBtn;
