import React from "react";

export const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="loader-dots block relative w-20 h-5 mt-2">
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-primary"></div>
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-primary"></div>
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-primary"></div>
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-primary"></div>
      </div>
      <div className="text-xs font-light mt-2 text-center">Please wait...</div>
    </div>
  );
};
