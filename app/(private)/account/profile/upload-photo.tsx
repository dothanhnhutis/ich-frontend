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
import AvatarDefault from "@/images/avatars/user-1.jpg";
import { useEffect, useRef, useState } from "react";
import { RotateCcwIcon, ZoomInIcon } from "lucide-react";
import { cn, getImageInfo } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { editPicture } from "../actions";
import { useAuthContext } from "@/components/providers/auth-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const UploadPhoto = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuthContext();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState<boolean>(false);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [zoomSlider, setZoomSlider] = useState<number>(0.2);
  const [dataUrl, setDataUrl] = useState<string | undefined>(
    currentUser?.picture || undefined
  );

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      toast.info("Please upload an image!");
      return;
    }
    const img = await getImageInfo(file);
    setDataUrl(img.base64);
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

  useEffect(() => {
    setZoomSlider(0.2);
    setDataUrl(currentUser?.picture || undefined);
  }, [open]);

  const { isPending, mutate } = useMutation({
    mutationFn: async (input: string) =>
      await editPicture({
        type: "base64",
        data: input,
      }),
    onSuccess: ({ success }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: ["me"] });
        toast.success("Update avatar success");
        setOpen(false);
      } else {
        toast.error("Update avatar fail");
      }
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cropper = cropperRef.current?.cropper;
    if (cropper) mutate(cropper.getCroppedCanvas().toDataURL());
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="lg:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit avatar</DialogTitle>
        </DialogHeader>
        <ScrollArea>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-3"
          >
            <Cropper
              className="cropper-photo bg-background h-[250px]"
              aspectRatio={1}
              ref={cropperRef}
              dragMode="move"
              cropBoxMovable={false}
              viewMode={1}
              src={dataUrl || AvatarDefault.src}
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
              <Label
                htmlFor="upload-photo"
                className={cn(
                  "w-full text-center cursor-pointer hover:underline text-primary",
                  isPending ? "opacity-50" : ""
                )}
              >
                Change image
              </Label>
              <input
                disabled={isPending}
                onChange={handleUpload}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                id="upload-photo"
              />
              <Button disabled={isPending} className="rounded-full w-full">
                {isPending && (
                  <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0" />
                )}
                Save photo
              </Button>
            </div>
          </form>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
