"use client";
import { useUserData } from "@/components/providers/user-manager-provider";
import { Button } from "@/components/ui/button";
import { LayoutPanelTopIcon, TableIcon } from "lucide-react";

export const ViewModeBtn = () => {
  const { setViewMode, viewMode } = useUserData();

  return (
    <Button
      onClick={() => {
        setViewMode(viewMode == "card" ? "list" : "card");
      }}
      size="icon"
      variant="outline"
    >
      {viewMode == "list" ? (
        <TableIcon className="size-4" />
      ) : (
        <LayoutPanelTopIcon className="size-4" />
      )}
    </Button>
  );
};
