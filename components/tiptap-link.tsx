import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { LinkIcon } from "lucide-react";
import { Editor } from "@tiptap/react";

type TipTapLinkType = {
  editor: Editor;
};
const TipTapLink = ({ editor }: TipTapLinkType) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="p-2 border rounded-lg hover:bg-secondary"
        >
          <LinkIcon className="size-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="flex p-2 w-auto gap-2">
        <button
          onClick={() => {
            editor.commands.setLink({
              href: "http://localhost:4000/api/v1/users/me",
              target: "_blank",
            });
          }}
        >
          click
        </button>
        <button
          onClick={() => {
            editor.commands.unsetLink();
          }}
        >
          remove
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default TipTapLink;
