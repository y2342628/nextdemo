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
      { href: "/", label: "Browse Tours" },
      {
        href: "https://main.d1xwonrohwbh5u.amplifyapp.com?comp=duv",
        label: "Group Portal",
        type: "link",
      },
    ].map((i) => ({
      ...i,
      active: pathname === i.href,
    }));
  }, [pathname]);

  return (
    <header>
      <div
        style={{
          background: "rgba(var(--bs-dark-rgb))",
          color: "#fff",
          fontSize: 13,
        }}
        className="d-flex justify-content-end py-2 pe-4"
      >
        <span className="custom-link">+1 888 396 5383</span>
        <span className="mx-5 custom-link">Request a Brochure</span>
        <span className="custom-link">Find a Tour</span>
      </div>
      <div d-flex>
        
      </div>
      <Navbar bg="dark" data-bs-theme="dark" className="p-3 fs-3">
        <Navbar.Brand href="/">
          <Image src="/logo.png" alt="Logo" width={160} height={32} priority />
        </Navbar.Brand>
        {navs.map((nav) => {
          return (
            <Nav
              key={nav.href}
              className={classNames("mx-2", style.navItem, {
                [style.active]: nav.active,
              })}
            >
              <Link
                href={nav.href}
                target={nav.type === "link" ? "_blank" : "_self"}
              >
                {nav.label}
              </Link>
            </Nav>
          );
        })}
      </Navbar>
    </header>
  );
}
