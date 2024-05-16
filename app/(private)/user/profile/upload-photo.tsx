"use client";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { useRef, useState } from "react";
import { RotateCcwIcon, ZoomInIcon } from "lucide-react";
import { getDataFile } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const UploadPhoto = ({ url }: { url: string | undefined }) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [zoomSlider, setZoomSlider] = useState<number>(0.2);
  const [dataUrl, setDataUrl] = useState<string | undefined>(url);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      toast.info("Please upload an image!");
      return;
    }
    const url = await getDataFile(file);
    setDataUrl(url);
    e.target.value = "";
    setZoomSlider(0.2);
  };

  const handleZoom = (zoom: number) => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const containerData = cropper.getContainerData();
      cropper.zoomTo(zoom, {
        x: containerData.width / 2,
        y: containerData.height / 2,
      });
    }
  };

  const handleRotate = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.rotate(90);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Avatar className="size-40 cursor-pointer">
          <AvatarImage src={dataUrl || AvatarDefault.src} />
          <AvatarFallback className="bg-transparent">
            <Skeleton className="size-40 rounded-full" />
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit photo</DialogTitle>
        </DialogHeader>
        <ScrollArea>
          <div className="flex flex-col items-center justify-center gap-3">
            <Cropper
              className="cropper-photo bg-background h-[250px]"
              aspectRatio={1}
              ref={cropperRef}
              dragMode="move"
              cropBoxMovable={false}
              viewMode={1}
              src={dataUrl}
              cropBoxResizable={false}
              center={false}
              zoomOnWheel={false}
              background={false}
              checkOrientation={true}
              guides={false}
              toggleDragModeOnDblclick={false}
            />

            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <ZoomInIcon className="size-4" />
                <p className="text-sm">Zoom</p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <Slider
                  className="w-[100px]"
                  defaultValue={[zoomSlider]}
                  min={0}
                  max={1}
                  step={0.1}
                  value={[zoomSlider]}
                  onValueChange={(value) => {
                    handleZoom(value[0]);
                    setZoomSlider(value[0]);
                  }}
                />
              </div>
              <div
                onClick={handleRotate}
                className="flex items-center justify-center gap-2 text-primary cursor-pointer"
              >
                <RotateCcwIcon className="size-4" />
                <p className="text-sm font-bold">Rotate</p>
              </div>
            </div>

            <p className="max-w-[500px] text-center text-sm font-semibold">
              Must be an actual photo of you. Logos, clip-art, group photos, and
              digitally-altered images are not allowed.
            </p>

            <div className="flex items-center w-full gap-2">
              <Button variant="link" className="rounded-full w-full" asChild>
                <Label htmlFor="upload-photo">Change image</Label>
              </Button>
              <input
                onChange={handleUpload}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                id="upload-photo"
              />
              <Button className="rounded-full w-full">Save photo</Button>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
