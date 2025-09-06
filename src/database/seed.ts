import dummyBooks from "../../dummybooks.json";
import { uploadHandler } from "../lib/uploadHandler";
import { booksTable } from "./schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv"

config({ path: '.env'})

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle({ client: sql })

const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string
) => {
  try {
    const response = await uploadHandler({
      file: url,
      fileName,
      folder,
    });

    return response.filePath;
  } catch (error: any) {
    console.error("Error uploading image to Imagekit:", error?.message);
  }
};

const seed = async () => {
  console.log("seeding data...");

  try {
    for (const book of dummyBooks) {
      const coverUrl = await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/cover"
      );

      const videoUrl = await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/video-trailer"
      );

      await db.insert(booksTable).values({
        ...book,
        coverUrl: coverUrl!,
        videoUrl: videoUrl!
      });
    }

    console.log("Data seeded successfully");
  } catch (error: any) {
    console.error("Error seeding data:", error?.message);
  }
};

seed()