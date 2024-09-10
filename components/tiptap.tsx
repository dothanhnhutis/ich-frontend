"use client";
import React, { useState } from "react";

import {
  useEditor,
  EditorContent,
  Node,
  Mark,
  mergeAttributes,
  Editor,
  useEditorState,
  Extensions,
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
  TrashIcon,
  TriangleRightIcon,
  UnderlineIcon,
  XIcon,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { cn, convertHexToRGBA, convertRGBAToHex } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export const extensions: Extensions = [
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
];

type ColorMetadata = {
  color: RgbaColor;
  tempColor: RgbaColor;
  open: boolean;
  storeData: RgbaColor[];
};

function useStore(key: string): [string | null, (data: string) => void] {
  const data: string | null =
    typeof window != "undefined" ? window.localStorage.getItem(key) : null;
  const handleSetData = (data: string): void => {
    if (typeof window != "undefined") window.localStorage.setItem(key, data);
  };
  return [data, handleSetData];
}

const defaultColor: RgbaColor[] = [
  { r: 36, g: 86, b: 184, a: 1 },
  { r: 255, g: 0, b: 0, a: 1 },
  { r: 217, g: 249, b: 157, a: 1 },
  { r: 165, g: 243, b: 252, a: 1 },
  { r: 165, g: 180, b: 252, a: 1 },
  { r: 126, g: 211, b: 33, a: 1 },
];

const TiptapColor = ({
  editor,
  type,
  storeKey,
}: {
  editor: Editor;
  type: "textstyle" | "highlight";
  storeKey?: string;
}) => {
  const [storeData, setStoreData] = useStore(storeKey || type);
  const [colorData, setColorData] = React.useState<ColorMetadata>(() => {
    if (storeData == null) {
      setStoreData(JSON.stringify(defaultColor));
      return {
        open: false,
        color: {
          a: 1,
          b: 0,
          g: 0,
          r: 0,
        },
        tempColor: {
          a: 1,
          b: 0,
          g: 0,
          r: 0,
        },
        storeData: defaultColor,
      };
    }
    return {
      open: false,
      color: {
        a: 1,
        b: 0,
        g: 0,
        r: 0,
      },
      tempColor: {
        a: 1,
        b: 0,
        g: 0,
        r: 0,
      },
      storeData: JSON.parse(storeData),
    };
  });
  const [isInputChange, setIsInputChange] = React.useState<boolean>(false);

  editor.on("selectionUpdate", ({ editor }) => {
    const colorRegex =
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
    if (
      (type == "textstyle" && editor.getAttributes("textStyle").color) ||
      (type == "highlight" && editor.getAttributes("highlight").color)
    ) {
      const color: string =
        type == "textstyle"
          ? editor.getAttributes("textStyle").color
          : editor.getAttributes("highlight").color;
      const colorMatch = color.match(colorRegex);
      setColorData((prev) => ({
        ...prev,
        color: {
          r: parseInt(colorMatch?.[1] || "0"),
          g: parseInt(colorMatch?.[2] || "0"),
          b: parseInt(colorMatch?.[3] || "0"),
          a: parseFloat(colorMatch?.[4] || "1"),
        },
        tempColor: {
          r: parseInt(colorMatch?.[1] || "0"),
          g: parseInt(colorMatch?.[2] || "0"),
          b: parseInt(colorMatch?.[3] || "0"),
          a: parseFloat(colorMatch?.[4] || "1"),
        },
      }));
    }
  });

  const handleAdd = () => {
    if (colorData.storeData.length < 13)
      setColorData((prev) => {
        setStoreData(JSON.stringify([...prev.storeData, prev.tempColor]));
        return {
          ...prev,
          storeData: [...prev.storeData, prev.tempColor],
        };
      });
  };
  const handleCancel = () => {
    if (type == "textstyle") {
      editor.commands.setColor(
        `rgba(${colorData.color.r}, ${colorData.color.g}, ${colorData.color.b}, ${colorData.color.a})`
      );
    } else {
      editor.commands.setHighlight({
        color: `rgba(${colorData.color.r}, ${colorData.color.g}, ${colorData.color.b}, ${colorData.color.a})`,
      });
    }

    setColorData((prev) => ({ ...prev, open: false }));
  };

  const handleClearColor = () => {
    if (type == "textstyle") {
      editor.commands.unsetColor();
    } else {
      editor.commands.unsetHighlight();
    }
  };

  const handleSetColor = ({ r, g, b, a }: RgbaColor) => {
    setIsInputChange(false);
    if (type == "textstyle") {
      editor.commands.setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
    } else {
      editor.commands.setHighlight({
        color: `rgba(${r}, ${g}, ${b}, ${a})`,
      });
    }

    setColorData((prev) => ({
      ...prev,
      tempColor: { r, g, b, a },
    }));
  };

  const handleSave = () => {
    if (type == "textstyle") {
      editor.commands.setColor(
        `rgba(${colorData.tempColor.r}, ${colorData.tempColor.g}, ${colorData.tempColor.b}, ${colorData.tempColor.a})`
      );
    } else {
      editor.commands.setHighlight({
        color: `rgba(${colorData.tempColor.r}, ${colorData.tempColor.g}, ${colorData.tempColor.b}, ${colorData.tempColor.a})`,
      });
    }
    setColorData((prev) => ({
      ...prev,
      color: prev.tempColor,
      open: false,
    }));
  };

  const handleRemoveColor = (idx: number) => {
    setColorData((prev) => ({
      ...prev,
      storeData: prev.storeData.filter((_, index) => index !== idx),
    }));
  };

  const isSelected = React.useMemo(() => {
    return colorData.storeData.findIndex(
      (color) =>
        colorData.tempColor.r == color.r &&
        colorData.tempColor.g == color.g &&
        colorData.tempColor.b == color.b &&
        colorData.tempColor.a == color.a
    );
  }, [colorData.tempColor]);
  return (
    <Popover
      open={colorData.open}
      onOpenChange={(open) => setColorData((prev) => ({ ...prev, open }))}
    >
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex gap-3 items-center rounded-lg overflow-hidden p-2  flex-shrink-0 border",
            (type == "textstyle" && editor.isActive("textStyle")) ||
              (type == "highlight" && editor.isActive("highlight"))
              ? "bg-secondary"
              : "hover:bg-secondary"
          )}
        >
          {type == "textstyle" ? (
            <PaletteIcon className="size-5 flex-shrink-0" />
          ) : (
            <HighlighterIcon className="size-5 flex-shrink-0" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-auto space-y-1">
        <p className="text-sm">Color</p>
        <RgbaColorPicker
          color={colorData.tempColor}
          onChange={handleSetColor}
        />
        <div className="flex items-center flex-wrap max-w-[200px]">
          <button
            type="button"
            onClick={handleClearColor}
            className="p-1.5 hover:bg-secondary rounded"
          >
            <CircleOffIcon className="size-4 rounded" />
          </button>
          {colorData.storeData.map((color, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSetColor(color)}
              className={cn(
                "p-1 rounded",
                colorData.tempColor.r == color.r &&
                  colorData.tempColor.g == color.g &&
                  colorData.tempColor.b == color.b &&
                  colorData.tempColor.a == color.a
                  ? "bg-secondary"
                  : "hover:bg-secondary"
              )}
            >
              <div
                style={{
                  backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                }}
                className={`size-5 rounded`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center w-[200px] ">
          <input
            type="text"
            placeholder="#000000"
            value={
              isInputChange ? undefined : convertRGBAToHex(colorData.tempColor)
            }
            onChange={(e) => {
              setIsInputChange(true);
              const hexRegex =
                /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
              if (hexRegex.test(e.target.value))
                setColorData((prev) => ({
                  ...prev,
                  tempColor: convertHexToRGBA(e.target.value),
                }));
            }}
            className="bg-transparent w-full outline-0 text-sm border p-0.5 rounded h-[30px]"
          />
          <button
            type="button"
            className="p-1.5 hover:bg-secondary rounded border"
            onClick={handleAdd}
          >
            <PlusIcon className="size-4 rounded" />
          </button>
          <button
            type="button"
            className="p-1.5 hover:bg-secondary rounded border disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
            onClick={() => handleRemoveColor(isSelected)}
            disabled={isSelected == -1}
          >
            <TrashIcon className="size-4 rounded" />
          </button>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            className="disabled:opacity-50 px-1 py-0.5 border rounded text-sm"
            type="button"
            onClick={handleCancel}
          >
            cancel
          </button>
          <button
            type="button"
            className="px-1 py-0.5 border rounded text-sm bg-secondary"
            onClick={handleSave}
          >
            save
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Tiptap = () => {
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions,
    content: "<p>Hello World! </p>",
    onUpdate({ editor }) {
      // console.log({
      //   json: editor.getJSON(),
      //   text: editor.getText(),
      //   html: editor.getHTML(),
      // });
    },
  });

  if (editor == null) return <div>loading...</div>;

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
        <TiptapColor storeKey="highlight" type="highlight" editor={editor} />
        <TiptapColor storeKey="textstyle" type="textstyle" editor={editor} />
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
