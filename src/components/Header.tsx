import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import { signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function Header({ session }: { session: Session | null }) {
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
                <DropdownMenuItem asChild className="dropdown-menu-item">
                    <Link href="/my-profile" className="flex flex-row items-center gap-2 cursor-pointer">
                    <User />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="dropdown-menu-item">
                  <form action={logoutHandler}>
                    <button type="submit" className="flex flex-row items-center gap-2 text-red-600">
                      <LogOut />
                      Sign Out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div>
              <Button asChild className="form-btn px-6">
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
