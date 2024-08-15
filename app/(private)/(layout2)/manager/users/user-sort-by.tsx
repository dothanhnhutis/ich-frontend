"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { UserOrderBy, useUserData } from "@/components/providers/user-provider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SortBy = ({
  title,
  field,
  handleChangeData,
  defaultValue = "all",
}: {
  title: string;
  field: keyof UserOrderBy;
  defaultValue?: "all" | "desc" | "asc";
  handleChangeData: (v: "all" | "desc" | "asc", key: keyof UserOrderBy) => void;
}) => {
  return (
    <>
      <Label className="text-lg">{title}</Label>
      <RadioGroup
        defaultValue={defaultValue}
        onValueChange={(v: "all" | "desc" | "asc") =>
          handleChangeData(v, field)
        }
        className="flex gap-2 items-center justify-between"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id={`${field}-1`} className="size-5" />
          <Label htmlFor={`${field}-1`}>All</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="asc" id={`${field}-2`} className="size-5" />
          <Label htmlFor={`${field}-2`}>Asc</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="desc" id={`${field}-3`} className="size-5" />
          <Label htmlFor={`${field}-3`}>Desc</Label>
        </div>
      </RadioGroup>
    </>
  );
};

export const UserSortBy = ({ init }: { init?: UserOrderBy[] }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<UserOrderBy[] | undefined>(init);
  const { setSortBy, filter } = useUserData();

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    if (!data) {
      setSortBy();
    } else {
      setSortBy({ ...filter, orderBy: data });
    }
    setOpen(false);
  };

  const mergateOrderBy = useMemo(() => {
    return data?.reduce((prev, curr) => {
      const tmp = {
        ...prev,
        ...curr,
      };

      return tmp;
    }, {});
  }, [data]);

  const handleChangeData = (
    v: "all" | "desc" | "asc",
    key: keyof UserOrderBy
  ) => {
    if (v == "all") {
      setData((prev) => {
        if (prev) {
          const tmp = prev.filter((s) => !(key in s));
          return tmp.length > 0 ? tmp : undefined;
        } else {
          return prev;
        }
      });
    } else {
      setData((prev) => {
        if (prev) {
          if (prev.some((s) => key in s)) {
            return prev.map((s) => (key in s ? { [key]: v } : s));
          } else {
            return [...prev, { [key]: v }];
          }
        } else {
          return [{ [key]: v }];
        }
      });
    }
  };

  useEffect(() => {
    if (isOpen) setData(init);
  }, [isOpen, init]);

  return (
    <Popover onOpenChange={setOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <span className="hidden sm:inline">Sort by</span>
          <ArrowUpDownIcon className="size-4 sm:ml-2" />
          {filter?.orderBy && (
            <span className="ml-1">({filter.orderBy.length})</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-[400px] space-y-2" align="end">
        <Label className="text-xl">Sort by</Label>
        <div className="flex flex-col justify-center gap-4">
          <SortBy
            title="Email"
            field="email"
            defaultValue={mergateOrderBy?.email || "all"}
            handleChangeData={handleChangeData}
          />
          <SortBy
            title="Role"
            field="role"
            defaultValue={mergateOrderBy?.role || "all"}
            handleChangeData={handleChangeData}
          />
          <SortBy
            title="Emai verify"
            field="emailVerified"
            defaultValue={mergateOrderBy?.emailVerified || "all"}
            handleChangeData={handleChangeData}
          />
          <Label className="text-lg">Role</Label>
        </div>
        <div className="flex items-center justify-end py-4 gap-2">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
