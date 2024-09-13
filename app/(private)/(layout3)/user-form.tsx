"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { User } from "@/schemas/user";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { format } from "date-fns";
import { CalendarIcon, GripVerticalIcon, PlusIcon, XIcon } from "lucide-react";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { nanoid } from "nanoid";

const SortUrl = ({
  data,
  handleOnchangeUrls,
  handleRemoveUrls,
}: {
  data: { id: string; url: string };
  handleOnchangeUrls: (id: string, value: string) => void;
  handleRemoveUrls: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 py-2 px-3 border rounded-md h-10 bg-background"
    >
      <GripVerticalIcon
        className="flex-shrink-0 size-4 cursor-grab"
        {...listeners}
        {...attributes}
      />
      <input
        type="text"
        value={data.url}
        onChange={(e) => handleOnchangeUrls(data.id, e.target.value)}
        className="bg-transparent w-full outline-0 text-sm"
      />
      <XIcon
        onClick={() => handleRemoveUrls(data.id)}
        className="flex-shrink-0 size-4 cursor-pointer"
      />
    </div>
  );
};

type UserFormType = {
  firstName: string;
  lastName: string;
  birthDate: Date;
  phone: string;
  bio: string;
  urls: { url: string; id: string }[];
  address: string;
  role: User["role"];
  status: User["status"];
};

const UserForm = (
  props: { type: "create" } | { type: "edit"; data: UserFormType }
) => {
  const [formData, setFormData] = React.useState<UserFormType>({
    firstName: props.type == "edit" ? props.data.firstName : "",
    lastName: props.type == "edit" ? props.data.lastName : "",
    birthDate: props.type == "edit" ? props.data.birthDate : new Date(),
    phone: props.type == "edit" ? props.data.phone : "",
    bio: props.type == "edit" ? props.data.bio : "",
    urls:
      props.type == "edit"
        ? props.data.urls
        : [
            { id: nanoid(), url: "url1" },
            { id: nanoid(), url: "url2" },
          ],
    address: props.type == "edit" ? props.data.address : "",
    role: props.type == "edit" ? props.data.role : "Customer",
    status: props.type == "edit" ? props.data.status : "Active",
  });

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      e.target.name == "address" ||
      e.target.name == "country" ||
      e.target.name == "city" ||
      e.target.name == "region" ||
      e.target.name == "postalCode"
    ) {
      const newAddress = [
        e.target.name == "address"
          ? e.target.value
          : formData.address.split("/")[0],
        e.target.name == "country"
          ? e.target.value
          : formData.address.split("/")[1],
        e.target.name == "city"
          ? e.target.value
          : formData.address.split("/")[2],
        e.target.name == "region"
          ? e.target.value
          : formData.address.split("/")[3],
        e.target.name == "postalCode"
          ? e.target.value
          : formData.address.split("/")[4],
      ];

      setFormData((prev) => ({ ...prev, address: newAddress.join("/") }));
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleOnchangeUrls = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      urls: prev.urls.map((url) => (url.id == id ? { id, url: value } : url)),
    }));
  };

  const handleRemoveUrls = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      urls: prev.urls.filter((url) => url.id !== id),
    }));
  };

  const handleAddUrls = (data: string) => {
    setFormData((prev) => ({
      ...prev,
      urls: [...prev.urls, { id: nanoid(), url: data }],
    }));
  };

  const getUrlPos = (id: UniqueIdentifier) =>
    formData.urls.findIndex((url) => id === url.id);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id === over?.id) return;
    setFormData((prev) => {
      const originalPos = getUrlPos(active.id);
      const newPos = getUrlPos(over!.id);
      return { ...prev, urls: arrayMove(formData.urls, originalPos, newPos) };
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <form>
      <p className="font-bold">Personal Information</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="grid gap-1 col-span-2 sm:col-span-1">
          <Label htmlFor="firstName" className="text-sm text-muted-foreground">
            First name
          </Label>
          <Input
            value={formData.firstName}
            onChange={handleOnchange}
            name="firstName"
            id="firstName"
            placeholder="First name"
          />
        </div>
        <div className="grid gap-1 col-span-2 sm:col-span-1">
          <Label htmlFor="lastName" className="text-sm text-muted-foreground">
            Last name
          </Label>
          <Input
            value={formData.lastName}
            onChange={handleOnchange}
            id="lastName"
            name="lastName"
            placeholder="Last name"
          />
        </div>
        <div className="grid gap-1 col-span-2 sm:col-span-1">
          <Label htmlFor="birthDate" className="text-sm text-muted-foreground">
            Date of birth
          </Label>
          <Popover modal={true}>
            <PopoverTrigger asChild>
              <Button
                id="birthDate"
                variant={"outline"}
                className={cn(
                  "gap-2 justify-between text-left font-normal",
                  !formData.birthDate && "text-muted-foreground"
                )}
              >
                {formData.birthDate ? (
                  format(formData.birthDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.birthDate}
                onSelect={(v) => {
                  setFormData((prev) => ({
                    ...prev,
                    birthDate: v || new Date(),
                  }));
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid gap-1 col-span-2 sm:col-span-1">
          <Label htmlFor="phone" className="text-sm text-muted-foreground">
            Phone number
          </Label>
          <Input
            id="phone"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleOnchange}
          />
        </div>
        <div className="grid gap-1 col-span-2">
          <Label htmlFor="bio" className="text-sm text-muted-foreground">
            Bio
          </Label>
          <Textarea
            value={formData.bio}
            onChange={handleOnchange}
            name="bio"
            id="bio"
            placeholder="Type your message here."
            maxLength={256}
          />
          <div className="flex justify-between">
            <p className="text-xs text-muted-foreground">
              Write a few sentences about yourself.
            </p>
            <p className="text-xs text-muted-foreground">
              {formData.bio.length}/256
            </p>
          </div>
        </div>
        <div className="grid gap-1 col-span-2">
          <Label className="text-sm text-muted-foreground">URLs</Label>
          <p className="text-xs font-normal text-muted-foreground">
            Add links to your website, blog, or social media profiles.
          </p>

          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
          >
            <SortableContext
              items={formData.urls}
              strategy={verticalListSortingStrategy}
            >
              {formData.urls.map((data) => (
                <SortUrl
                  key={data.id}
                  data={data}
                  handleOnchangeUrls={handleOnchangeUrls}
                  handleRemoveUrls={handleRemoveUrls}
                />
              ))}
            </SortableContext>
          </DndContext>
          <div className="flex items-center gap-2 py-2 px-3 border rounded-md h-10 bg-background">
            <input
              type="text"
              className="bg-transparent w-full outline-0 text-sm"
              placeholder="Input url"
            />
            <button
              type="button"
              onClick={() => handleAddUrls("http://localhost:4000")}
            >
              <PlusIcon className="flex-shrink-0 size-5" />
            </button>
          </div>
        </div>
      </div>
      <p className="font-bold mt-4">Personal Location</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="grid gap-1 col-span-2">
          <Label htmlFor="address" className="text-sm text-muted-foreground">
            Address
          </Label>
          <Input
            id="address"
            name="address"
            placeholder="Address"
            value={formData.address.split("/")[0]}
            onChange={handleOnchange}
          />
        </div>
        <div className="grid gap-1 col-span-2 sm:col-span-1">
          <Label htmlFor="region" className="text-sm text-muted-foreground">
            State / Province
          </Label>
          <Input
            id="region"
            name="region"
            placeholder="Soc Trang"
            value={formData.address.split("/")[1]}
            onChange={handleOnchange}
          />
        </div>
        <div className="grid gap-1 col-span-2 sm:col-span-1">
          <Label htmlFor="city" className="text-sm text-muted-foreground">
            City
          </Label>
          <Input
            id="city"
            name="city"
            placeholder="Soc Trang"
            value={formData.address.split("/")[2]}
            onChange={handleOnchange}
          />
        </div>
        <div className="grid gap-1 col-span-2 sm:col-span-1">
          <Label htmlFor="country" className="text-sm text-muted-foreground">
            Country
          </Label>
          <Input
            id="country"
            name="country"
            placeholder="Viet Nam"
            value={formData.address.split("/")[3]}
            onChange={handleOnchange}
          />
        </div>

        <div className="grid gap-1 col-span-2 sm:col-span-1">
          <Label htmlFor="postalCode" className="text-sm text-muted-foreground">
            ZIP / Postal code
          </Label>
          <Input
            id="postalCode"
            name="postalCode"
            placeholder="96000"
            value={formData.address.split("/")[4]}
            onChange={handleOnchange}
          />
        </div>
      </div>
    </form>
  );
};

export default UserForm;
