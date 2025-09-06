import { cn } from "@/lib/utils";
import React from "react";
import BookCoverSvg from "./BookCoverSvg";
import { Image } from "@imagekit/next";
import config from "@/lib/config";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

function BookCover({
  className,
  variant = "regular",
  coverColor = "#012B4B",
  coverImage,
}: Props) {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10"
        style={{ left: "12%", top: "0", width: "87.5%", height: "88%" }}
      >
        {coverImage ? (
          <Image
            urlEndpoint={config.env.imagekit.urlEndpoint}
            src={coverImage}
            alt="Book cover"
            fill
            className="rounded-sm object-fill"
          />
        ) : (
          <div className="bg-neutral-600"></div>
        )}
      </div>
    </div>
  );
}

export default BookCover;
