"use client";
import React, { useEffect } from "react";
import { useServerAction } from "zsa-react";
import { clearSendEmail } from "../actions";

const Send = () => {
  const { execute } = useServerAction(clearSendEmail);
  useEffect(() => {
    execute();
  }, []);
  return <div>SendEmail</div>;
};

export default Send;
