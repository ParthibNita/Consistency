import { db } from "@/db";
import { habits, logs } from "@/db/schema";
import { eq, inArray, desc } from "drizzle-orm";

export async function getUserActivityHistory(userId: string) {
  const userHabits = await db.select().from(habits).where(eq(habits.userId, userId));
  
  if (userHabits.length === 0) {
    return { habits: [], logs: [] };
  }

  const habitIds = userHabits.map((h) => h.id);
  const allLogs = await db
    .select()
    .from(logs)
    .where(inArray(logs.habitId, habitIds))
    .orderBy(desc(logs.loggedAt));

  return { habits: userHabits, logs: allLogs };
}