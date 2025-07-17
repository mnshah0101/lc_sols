'use client';

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Stats } from '@/types/leetcode';

interface ProblemTypeChartProps {
  stats: Stats;
}

const DIFFICULTY_COLORS = {
  Easy: '#10B981',
  Medium: '#F59E0B',
  Hard: '#EF4444',
};

export default function ProblemTypeChart({ stats }: ProblemTypeChartProps) {
  const pieData = [
    { name: 'Easy', value: stats.problemsByDifficulty.easy, color: DIFFICULTY_COLORS.Easy },
    { name: 'Medium', value: stats.problemsByDifficulty.medium, color: DIFFICULTY_COLORS.Medium },
    { name: 'Hard', value: stats.problemsByDifficulty.hard, color: DIFFICULTY_COLORS.Hard },
  ].filter(item => item.value > 0);

  const barData = [
    { difficulty: 'Easy', solved: stats.problemsByDifficulty.easy, target: Math.round(stats.totalProblems * 0.4) },
    { difficulty: 'Medium', solved: stats.problemsByDifficulty.medium, target: Math.round(stats.totalProblems * 0.45) },
    { difficulty: 'Hard', solved: stats.problemsByDifficulty.hard, target: Math.round(stats.totalProblems * 0.15) },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold">{data.name || data.difficulty}</p>
          <p className="text-sm text-gray-600">
            {data.value || data.solved} problems ({((data.value || data.solved) / stats.totalProblems * 100).toFixed(1)}%)
          </p>
          {data.target && (
            <p className="text-xs text-gray-500">Target: {data.target}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Problem Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Progress vs Target</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="difficulty" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="solved" fill="#3B82F6" name="Solved" />
            <Bar dataKey="target" fill="#E5E7EB" name="Target" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Stats */}
      <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Difficulty Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(stats.problemsByDifficulty).map(([difficulty, count]) => {
            const percentage = (count / stats.totalProblems) * 100;
            const color = DIFFICULTY_COLORS[difficulty as keyof typeof DIFFICULTY_COLORS];
            
            return (
              <div key={difficulty} className="text-center">
                <div className="mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(percentage, 100)}%`, 
                        backgroundColor: color 
                      }}
                    />
                  </div>
                </div>
                <h4 className="font-semibold capitalize" style={{ color }}>
                  {difficulty}
                </h4>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-sm text-gray-500">{percentage.toFixed(1)}%</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}