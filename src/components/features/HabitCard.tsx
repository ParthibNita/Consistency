"use client";

import { useState } from "react";
import { Check, Tag, Target, Loader2, TrendingUp } from "lucide-react";
import { logHabitActivity } from "@/actions/habitActions"; 

interface HabitLogCardProps {
  id: string;
  name: string;
  type: "Numeric" | "Boolean";
  level: number;
  target: number; 
  goal: string;
  performance: number;
  category: string;
  todayLog: number | null; 
}

export function HabitLogCard({
  id, 
  name, 
  type, 
  level, 
  target, 
  goal, 
  performance, 
  category, 
  todayLog
}: HabitLogCardProps) {
  
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localEntry, setLocalEntry] = useState<number | null>(null); 

  const currentEntry = localEntry !== null ? localEntry : todayLog;
  const isLogged = currentEntry !== null;
  const isCompleted = isLogged && currentEntry >= target;
  const isPartial = isLogged && currentEntry < target;

  // console.log(isLogged, isCompleted, isPartial, currentEntry, target);

  const handleLog = async () => {
    if (type === "Numeric" && !inputValue) return;
    setIsSubmitting(true);
    
    const valueToLog = type === "Numeric" ? Number(inputValue) : target; 
    const result = await logHabitActivity(id, valueToLog);

    if (result.success) {
      setLocalEntry(valueToLog); 
    } else {
      console.error("Failed to log:", result.error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="flex gap-2 items-center">
          <span className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs font-medium">
            {type}
          </span>
          <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded text-xs font-bold">
            Lv. {level}
          </span>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className="text-sm font-bold text-foreground">{performance}%</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider leading-none">7-Day</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
          <Target className="w-3.5 h-3.5" />
          Goal: {goal}
        </p>
      </div>

      {!isLogged && (
        <div className="bg-background/50 border border-border rounded-lg p-3 space-y-3">
          {type === "Numeric" && (
            <div className="flex gap-2">
              <input 
                type="number" placeholder={`Target: ${target}`} value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} disabled={isSubmitting}
                className="flex-1 bg-background border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button 
                onClick={handleLog} disabled={isSubmitting || !inputValue}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-1.5 rounded-md text-sm font-medium disabled:opacity-50 flex min-w-[60px] justify-center"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Log"}
              </button>
            </div>
          )}
          {type === "Boolean" && (
             <div className="flex justify-between items-center pt-1">
              <span className="text-xs text-muted-foreground">Mark as done today</span>
              <button onClick={handleLog} disabled={isSubmitting} className="flex items-center gap-1.5 border border-border hover:border-primary px-3 py-1.5 rounded-md text-sm font-medium">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4" /> Done</>}
              </button>
            </div>
          )}
        </div>
      )}

      {isPartial && (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 flex justify-between items-center text-orange-500 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 font-medium">
            <TrendingUp className="w-5 h-5" />
            Partial Progress
          </div>
          <span className="font-bold">{currentEntry} / {target}</span>
        </div>
      )}

      {isCompleted && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center justify-center gap-2 text-primary font-medium animate-in fade-in duration-300">
          <Check className="w-5 h-5" />
          Completed for today
        </div>
      )}

      <div className="flex justify-between items-center pt-2 border-t border-border mt-1">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Tag className="w-3.5 h-3.5" />
          {category}
        </div>
        <div className={`text-xs font-medium ${isCompleted ? 'text-primary' : isPartial ? 'text-orange-500' : 'text-muted-foreground'}`}>
          {isCompleted ? "Completed" : isPartial ? "Logged" : "Pending"}
        </div>
      </div>
      
    </div>
  );
}