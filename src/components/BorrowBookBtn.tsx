"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Book } from "lucide-react";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/books";
import { useRouter } from "next/navigation";

interface Props {
  bookId: string;
  userId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

function BorrowBookBtn({
  bookId,
  userId,
  borrowingEligibility: { isEligible, message },
}: Props) {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrow = async () => {
    if (!isEligible) {
      toast.error(message);
      return
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ userId, bookId });

      if (result.success) {
        toast.success("Book borrowed successfully");
      }

      router.push("/my-profile");
    } catch (error) {
      toast.error("An error occured while borrowing the book");
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      onClick={handleBorrow}
      disabled={borrowing}
      className="book-overview_btn"
    >
      <Book width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        { borrowing ? 'Borrowing...' : 'Borrow Book'}
      </p>
    </Button>
  );
}

export default BorrowBookBtn;
