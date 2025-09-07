"use server";

import { db } from "@/database/drizzle";
import { booksTable, borrowRecordsTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  const { bookId, userId } = params;

  try {
    const book = await db
      .select()
      .from(booksTable)
      .where(eq(booksTable.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return { success: false, error: "Book is not available for borrowing" };
    }

    const dueDate = dayjs().add(7, "day").toDate().toLocaleString();

    const record = await db.insert(borrowRecordsTable).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    await db
      .update(booksTable)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(booksTable.id, bookId));

    return {
        success: true,
        data: JSON.parse(JSON.stringify(record))
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error occured when fetching data books" };
  }
};
