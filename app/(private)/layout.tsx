import React from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import UserHeader from "./header";
import { TankStackProvider } from "@/components/providers/TankStackProvider";
import { getCurrentUser } from "../actions";

const PrivateLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  return (
    <TankStackProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="bg-muted/40 relative">
          <UserHeader currentUser={currentUser} />
          {children}
        </div>
      </ThemeProvider>
    </TankStackProvider>
  );
};

export default PrivateLayout;
