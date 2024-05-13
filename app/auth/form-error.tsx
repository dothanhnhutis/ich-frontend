import React from "react";
interface FormErrorProps {
  message?: string;
}
const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return <p className="text-red-500 font-medium text-xs">{message}</p>;
};

export default FormError;
