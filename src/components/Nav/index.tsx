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
        href: "https://main.d1xwonrohwbh5u.amplifyapp.com?comp=orion",
        label: "Group Portal",
        type: "link",
      },
    ].map((i) => ({
      ...i,
      active: pathname === i.href,
    }));
  }, [pathname]);

  return (
    <header className="customHeader d-flex">
      <Navbar className="p-3 fs-3 flex-fill">
        <Navbar.Brand href="/">
          <Image src="/logo.png" alt="Logo" width={250} height={74} priority />
        </Navbar.Brand>
        {navs.map((nav) => {
          return (
            <Nav
              key={nav.href}
              className={classNames("mx-4", style.navItem, {
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
      <div className="d-flex align-items-center me-5 ">
        <Image src="/tel.png" alt="Logo" width={31} height={40} priority />
        <div style={{
          maxWidth:200,
          marginLeft:8,
          fontSize:16,
          fontWeight:600
        }}>
          <div
            style={{
              color: "#f2d13e",
              textTransform: "uppercase",
            }}
          >
            YOUR FIRST VISIT? CALL FOR INFO
          </div>
          <div>(800) 808 6579</div>
        </div>
      </div>
    </header>
  );
}
