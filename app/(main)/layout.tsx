import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <p>MainLayout</p>
      {children}
    </div>
  );
};

export default MainLayout;
