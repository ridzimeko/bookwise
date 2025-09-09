import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function layout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return <>{children}</>;
}

export default layout;
