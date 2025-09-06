import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { booksTable, usersTable } from "@/database/schema";
import { desc } from "drizzle-orm";
import React from "react";

async function Home() {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(booksTable)
    .limit(10)
    .orderBy(desc(booksTable.createdAt))) as Book[];
  const result = await db.select().from(usersTable);
  console.log(JSON.stringify(result, null, 2));
  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />
      <BookList
        title="Popular Books"
        books={latestBooks.slice(1)}
        containerClassname="mt-16"
      />
    </>
  );
}

export default Home;
