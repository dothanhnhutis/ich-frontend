import React from "react";
import { AuthProvider } from "@/components/providers/auth-provider";
import HeaderPrivate from "./header";
import { ThemeProvider } from "@/components/providers/theme-provider";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <div className="bg-muted/40 min-h-screen">
          {/* <HeaderPrivate /> */}
          {children}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default PrivateLayout;
