import React from "react";
import { signOut } from "@/auth";

function LogOutBtn() {
  async function logoutHandler() {
    "use server";
    await signOut();
  }

  return (
    <form action={logoutHandler}>
      <button type="submit">Sign Out</button>
    </form>
  );
}

export default LogOutBtn;
