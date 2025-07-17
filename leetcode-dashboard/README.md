# LeetCode Progress Dashboard

A beautiful, modern Next.js dashboard to track your LeetCode progress with comprehensive analytics, calendar view, and momentum tracking.

## Features

### 📊 Comprehensive Analytics
- **Stats Overview**: Total problems, completion rate, current streak, and momentum
- **Problem Type Breakdown**: Visual charts showing difficulty distribution
- **Topic Progress**: Detailed tracking of different coding topics and subtopics

### 📅 Calendar View
- **Daily Activity**: GitHub-style calendar showing daily problem solving
- **Problem Intensity**: Visual indicators for daily activity levels
- **Detailed Stats**: Click on any day to see problems solved, time spent, and difficulty breakdown

### 🔥 Momentum Tracking
- **Streak Analysis**: Current and longest streaks
- **Momentum Score**: Dynamic scoring based on recent activity vs historical average
- **Trend Analysis**: 30-day activity charts and cumulative progress
- **Performance Insights**: Recent performance metrics and patterns

### 🎯 Topic Management
- **Priority-based Ordering**: Topics sorted by priority and completion rate
- **Progress Tracking**: Visual progress bars for each topic and subtopic
- **Completion Status**: Clear indicators for completed vs in-progress areas

## Configuration

The dashboard uses a simple JSON configuration file that's easy to edit and maintain:

### Config File: `src/data/leetcode-config.json`

```json
{
  "profile": {
    "username": "your-username",
    "startDate": "2024-01-01",
    "goal": {
      "problemsPerDay": 2,
      "totalProblems": 365
    }
  },
  "problems": [
    {
      "id": 1,
      "title": "Two Sum",
      "difficulty": "Easy",
      "topic": "Array",
      "subtopic": "Hash Table",
      "dateSolved": "2024-01-01",
      "timeSpent": 30,
      "attempts": 1,
      "url": "https://leetcode.com/problems/two-sum/",
      "notes": "Classic problem using hash map"
    }
  ],
  "topics": [
    {
      "name": "Array",
      "totalProblems": 150,
      "completedProblems": 45,
      "priority": "high",
      "subtopics": [
        { "name": "Two Pointers", "completed": 12, "total": 25 }
      ]
    }
  ]
}
```

### Adding New Problems

To add a new problem, simply append to the `problems` array:

```json
{
  "id": 3,
  "title": "Longest Substring Without Repeating Characters",
  "difficulty": "Medium",
  "topic": "String",
  "subtopic": "Sliding Window",
  "dateSolved": "2024-01-03",
  "timeSpent": 45,
  "attempts": 2,
  "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  "notes": "Use sliding window technique"
}
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Update your configuration:**
   - Edit `src/data/leetcode-config.json`
   - Add your username and start date
   - Set your daily and total goals
   - Add your solved problems

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Dashboard Sections

### Overview
- Comprehensive stats cards showing key metrics
- Problem type distribution charts
- Topic progress overview

### Analytics
- Detailed problem type breakdown with charts
- Progress vs target comparisons
- Difficulty distribution analysis

### Calendar
- GitHub-style contribution calendar
- Daily problem solving visualization
- Detailed day-by-day statistics

### Momentum
- Current momentum score and trend analysis
- Streak tracking and analysis
- 30-day activity charts
- Performance insights

### Topics
- Detailed topic and subtopic progress
- Priority-based organization
- Completion status tracking

### Config
- View current configuration
- Instructions for updating settings
- Profile and goal management

## Customization

### Adding New Topics
1. Add the topic to your `topics` array in the config file
2. Set the total problems and current progress
3. Add relevant subtopics with their completion status

### Modifying Stats Calculations
- Edit `src/lib/statsCalculator.ts` to customize how stats are calculated
- Adjust momentum scoring, streak calculations, or add new metrics

### Styling
- The dashboard uses Tailwind CSS for styling
- Customize colors, spacing, and layout in the component files
- Charts use Recharts library for easy customization

## Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Charts and data visualization
- **Lucide React** - Icons
- **date-fns** - Date manipulation

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
