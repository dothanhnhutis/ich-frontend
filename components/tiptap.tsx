"use client";
import React from "react";

import { useEditor, EditorContent, Node, Mark } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  CircleOffIcon,
  Code2Icon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  PilcrowIcon,
  PlusIcon,
  StrikethroughIcon,
  TriangleRightIcon,
  UnderlineIcon,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Bold, Italic, Underline, Strike],
    content: "<p>Hello World! 🌎️</p>",
  });

  if (!editor) return <div>123</div>;

  return (
    <div className="border rounded-lg">
      <div className="flex p-3 border-b gap-3 h-[65px] overflow-x-scroll">
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex gap-3 items-center rounded-lg overflow-hidden p-2 hover:bg-secondary flex-shrink-0">
              <div className="flex items-center gap-2 w-[110px]">
                <PilcrowIcon className="size-5 flex-shrink-0" />
                <p>Paragraph</p>
              </div>
              <ChevronDownIcon className="size-5 flex-shrink-0" />
            </div>
          </PopoverTrigger>
          <PopoverContent align="start" className="p-2 space-y-1 w-[160px]">
            <div className="flex gap-3 items-center rounded-lg overflow-hidden p-2 hover:bg-secondary">
              <PilcrowIcon className="size-5 flex-shrink-0" />
              <p>Paragraph</p>
            </div>
            <div className="flex gap-3 items-center rounded-lg overflow-hidden p-2 hover:bg-secondary">
              <Heading1Icon className="size-5 flex-shrink-0" />
              <p>Heading 1</p>
            </div>
            <div className="flex gap-3 items-center rounded-lg overflow-hidden p-2 hover:bg-secondary">
              <Heading2Icon className="size-5 flex-shrink-0" />
              <p>Heading 2</p>
            </div>
            <div className="flex gap-3 items-center rounded-lg overflow-hidden p-2 hover:bg-secondary">
              <Heading3Icon className="size-5 flex-shrink-0" />
              <p>Heading 3</p>
            </div>
            <div className="flex gap-3 items-center rounded-lg overflow-hidden p-2 hover:bg-secondary">
              <Heading4Icon className="size-5 flex-shrink-0" />
              <p>Heading 4</p>
            </div>
          </PopoverContent>
        </Popover>
        <Separator orientation="vertical" />
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex gap-3 items-center rounded-lg overflow-hidden p-2 hover:bg-secondary flex-shrink-0">
              <label
                htmlFor="color"
                className="size-5 block bg-[#333] rounded"
              />
              <input id="color" name="color" type="color" className="hidden" />
              <ChevronDownIcon className="size-5 flex-shrink-0" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-2 w-auto space-y-1">
            <p className="text-sm">Color</p>
            <div className="flex items-center">
              <button type="button" className="p-2 hover:bg-secondary rounded">
                <CircleOffIcon className="size-4 rounded" />
              </button>
              <button type="button" className="p-1 hover:bg-secondary rounded">
                <div className="size-5 bg-[#2456b8] rounded" />
              </button>
              <button type="button" className="p-1 hover:bg-secondary rounded">
                <div className="size-5 bg-[#ff0000] rounded" />
              </button>
              <button type="button" className="p-1 hover:bg-secondary rounded">
                <div className="size-5 bg-[#a5f3fc] rounded" />
              </button>
              <button type="button" className="p-1 hover:bg-secondary rounded">
                <div className="size-5 bg-[#a5b4fc] rounded" />
              </button>
              <button type="button" className="p-1 hover:bg-secondary rounded">
                <div className="size-5 bg-[#7ED321] rounded" />
              </button>
              <button type="button" className="p-2 hover:bg-secondary rounded">
                <PlusIcon className="size-4 rounded" />
              </button>
            </div>
            <p className="text-sm">Highlight</p>
            <div className="flex items-center">
              <button type="button" className="p-2 hover:bg-secondary rounded">
                <CircleOffIcon className="size-4 rounded" />
              </button>
              <button type="button" className="p-1 hover:bg-secondary rounded">
                <div className="size-5 bg-[#2456b8] rounded" />
              </button>
              <button type="button" className="p-1 hover:bg-secondary rounded">
                <div className="size-5 bg-[#ff0000] rounded" />
              </button>
              <button type="button" className="p-1 hover:bg-secondary rounded">
                <div className="size-5 bg-[#a5f3fc] rounded" />
              </button>
              <button type="button" className="p-1 hover:bg-secondary rounded">
                <div className="size-5 bg-[#a5b4fc] rounded" />
              </button>
              <button type="button" className="p-1 hover:bg-secondary rounded">
                <div className="size-5 bg-[#7ED321] rounded" />
              </button>
              <button type="button" className="p-2 hover:bg-secondary rounded">
                <PlusIcon className="size-4 rounded" />
              </button>
            </div>
          </PopoverContent>
        </Popover>
        <Separator orientation="vertical" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "p-2 border rounded-lg",
            editor.isActive("bold") ? "hover:bg-secondary" : ""
          )}
        >
          <BoldIcon className="size-5 flex-shrink-0" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            "p-2 border rounded-lg",
            editor.isActive("underline") ? "hover:bg-secondary" : ""
          )}
        >
          <UnderlineIcon className="size-5 flex-shrink-0" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "p-2 border rounded-lg",
            editor.isActive("italic") ? "hover:bg-secondary" : ""
          )}
        >
          <ItalicIcon className="size-5 flex-shrink-0" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            "p-2 border rounded-lg",
            editor.isActive("strike") ? "hover:bg-secondary" : ""
          )}
        >
          <StrikethroughIcon className="size-5 flex-shrink-0" />
        </button>
        <button
          type="button"
          className="p-2 border rounded-lg hover:bg-secondary"
        >
          <Code2Icon className="size-5 flex-shrink-0" />
        </button>
        <Separator orientation="vertical" />
        <button
          type="button"
          className="p-2 border rounded-lg hover:bg-secondary"
        >
          <ListIcon className="size-5 flex-shrink-0" />
        </button>
        <button
          type="button"
          className="p-2 border rounded-lg hover:bg-secondary"
        >
          <ListOrderedIcon className="size-5 flex-shrink-0" />
        </button>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="p-2 border rounded-lg relative hover:bg-secondary"
            >
              <AlignCenterIcon className="size-5 flex-shrink-0" />
              <TriangleDownIcon className="size-2 flex-shrink-0 absolute bottom-[1px] right-[1px] -rotate-45" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="flex p-2 gap-3 h-14 w-auto">
            <button
              type="button"
              className="p-2 border rounded-lg hover:bg-secondary"
            >
              <AlignLeftIcon className="size-5 flex-shrink-0" />
            </button>
            <Separator orientation="vertical" />
            <button
              type="button"
              className="p-2 border rounded-lg hover:bg-secondary"
            >
              <AlignCenterIcon className="size-5 flex-shrink-0" />
            </button>
            <Separator orientation="vertical" />
            <button
              type="button"
              className="p-2 border rounded-lg hover:bg-secondary"
            >
              <AlignRightIcon className="size-5 flex-shrink-0" />
            </button>
            <Separator orientation="vertical" />
            <button
              type="button"
              className="p-2 border rounded-lg hover:bg-secondary"
            >
              <AlignJustifyIcon className="size-5 flex-shrink-0" />
            </button>
          </PopoverContent>
        </Popover>
        <Separator orientation="vertical" />
        <button
          type="button"
          className="p-2 border rounded-lg hover:bg-secondary"
        >
          <LinkIcon className="size-5" />
        </button>
        <button
          type="button"
          className="p-2 border rounded-lg hover:bg-secondary"
        >
          <ImageIcon className="size-5" />
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="p-3 min-h-[300px] max-h-[500px] overflow-y-scroll"
      />
    </div>
  );
};

export default Tiptap;
