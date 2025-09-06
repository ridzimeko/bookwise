import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import "@/styles/admin.css";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";

async function layout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  // check admin role from db
  const isAdmin = await db
    .select({ isAdmin: usersTable.role })
    .from(usersTable)
    .where(eq(usersTable.id, session.user.id))
    .limit(1)
    .then((res) => res[0].isAdmin === "ADMIN");

  if (!isAdmin) redirect("/");
  
  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />

      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
}

export default layout;
