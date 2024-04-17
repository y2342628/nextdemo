"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useMemo } from "react";

export default function customNav() {
  const pathname = usePathname();

  const navs = useMemo(() => {
    return [
      { href: "/", label: "home" },
      { href: "/client-render", label: "client-render" },
      { href: "/server-render", label: "server-render" },
      // { href: "/static-generation", label: "static-generation" },
    ].map((i) => ({
      ...i,
      active: pathname === i.href,
    }));
  }, [pathname]);

  return (
    <header className="flex  text-white text-2xl space-x-4 p-4 rounded-lg bg-sky-900 ">
   
      {navs.map((nav) => {
        return (
          <div key={nav.href} className={`hover:bg-sky-700 p-2 rounded ${nav.active?'bg-sky-700':''}`}>
            <Link href={nav.href}>{nav.label}</Link>
          </div>
        );
      })}
    </header>
  );
}
