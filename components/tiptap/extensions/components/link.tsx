import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
const LinkNodeViewComponent = (props: NodeViewProps) => {
  console.log(props);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <NodeViewWrapper as={"span"}>open</NodeViewWrapper>
      </PopoverTrigger>
      <PopoverContent>123</PopoverContent>
    </Popover>
  );
};

export default LinkNodeViewComponent;
