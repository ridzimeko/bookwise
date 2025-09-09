import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserAvatar from "./UserAvatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import { signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function Header({ session }: { session: Session }) {
  async function logoutHandler() {
    "use server";
    await signOut();
  }

  return (
    <header className="flex justify-between gap-5 my-10">
      <Link href="/" className="flex flex-row items-center gap-8">
        <Image src="/logo.svg" width={40} height={40} alt="BookWise logo" />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        {/* <li>
          <Link href="/" className="text-base cursor-pointer capitalize">
            Home
          </Link>
        </li>
        <li>
          <Link href="/search">Search</Link>
        </li> */}
        <li>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <UserAvatar name={session.user?.name || ""} />
                  <p className="text-base ml-2 overflow-clip text-ellipsis">
                    {session.user?.name}
                  </p>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36 py-2 bg-dark-500 border-none">
                <DropdownMenuItem asChild className="text-base px-4 py-2 hover:bg-light-100/50">
                    <Link href="my-profile" className="flex flex-row items-center gap-2 cursor-pointer">
                    <User />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-base px-4 py-2 hover:bg-light-100/50">
                  <form action={logoutHandler}>
                    <button type="submit" className="flex flex-row items-center gap-2">
                      <LogOut />
                      Sign Out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div>
              <Button asChild>
                <Link href="/sign-in">Login</Link>
              </Button>
            </div>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
