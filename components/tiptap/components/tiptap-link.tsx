import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { LinkIcon, TrashIcon } from "lucide-react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type TipTapLinkType = {
  editor: Editor;
};
const TipTapLink = ({ editor }: TipTapLinkType) => {
  const [link, setLink] = React.useState<string>("");
  const [isNewTab, setIsNewTab] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);

  editor.on("selectionUpdate", ({ editor, transaction }) => {
    if (editor.isActive("link")) {
      setLink(editor.getAttributes("link").href);
      setIsNewTab(editor.getAttributes("link").target ? true : false);
      setIsEdit(true);
    } else {
      setIsEdit(false);
      setLink("");
      setIsNewTab(false);
    }
    setOpen(false);
  });

  const handleSetLink = () => {
    if (isNewTab) {
      editor.commands.setLink({
        href: link,
        target: "_blank",
      });
    } else {
      editor.commands.setLink({
        href: link,
        target: null,
      });
    }
    setLink("");
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "p-2 border rounded-lg",
            editor.isActive("link") ? "bg-secondary" : "hover:bg-secondary"
          )}
        >
          <LinkIcon className="size-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-auto">
        <div className="flex items-center gap-2">
          <Label
            htmlFor="link"
            className="flex items-center gap-2 p-2 rounded-lg bg-muted cursor-text"
          >
            <LinkIcon className="h-4 w-4" />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="h-5 bg-transparent focus-visible:outline-0"
              type="text"
              name="link"
              id="link"
              placeholder="Enter URL"
            />
          </Label>
          <Button
            variant="secondary"
            size="sm"
            disabled={!z.string().url().safeParse(link).success}
            onClick={handleSetLink}
          >
            {isEdit ? "Save" : "Set Link"}
          </Button>
          {isEdit && (
            <Button
              variant="secondary"
              size="icon"
              onClick={() => {
                editor.commands.unsetLink();
                setOpen(false);
              }}
            >
              <TrashIcon className="size-4" />
            </Button>
          )}
        </div>
        <div className="mt-3">
          <Label
            htmlFor="isNewTab"
            className="flex items-center justify-start gap-2 text-sm font-semibold cursor-pointer select-none text-neutral-500 dark:text-neutral-400"
          >
            Open in new tab
            <Switch
              id="isNewTab"
              checked={isNewTab}
              onCheckedChange={(checked) => setIsNewTab(checked)}
            />
          </Label>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TipTapLink;
