'use client';

import { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, isSameMonth, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { DailyStats } from '@/types/leetcode';

interface CalendarViewProps {
  dailyStats: DailyStats[];
}

export default function CalendarView({ dailyStats }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const statsMap = new Map(
    dailyStats.map(stat => [stat.date, stat])
  );

  const getDayStats = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return statsMap.get(dateStr);
  };

  const getIntensityColor = (problemCount: number) => {
    if (problemCount === 0) return 'bg-gray-100';
    if (problemCount === 1) return 'bg-green-200';
    if (problemCount === 2) return 'bg-green-400';
    if (problemCount >= 3) return 'bg-green-600';
    return 'bg-green-100';
  };

  const renderCalendarDays = () => {
    const days = [];
    let day = startDate;

    while (day <= endDate) {
      const dayStats = getDayStats(day);
      const isCurrentMonth = isSameMonth(day, monthStart);
      const isToday = isSameDay(day, new Date());
      const isSelected = selectedDate && isSameDay(day, selectedDate);

      days.push(
        <div
          key={day.toISOString()}
          className={`
            relative h-10 w-10 flex items-center justify-center text-sm cursor-pointer
            transition-all duration-200 rounded-lg hover:scale-105
            ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
            ${isToday ? 'ring-2 ring-blue-500' : ''}
            ${isSelected ? 'ring-2 ring-purple-500' : ''}
            ${getIntensityColor(dayStats?.problemsSolved || 0)}
          `}
          onClick={() => setSelectedDate(day)}
        >
          {format(day, 'd')}
          {dayStats && dayStats.problemsSolved > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
              {dayStats.problemsSolved}
            </div>
          )}
        </div>
      );
      day = addDays(day, 1);
    }

    return days;
  };

  const selectedDayStats = selectedDate ? getDayStats(selectedDate) : null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <Calendar className="mr-2" size={20} />
          Problem Solving Calendar
        </h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-medium text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Less</span>
          <div className="flex space-x-1">
            {[0, 1, 2, 3].map(level => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getIntensityColor(level)}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">More</span>
        </div>
      </div>

      {/* Selected Day Details */}
      {selectedDayStats && (
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-2">
            {format(selectedDate!, 'MMMM d, yyyy')}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {selectedDayStats.problemsSolved}
              </p>
              <p className="text-sm text-gray-600">Problems</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {selectedDayStats.timeSpent}m
              </p>
              <p className="text-sm text-gray-600">Time Spent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {selectedDayStats.difficulty.medium}
              </p>
              <p className="text-sm text-gray-600">Medium</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {selectedDayStats.difficulty.hard}
              </p>
              <p className="text-sm text-gray-600">Hard</p>
            </div>
          </div>
        </div>
      )}

      {selectedDate && !selectedDayStats && (
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-2">
            {format(selectedDate, 'MMMM d, yyyy')}
          </h4>
          <p className="text-gray-500 italic">No problems solved on this day</p>
        </div>
      )}
    </div>
  );
}