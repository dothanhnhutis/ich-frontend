import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SwitchTheme } from "@/components/switch-theme";
import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur bg-background/60">
      <nav className="flex justify-between items-center p-2 pr-4 max-w-7xl mx-auto">
        <Logo className="order-2 sm:order-none" />

        <Sheet>
          <SheetTrigger asChild className="sm:hidden order-1">
            <Button variant="ghost">
              <AiOutlineMenu className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px]">
            <SheetHeader>
              <Logo className="order-2 sm:order-none" />
            </SheetHeader>
            <ul className="flex flex-col gap-3 my-4 pb-10">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Post
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </SheetContent>
        </Sheet>

        <div className="hidden sm:flex items-center space-x-6 ml-6 text-sm font-medium">
          <Link
            prefetch={false}
            href="/"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Home
          </Link>

          <Link
            prefetch={false}
            href="/"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Post
          </Link>

          <Link
            prefetch={false}
            href="/contacts"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Contact Us
          </Link>
        </div>
        <div className="flex sm:flex-1 items-center justify-end order-3 sm:order-none">
          <SwitchTheme />
        </div>
      </nav>
    </header>
  );
};
