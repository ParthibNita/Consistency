"use client";

import { LayoutDashboard, Target, Activity, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname(); 
  const links = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/" }, 
    { name: "Habits", icon: Target, href: "/habits" },
    { name: "Progress", icon: Activity, href: "/progress" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-10">

      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-black tracking-tight text-foreground">
          CONSISTENCY<span className="text-primary">.</span>
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-1.5">
        {links.map((link) => {
          const Icon = link.icon;
          
          // The Logic: Is the current URL exactly equal to this link's destination?
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm" // The Active Look
                  : "text-muted-foreground hover:bg-accent hover:text-foreground" // The Inactive Look
              }`}
            >
              <Icon className="w-5 h-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border bg-card">
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Habit Slots</span>
            <span className="text-xs font-bold text-foreground">3 / 5</span>
          </div>
          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[20%] rounded-full" />
          </div>
        </div>
      </div>
      
    </aside>
  );
}