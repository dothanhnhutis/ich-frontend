import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export async function awaitCustom(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getImageInfo = (
  file: File
): Promise<{
  width: number;
  height: number;
  aspectRatio: number;
  base64: string;
}> => {
  return new Promise((resolve, reject) => {
    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      reject("Please upload a valid image file (.png|.jpeg|.jpg).");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const data = {
          width: img.width,
          height: img.height,
          aspectRatio: img.width / img.height,
          base64: (e.target?.result as string) || "",
        };
        resolve(data);
      };
      img.onerror = () => {
        reject("There was some problem with the image.");
      };
      img.src = (e.target?.result as string) || "";
    };
    reader.onerror = () => {
      reject("There was some problem with the image.");
    };
  });
};
