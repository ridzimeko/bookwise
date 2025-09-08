"use server";

import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";

interface AccountStatusParams {
  userId: string;
  status: "APPROVED" | "REJECTED";
}

export const UpdateAccountStatus = async ({
  userId,
  status,
}: AccountStatusParams) => {
  try {
    const existingMember = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    if (existingMember.length < 1) {
      return {
        success: false,
        error: "Can't approve account because account not found",
      };
    }

    const updatedMember = await db.update(usersTable).set({
      status,
    });

    return {
      success: true,
      message: "Member status updated!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error occured when updating member status",
    };
  }
};
