"use client";

import { useMemo } from "react";

const generateMockData = () => {
  const data = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const randomValue = Math.random();
    let level = 0;
    if (randomValue > 0.6) level = 1;
    if (randomValue > 0.8) level = 2;
    if (randomValue > 0.9) level = 3;

    data.push({
      date: date.toISOString().split('T')[0],
      level,
    });
  }
  return data;
};

export function Heatmap() {
  const activityData = useMemo(() => generateMockData(), []);
  const getColorClass = (level: number) => {
    switch (level) {
      case 1: return "bg-primary/40";
      case 2: return "bg-primary/70";
      case 3: return "bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]";
      default: return "bg-secondary/40"; 
    }
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
      <div className="min-w-[750px]">
        <div className="flex justify-between text-xs text-muted-foreground mb-2 px-6">
          {months.map((month, idx) => (
            <span key={idx}>{month}</span>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col gap-1 text-[10px] text-muted-foreground justify-between py-1">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          <div className="grid grid-rows-7 grid-flow-col gap-1">
            {activityData.map((day, index) => (
              <div
                key={index}
                title={`${day.date}: Level ${day.level}`}
                className={`w-3 h-3 rounded-sm cursor-pointer transition-colors duration-200 hover:ring-2 hover:ring-ring hover:ring-offset-1 hover:ring-offset-background ${getColorClass(day.level)}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}