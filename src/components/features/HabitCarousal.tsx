"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HabitLogCard } from "./HabitCard"; 

const mockHabits = [
  {
    name: "Morning Run",
    type: "Numeric" as const,
    level: 2,
    goal: "5 km",
    performance: 78,
    category: "Fitness",
    isLoggedToday: false,
  },
  {
    name: "Deep Work",
    type: "Numeric" as const,
    level: 4,
    goal: "2 hours",
    performance: 92,
    category: "Career",
    isLoggedToday: true,
  },
  {
    name: "Read 10 Pages",
    type: "Boolean" as const,
    level: 1,
    goal: "Done",
    performance: 45,
    category: "Mind",
    isLoggedToday: false,
  }
];

export function HabitCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextHabit = () => {
    setCurrentIndex((prev) => (prev + 1) % mockHabits.length);
  };

  const prevHabit = () => {
    setCurrentIndex((prev) => (prev - 1 + mockHabits.length) % mockHabits.length);
  };

  return (
    <div className="relative w-full">
      <div className="overflow-hidden px-1 py-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <HabitLogCard {...mockHabits[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-4 px-2">
        <button 
          onClick={prevHabit}
          className="p-2 rounded-full hover:bg-accent hover:text-foreground text-muted-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex gap-1.5">
          {mockHabits.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-4 bg-primary" : "w-1.5 bg-secondary"
              }`}
            />
          ))}
        </div>

        <button 
          onClick={nextHabit}
          className="p-2 rounded-full hover:bg-accent hover:text-foreground text-muted-foreground transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
    </div>
  );
}