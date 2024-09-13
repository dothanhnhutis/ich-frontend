"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
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
  ListIcon,
  ListOrderedIcon,
  PilcrowIcon,
  StrikethroughIcon,
  Table2Icon,
  TextQuoteIcon,
  UnderlineIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import TiptapColor from "./components/tiptap-color";
import TipTapLink from "./components/tiptap-link";
import { extensions } from "./extensions";

const Tiptap = () => {
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions,
    content: `<p>Hello <link-custom href='http://localhost:4000/api/v1/users/me'>link here</link-custom> World! <a href='http://localhost:4000/api/v1/users/me'>nhut</a></p><image-upload class='size-10' data-width='50' data-align='right' alt='hihi' src='https://res.cloudinary.com/dr1ntj4ar/image/upload/v1724856849/cover_photo.jpg'>title</image-upload><p>Hello World! nhut <i>dep</i><b>trai</b></p><table><tbody><tr><th>Name</th><th colspan="3">Description</th></tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>`,
    onUpdate({ editor }) {
      // console.log({
      //   json: editor.getJSON(),
      //   text: editor.getText(),
      //   html: editor.getHTML(),
      // });
      console.log(editor.getHTML());
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
        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          className={cn(
            "p-2 border rounded-lg",
            editor.isActive("table") ? "bg-secondary" : "hover:bg-secondary"
          )}
        >
          <Table2Icon className="size-5 flex-shrink-0" />
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
