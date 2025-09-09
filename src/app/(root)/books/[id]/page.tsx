import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import { db } from "@/database/drizzle";
import { booksTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const session = await auth();

  const [bookDetails] = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.id, id))
    .limit(1);

  if (!bookDetails) redirect("/404");
  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id ?? ""} />

      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex-[1.5] flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Page;
