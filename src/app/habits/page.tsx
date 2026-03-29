import Sidebar from "@/components/layout/Sidebar";
import { CreateHabitForm } from "@/components/layout/Habitform";
import { ThemeToggle } from "@/components/features/Toggle";

export default function HabitsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">

        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Habit Management</h1>
            <p className="text-muted-foreground mt-1 text-sm">Create, edit, and organize your discipline stack.</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1">
            <CreateHabitForm />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6 h-full min-h-[400px] border-dashed flex flex-col items-center justify-center text-center shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-2">Your Discipline Stack</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Habits you create will appear here. Build your factory to supply your dashboard.
              </p>
            </div>
          </div>
          
        </div>

      </main>
    </div>
  );
}