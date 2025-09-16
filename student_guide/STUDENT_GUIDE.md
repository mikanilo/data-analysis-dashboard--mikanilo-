# 🎓 STUDENT GUIDE: 10-Week React Data Discovery Course

Welcome to your React/TypeScript journey! This guide will be your companion throughout the 10-week course where you'll build a professional data analysis application from scratch.

## 📚 Table of Contents
- [Course Overview](#course-overview)
- [Getting Started](#getting-started)
- [Week-by-Week Student Materials](#week-by-week-materials)
- [Resources & References](#resources--references)
- [Troubleshooting](#troubleshooting)
- [Final Project Showcase](#final-project-showcase)

---

## 🎯 Course Overview

### What You'll Build
By the end of this course, you'll have created a complete **Data Discovery Tool** - a professional web application that:
- ✅ Accepts CSV file uploads with drag-and-drop
- ✅ Processes and validates data automatically
- ✅ Creates interactive charts and visualizations
- ✅ Generates automated insights about your data
- ✅ Features an AI chat interface for data questions
- ✅ Is deployed live on the internet with your own URL

### Learning Journey
- **Weeks 1-3**: React fundamentals and interactive components
- **Weeks 4-6**: Data processing, visualization, and analysis
- **Weeks 7-8**: AI integration and professional polish
- **Weeks 9-10**: Testing, deployment, and portfolio presentation

### Technologies You'll Master
- **React 18** - Modern component-based UI development
- **TypeScript** - Type-safe JavaScript for better development
- **Vite** - Fast development environment and build tool
- **Tailwind CSS** - Utility-first styling framework
- **Recharts** - Interactive data visualization library
- **shadcn/ui** - Professional component library
- **Netlify** - Modern deployment platform

---

## 🚀 Getting Started

### Prerequisites
- Basic understanding of HTML, CSS, and JavaScript
- A computer with admin access for software installation
- Enthusiasm for learning modern web development!

### Required Software Installation

#### 1. Node.js (JavaScript Runtime)
- **Download**: [nodejs.org](https://nodejs.org)
- **Version**: Install the LTS (Long Term Support) version
- **Verify**: Open terminal/command prompt and type `node --version`
- **Expected**: Should show v18.x.x or higher

#### 2. Git (Version Control)
- **Download**: [git-scm.com](https://git-scm.com)
- **Setup**: Configure with your name and email:
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

#### 3. VS Code (Code Editor)
- **Download**: [code.visualstudio.com](https://code.visualstudio.com)
- **Extensions to Install**:
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - Auto Rename Tag
  - Bracket Pair Colorizer
  - GitLens

#### 4. GitHub Account
- **Create**: [github.com](https://github.com)
- **Purpose**: Store your code and collaborate

### Project Setup (Week 1)
```bash
# Clone the starter project
git clone https://github.com/bvcc-swe/data-discovery-plug.git
cd data-discovery-plug

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser to http://localhost:5173
```

**Success Check**: You should see the "Plug-N-Learn" homepage with upload functionality.

---

## 📖 Week-by-Week Materials

### 📅 Week 1: React Fundamentals & Project Setup

#### Pre-Session Checklist
- [ ] Complete software installation
- [ ] Create GitHub account
- [ ] Test that you can open VS Code and a terminal

#### Learning Goals
- Understand what React components are
- Learn the difference between JSX and HTML
- Make your first code modification
- Get comfortable with the development environment

#### Key Files to Explore
```
src/
├── App.tsx          # Main application component
├── pages/Index.tsx  # Homepage component
└── components/
    ├── DataUpload.tsx    # File upload component
    └── ui/               # Reusable UI components
```

#### Your First Modification
**Task**: Personalize the homepage title
**File**: `src/pages/Index.tsx`
**Find**: Line 28 with "Plug-N-Learn"
**Change to**: "Plug-N-Learn: [Your Name]'s Dashboard"

#### Homework
- [ ] Change one more piece of text in the application
- [ ] Explore different files and see how components connect
- [ ] Try changing a color (look for "blue-600" and change to "purple-600")

#### Key Concepts
- **Component**: A reusable piece of UI (like a LEGO block)
- **JSX**: HTML-like syntax that works in JavaScript
- **Props**: Data passed from parent to child components

---

### 📅 Week 2: State Management & Data Flow

#### Pre-Session Preparation
- [ ] Complete Week 1 homework
- [ ] Review your personalized dashboard
- [ ] Think about interactive websites you use daily

#### Learning Goals
- Understand what React state is and why it's needed
- Use the useState hook to create interactive components
- Handle button clicks and update state
- Build a working counter component

#### New Concepts
- **State**: Component memory that can change over time
- **useState**: React hook for managing component state
- **Event Handlers**: Functions that respond to user actions

#### Build Project: Interactive Counter
**File**: `src/components/Counter.tsx`
**Features**:
- Display a number that starts at 0
- Button to increment the number
- Button to decrement the number
- Reset functionality

#### Code Pattern You'll Learn
```tsx
const [count, setCount] = useState(0);
//     ↑        ↑           ↑
//   current  function    starting
//   value    to change    value
```

#### Homework
- [ ] Add a decrement button to your counter
- [ ] Add a reset button that sets count back to 0
- [ ] Try changing the starting number
- [ ] Experiment with increment by 5 or 10

---

### 📅 Week 3: Interactive Components & User Input

#### Pre-Session Preparation
- [ ] Have your counter working from Week 2
- [ ] Think about forms you fill out online
- [ ] List different types of user input (text, buttons, checkboxes)

#### Learning Goals
- Create controlled form components
- Handle different types of user input
- Implement form validation
- Understand controlled vs uncontrolled components

#### Build Project: Name Input with Validation
**File**: `src/components/NameInput.tsx`
**Features**:
- Text input for entering your name
- Real-time validation (can't be empty)
- Generate personalized greeting
- Error messages for invalid input

#### Key Pattern: Controlled Components
```tsx
<input 
  value={name} 
  onChange={(e) => setName(e.target.value)} 
/>
```

#### Homework
- [ ] Add minimum length validation (at least 2 characters)
- [ ] Add maximum length limit (no more than 50 characters)
- [ ] Display character count as user types
- [ ] Add different greeting messages based on name length

---

### 📅 Week 4: Data Processing & Analysis

#### Pre-Session Preparation
- [ ] Think about data you work with (grades, sports stats, etc.)
- [ ] Review your name input component
- [ ] Consider how apps like Excel analyze data

#### Learning Goals
- Master JavaScript array methods (map, filter, reduce)
- Process and analyze numerical data
- Calculate statistics (average, min, max, sum)
- Handle edge cases and error conditions

#### Build Project: Data Analysis Component
**File**: `src/components/DataAnalyzer.tsx`
**Features**:
- Analyze sample numerical data
- Calculate and display statistics
- Handle empty data sets gracefully
- Show results in organized format

#### Key Array Methods You'll Master
```javascript
// Transform data
data.map(item => item * 2)

// Filter data
data.filter(item => item > 50)

// Calculate totals
data.reduce((sum, item) => sum + item, 0)
```

#### Homework
- [ ] Add median calculation to your analyzer
- [ ] Add data filtering (show only values above average)
- [ ] Calculate and display the range (max - min)
- [ ] Add percentage calculations

---

### 📅 Week 5: Charts & Data Visualization

#### Pre-Session Preparation
- [ ] Your data analyzer should be working
- [ ] Look at charts in apps/websites you use
- [ ] Think about what makes a good chart vs bad chart

#### Learning Goals
- Create interactive charts using Recharts library
- Understand different chart types and their purposes
- Transform data for visualization
- Make charts responsive and accessible

#### Build Project: Interactive Chart Component
**File**: `src/components/SimpleChart.tsx`
**Features**:
- Bar charts for comparing values
- Line charts for trends over time
- Pie charts for parts of a whole
- Chart type selector
- Responsive design

#### Chart Types You'll Create
- **Bar Chart**: Compare different categories
- **Line Chart**: Show trends over time
- **Pie Chart**: Show parts of a whole
- **Area Chart**: Filled line chart for emphasis

#### Homework
- [ ] Add custom colors to your charts
- [ ] Implement chart animations
- [ ] Add data labels and tooltips
- [ ] Create a multi-series chart

---

### 📅 Week 6: Insights & Intelligence

#### Pre-Session Preparation
- [ ] Your charts should be displaying data
- [ ] Think about insights you get from data visualization
- [ ] Consider how apps like Netflix or Spotify make recommendations

#### Learning Goals
- Generate automated insights from data patterns
- Implement pattern recognition algorithms
- Create intelligent data summaries
- Build user-friendly insight presentation

#### Build Project: Automated Insight Generator
**File**: `src/components/InsightGenerator.tsx`
**Features**:
- Detect trends in data (increasing, decreasing, stable)
- Find outliers and unusual values
- Generate human-readable descriptions
- Rank insights by importance

#### Pattern Recognition You'll Implement
- **Trend Detection**: Is data going up, down, or staying flat?
- **Outlier Detection**: Which values don't fit the pattern?
- **Statistical Analysis**: What do the numbers really mean?
- **Natural Language Generation**: Turn numbers into stories

#### Homework
- [ ] Add more sophisticated trend detection
- [ ] Implement seasonal pattern recognition
- [ ] Add confidence levels to insights
- [ ] Create insight categories (positive, negative, neutral)

---

### 📅 Week 7: API Integration & AI Features

#### Pre-Session Preparation
- [ ] Your insight generator should be working
- [ ] Experience with ChatGPT or other AI tools helpful
- [ ] Think about how apps talk to each other

#### Learning Goals
- Understand APIs and how applications communicate
- Implement asynchronous programming with async/await
- Create a working AI chat interface
- Handle API errors and loading states gracefully

#### Build Project: AI Chat Interface
**File**: `src/components/MockAIChat.tsx`
**Features**:
- Chat-style interface for asking questions
- Mock AI responses based on your data
- Loading animations and error handling
- Question suggestions and conversation flow

#### Key Programming Concepts
- **APIs**: How different software talks to each other
- **Async/Await**: Handle operations that take time
- **Promises**: JavaScript's way of handling future results
- **Error Handling**: What to do when things go wrong

#### Homework
- [ ] Add conversation memory (AI remembers previous questions)
- [ ] Implement typing indicators
- [ ] Add more sophisticated response patterns
- [ ] Create different AI personalities

---

### 📅 Week 8: Polish & Performance

#### Pre-Session Preparation
- [ ] Your AI chat should be responding to questions
- [ ] Test your app on different devices/browsers
- [ ] Think about professional websites vs amateur ones

#### Learning Goals
- Implement professional error boundaries
- Create elegant loading states and skeleton screens
- Optimize performance with React best practices
- Build accessible and inclusive user interfaces

#### Build Project: Professional Polish Features
**Files**: Multiple components get upgraded
**Features**:
- Error boundaries that catch crashes
- Skeleton loading screens
- Performance optimizations
- Accessibility features for all users

#### Professional Features You'll Add
- **Error Boundaries**: Prevent crashes from breaking your app
- **Loading States**: Show users what's happening
- **Performance Optimization**: Make your app fast
- **Accessibility**: Make your app usable by everyone

#### Homework
- [ ] Test your app with keyboard-only navigation
- [ ] Add dark mode support
- [ ] Implement progressive loading
- [ ] Add micro-animations for better UX

---

### 📅 Week 9: Testing & Quality Assurance

#### Pre-Session Preparation
- [ ] Your app should have professional polish
- [ ] Think about bugs you've encountered in apps
- [ ] Consider what makes software high quality

#### Learning Goals
- Understand different types of testing
- Implement manual testing strategies systematically
- Create comprehensive test cases for edge scenarios
- Build quality assurance checklists

#### Build Project: Comprehensive Testing Strategy
**Files**: Testing documentation and bug reports
**Features**:
- Test case documentation
- Edge case testing
- Bug reporting and tracking
- Quality assurance checklists

#### Testing Skills You'll Develop
- **Manual Testing**: Systematic human testing
- **Edge Case Testing**: Testing unusual scenarios
- **Bug Documentation**: Professional problem reporting
- **Quality Assurance**: Ensuring your app works reliably

#### Homework
- [ ] Create test cases for all your features
- [ ] Test your app with different file types
- [ ] Document any bugs you find
- [ ] Fix at least one bug you discover

---

### 📅 Week 10: Deployment & Portfolio Presentation

#### Pre-Session Preparation
- [ ] Your app should be fully tested and polished
- [ ] Prepare your best sample data for demos
- [ ] Think about how to present your work

#### Learning Goals
- Deploy your application live to the internet
- Configure domain names and production environments
- Create professional documentation
- Build compelling portfolio presentations

#### Build Project: Live Deployment and Portfolio
**Deliverables**:
- Live application on the internet
- Professional README documentation
- Portfolio presentation
- Demo preparation

#### Professional Skills You'll Develop
- **Deployment**: Put your app on the internet
- **Documentation**: Write professional project descriptions
- **Presentation**: Demo your work confidently
- **Portfolio Building**: Showcase your skills

#### Final Project Deliverables
- [ ] Live deployed application with custom URL
- [ ] Professional README with screenshots
- [ ] 5-minute presentation of your work
- [ ] LinkedIn-ready project description

---

## 📚 Resources & References

### Essential Documentation
- **React Documentation**: [react.dev](https://react.dev)
- **TypeScript Handbook**: [typescriptlang.org](https://www.typescriptlang.org/docs)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com/docs)
- **Recharts**: [recharts.org](https://recharts.org)
- **Vite**: [vitejs.dev](https://vitejs.dev/guide)

### Helpful Tools
- **React Developer Tools**: Browser extension for debugging React
- **TypeScript Playground**: [typescriptlang.org/play](https://www.typescriptlang.org/play)
- **Tailwind CSS IntelliSense**: VS Code extension
- **Can I Use**: [caniuse.com](https://caniuse.com) - Browser compatibility

### Learning Resources
- **MDN Web Docs**: [developer.mozilla.org](https://developer.mozilla.org)
- **JavaScript.info**: [javascript.info](https://javascript.info)
- **React Tutorial**: [react.dev/learn](https://react.dev/learn)
- **TypeScript for Beginners**: [typescriptlang.org/docs/handbook/typescript-from-scratch.html](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)

### Practice Datasets
Use these CSV files to test your application:
- **Sample Sales Data**: [Download](./sample-data/sales.csv)
- **Student Grades**: [Download](./sample-data/grades.csv)
- **Weather Data**: [Download](./sample-data/weather.csv)
- **Stock Prices**: [Download](./sample-data/stocks.csv)

---

## 🛠️ Troubleshooting

### Common Setup Issues

#### "Command not found: node"
**Solution**: Node.js is not installed or not in your PATH
1. Download from [nodejs.org](https://nodejs.org)
2. Install the LTS version
3. Restart your terminal
4. Test with `node --version`

#### "npm install fails"
**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try legacy peer deps
npm install --legacy-peer-deps
```

#### "Port 5173 is already in use"
**Solution**: Use a different port
```bash
npm run dev -- --port 3000
```

### Common Development Issues

#### "Changes not showing in browser"
**Solutions**:
1. Save your file (Ctrl+S or Cmd+S)
2. Refresh browser (F5 or Ctrl+R)
3. Check browser console for errors
4. Restart development server

#### "Component not found" errors
**Solutions**:
1. Check file path and spelling
2. Ensure proper import statement
3. Check that export is correct
4. Verify file extension (.tsx for React components)

#### "TypeScript errors"
**Solutions**:
1. Check type definitions
2. Add proper type annotations
3. Use `any` type temporarily while learning
4. Install missing type packages: `npm install @types/[package-name]`

### Getting Help

#### During Class
- Ask questions immediately - don't wait!
- Help your classmates when you figure something out
- Use pair programming when stuck

#### Outside Class
- **Course Slack/Discord**: [Insert your communication channel]
- **Instructor Email**: [Insert instructor email]
- **Office Hours**: [Insert schedule]
- **Study Groups**: Form groups with classmates

---

## 🎯 Final Project Showcase

### Project Requirements
By Week 10, your Data Discovery Tool should have:

#### Core Features
- [ ] CSV file upload with validation
- [ ] Data processing and statistical analysis
- [ ] Interactive charts and visualizations
- [ ] Automated insight generation
- [ ] AI chat interface for data questions
- [ ] Professional error handling and loading states
- [ ] Responsive design for all devices
- [ ] Accessibility features

#### Technical Requirements
- [ ] Built with React and TypeScript
- [ ] Deployed live on the internet
- [ ] Professional documentation (README)
- [ ] Clean, commented code
- [ ] No console errors in production

#### Portfolio Requirements
- [ ] Professional presentation (5 minutes)
- [ ] Demo with real data
- [ ] Explanation of technical choices
- [ ] Discussion of learning journey
- [ ] Future improvement plans

### Success Metrics
After completing this course, you should be able to:
- **Build React applications** from scratch
- **Deploy web applications** to production
- **Work with APIs** and handle asynchronous operations
- **Process and visualize data** effectively
- **Write TypeScript** for type-safe development
- **Create accessible** and professional user interfaces
- **Present technical work** confidently

### Career Outcomes
Past students have:
- Added this project to their portfolio and resume
- Landed junior developer positions
- Built additional React applications independently
- Became mentors for future course cohorts
- Started freelance web development work

---

## 🎉 Congratulations!

You're about to embark on an amazing journey! In just 10 weeks, you'll go from React beginner to having a professional data analysis application deployed on the internet. 

Remember:
- **Progress over perfection** - focus on learning, not being perfect
- **Ask questions** - your instructors and classmates are here to help
- **Practice regularly** - a little coding each day goes a long way
- **Celebrate wins** - every working feature is an achievement!

Your future self will thank you for taking this step. Let's build something amazing! 🚀

---

*Last updated: September 2025*
*Course Version: 2.0*
*For questions about this guide, contact: [instructor-email]*
