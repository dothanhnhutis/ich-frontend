import React from "react";

import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Send } from "./send";

const SendEmailReactivePage = async () => {
  if (!cookies().has("eid")) notFound();
  return <Send />;
};

export default SendEmailReactivePage;
