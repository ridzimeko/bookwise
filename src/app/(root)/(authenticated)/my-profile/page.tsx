import { auth } from "@/auth";
import BookCard2 from "@/components/BookCard2";
import LoadImageKit from "@/components/LoadImageKit";
import UserAvatar from "@/components/UserAvatar";
import { db } from "@/database/drizzle";
import { borrowRecordsTable, usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { BadgeQuestionMark, Book, Verified } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const session = await auth();

  if (!session) redirect("/sign-in");

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, session?.user?.id ?? ""))
    .limit(1);

  const borrowedBooks = await db
    .select()
    .from(borrowRecordsTable)
    .where(eq(borrowRecordsTable.userId, user.id));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <section>
        <article className="gradient-vertical w-full max-w-[520px] px-12 py-20  rounded-md relative">
          <Image
            src="/bookmarkFrame.svg"
            alt="Bookmark Frame"
            width={60}
            height={69}
            className="absolute -top-6 inset-x-0 mx-auto"
          />
          <header className="flex items-center gap-4">
            <UserAvatar name={user.fullName ?? ""} className="size-20" />
            <div>
              <div>
                <p className="flex items-center gap-2 text-sm text-light-300">
                  {user.status === "APPROVED" ? (
                    <>
                      <Verified className="size-4" />
                      <span>Verified Student</span>
                    </>
                  ) : (
                    <>
                      <BadgeQuestionMark className="size-4" />
                      <span>Unverified Student</span>
                    </>
                  )}
                </p>
              </div>
              <p className="text-lg font-semibold">{user.fullName}</p>
              <p className="text-sm text-light-300">{user.email}</p>
            </div>
          </header>

          <div className="mt-10">
            <p className="text-lg font-semibold">University</p>
            <p className="text-2xl font-bold text-light-300">BookWise University</p>
          </div>

          <div className="mt-10">
            <p className="text-lg font-semibold">Student ID</p>
            <p className="text-2xl font-bold text-light-300">{user.universityId}</p>
          </div>

          <div className="mt-10">
            {user.universityCard && (
              <LoadImageKit
                url={user.universityCard}
                type="image"
                alt="University Card"
                width={400}
                height={300}
              />
            )}
          </div>
        </article>
      </section>

      <section className="w-full">
        <h2 className="text-4xl font-semibold">Borrowed Books</h2>
        <div className="mt-6">
          {borrowedBooks.length >= 1 ? (
            <div className="flex flex-row gap-16 flex-wrap">
              {borrowedBooks.map((book) => (
                <BookCard2 key={book.id} {...book} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-light-300">
              You have not borrowed any books yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Page;
