import React from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  AlignHorizontalDistributeCenterIcon,
  AlignHorizontalDistributeEndIcon,
  AlignHorizontalDistributeStartIcon,
  EditIcon,
  ImageIcon,
  XIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
const ImageNodeViewComponent = ({
  node,
  updateAttributes,
  deleteNode,
}: NodeViewProps) => {
  const handleUploadFile = (images: string[]) => {
    updateAttributes({
      src: images[0],
    });
  };

  const handleAlignment = (alignment: "center" | "left" | "right") => {
    updateAttributes({
      alignment,
    });
  };

  const handleWidth = (percent: number) => {
    updateAttributes({
      width: percent,
    });
  };

  return (
    <NodeViewWrapper>
      <div
        className={cn(
          node.attrs.alignment == "center"
            ? "mx-auto"
            : node.attrs.alignment == "left"
            ? "mr-auto"
            : "ml-auto",
          node.attrs.width == 100
            ? "w-full"
            : node.attrs.width == 75
            ? "w-3/4"
            : node.attrs.width == 50
            ? "w-1/2"
            : "w-1/4"
        )}
      >
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex flex-col items-center justify-center bg-secondary">
              <Image
                draggable="true"
                data-drag-handle
                contentEditable="false"
                className="aspect-[3/2] object-cover block h-auto w-full max-w-full"
                src={node.attrs.src}
                alt={node.attrs.alt}
                width={600}
                height={400}
              />
              <p>{node.attrs.alt}</p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto flex items-center justify-center gap-2 p-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleAlignment("left")}
            >
              <AlignHorizontalDistributeStartIcon className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleAlignment("center")}
            >
              <AlignHorizontalDistributeCenterIcon className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleAlignment("right")}
            >
              <AlignHorizontalDistributeEndIcon className="size-5" />
            </Button>
            <Separator orientation="vertical" className="h-5" />
            <input
              onChange={(e) => {
                handleWidth(parseInt(e.target.value));
              }}
              value={node.attrs.width}
              type="range"
              step={25}
              min={25}
              max={100}
            />
            <span>{node.attrs.width}%</span>
            <Separator orientation="vertical" className="h-5" />
            <Button size="icon" variant="ghost">
              <EditIcon className="size-5" />
            </Button>
            <Button size="icon" variant="ghost" onClick={deleteNode}>
              <XIcon className="size-5" />
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </NodeViewWrapper>
  );
};

export default ImageNodeViewComponent;
