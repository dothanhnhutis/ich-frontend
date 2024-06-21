import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export const SignUpForm = () => {
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          className="focus-visible:ring-transparent"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          className="focus-visible:ring-transparent"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          className="focus-visible:ring-transparent"
          type="password"
          autoComplete="off"
        />
      </div>
    </div>
  );
};
