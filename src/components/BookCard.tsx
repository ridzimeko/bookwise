import Link from "next/link";
import React from "react";
import BookCover from "./BookCover";

function BookCard({
  id,
  title,
  author,
  coverUrl = "",
  coverColor,
  genre,
  rating,
  isLoanedBook,
}: Book) {
  return (
    <li>
      <Link href={`/books/${id}`}>
        <BookCover coverColor={coverColor} coverImage={coverUrl} />
      </Link>
    </li>
  );
}

export default BookCard;
