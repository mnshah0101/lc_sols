'use client';

import { useState } from 'react';
import { Code, BarChart3, Calendar, TrendingUp, Settings, FileText } from 'lucide-react';
import DashboardStats from '@/components/DashboardStats';
import ProblemTypeChart from '@/components/ProblemTypeChart';
import TopicProgress from '@/components/TopicProgress';
import CalendarView from '@/components/CalendarView';
import MomentumTracker from '@/components/MomentumTracker';
import { calculateStats, getDailyStats } from '@/lib/statsCalculator';
import configData from '@/data/leetcode-config.json';
import { LeetCodeConfig } from '@/types/leetcode';

// Type assertion for the imported JSON
const config: LeetCodeConfig = configData as LeetCodeConfig;

type Tab = 'overview' | 'analytics' | 'calendar' | 'momentum' | 'topics' | 'config';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  
  const stats = calculateStats(config);
  const dailyStats = getDailyStats(config);

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview', icon: BarChart3 },
    { id: 'analytics' as Tab, label: 'Analytics', icon: TrendingUp },
    { id: 'calendar' as Tab, label: 'Calendar', icon: Calendar },
    { id: 'momentum' as Tab, label: 'Momentum', icon: TrendingUp },
    { id: 'topics' as Tab, label: 'Topics', icon: FileText },
    { id: 'config' as Tab, label: 'Config', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Code className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LeetCode Dashboard</h1>
                <p className="text-sm text-gray-500">@{config.profile.username}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{stats.totalProblems} Problems</p>
                <p className="text-xs text-gray-500">{stats.completionRate.toFixed(1)}% of goal</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <DashboardStats stats={stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <ProblemTypeChart stats={stats} />
              </div>
              <div>
                <TopicProgress topics={config.topics} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <ProblemTypeChart stats={stats} />
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-8">
            <CalendarView dailyStats={dailyStats} />
          </div>
        )}

        {activeTab === 'momentum' && (
          <div className="space-y-8">
            <MomentumTracker dailyStats={dailyStats} stats={stats} />
          </div>
        )}

        {activeTab === 'topics' && (
          <div className="space-y-8">
            <TopicProgress topics={config.topics} />
          </div>
        )}

        {activeTab === 'config' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={config.profile.username}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={config.profile.startDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daily Goal
                    </label>
                    <input
                      type="number"
                      value={config.profile.goal.problemsPerDay}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Goal
                    </label>
                    <input
                      type="number"
                      value={config.profile.goal.totalProblems}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      readOnly
                    />
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">📝 How to Update</h4>
                  <p className="text-sm text-blue-800">
                    Edit the <code className="px-2 py-1 bg-blue-100 rounded">src/data/leetcode-config.json</code> file to update your profile, add new problems, or modify topics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
