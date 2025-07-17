'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Flame, Target } from 'lucide-react';
import { DailyStats, Stats } from '@/types/leetcode';
import { format, subDays, parseISO } from 'date-fns';

interface MomentumTrackerProps {
  dailyStats: DailyStats[];
  stats: Stats;
}

export default function MomentumTracker({ dailyStats, stats }: MomentumTrackerProps) {
  // Prepare data for the last 30 days
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(new Date(), 29 - i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayStats = dailyStats.find(s => s.date === dateStr);
    
    return {
      date: dateStr,
      day: format(date, 'MMM d'),
      problemsSolved: dayStats?.problemsSolved || 0,
      timeSpent: dayStats?.timeSpent || 0,
      cumulativeProblems: 0, // Will be calculated below
    };
  });

  // Calculate cumulative problems
  let cumulative = 0;
  last30Days.forEach(day => {
    cumulative += day.problemsSolved;
    day.cumulativeProblems = cumulative;
  });

  // Calculate momentum trend
  const recentWeek = last30Days.slice(-7);
  const previousWeek = last30Days.slice(-14, -7);
  
  const recentAvg = recentWeek.reduce((sum, day) => sum + day.problemsSolved, 0) / 7;
  const previousAvg = previousWeek.reduce((sum, day) => sum + day.problemsSolved, 0) / 7;
  
  const momentumTrend = recentAvg - previousAvg;
  const momentumDirection = momentumTrend > 0.1 ? 'up' : momentumTrend < -0.1 ? 'down' : 'stable';

  const getMomentumColor = (momentum: number) => {
    if (momentum >= 70) return 'text-green-600';
    if (momentum >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMomentumIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <TrendingUp size={20} className="text-green-600" />;
      case 'down': return <TrendingDown size={20} className="text-red-600" />;
      default: return <Minus size={20} className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Momentum Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-blue-800">Current Momentum</h4>
            <Flame className="text-blue-600" size={20} />
          </div>
          <p className={`text-3xl font-bold ${getMomentumColor(stats.momentum)}`}>
            {Math.round(stats.momentum)}%
          </p>
          <p className="text-sm text-blue-600">
            {stats.momentum >= 50 ? 'Above average' : 'Below average'}
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-green-800">Current Streak</h4>
            <Target className="text-green-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-green-600">
            {stats.currentStreak}
          </p>
          <p className="text-sm text-green-600">days</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-purple-800">Trend</h4>
            {getMomentumIcon(momentumDirection)}
          </div>
          <p className="text-3xl font-bold text-purple-600">
            {momentumDirection === 'up' ? '+' : momentumDirection === 'down' ? '-' : ''}
            {Math.abs(momentumTrend).toFixed(1)}
          </p>
          <p className="text-sm text-purple-600">problems/day</p>
        </div>
      </div>

      {/* Daily Problems Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Daily Activity (Last 30 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={last30Days}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(label) => `Date: ${label}`}
              formatter={(value: number, name: string) => [
                value,
                name === 'problemsSolved' ? 'Problems Solved' : 'Time Spent (min)'
              ]}
            />
            <Area 
              type="monotone" 
              dataKey="problemsSolved" 
              stroke="#3B82F6" 
              fill="#3B82F6" 
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Cumulative Progress */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Cumulative Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={last30Days}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(label) => `Date: ${label}`}
              formatter={(value: number) => [value, 'Total Problems']}
            />
            <Line 
              type="monotone" 
              dataKey="cumulativeProblems" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Streak Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Streak Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Current Streak</span>
              <span className="font-bold text-blue-600">{stats.currentStreak} days</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Longest Streak</span>
              <span className="font-bold text-green-600">{stats.longestStreak} days</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Average Daily Rate</span>
              <span className="font-bold text-purple-600">
                {stats.averageProblemsPerDay.toFixed(1)} problems
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700">Recent Performance</h4>
            <div className="space-y-2">
              {recentWeek.slice(-5).map((day, index) => (
                <div key={day.date} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">{day.day}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{day.problemsSolved} problems</span>
                    <div className={`w-2 h-2 rounded-full ${
                      day.problemsSolved > 0 ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}