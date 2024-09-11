"use client";
import React from "react";
import {
  useEditor,
  EditorContent,
  mergeAttributes,
  Extensions,
  Mark,
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

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  Code2Icon,
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
  StrikethroughIcon,
  TextQuoteIcon,
  UnderlineIcon,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import TiptapColor from "./tiptap-color";
import TipTapLink from "./tiptap-link";

// const LinkExtension = Link.configure({
//   HTMLAttributes: {
//     rel: "noopener noreferrer",
//     target: null,
//   },
//   openOnClick: false,
// }).extend({});

export interface LinkProtocolOptions {
  /**
   * The protocol scheme to be registered.
   * @default '''
   * @example 'ftp'
   * @example 'git'
   */
  scheme: string;

  /**
   * If enabled, it allows optional slashes after the protocol.
   * @default false
   * @example true
   */
  optionalSlashes?: boolean;
}

interface LinkOptions {
  protocols: Array<LinkProtocolOptions | string>;
  HTMLAttributes: Record<string, any>;
}
const ATTR_WHITESPACE =
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;

function isAllowedUri(
  uri: string | undefined,
  protocols?: LinkOptions["protocols"]
) {
  const allowedProtocols: string[] = [
    "http",
    "https",
    "ftp",
    "ftps",
    "mailto",
    "tel",
    "callto",
    "sms",
    "cid",
    "xmpp",
  ];

  if (protocols) {
    protocols.forEach((protocol) => {
      const nextProtocol =
        typeof protocol === "string" ? protocol : protocol.scheme;

      if (nextProtocol) {
        allowedProtocols.push(nextProtocol);
      }
    });
  }

  // eslint-disable-next-line no-useless-escape
  return (
    !uri ||
    uri
      .replace(ATTR_WHITESPACE, "")
      .match(
        new RegExp(
          `^(?:(?:${allowedProtocols.join(
            "|"
          )}):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))`,
          "i"
        )
      )
  );
}

const LinkExtension = Mark.create<LinkOptions>({
  name: "linkcustom",
  priority: 1000,
  addOptions() {
    return {
      protocols: [],
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null,
      },
    };
  },
  addAttributes() {
    return {
      class: {
        default: this.options.HTMLAttributes.class,
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "linkcustom[href]",
        getAttrs: (dom) => {
          const href = dom.getAttribute("href");

          // prevent XSS attacks
          // if (!href || !isAllowedUri(href, this.options.protocols)) {
          //   return false;
          // }
          return null;
        },
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    if (!isAllowedUri(HTMLAttributes.href, this.options.protocols)) {
      // strip out the href
      return [
        "a",
        mergeAttributes(this.options.HTMLAttributes, {
          ...HTMLAttributes,
          href: "",
        }),
        0,
      ];
    }

    return [
      "a",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});

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
  LinkExtension,
];

const Tiptap = () => {
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions,
    content:
      "<p>Hello World! <linkcustom href='http://localhost:4000/api/v1/users/me'>123</linkcustom>  </p>",
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
                "p-2 border rounded-lg relative",
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
        <TipTapLink editor={editor} />

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
