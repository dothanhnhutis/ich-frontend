import { AlertDialogAction } from "@/components/ui/alert-dialog";
import React from "react";
import { disactivateAccount } from "../actions";

const DisableAccountBtn = () => {
  return (
    <AlertDialogAction
      onClick={async () => {
        await disactivateAccount();
      }}
    >
      Delete
    </AlertDialogAction>
  );
};

export default DisableAccountBtn;
