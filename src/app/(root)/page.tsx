import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import React from "react";

async function Home() {
  const result = await db.select().from(usersTable);
  console.log(JSON.stringify(result, null, 2));
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList title="Popular Books" books={sampleBooks} containerClassname="mt-16" />
    </>
  );
}

export default Home;
