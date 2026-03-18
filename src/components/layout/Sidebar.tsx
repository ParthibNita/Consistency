"use client";

import Link from "next/link";
import { LayoutDashboard, CheckCircle, TrendingUp, Settings, Star } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-background border-r border-border h-screen flex flex-col p-4 fixed left-0 top-0 z-50">
      
      <div className="flex items-center gap-3 px-2 py-4 mb-6">
        <div className="bg-primary/20 p-1.5 rounded-md border border-primary/30">
          <Star className="text-primary w-5 h-5 fill-primary/20" />
        </div>
        <span className="text-lg font-bold text-foreground tracking-wide">
          CONSISTENCY
        </span>
      </div>

      {/*nav links */}
      <nav className="flex flex-col gap-2 grow">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md bg-accent text-accent-foreground font-medium transition-colors">
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
        <Link href="/habits" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors">
          <CheckCircle className="w-5 h-5" />
          Habits
        </Link>
        <Link href="/progress" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors">
          <TrendingUp className="w-5 h-5" />
          Progress
        </Link>
        <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors">
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </nav>

      <div className="mt-auto bg-card border border-border rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-foreground">Habit Slots</span>
          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            3 / 5
          </span>
        </div>
        
        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary w-[60%] rounded-full" />
        </div>
        
        <p className="text-xs text-muted-foreground mt-3 leading-tight">
          Level up habits to unlock more slots
        </p>
      </div>
      
    </aside>
  );
}