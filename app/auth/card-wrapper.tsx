import { ReactNode } from "react";
import Social from "./social";

import { BackButton } from "./back-button";
import Link from "next/link";
import Image from "next/image";
interface CardWrapperProps {
  children?: ReactNode;
  headerLaybel: string;
  headerDescription?: string;
  backButtonLaybel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
}
export const CardWrapper = ({
  children,
  headerLaybel,
  headerDescription,
  backButtonHref,
  backButtonLaybel,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center space-y-4 w-[400px] px-2">
      <Link href="/" prefetch={false} className="lg:hidden">
        <Image priority src="/logo.png" width={110} height={110} alt="logo" />
      </Link>
      <div className="flex flex-col space-y-2 text-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight mb-4">
            {headerLaybel}
          </h1>
          {headerDescription && (
            <p className="text-sm text-muted-foreground">{headerDescription}</p>
          )}
        </div>
      </div>
      {children}
      {showSocial && <Social />}
      {backButtonLaybel && backButtonHref && (
        <BackButton href={backButtonHref} label={backButtonLaybel} />
      )}
    </div>
  );
};
