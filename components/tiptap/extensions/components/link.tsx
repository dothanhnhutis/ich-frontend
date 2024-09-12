import React from "react";
import { NodeViewWrapper, NodeViewProps, NodeViewContent } from "@tiptap/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const LinkNodeViewComponent = (props: NodeViewProps) => {
  console.log(props);
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <NodeViewWrapper as={"span"}>
      <NodeViewContent />
    </NodeViewWrapper>
    // <Popover open={open}>
    //   <PopoverTrigger asChild>
    //     <NodeViewWrapper as={"span"}>
    //       <NodeViewContent />
    //     </NodeViewWrapper>
    //   </PopoverTrigger>
    //   <PopoverContent>123</PopoverContent>
    // </Popover>
  );
};

export default LinkNodeViewComponent;
