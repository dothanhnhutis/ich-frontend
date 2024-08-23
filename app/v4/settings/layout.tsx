import React from "react";
import { Button } from "@/components/ui/button";

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background rounded-xl p-4">
      <h3 className="font-bold text-2xl">Account settings</h3>
      <p className="text-sm font-normal leading-snug text-muted-foreground">
        Manage your account settings and set e-mail preferences.
      </p>
      <div className="flex flex-col mt-4 gap-4">
        <div className="flex gap-2 items-center overflow-x-scroll">
          <Button variant="secondary">General</Button>
          <Button variant="ghost">Security</Button>
          <Button variant="ghost">Notifications</Button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default SettingLayout;
