import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({
  children,
  page1,
  page2,
}: Readonly<{
  children: React.ReactNode;
  page1: React.ReactNode;
  page2: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div>{children}</div>
        <div>{page1}</div>
        <div>{page2}</div>
        </body>
    </html>
  );
}


