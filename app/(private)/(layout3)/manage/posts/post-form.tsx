import React from "react";

type PostData = {};

type PostFormType =
  | { type: "create" }
  | {
      type: "edit";
      data: PostData;
    };
const PostForm = (props: PostFormType) => {
  return <div>PostForm</div>;
};

export default PostForm;
