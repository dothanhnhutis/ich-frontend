import React from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import Image from "next/image";
const ImageNodeViewComponent = ({ node, updateAttributes }: NodeViewProps) => {
  return (
    <NodeViewWrapper>
      <Image
        src={node.attrs.src}
        alt="asd"
        width="200"
        height="200"
        className="w-auto"
        priority={true}
      />
    </NodeViewWrapper>
  );
};

export default ImageNodeViewComponent;
