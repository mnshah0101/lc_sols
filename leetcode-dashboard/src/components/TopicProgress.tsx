import { Topic } from '@/types/leetcode';
import { CheckCircle, Circle, TrendingUp, Target } from 'lucide-react';

interface TopicProgressProps {
  topics: Topic[];
}

const priorityColors = {
  high: 'border-red-200 bg-red-50',
  medium: 'border-yellow-200 bg-yellow-50',
  low: 'border-green-200 bg-green-50',
};

const priorityBadgeColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
};

export default function TopicProgress({ topics }: TopicProgressProps) {
  const sortedTopics = [...topics].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return (b.completedProblems / b.totalProblems) - (a.completedProblems / a.totalProblems);
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Topic Progress</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Target size={16} />
          <span>Priority based ordering</span>
        </div>
      </div>

      <div className="space-y-6">
        {sortedTopics.map((topic) => {
          const completionRate = (topic.completedProblems / topic.totalProblems) * 100;
          
          return (
            <div 
              key={topic.name}
              className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${priorityColors[topic.priority]}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h4 className="font-semibold text-gray-900">{topic.name}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${priorityBadgeColors[topic.priority]}`}>
                    {topic.priority}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {topic.completedProblems} / {topic.totalProblems}
                  </p>
                  <p className="text-xs text-gray-500">
                    {completionRate.toFixed(1)}% complete
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(completionRate, 100)}%` }}
                  />
                </div>
              </div>

              {/* Subtopics */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-700 flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  Subtopics
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {topic.subtopics.map((subtopic) => {
                    const subCompletionRate = (subtopic.completed / subtopic.total) * 100;
                    const isCompleted = subtopic.completed === subtopic.total;
                    
                    return (
                      <div 
                        key={subtopic.name}
                        className="flex items-center justify-between p-2 bg-white rounded border"
                      >
                        <div className="flex items-center space-x-2">
                          {isCompleted ? (
                            <CheckCircle size={16} className="text-green-500" />
                          ) : (
                            <Circle size={16} className="text-gray-400" />
                          )}
                          <span className="text-sm text-gray-700">{subtopic.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600">
                            {subtopic.completed}/{subtopic.total}
                          </p>
                          <div className="w-12 bg-gray-200 rounded-full h-1 mt-1">
                            <div 
                              className={`h-1 rounded-full transition-all duration-300 ${
                                isCompleted ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${Math.min(subCompletionRate, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}