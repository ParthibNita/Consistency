export function calcCurrentStreak(logs: { loggedAt: Date }[]): number {
  if (!logs || logs.length === 0) return 0;

  const uniqueLoggedDates = new Set(
    logs.map(log => {
      const d = new Date(log.loggedAt);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    })
  );

  let currentStreak = 0;
  let currentDate = new Date();

  while (true) {
    const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
    
    if (uniqueLoggedDates.has(dateString)) {
      currentStreak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (currentStreak === 0) {
      currentDate.setDate(currentDate.getDate() - 1);
      const yesterdayString = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
      
      if (uniqueLoggedDates.has(yesterdayString)) {
        currentStreak++;
        currentDate.setDate(currentDate.getDate() - 1); 
      } else {
        break; 
      }
    } else {
      break; 
    }
  }
  return currentStreak;
}

export function calcDiscipline(logs:{loggedAt : Date}[]):number{
    if(!logs || logs.length === 0) return 0;
    
    const uniqueLoggedDates = new Set(
        logs.map(log => {
          const d = new Date(log.loggedAt);
          return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        })
      );
    return uniqueLoggedDates.size;
}

export function calculateSevenDayPerformance(
  habits: { id: string; targetValue: number }[],
  logs: { habitId: string | null; entryValue: number; loggedAt: Date }[]
): number {
  if (habits.length === 0) return 0;

  const now = new Date();
  const oneDayInMs = 24 * 60 * 60 * 1000;
  let totalPossibleCompletions = habits.length * 7;
  let actualCompletions = 0;

  for (let i = 0; i < 7; i++) {
    const checkDate = new Date(now.getTime() - i * oneDayInMs);
    const dateStr = `${checkDate.getFullYear()}-${checkDate.getMonth()}-${checkDate.getDate()}`;

    habits.forEach((habit) => {
      const dayLogs = logs.filter((log) => {
        const d = new Date(log.loggedAt);
        const logDateStr = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        return log.habitId === habit.id && logDateStr === dateStr;
      });

      const totalLogged = dayLogs.reduce((sum, l) => sum + l.entryValue, 0);
      if (totalLogged >= habit.targetValue) {
        actualCompletions++;
      }
    });
  }
  const percentage = (actualCompletions / totalPossibleCompletions) * 100;
  return Math.round(percentage);
}