import React from "react";
interface FormSuccessProps {
  message?: string;
}
const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return <p className="text-green-400 font-medium text-xs">{message}</p>;
};

export default FormSuccess;
