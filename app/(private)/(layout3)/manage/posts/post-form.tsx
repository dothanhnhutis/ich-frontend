"use client";
import DatePicker from "@/components/date-picker";
import Tag from "@/components/tag";
import Tiptap from "@/components/tiptap/tiptap";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import configs from "@/config";
import { cn } from "@/lib/utils";
import { HashIcon, TagsIcon } from "lucide-react";
import React from "react";

type PostData = {
  title: string;
  slug: string;
  tags: string[];
  category: string;
  isPublish: boolean;
  publishAt: Date;
  authorId: string;
};

type PostFormType =
  | { type: "create" }
  | {
      type: "edit";
      data: PostData;
    };

const categoriesDataTemplate = [
  { id: "1", name: "Làm đẹp", slug: "lam-dep" },
  { id: "2", name: "Dưỡng da", slug: "duong-da" },
  { id: "3", name: "Chăm Sóc Body", slug: "cham-soc-body" },
];
const usersDataTemplate = [
  { id: "1", name: "example1", email: "abc@example.com" },
  { id: "2", name: "example2", email: "aaa@example.com" },
  { id: "3", name: "example3", email: "bbb@example.com" },
];

const tagDataTemplate = [
  { id: "1asdasad", name: "Làm đẹp" },
  { id: "2cxcxcaa", name: "Chăm sóc da" },
  { id: "3ccxcasd", name: "Chăm sóc tóc" },
  { id: "4ccxcasd", name: "Mỹ Phẩm" },
  { id: "5ccxcasd", name: "Skin care" },
  { id: "6ccxcasd", name: "Cách Chọn Đơn Vị Gia Công Nước Tẩy Trang" },
  { id: "7ccxcasd", name: " làm lotion" },
];

const PostForm = (props: PostFormType) => {
  const [tab, setTab] = React.useState<"content" | "metadata" | "display-mode">(
    "content"
  );
  const [formData, setFormData] = React.useState<PostData>({
    title: "",
    slug: "",
    tags: [],
    category: "",
    isPublish: true,
    publishAt: new Date(),
    authorId: "",
  });
  const [tag, setTag] = React.useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code == "Enter" || e.code == "NumpadEnter" || e.code == "Tab") {
      setFormData((prev) => ({
        ...prev,
        tags: tag.trim().length > 0 ? [...prev.tags, tag] : prev.tags,
      }));
      setTag("");
      return;
    }
  };

  const tagsNoSelected = React.useMemo(() => {
    return tagDataTemplate.filter(
      (t) =>
        t.name.toLowerCase().includes(tag.toLowerCase()) &&
        !formData.tags.includes(t.name)
    );
  }, [tagDataTemplate, tag]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      {tab == "content" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title" className="text-sm text-muted-foreground">
              Title
            </Label>
            <Input
              value={formData.title}
              onChange={handleOnChange}
              id="title"
              name="title"
              className="focus-visible:ring-transparent "
              placeholder="Name of your project"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="slug" className="text-sm text-muted-foreground">
              Slug
            </Label>
            <Input
              value={formData.slug}
              onChange={handleOnChange}
              id="slug"
              name="slug"
              className="focus-visible:ring-transparent "
              placeholder="Slug"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="slug" className="text-sm text-muted-foreground">
              Category
            </Label>
            <Select>
              <SelectTrigger className="focus-visible:ring-transparent focus:ring-transparent text-start h-auto">
                <SelectValue className="h-10" placeholder="Select tag" />
              </SelectTrigger>
              <SelectContent id="tags">
                {categoriesDataTemplate.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex flex-col">
                      <p>{category.name}</p>
                      <p className="text-xs">{category.slug}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="slug" className="text-sm text-muted-foreground">
              Author
            </Label>

            <Select
            // disabled={isPending}
            // onValueChange={(v) => {
            //   if (v !== "")
            //     setForm((prev) => {
            //       return { ...prev, authorId: v };
            //     });
            // }}
            // value={form.authorId}
            >
              <SelectTrigger className="focus-visible:ring-transparent focus:ring-transparent text-start h-auto">
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent id="users">
                <div>
                  {usersDataTemplate.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      <div className="flex items-center gap-2 ">
                        <Avatar>
                          <AvatarImage
                            src={configs.NEXT_PUBLIC_PHOTO_URL}
                            alt="avatar"
                            className="z-[1]"
                          />
                          <Skeleton className="h-12 w-12 rounded-full" />
                        </Avatar>
                        <div className="w-full overflow-hidden">
                          <p className="truncate">{u.name}</p>
                          <p className="text-sm text-muted-foreground truncate">
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 border p-2 px-3 rounded-lg">
              <Avatar>
                <AvatarImage
                  src={configs.NEXT_PUBLIC_PHOTO_URL}
                  alt="avatar"
                  className="z-[1]"
                />
                <Skeleton className="h-12 w-12 rounded-full" />
              </Avatar>
              <div className="w-full overflow-hidden h-10">
                <p className="truncate">Thanh Nhut</p>
                <p className="text-xs text-muted-foreground truncate">
                  gaconght@gmail.com
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 ">
            <Label htmlFor="tag" className="text-sm text-muted-foreground">
              Tag
            </Label>

            <div className="relative border flex p-2 items-center gap-2 flex-wrap rounded-lg">
              {formData.tags.map((tag, idx) => (
                <Tag
                  key={idx}
                  title={tag}
                  onRemove={() => {
                    setFormData((prev) => ({
                      ...prev,
                      tags: prev.tags.filter((_, idx1) => idx1 != idx),
                    }));
                  }}
                />
              ))}

              {formData.tags.length >= 3 && (
                <Tag
                  className="bg-destructive cursor-pointer"
                  title={"Remove All"}
                  onRemove={() =>
                    setFormData((prev) => ({
                      ...prev,
                      tags: [],
                    }))
                  }
                />
              )}
              <input
                className="bg-transparent outline-0 text-sm"
                type="text"
                name="tag"
                id="tag"
                placeholder="Type tag..."
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div
                className={cn(
                  "bg-background shadow z-50 rounded dark:border absolute mt-1 top-full left-0 w-full  max-h-[200px] overflow-y-auto overflow-x-hidden p-1",
                  tagsNoSelected.length > 0 && tag.length > 0
                    ? "grid"
                    : "hidden"
                )}
              >
                {tagsNoSelected.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setTag("");
                      setFormData((prev) => ({
                        ...prev,
                        tags: [...prev.tags, t.name],
                      }));
                    }}
                    className="flex gap-2 cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-secondary"
                  >
                    <HashIcon className="shrink-0 size-4" />
                    <p>{t.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Publish At</Label>
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Publish as soon as you create a post</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="r3" />
                <Label htmlFor="r3">
                  Choose a date to make your post public.
                </Label>
              </div>
            </RadioGroup>
            <DatePicker
              // disabled={(post && isPast(new Date(post.publishAt))) || isPending}
              // defaultDate={new Date(form.publishAt)}
              onSubmit={(date) => {
                // setForm((prev) => ({
                //   ...prev,
                //   publishAt: date.toISOString(),
                // }));
              }}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="status">Enable</Label>
            <div className="flex items-center justify-between space-y-1.5">
              <p className="text-sm font-light text-card-foreground mt-1">
                Do you want post to be enable?
              </p>
              <Switch
                id="status"
                checked={true}
                // onCheckedChange={(checked) =>
                //   setForm((prev) => ({ ...prev, isActive: checked }))
                // }
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label>Content</Label>
            <Tiptap className="sm:col-span-2" />
          </div>
        </div>
      ) : tab == "metadata" ? (
        <div>metadata</div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          <h3 className="font-bold">Display Mode</h3>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            Choose when you publish and who can see your post
          </p>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold">Save or Publish</h4>
                <p className="text-xs font-normal leading-snug text-muted-foreground">
                  Make your video public, unlisted, or private
                </p>
              </div>

              <div>down</div>
            </div>
          </div>
          <div></div>
        </div>
      )}
      <div className="flex justify-end items-center gap-2 mt-4">
        {tab != "content" && (
          <Button
            variant="secondary"
            onClick={() =>
              setTab(tab == "display-mode" ? "metadata" : "content")
            }
          >
            Back
          </Button>
        )}
        <Button
          onClick={() => {
            if (tab == "content") {
              setTab("metadata");
            }
            if (tab == "metadata") {
              setTab("display-mode");
            }
          }}
        >
          Next/Save/Publish/schedule
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
