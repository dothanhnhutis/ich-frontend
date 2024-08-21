"use client";
import { useUserData } from "@/components/providers/user-manager-provider";
import { Button } from "@/components/ui/button";
import { LayoutGridIcon, ListIcon } from "lucide-react";

export const ViewModeBtn = () => {
  const { toggleView, view } = useUserData();

  return (
    <Button onClick={toggleView} size="icon" variant="outline">
      {view == "grid" ? (
        <ListIcon className="size-4" />
      ) : (
        <LayoutGridIcon className="size-4" />
      )}
    </Button>
  );
};
