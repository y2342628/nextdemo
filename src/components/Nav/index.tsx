"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Nav, Navbar } from "react-bootstrap";

import { useMemo } from "react";
import style from "./index.module.scss";
import classNames from "classnames";

export default function customNav() {
  const pathname = usePathname();

  const navs = useMemo(() => {
    return [
      { href: "/", label: "HOME" },
      { href: "/todo", label: "TODO" },
    ].map((i) => ({
      ...i,
      active: pathname === i.href,
    }));
  }, [pathname]);

  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark" className="p-3 fs-3">
        <Navbar.Brand href="/" >
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={150}
            height={37}
            priority
          />
        </Navbar.Brand>
        {navs.map((nav) => {
          return (
            <Nav key={nav.href} className={classNames("mx-2", style.navItem)}>
              <Link href={nav.href}>{nav.label}</Link>
            </Nav>
          );
        })}
      </Navbar>
    </header>
  );
}
