"use client";

import { CheckCircle2, CircleDashed } from "lucide-react";

interface Activity {
  id: string | number;
  name: string;
  value: string | number;
  status: string;
  type?: string;
}

export function RecentActivity({ activities = [] }: { activities?: Activity[] }) {
  
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-5 grow flex flex-col justify-center">
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center">No logs yet today.</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">

              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${activity.status.toLowerCase() === 'done' ? 'bg-primary' : 'bg-muted-foreground'}`} />
                <span className={`text-sm ${activity.status === 'done' ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {activity.name}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded ${
                  activity.status.toLowerCase() === 'done' && activity.type === 'boolean' 
                    ? 'bg-primary/20 text-primary border border-primary/20 font-medium' 
                    : 'text-muted-foreground'
                }`}>
                  {activity.value}
                </span>
                
                {activity.status.toLowerCase() === 'done' ? (
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                ) : (
                  <CircleDashed className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}