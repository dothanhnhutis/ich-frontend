import Tiptap from "@/components/tiptap/tiptap";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import configs from "@/config";
import { ShuffleIcon, TagsIcon } from "lucide-react";
import React from "react";

type PostData = {};

type PostFormType =
  | { type: "create" }
  | {
      type: "edit";
      data: PostData;
    };
const PostForm = (props: PostFormType) => {
  return (
    <form>
      <div className="grid grid-cols-1 sm:grid-cols-[minmax(350px,.75fr)_1fr] gap-4">
        <div>1</div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title" className="text-sm text-muted-foreground">
              Title
            </Label>
            <Input
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
              id="slug"
              name="slug"
              className="focus-visible:ring-transparent "
              placeholder="Slug"
            />
            <p className="text-xs text-muted-foreground">
              http://localhost:4000/baiviet/slug
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="slug" className="text-sm text-muted-foreground">
              Tag
            </Label>
            <div>
              <TagsIcon className="flex-shrink-0 size-5" />
              <div className="inline-flex items-center gap-0.5 bg-secondary p-1 rounded-tr-lg rounded-br-lg">
                <p className="text-xs">Làm đẹp</p>
              </div>
            </div>

            <Input
              id="slug"
              name="slug"
              className="focus-visible:ring-transparent "
              placeholder="Slug"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="status">Active</Label>
            <div className="flex items-center justify-between space-y-1.5">
              <p className="text-sm font-light text-card-foreground mt-1">
                Do you want blog to be public?
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="slug" className="text-sm text-muted-foreground">
              Category
            </Label>
            <Input
              id="slug"
              name="slug"
              className="focus-visible:ring-transparent "
              placeholder="Category"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="slug" className="text-sm text-muted-foreground">
              Author
            </Label>
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
        </div>
        <Tiptap className="sm:col-span-2" />
      </div>
    </form>
  );
};

export default PostForm;
