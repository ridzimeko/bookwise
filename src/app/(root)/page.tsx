import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { booksTable } from "@/database/schema";
import { desc } from "drizzle-orm";
import React from "react";

async function Home() {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(booksTable)
    .limit(10)
    .orderBy(desc(booksTable.createdAt))) as Book[];
  
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
