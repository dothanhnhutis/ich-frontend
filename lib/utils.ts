import { type ClassValue, clsx } from "clsx";
import { RgbaColor } from "react-colorful";
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

export function convertHexToRGBA(hex: string) {
  let hex1 = hex.replace(/^#/, "");
  if (hex1.length === 3) {
    hex1 += "f";
  }
  if (hex1.length === 4) {
    hex1 = hex1
      .split("")
      .map((h) => `${h}${h}`)
      .join("");
  }

  if (hex1.length === 6) {
    hex1 += "ff";
  }
  if (hex1.length !== 8) {
    throw new Error("Invalid hex color format. Must be 6 or 8 characters.");
  }
  // Extract the red, green, blue, and alpha components
  const r = parseInt(hex1.slice(0, 2), 16);
  const g = parseInt(hex1.slice(2, 4), 16);
  const b = parseInt(hex1.slice(4, 6), 16);
  const a = parseFloat((parseInt(hex1.slice(6, 8), 16) / 255).toFixed(2)); // Convert alpha from 0–255 to 0–1

  return {
    r,
    g,
    b,
    a,
  };
}

export function convertRGBAToHex(color: RgbaColor) {
  const toHex = (value: number) => {
    const hex = Math.round(value).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const red = toHex(color.r);
  const green = toHex(color.g);
  const blue = toHex(color.b);
  const alpha = toHex(color.a * 255);

  return `#${red}${green}${blue}${alpha}`;
}

export const getAspectRatio = (url: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const img: HTMLImageElement = document.createElement("img");
    img.src = url;
    img.onload = function (event) {
      resolve(img.width / img.height);
    };
    img.onerror = () => {
      reject("There was some problem with the image.");
    };
  });
};

export const getData = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = () => {
      reject("There was some problem with the image.");
    };
  });
};
