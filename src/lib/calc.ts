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