"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.error(error, "Sign in error!");
    return { success: false, error: "Sign in error" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, universityCard, universityId } = params;

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  try {
    const hashedPassword = await hash(params.password, 10);
    const newUser = await db.insert(usersTable).values({
      fullName,
      email,
      universityCard,
      universityId,
      password: hashedPassword,
    });

    return { success: true };
  } catch (error) {
    console.error(error, "Signup error!");
    return { success: false, error: "Signup error" };
  }
};
