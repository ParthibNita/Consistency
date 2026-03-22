"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HabitLogCard } from "./HabitCard";

export type HabitDTO = {
  id: string;
  name: string;
  type: "Numeric" | "Boolean";
  level: number;
  goal: string;
  target: number;
  performance: number;
  category: string;
  todayLog: number | null;
};

export function HabitCarousel({ habits }: { habits: HabitDTO[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!habits || habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-3 py-10">
        <Target className="w-10 h-10 opacity-20" />
        <p className="text-sm font-medium">Your discipline stack is empty.</p>
        <a href="/habits" className="text-xs text-primary hover:underline">
          Create your first habit →
        </a>
      </div>
    );
  }

  const nextHabit = () => {
    setCurrentIndex((prev) => (prev + 1) % habits.length);
  };

  const prevHabit = () => {
    setCurrentIndex((prev) => (prev - 1 + habits.length) % habits.length);
  };

  return (
    <div className="relative w-full">
      <div className="overflow-hidden pb-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full"
          >
            <HabitLogCard {...habits[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {habits.length > 1 && (
        <div className="flex justify-between items-center mt-4 px-2">
          <button onClick={prevHabit} className="p-2 rounded-full hover:bg-accent hover:text-foreground text-muted-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-1.5">
            {habits.map((_, idx) => (
              <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-4 bg-primary" : "w-1.5 bg-secondary"}`} />
            ))}
          </div>

          <button onClick={nextHabit} className="p-2 rounded-full hover:bg-accent hover:text-foreground text-muted-foreground transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}