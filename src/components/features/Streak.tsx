"use client";

import { Flame } from "lucide-react";

export function StreakStatus() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <Flame className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-bold text-foreground">Streak Status</h3>
      </div>
      
      <div className="space-y-4 grow flex flex-col justify-center">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Current Streak</span>
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold border border-primary/20">
            14 days
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Best Streak</span>
          <span className="text-sm font-medium text-foreground">31 days</span>
        </div>
        
        {/* <div className="pt-4 border-t border-border mt-2"> */}
          <div className="flex justify-between text-xs mb-2">
            <span className="text-muted-foreground">Progress to 30-day goal</span>
            <span className="font-bold text-foreground">47%</span>
          </div>
          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 w-[47%] rounded-full transition-all duration-1000 ease-out" />
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}