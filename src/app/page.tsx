import { Flame, CheckCircle, TrendingUp, LayoutGrid, CalendarDays } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { ThemeToggle } from "@/components/features/Toggle";
import { CurrentDate } from "@/components/features/Date";
import { Heatmap } from "@/components/features/Heatmap";
import { HabitCarousel } from "@/components/features/HabitCarousal";
import { StreakStatus } from "@/components/features/Streak";
import { RecentActivity } from "@/components/features/RecentLogs";
import { db } from "@/db";
import { habits, logs } from "@/db/schema";
import { eq, gte } from "drizzle-orm";

export default async function DashboardPage() {
  const today = new Date();
  const startToday = today.setHours(0, 0, 0, 0);
  const userHabits = await db.select().from(habits).where(eq(habits.userId, "dev-parthib-123")); 
  const todayLogs = await db.select().from(logs).where(gte(logs.loggedAt, new Date(startToday)));
  const formatHabits = userHabits.map((h)=>{
    const todayHabit = todayLogs.find(log=> log.habitId === h.id);
    // if (h.type === "numeric") {
    //   console.log(`Habit: ${h.name}`);
    //   console.log(`Target: ${h.targetValue} (${typeof h.targetValue})`);
    //   console.log(`Log Exists? ${!!todayHabit}`);
    //   if (todayHabit) {
    //     console.log(`Entry: ${todayHabit.entryValue} (${typeof todayHabit.entryValue})`);
    //   }
    //   console.log("-------------------");
    // }
    return{
    id: h.id,
    name: h.name,
    type: h.type === "numeric" ? ("Numeric" as const) : ("Boolean" as const),
    level: h.currentLevel || 1,
    target:h.targetValue,
    goal: h.type === "numeric"? `${h.targetValue}` : "Done",
    performance: 0, 
    category: "General", 
    todayLog: todayHabit?.entryValue ?? null, 
  }})
  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Performance Dashboard</h1>
            <p className="text-muted-foreground mt-1 text-sm">Be your own admin</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle/>
            <button className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              <CalendarDays className="w-4 h-4" />
              <CurrentDate/>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-muted-foreground text-sm font-medium">Current Streak</span>
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <span className="text-4xl font-bold text-foreground">14</span>
              <p className="text-xs text-muted-foreground mt-1">consecutive days</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-muted-foreground text-sm font-medium">Discipline Days</span>
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-4xl font-bold text-foreground">89</span>
              <p className="text-xs text-muted-foreground mt-1">total logged days</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-muted-foreground text-sm font-medium">7-Day Performance</span>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-4xl font-bold text-foreground">78%</span>
              <p className="text-xs text-muted-foreground mt-1">across all habits</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-muted-foreground text-sm font-medium">Habit Slots</span>
              <LayoutGrid className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <span className="text-4xl font-bold text-foreground">3<span className="text-2xl text-muted-foreground">/5</span></span>
              <p className="text-xs text-muted-foreground mt-1">slots in use</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 mb-8 h-64 flex flex-col relative overflow-hidden shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold text-foreground">Consistency Heatmap</h2>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="w-3 h-3 rounded-sm bg-secondary ml-1" />
              <div className="w-3 h-3 rounded-sm bg-primary/40" />
              <div className="w-3 h-3 rounded-sm bg-primary/70" />
              <div className="w-3 h-3 rounded-sm bg-primary mr-1" />
              <span>More</span>
            </div>
          </div>
          
          <div className="flex-1 rounded-md flex items-center justify-center pt-2">
            <Heatmap />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-foreground">Today's Habits</h2>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">Manage →</button>
            </div>
            <div className="w-full">
              <HabitCarousel habits={formatHabits} />
            </div>
          </div>
          
          <div className="space-y-6 mt-10 lg:mt-0 flex flex-col h-[calc(100%-1rem)]">
            <div className="flex-1 min-h-50">
              <StreakStatus />
            </div>
            <div className="flex-1 min-h-50">
              <RecentActivity />
            </div>
            
          </div>
        </div>

      </main>
    </div>
  );
}