import z from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University card is required"),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(2).max(100),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  rating: z.coerce.number().int().min(1).max(5),
  totalCopies: z.coerce.number().positive().lte(10000),
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-Fa-f]{6}/, { error: "Please choose the primary color" }),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10),
});
