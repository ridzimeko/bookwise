import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import React from "react";

function Home() {
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList title="Popular Books" books={sampleBooks} />
    </>
  );
}

export default Home;
