import { pgTable, uuid, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const habits = pgTable("habits", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  type: text("type").$type<"boolean" | "numeric">().default("boolean"),
  targetValue: integer("target_value").notNull().default(1),
  currentLevel: integer("current_level").default(1),
  isMastered: boolean("is_mastered").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const logs = pgTable("logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  habitId: uuid("habit_id").references(() => habits.id, { onDelete: 'cascade' }),
  entryValue: integer("entry_value").notNull(),
  loggedAt: timestamp("logged_at").defaultNow().notNull(),
});