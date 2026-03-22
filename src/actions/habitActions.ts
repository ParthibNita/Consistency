"use server";

import { db } from "@/db"; 
import { logs, habits } from "@/db/schema";
import { revalidatePath } from "next/cache";

const DUMMY_USER_ID = "dev-parthib-123";

export async function logHabitActivity(habitId: string, entryValue: number) {
  try {
    await db.insert(logs).values({
      habitId,
      entryValue,
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to log habit:", error);
    return { success: false, error: "Database insertion failed" };
  }
}

export async function createHabit(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const type = formData.get("type") as "numeric" | "boolean";
    const targetValue = parseInt(formData.get("targetValue") as string) || 1;

    if (!name || name.trim() === "") {
      return { success: false, error: "Habit name is required" };
    }

    await db.insert(habits).values({
      userId: DUMMY_USER_ID,
      name: name,
      type: type,
      targetValue: type === "numeric" ? targetValue : 1,
      currentLevel: 1,
      isMastered: false,
    });

    revalidatePath("/habits");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Failed to create habit:", error);
    return { success: false, error: "Database insertion failed" };
  }
}