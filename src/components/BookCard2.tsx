import Link from "next/link";
import React from "react";
import BookCover from "./BookCover";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

function BookCard2({
  id,
  title,
  coverUrl = "",
  coverColor,
  genre,
  rating,
  isLoanedBook,
}: Book) {
  return (
    <div className={cn(isLoanedBook && "xs:w-52 w-full bg-gradient-gray p-6 rounded-lg")}>
      <Link href={`/books/${id}`} className={cn(isLoanedBook && "w-full flex flex-col items-center")}>
        <BookCover coverColor={coverColor} coverImage={coverUrl} />

        <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <p>11 days left</p>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
}

export default BookCard2;
