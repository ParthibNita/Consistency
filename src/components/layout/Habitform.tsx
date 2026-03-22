"use client";

import { useState } from "react";
import { Plus, Target, Hash, ToggleLeft, Loader2 } from "lucide-react";
import { createHabit } from "@/actions/habitActions";

export function CreateHabitForm() {
  const [isPending, setIsPending] = useState(false);
  const [habitType, setHabitType] = useState<"numeric" | "boolean">("boolean");

  const formAction = async (formData: FormData) => {
    setIsPending(true);
    const result = await createHabit(formData);
    
    if (result?.success) {
      const form = document.getElementById("create-habit-form") as HTMLFormElement;
      form.reset();
      setHabitType("boolean");
    }
    setIsPending(false);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-primary/20 p-1.5 rounded-md border border-primary/30">
          <Plus className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Create New Habit</h2>
      </div>

      <form id="create-habit-form" action={formAction} className="space-y-5">
        
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">Habit Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            placeholder="e.g., Morning Run, Read 10 Pages..." 
            className="w-full bg-background border border-border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Habit Type</label>
          <div className="grid grid-cols-2 gap-3">
            <label className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer transition-colors ${habitType === 'boolean' ? 'bg-primary/10 border-primary/50 text-primary' : 'bg-background border-border text-muted-foreground hover:bg-accent'}`}>
              <input type="radio" name="type" value="boolean" className="hidden" checked={habitType === "boolean"} onChange={() => setHabitType("boolean")} />
              <ToggleLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Yes / No (Boolean)</span>
            </label>
            <label className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer transition-colors ${habitType === 'numeric' ? 'bg-primary/10 border-primary/50 text-primary' : 'bg-background border-border text-muted-foreground hover:bg-accent'}`}>
              <input type="radio" name="type" value="numeric" className="hidden" checked={habitType === "numeric"} onChange={() => setHabitType("numeric")} />
              <Hash className="w-4 h-4" />
              <span className="text-sm font-medium">Target Number (Numeric)</span>
            </label>
          </div>
        </div>

        {habitType === "numeric" && (
          <div className="space-y-2 animate-in slide-in-from-top-2 fade-in duration-200">
            <label htmlFor="targetValue" className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Target className="w-4 h-4" /> Daily Target Value
            </label>
            <input 
              type="number" 
              id="targetValue" 
              name="targetValue" 
              min="1"
              required={habitType === "numeric"}
              placeholder="e.g., 5" 
              className="w-full bg-background border border-border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
            />
          </div>
        )}

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2.5 rounded-md text-sm font-bold transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Habit"}
        </button>
      </form>
    </div>
  );
}