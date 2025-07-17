import { Target, TrendingUp, Clock, Zap, Calendar, Trophy } from 'lucide-react';
import { Stats } from '@/types/leetcode';
import StatsCard from './StatsCard';

interface DashboardStatsProps {
  stats: Stats;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatsCard
        title="Total Problems"
        value={stats.totalProblems}
        subtitle={`${stats.completionRate.toFixed(1)}% of goal`}
        icon={Target}
        color="blue"
      />
      
      <StatsCard
        title="Current Streak"
        value={stats.currentStreak}
        subtitle={`Longest: ${stats.longestStreak} days`}
        icon={TrendingUp}
        color="green"
      />
      
      <StatsCard
        title="Avg Time/Problem"
        value={`${Math.round(stats.averageTimePerProblem)}m`}
        subtitle="minutes per problem"
        icon={Clock}
        color="orange"
      />
      
      <StatsCard
        title="Momentum"
        value={`${Math.round(stats.momentum)}%`}
        subtitle="vs last week"
        icon={Zap}
        color="purple"
        trend={{
          value: stats.momentum - 50,
          label: 'momentum'
        }}
      />
      
      <StatsCard
        title="Daily Average"
        value={stats.averageProblemsPerDay.toFixed(1)}
        subtitle="problems per day"
        icon={Calendar}
        color="indigo"
      />
      
      <StatsCard
        title="Problem Mix"
        value={`${stats.problemsByDifficulty.easy}/${stats.problemsByDifficulty.medium}/${stats.problemsByDifficulty.hard}`}
        subtitle="Easy/Medium/Hard"
        icon={Trophy}
        color="red"
      />
    </div>
  );
}