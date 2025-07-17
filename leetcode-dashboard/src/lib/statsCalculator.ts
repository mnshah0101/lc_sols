import { LeetCodeConfig, Stats, DailyStats } from '@/types/leetcode';
import { format, parseISO, differenceInDays, subDays } from 'date-fns';

export function calculateStats(config: LeetCodeConfig): Stats {
  const { problems, profile } = config;
  const today = new Date();
  const startDate = parseISO(profile.startDate);
  const daysSinceStart = differenceInDays(today, startDate) + 1;

  // Basic counts
  const totalProblems = problems.length;
  const problemsByDifficulty = problems.reduce(
    (acc, problem) => {
      acc[problem.difficulty.toLowerCase() as keyof typeof acc]++;
      return acc;
    },
    { easy: 0, medium: 0, hard: 0 }
  );

  // Calculate streaks
  const { currentStreak, longestStreak } = calculateStreaks(problems);

  // Calculate averages
  const averageProblemsPerDay = totalProblems / daysSinceStart;
  const averageTimePerProblem = problems.reduce((sum, p) => sum + p.timeSpent, 0) / totalProblems || 0;

  // Calculate momentum (last 7 days vs previous 7 days)
  const momentum = calculateMomentum(problems);

  // Calculate completion rate
  const completionRate = (totalProblems / profile.goal.totalProblems) * 100;

  return {
    totalProblems,
    problemsByDifficulty,
    currentStreak,
    longestStreak,
    averageProblemsPerDay,
    averageTimePerProblem,
    momentum,
    completionRate,
  };
}

function calculateStreaks(problems: any[]): { currentStreak: number; longestStreak: number } {
  if (problems.length === 0) return { currentStreak: 0, longestStreak: 0 };

  const dates = problems.map(p => p.dateSolved).sort();
  const uniqueDates = [...new Set(dates)];
  
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  // Check if today or yesterday has a problem (for current streak)
  const today = format(new Date(), 'yyyy-MM-dd');
  const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
  
  if (uniqueDates.includes(today) || uniqueDates.includes(yesterday)) {
    currentStreak = 1;
    
    // Count backwards from today/yesterday
    let checkDate = uniqueDates.includes(today) ? today : yesterday;
    let checkIndex = uniqueDates.indexOf(checkDate);
    
    for (let i = checkIndex - 1; i >= 0; i--) {
      const prevDate = uniqueDates[i];
      const currDate = uniqueDates[i + 1];
      
      if (differenceInDays(parseISO(currDate), parseISO(prevDate)) === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = uniqueDates[i - 1];
    const currDate = uniqueDates[i];
    
    if (differenceInDays(parseISO(currDate), parseISO(prevDate)) === 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  
  longestStreak = Math.max(longestStreak, tempStreak);

  return { currentStreak, longestStreak };
}

function calculateMomentum(problems: any[]): number {
  const today = new Date();
  const last7Days = subDays(today, 6);
  const prev7Days = subDays(today, 13);

  const recentProblems = problems.filter(p => {
    const date = parseISO(p.dateSolved);
    return date >= last7Days && date <= today;
  }).length;

  const previousProblems = problems.filter(p => {
    const date = parseISO(p.dateSolved);
    return date >= prev7Days && date < last7Days;
  }).length;

  if (previousProblems === 0) return recentProblems > 0 ? 100 : 0;
  
  const momentumRatio = recentProblems / previousProblems;
  return Math.min(100, Math.max(0, momentumRatio * 50));
}

export function getDailyStats(config: LeetCodeConfig): DailyStats[] {
  const dailyMap = new Map<string, DailyStats>();

  config.problems.forEach(problem => {
    const date = problem.dateSolved;
    
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        date,
        problemsSolved: 0,
        timeSpent: 0,
        difficulty: { easy: 0, medium: 0, hard: 0 }
      });
    }

    const dayStats = dailyMap.get(date)!;
    dayStats.problemsSolved++;
    dayStats.timeSpent += problem.timeSpent;
    dayStats.difficulty[problem.difficulty.toLowerCase() as keyof typeof dayStats.difficulty]++;
  });

  return Array.from(dailyMap.values()).sort((a, b) => a.date.localeCompare(b.date));
}