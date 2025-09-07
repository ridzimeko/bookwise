import dummyBooks from "../../dummybooks.json";
import { booksTable } from "./schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {config} from "dotenv"
import ImageKit from "imagekit";

config({ path: '.env' })

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

var imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string
) => {  
  try {
    const response = await imagekit.upload({
      file: url,
      fileName,
      folder,
      overwriteFile: true,
      checks: `"file.size" < "20mb"`,
    });

    return response.filePath;
  } catch (error: any) {
    console.error("Error uploading image to Imagekit:", error?.message);
  }
};

const seed = async () => {
  console.log("seeding data...");
  let UPLOAD_FILE_COUNT = 0;

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

      UPLOAD_FILE_COUNT++;
      await db.insert(booksTable).values({
        ...book,
        coverUrl: coverUrl!,
        videoUrl: videoUrl!,
      });
    }

    console.log(`uploaded ${UPLOAD_FILE_COUNT} book assets`)
    console.log("Data seeded successfully!");
  } catch (error: any) {
    console.error("Error seeding data:", error?.message);
  }
};

seed();
