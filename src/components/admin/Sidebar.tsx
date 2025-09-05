"use client";

import { adminSideBarLinks } from "@/constants";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Session } from "next-auth";

function Sidebar({ session }: { session: Session }) {
  const pathname = usePathname();

  return (
    <div className="admin-sidebar">
      <div className="logo">
        <Image src="/logo.svg" alt="BookWise logo" width={40} height={40} />
        <h1>BookWise</h1>
      </div>

      <div className="mt-10 flex flex-col gap-5">
        {adminSideBarLinks.map((link) => {
          const SidebarIcon = link.img;
          const isSelected =
            link.route !== "/admin" &&
            pathname.includes(link.route) &&
            link.route.length > 1;

          return (
            <Link href={link.route} key={link.route}>
              <div
                className={cn(
                  "link",
                  isSelected && "bg-primary-admin shadow-sm"
                )}
              >
                <div className="relative size-5">
                  <SidebarIcon
                    aria-hidden="true"
                    className={cn(
                      "object-contain",
                      isSelected ? "brightness-0 invert" : ""
                    )}
                  />
                </div>

                <p className={cn(isSelected ? "text-white" : "text-black")}>
                  {link.text}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="user">
        <Avatar>
          <AvatarFallback className="bg-amber-100">
            {getInitials(session?.user?.name || "ID")}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-dark-200">{session.user?.name}</p>
          <p className="text-xs text-light-500">{session.user?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
