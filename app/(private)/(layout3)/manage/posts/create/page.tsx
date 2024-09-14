import React from "react";
import PostForm from "../post-form";

const CreatePostPage = () => {
  return (
    <div>
      <h3>Create new post</h3>
      <PostForm type="create" />
    </div>
  );
};

export default CreatePostPage;
