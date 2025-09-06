import React from "react";
import BookCard from "./BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassname?: string;
}

function BookList({ title, books, containerClassname }: Props) {
  if (books.length < 2) return;
  return (
    <section className={containerClassname}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </ul>
    </section>
  );
}

export default BookList;
