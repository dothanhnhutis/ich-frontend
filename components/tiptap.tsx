"use client";
import React, { useState } from "react";

import {
  useEditor,
  EditorContent,
  Node,
  Mark,
  mergeAttributes,
} from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import Code from "@tiptap/extension-code";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

import { RgbaColor, RgbaColorPicker } from "react-colorful";

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
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  PaletteIcon,
  PilcrowIcon,
  PlusIcon,
  StrikethroughIcon,
  TextQuoteIcon,
  TriangleRightIcon,
  UnderlineIcon,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const Tiptap = () => {
  const [highlightColor, setHighlightColor] = useState<RgbaColor>({
    a: 1,
    b: 0,
    g: 0,
    r: 0,
  });
  const [hinglightColor, setHighLight] = useState<RgbaColor>({
    a: 1,
    b: 0,
    g: 0,
    r: 0,
  });

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph.configure({
        HTMLAttributes: {
          class: "leading-7 [&:not(:first-child)]:mt-6",
        },
      }),
      Text,
      Heading.extend({
        renderHTML({ node, HTMLAttributes }) {
          const classes: Record<number, string> = {
            1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
            2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
            3: "scroll-m-20 text-2xl font-semibold tracking-tight",
            4: "scroll-m-20 text-xl font-semibold tracking-tight",
          };
          const hasLevel = this.options.levels.includes(node.attrs.level);
          const level = hasLevel ? node.attrs.level : this.options.levels[0];

          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "mt-6 border-l-2 pl-6 italic",
        },
      }),
      Bold,
      Italic,
      Underline,
      Strike,
      Code.configure({
        HTMLAttributes: {
          class:
            "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        },
      }),
      BulletList.configure({
        keepMarks: true,
        keepAttributes: false,
        HTMLAttributes: {
          class: "my-6 ml-6 list-disc [&>li]:mt-2",
        },
      }),
      OrderedList.configure({
        keepMarks: true,
        keepAttributes: false,
        HTMLAttributes: {
          class: "my-6 ml-6 list-decimal [&>li]:mt-2",
        },
      }),
      ListItem,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: null,
          class: "font-bold text-primary ",
        },
        openOnClick: false,
      }),
    ],
    content: "<p>Hello World! </p>",
    onSelectionUpdate({ editor }) {
      const colorRegex = /rgba((), 75, 150, 1)/;
      if (editor.getAttributes("highlight").color) {
        console.log(editor.getAttributes("highlight").color);
      }
      if (editor.getAttributes("textStyle").color) {
        console.log(editor.getAttributes("textStyle").color);
        const;
      }
    },
    onUpdate({ editor }) {
      console.log({
        json: editor.getJSON(),
        text: editor.getText(),
        html: editor.getHTML(),
      });
    },
  });

  if (!editor) return <div>123</div>;

  return (
    <div className="border rounded-lg">
      <div className="flex p-3 border-b gap-3 h-[65px] overflow-x-scroll">
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex gap-3 items-center rounded-lg overflow-hidden p-2 hover:bg-secondary flex-shrink-0">
              {editor.isActive("paragraph") ? (
                <div className="flex items-center gap-2 w-[110px]">
                  <PilcrowIcon className="size-5 flex-shrink-0" />
                  <p>Paragraph</p>
                </div>
              ) : editor.isActive("heading", { level: 1 }) ? (
                <div className="flex items-center gap-2 w-[110px]">
                  <Heading1Icon className="size-5 flex-shrink-0" />
                  <p>Heading 1</p>
                </div>
              ) : editor.isActive("heading", { level: 2 }) ? (
                <div className="flex items-center gap-2 w-[110px]">
                  <Heading2Icon className="size-5 flex-shrink-0" />
                  <p>Heading 2</p>
                </div>
              ) : editor.isActive("heading", { level: 3 }) ? (
                <div className="flex items-center gap-2 w-[110px]">
                  <Heading3Icon className="size-5 flex-shrink-0" />
                  <p>Heading 3</p>
                </div>
              ) : (
                <div className="flex items-center gap-2 w-[110px]">
                  <Heading4Icon className="size-5 flex-shrink-0" />
                  <p>Heading 4</p>
                </div>
              )}

              <ChevronDownIcon className="size-5 flex-shrink-0" />
            </div>
          </PopoverTrigger>
          <PopoverContent align="start" className="p-2 space-y-1 w-[160px]">
            <button
              type="button"
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={cn(
                "flex gap-3 items-center rounded-lg overflow-hidden p-2 w-full",
                editor.isActive("paragraph")
                  ? "bg-secondary"
                  : "hover:bg-secondary"
              )}
            >
              <PilcrowIcon className="size-5 flex-shrink-0" />
              <p>Paragraph</p>
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={cn(
                "flex gap-3 items-center rounded-lg overflow-hidden p-2 w-full",
                editor.isActive("heading", { level: 1 })
                  ? "bg-secondary"
                  : "hover:bg-secondary"
              )}
            >
              <Heading1Icon className="size-5 flex-shrink-0" />
              <p>Heading 1</p>
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={cn(
                "flex gap-3 items-center rounded-lg overflow-hidden p-2 w-full",
                editor.isActive("heading", { level: 2 })
                  ? "bg-secondary"
                  : "hover:bg-secondary"
              )}
            >
              <Heading2Icon className="size-5 flex-shrink-0" />
              <p>Heading 2</p>
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={cn(
                "flex gap-3 items-center rounded-lg overflow-hidden p-2 w-full",
                editor.isActive("heading", { level: 3 })
                  ? "bg-secondary"
                  : "hover:bg-secondary"
              )}
            >
              <Heading3Icon className="size-5 flex-shrink-0" />
              <p>Heading 3</p>
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
              className={cn(
                "flex gap-3 items-center rounded-lg overflow-hidden p-2 w-full",
                editor.isActive("heading", { level: 4 })
                  ? "bg-secondary"
                  : "hover:bg-secondary"
              )}
            >
              <Heading4Icon className="size-5 flex-shrink-0" />
              <p>Heading 4</p>
            </button>
          </PopoverContent>
        </Popover>
        <Separator orientation="vertical" />
        <Popover>
          <PopoverTrigger asChild>
            <div
              className={cn(
                "flex gap-3 items-center rounded-lg overflow-hidden p-2  flex-shrink-0",
                editor.isActive("highlight")
                  ? "bg-secondary"
                  : "hover:bg-secondary"
              )}
            >
              <HighlighterIcon className="size-5 flex-shrink-0" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-2 w-auto space-y-1">
            <p className="text-sm">Highlight</p>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => editor.commands.unsetHighlight()}
                className="p-2 hover:bg-secondary rounded"
              >
                <CircleOffIcon className="size-4 rounded" />
              </button>
              <button
                type="button"
                onClick={() =>
                  editor.commands.setHighlight({
                    color: `rgba(${75}, ${75}, ${150}, ${1})`,
                  })
                }
                className="p-1 hover:bg-secondary rounded"
              >
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
        <Popover>
          <PopoverTrigger asChild>
            <div
              className={cn(
                "flex gap-3 items-center rounded-lg overflow-hidden p-2  flex-shrink-0",
                editor.isActive("textStyle")
                  ? "bg-secondary"
                  : "hover:bg-secondary"
              )}
            >
              <PaletteIcon className="size-5 flex-shrink-0" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-2 w-auto space-y-1">
            <p className="text-sm">Color</p>
            <RgbaColorPicker
              color={{ a: 100, b: 75, g: 75, r: 75 }}
              onChange={() => {}}
            />
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => editor.commands.unsetColor()}
                className="p-2 hover:bg-secondary rounded"
              >
                <CircleOffIcon className="size-4 rounded" />
              </button>
              <button
                type="button"
                onClick={() =>
                  editor.commands.setColor(`rgba(${75}, ${75}, ${150}, ${1})`)
                }
                className="p-1 hover:bg-secondary rounded"
              >
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
            editor.isActive("bold") ? "bg-secondary" : "hover:bg-secondary"
          )}
        >
          <BoldIcon className="size-5 flex-shrink-0" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            "p-2 border rounded-lg",
            editor.isActive("underline") ? "bg-secondary" : "hover:bg-secondary"
          )}
        >
          <UnderlineIcon className="size-5 flex-shrink-0" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "p-2 border rounded-lg",
            editor.isActive("italic") ? "bg-secondary" : "hover:bg-secondary"
          )}
        >
          <ItalicIcon className="size-5 flex-shrink-0" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            "p-2 border rounded-lg",
            editor.isActive("strike") ? "bg-secondary" : "hover:bg-secondary"
          )}
        >
          <StrikethroughIcon className="size-5 flex-shrink-0" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={cn(
            "p-2 border rounded-lg",
            editor.isActive("code") ? "bg-secondary" : "hover:bg-secondary"
          )}
        >
          <Code2Icon className="size-5 flex-shrink-0" />
        </button>
        <button
          type="button"
          onClick={() => editor.commands.toggleBlockquote()}
          className={cn(
            "p-2 border rounded-lg",
            editor.isActive("blockquote")
              ? "bg-secondary"
              : "hover:bg-secondary"
          )}
        >
          <TextQuoteIcon className="size-5 flex-shrink-0" />
        </button>
        <Separator orientation="vertical" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "p-2 border rounded-lg",
            editor.isActive("bulletList")
              ? "bg-secondary"
              : "hover:bg-secondary"
          )}
        >
          <ListIcon className="size-5 flex-shrink-0" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "p-2 border rounded-lg",
            editor.isActive("orderedList")
              ? "bg-secondary"
              : "hover:bg-secondary"
          )}
        >
          <ListOrderedIcon className="size-5 flex-shrink-0" />
        </button>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                "p-2 border rounded-lg",
                editor.isActive({ textAlign: "left" }) ||
                  editor.isActive({ textAlign: "center" }) ||
                  editor.isActive({ textAlign: "right" }) ||
                  editor.isActive({ textAlign: "justify" })
                  ? "bg-secondary"
                  : "hover:bg-secondary"
              )}
            >
              {editor.isActive({ textAlign: "left" }) ? (
                <AlignLeftIcon className="size-5 flex-shrink-0" />
              ) : editor.isActive({ textAlign: "center" }) ? (
                <AlignCenterIcon className="size-5 flex-shrink-0" />
              ) : editor.isActive({ textAlign: "right" }) ? (
                <AlignRightIcon className="size-5 flex-shrink-0" />
              ) : (
                <AlignJustifyIcon className="size-5 flex-shrink-0" />
              )}
              {/* <AlignCenterIcon className="size-5 flex-shrink-0" /> */}
              <TriangleDownIcon className="size-2 flex-shrink-0 absolute bottom-[1px] right-[1px] -rotate-45" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="flex p-2 gap-3 h-14 w-auto">
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={cn(
                "p-2 border rounded-lg",
                editor.isActive({ textAlign: "left" })
                  ? "bg-secondary"
                  : "hover:bg-secondary"
              )}
            >
              <AlignLeftIcon className="size-5 flex-shrink-0" />
            </button>
            <Separator orientation="vertical" />
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={cn(
                "p-2 border rounded-lg",
                editor.isActive({ textAlign: "center" })
                  ? "bg-secondary"
                  : "hover:bg-secondary"
              )}
            >
              <AlignCenterIcon className="size-5 flex-shrink-0" />
            </button>
            <Separator orientation="vertical" />
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={cn(
                "p-2 border rounded-lg",
                editor.isActive({ textAlign: "right" })
                  ? "bg-secondary"
                  : "hover:bg-secondary"
              )}
            >
              <AlignRightIcon className="size-5 flex-shrink-0" />
            </button>
            <Separator orientation="vertical" />
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              className={cn(
                "p-2 border rounded-lg",
                editor.isActive({ textAlign: "justify" })
                  ? "bg-secondary"
                  : "hover:bg-secondary"
              )}
            >
              <AlignJustifyIcon className="size-5 flex-shrink-0" />
            </button>
          </PopoverContent>
        </Popover>
        <Separator orientation="vertical" />
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="p-2 border rounded-lg hover:bg-secondary"
            >
              <LinkIcon className="size-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-2 w-auto space-y-1"></PopoverContent>
        </Popover>

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
