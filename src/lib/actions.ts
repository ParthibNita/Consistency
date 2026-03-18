"use server";

import { db } from "@/db";
import { logs, habits } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function logHabitEntry(habitId: string, entryValue: number) {
  try {
 
    //if boolean habit pass 1.
    await db.insert(logs).values({
      habitId,
      entryValue,
    });

    //clear cache
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to log habit:", error);
    return { success: false, error: "Failed to log habit" };
  }
}