import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { baseOpenGraph } from "./shared-metadata";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TankStackProvider } from "@/components/providers/TankStackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Công ty TNHH MTV TM Sản Xuất I.C.H",
    template: "%s | Công ty TNHH MTV TM Sản Xuất I.C.H",
  },
  description: "Công ty TNHH MTV TM Sản Xuất I.C.H",
  openGraph: baseOpenGraph,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <TankStackProvider>
            {children}
            <Toaster visibleToasts={5} richColors />
          </TankStackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
