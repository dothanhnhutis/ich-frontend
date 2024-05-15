import React from "react";
import Link from "next/link";
import Image from "next/image";

import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/lib/utils";
import LogoImg from "@/images/logos/logo.png";
export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" prefetch={false}>
      <div className={cn("flex items-center size-14", className)}>
        <AspectRatio ratio={1 / 1} className="flex items-center justify-center">
          <Image
            priority
            src={LogoImg.src}
            width={LogoImg.width}
            height={LogoImg.height}
            alt="logo"
            title="logo-ich"
          />
        </AspectRatio>
      </div>
    </Link>
  );
};
