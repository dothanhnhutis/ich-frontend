import React from "react";
import PostForm from "../post-form";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

const CreatePostPage = () => {
  return (
    <>
      <Link
        href="/manage/users?tab=active"
        className="gap-1 hover:bg-secondary inline-flex py-1 px-2 items-center justify-center rounded"
      >
        <ChevronLeftIcon className="size-4" />
        <p className="text-xs font-light">Back</p>
      </Link>
      <h2 className="lg:text-3xl font-bold text-2xl mb-3">Create New Post</h2>
      <PostForm type="create" />
    </>
  );
};

export default CreatePostPage;
