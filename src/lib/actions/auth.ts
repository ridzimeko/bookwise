"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";
import { workFlowClient } from "../workflow";
import config from "../config";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  // rate limit per IP
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

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
  const { fullName, email, password, universityCard, universityId } = params;

  // rate limit per IP
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

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

    await workFlowClient.trigger({
      url: `${config.env.apiEndpoint}/api/workflow/onboarding`,
      body: {
        email,
        fullName,
      }
    })

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.error(error, "Signup error!");
    return { success: false, error: "Signup error" };
  }
};
