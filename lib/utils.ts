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

export function caculatorPagination({
  totalPage,
  currentPage,
  centerItem = 1,
  firstLastItem = 5,
}: {
  totalPage: number;
  currentPage: number;
  centerItem?: number;
  firstLastItem?: number;
}) {
  if (totalPage < 1) totalPage = 1;
  if (currentPage > totalPage || currentPage <= 0) currentPage = 1;
  if (firstLastItem + (centerItem * 2 + 1) >= totalPage) {
    return Array.from({ length: totalPage }, (_, ix) => ix + 1);
  }
  const firstList: number[] = Array.from(
    { length: firstLastItem },
    (_, ix) => ix + 1
  ).filter((v) => v >= 1 && v <= totalPage);
  const lastList: number[] = Array.from(
    { length: firstLastItem },
    (_, ix) => totalPage - firstLastItem + ix + 1
  ).filter((v) => v >= 1 && v <= totalPage);
  const centerList: number[] = Array.from(
    { length: centerItem * 2 + 1 },
    (_, ix) => currentPage - Math.floor((centerItem * 2 + 1) / 2) + ix
  ).filter((v) => v >= 1 && v <= totalPage);
  console.log(firstList, centerList, lastList);
  let result: number[] = [];
  if (firstList.includes(currentPage)) {
    result = [...firstList, ...centerList, -1, totalPage];
  } else if (lastList.includes(currentPage)) {
    result = [1, -1, ...centerList, ...lastList];
  } else {
    result = [1, -1, ...centerList, -1, totalPage];
  }
  return result.filter((v, ix, arr) => v == -1 || arr.indexOf(v) === ix);
}
