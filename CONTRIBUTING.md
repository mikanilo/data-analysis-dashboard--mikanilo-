
# Contributing to Plug-N-Learn 🚀

Welcome to the Plug-N-Learn project! This guide will help you understand our development workflow, coding standards, and contribution process.

## 🎯 Project Overview

This is an educational project designed to teach modern web development through building a data analysis platform. Whether you're a student working through the weekly assignments or contributing improvements, this guide will help you succeed.

## 🌟 Getting Started

### Prerequisites
- Node.js 18+ 
- Git basics ([Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf))
- Basic React knowledge ([React Docs](https://react.dev/learn))
- TypeScript fundamentals ([TypeScript Handbook](https://www.typescriptlang.org/docs/))

### Initial Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd plug-n-learn

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🌳 Branching Strategy

We use a simplified Git flow perfect for learning:

### Branch Types
- `main` - Production-ready code (starter template)
- `solution` - Complete working implementation (reference for students)
- `week-X` - Weekly assignment branches
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes

### Branch Naming Convention
```bash
# Weekly assignments
week-1-setup
week-2-data-analysis
week-3-ui-components

# Features
feature/ai-integration
feature/chart-export
feature/user-authentication

# Bug fixes
fix/data-parsing-error
fix/chart-responsiveness
```

### Workflow Example
```bash
# Start new weekly assignment
git checkout main
git pull origin main
git checkout -b week-2-data-analysis

# Make your changes...
git add .
git commit -m "feat: implement basic data parsing"
git push origin week-2-data-analysis

# Create pull request for review
```

## 📝 Commit Message Standards

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear history:

### Format
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code formatting (no functional changes)
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Examples
```bash
# Good commits
git commit -m "feat(data): add CSV parsing with error handling"
git commit -m "fix(charts): resolve pie chart data formatting issue"
git commit -m "docs: add setup instructions for Week 1"
git commit -m "refactor(utils): extract data analysis to separate module"

# Poor commits (avoid these)
git commit -m "fixed stuff"
git commit -m "updates"
git commit -m "working version"
```

## 🎨 Code Style Guide

### TypeScript Standards
```typescript
// ✅ Good - Clear interfaces
interface DataRow {
  [key: string]: string | number | boolean | null;
}

// ✅ Good - Descriptive function names
const generateDataInsights = (data: DataRow[]): DataInsight[] => {
  // Implementation
};

// ❌ Avoid - Generic types without context
const processData = (data: any): any => {
  // Implementation
};
```

### React Best Practices
```tsx
// ✅ Good - Props interface
interface ChartProps {
  data: DataRow[];
  showAll?: boolean;
}

const Chart = ({ data, showAll = false }: ChartProps) => {
  // Use descriptive variable names
  const numericColumns = useMemo(() => 
    getNumericColumns(data), [data]
  );

  return (
    <div>
      {/* Clear conditional rendering */}
      {numericColumns.length > 0 ? (
        <ChartComponent data={data} />
      ) : (
        <EmptyState message="No numeric data found" />
      )}
    </div>
  );
};
```

### CSS/Styling Guidelines
```tsx
// ✅ Good - Semantic Tailwind classes
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900">Chart Title</h2>
  <div className="h-64 w-full">
    {/* Chart content */}
  </div>
</div>

// ❌ Avoid - Unclear or overly complex classes
<div className="flex flex-col gap-4 p-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
```

## 🧪 Testing Guidelines

### Unit Tests
```typescript
// Example test structure
describe('generateDataInsights', () => {
  it('should return empty array for empty data', () => {
    const result = generateDataInsights([]);
    expect(result).toEqual([]);
  });

  it('should detect numeric columns correctly', () => {
    const data = [{ name: 'John', age: 25 }];
    const result = generateDataInsights(data);
    expect(result).toContainEqual(
      expect.objectContaining({
        type: 'summary',
        title: expect.stringContaining('age')
      })
    );
  });
});
```

## 📋 Pull Request Process

### Before Submitting
- [ ] Code follows style guidelines
- [ ] All tests pass (`npm test`)
- [ ] No console errors in development
- [ ] Changes are well-documented
- [ ] Commit messages follow convention

### PR Template
```markdown
## 📝 Description
Brief description of changes and motivation.

## 🎯 Type of Change
- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 📚 Documentation update
- [ ] 🔧 Refactoring
- [ ] 🧪 Tests

## 🧪 Testing
- [ ] Tested manually
- [ ] Added unit tests
- [ ] No breaking changes

## 📱 Screenshots (if applicable)
Include screenshots for UI changes.

## 📚 Learning Notes
What did you learn while working on this? (For student PRs)
```

### Review Process
1. **Self-review** - Check your own code first
2. **Automated checks** - Ensure builds pass
3. **Peer review** - Get feedback from classmates/instructors
4. **Address feedback** - Make requested changes
5. **Merge** - Squash and merge when approved

## 🎓 Educational Workflow

### For Students
```bash
# Weekly assignment workflow
git checkout main
git pull origin main
git checkout -b week-X-assignment

# Work through the week's tasks
# Commit frequently with descriptive messages
git add .
git commit -m "feat(week-X): implement data upload component"

# Push and create PR for review
git push origin week-X-assignment
```

### For Instructors
```bash
# Create solution branches
git checkout -b solution/week-X
# Implement complete solution
git commit -m "solution: complete Week X implementation"
git push origin solution/week-X
```

## 🆘 Getting Help

### Before Asking for Help
1. **Check the documentation** - README, code comments, TODOs
2. **Search existing issues** - Your question might be answered
3. **Try debugging** - Use console.logs, React DevTools
4. **Check the solution branch** - For reference (don't copy!)

### How to Ask for Help
```markdown
**What I'm trying to do:**
Implement the data parsing function for Week 2

**What I expected:**
CSV should parse into array of objects

**What actually happened:**
Getting "Cannot read property 'split' of undefined"

**Code I'm working with:**
```typescript
// Include relevant code snippet
```

**What I've tried:**
- Checked if file is being read correctly
- Added console.logs to debug
- Reviewed the TODO comments
```

### Support Channels
- **GitHub Issues** - Technical problems, bugs
- **Discord/Slack** - Quick questions, discussions
- **Office Hours** - Complex problems, architecture decisions
- **Peer Programming** - Work together on challenging features

## 🏆 Recognition

We celebrate contributions! Students who excel will be featured:
- **GitHub Contributions Graph** - Consistent commits
- **Weekly Highlights** - Best implementations
- **Final Showcase** - Outstanding projects
- **Recommendation Letters** - For exceptional work

## 📚 Resources

### Learning Materials
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Git Tutorial](https://learngitbranching.js.org/)
- [Recharts Examples](https://recharts.org/en-US/examples)

### Tools
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [VS Code Extensions](https://marketplace.visualstudio.com/)
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Importer

### AI Integration Resources (Week 7-8)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)

## 🎉 Final Notes

Remember: 
- **Learning > Perfect Code** - Mistakes are part of the process
- **Ask Questions** - No question is too basic
- **Help Others** - Teaching reinforces your own learning
- **Document Your Journey** - Keep notes on what you learn
- **Have Fun!** - Building cool stuff should be enjoyable

Happy coding! 🚀
```

Now let's update the README with comprehensive hints and resources:

<lov-write file_path="README.md">
# Plug-N-Learn: Data Insight Engine

A comprehensive data analysis and visualization platform built with React, TypeScript, and modern web technologies. This project is designed as a 10-week educational journey for beginner to intermediate students.

## 🎯 Project Overview

Plug-N-Learn allows users to upload CSV datasets and instantly discover insights through interactive charts, automated analysis, and AI-powered conversations about their data.

## 🛠 Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Charts**: Recharts
- **Data Handling**: Custom utilities for CSV parsing and analysis
- **AI Integration**: Placeholder for OpenAI/Anthropic API integration (Week 7-8)

## 📚 Two Learning Paths

### Core Path (Beginner to Intermediate) 🟢
Basic web development concepts with essential features

### Advanced Path (Intermediate to Advanced) 🔴
Everything in Core Path + advanced topics like API validation, security, testing, and deployment

## 🗓 Weekly Breakdown

### Week 1: Project Foundation 🟢
**Core Path:**
- [ ] Set up development environment (Node.js, npm/yarn) 
- [ ] Clone and run the project locally
- [ ] Understand project structure and file organization
- [ ] Basic React concepts review
- [ ] **TODO**: Complete setup in [`src/main.tsx`](src/main.tsx)

<details>
<summary>💡 Hint for Week 1</summary>

**Getting Started Checklist:**
1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open `http://localhost:5173` in your browser

**Understanding the Code:**
- `src/main.tsx` is your app's entry point
- Look for TODO comments throughout the codebase
- Start with the 🟢 Easy tasks first

**Common Issues:**
- Port already in use? Try `npm run dev -- --port 3001`
- Dependency errors? Delete `node_modules` and run `npm install` again

</details>

**Advanced Path (Additional):** 🔴
- [ ] Configure custom domain and deployment pipeline
- [ ] Set up comprehensive app scaffolding  
- [ ] Understand build tools and bundling process

**Resources:**
- [React Basics Tutorial](https://react.dev/learn)
- [TypeScript in 5 Minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Vite Guide](https://vitejs.dev/guide/)

---

### Week 2: API Development 🟡
**Core Path:**
- [ ] Understand data flow in the application
- [ ] Work with CSV parsing utilities
- [ ] Basic HTTP concepts and data fetching
- [ ] **TODO**: Enhance data parsing in [`src/utils/dataAnalysis.ts`](src/utils/dataAnalysis.ts)

<details>
<summary>💡 Hint for Week 2</summary>

**Data Analysis Tasks:**
1. Look for TODO comments in `dataAnalysis.ts`
2. Start with the `getDataSummary` function
3. Test with sample CSV data
4. Add error handling for malformed data

**Key Concepts:**
- Array methods: `map()`, `filter()`, `reduce()`
- Type detection: `typeof`, `isNaN()`
- Statistical calculations: mean, median, mode

**Testing Your Code:**
```javascript
// Test with sample data
const sampleData = [
  { name: 'John', age: 25, score: 85 },
  { name: 'Jane', age: 30, score: 92 }
];
console.log(getDataSummary(sampleData));
```

</details>

**Advanced Path (Additional):** 🔴
- [ ] Implement API routes with proper schema validation
- [ ] Add request/response validation using Zod
- [ ] Error handling and status codes

**Resources:**
- [MDN Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JavaScript Data Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [CSV Format Specification](https://tools.ietf.org/html/rfc4180)

---

### Week 3: Layout and Navigation 🟢
**Core Path:**
- [ ] Component composition and props
- [ ] React Router setup and navigation  
- [ ] Responsive design with Tailwind CSS
- [ ] **TODO**: Enhance navigation in [`src/components/Dashboard.tsx`](src/components/Dashboard.tsx)

<details>
<summary>💡 Hint for Week 3</summary>

**UI Development Focus:**
1. Study the existing component structure
2. Learn Tailwind CSS utility classes
3. Make components responsive (mobile-first)
4. Add proper error states and loading indicators

**Tailwind Cheat Sheet:**
- `flex flex-col` - Vertical layout
- `grid grid-cols-2` - Two-column grid
- `space-y-4` - Vertical spacing
- `md:hidden` - Hide on medium screens and up

**Component Best Practices:**
- Keep components small and focused
- Use TypeScript interfaces for props
- Add proper accessibility attributes

</details>

**Advanced Path (Additional):** 🔴
- [ ] Implement secured routes with authentication
- [ ] Advanced error handling and user feedback
- [ ] Route guards and protected pages

**Resources:**
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [Responsive Design Principles](https://web.dev/responsive-web-design-basics/)

---

### Week 4: Data Display 🟡  
**Core Path:**
- [ ] Dynamic data rendering with React
- [ ] Table components and data tables
- [ ] Conditional rendering based on data
- [ ] **TODO**: Enhance data display in [`src/components/DataTable.tsx`](src/components/DataTable.tsx)

<details>
<summary>💡 Hint for Week 4</summary>

**Data Display Challenges:**
1. Handle large datasets efficiently
2. Add sorting and filtering capabilities
3. Implement proper loading states
4. Show meaningful empty states

**Performance Tips:**
- Use `useMemo` for expensive calculations
- Implement virtual scrolling for large datasets
- Debounce search inputs

**Accessibility:**
- Add proper table headers
- Use ARIA labels for screen readers
- Ensure keyboard navigation works

</details>

**Advanced Path (Additional):** 🔴
- [ ] Advanced data transformation and processing
- [ ] Real-time data updates and streaming
- [ ] Performance optimization for large datasets

**Resources:**
- [React Table Documentation](https://tanstack.com/table/v8)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [JavaScript Performance Tips](https://developer.mozilla.org/en-US/docs/Web/Performance)

---

### Week 5: User Interaction 🟡
**Core Path:**
- [ ] Form handling and user input
- [ ] File upload functionality
- [ ] State management with useState and useEffect
- [ ] **TODO**: Enhance user interactions in [`src/components/DataUpload.tsx`](src/components/DataUpload.tsx)

<details>
<summary>💡 Hint for Week 5</summary>

**File Upload Implementation:**
1. Use HTML5 File API
2. Validate file types and sizes
3. Show upload progress
4. Handle upload errors gracefully

**State Management:**
- When to use `useState` vs `useEffect`
- Managing form state effectively
- Handling async operations

**User Experience:**
- Drag and drop functionality
- Clear error messages
- Loading indicators
- Success feedback

</details>

**Advanced Path (Additional):** 🔴
- [ ] Implement async processing with Web Workers
- [ ] Advanced state management patterns
- [ ] Optimistic updates and loading states

**Resources:**
- [File API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/File)
- [React Hooks Guide](https://react.dev/reference/react)
- [Form Validation Best Practices](https://ux.stackexchange.com/questions/65089/best-practices-for-form-validation)

---

### Week 6: Data Visualization 🟡
**Core Path:**
- [ ] Chart integration with Recharts
- [ ] Different chart types (bar, line, pie)
- [ ] Dynamic chart generation based on data
- [ ] **TODO**: Add more chart types in [`src/components/ChartSection.tsx`](src/components/ChartSection.tsx)

<details>
<summary>💡 Hint for Week 6</summary>

**Chart Implementation:**
1. Study existing bar chart implementation
2. Add line charts for trends
3. Implement pie charts for categories
4. Make charts responsive

**Chart Selection Logic:**
- Bar charts: Comparing categories
- Line charts: Showing trends over time
- Pie charts: Showing proportions
- Scatter plots: Showing correlations

**Recharts Tips:**
```jsx
// Responsive container is crucial
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="value" fill="#8884d8" />
  </BarChart>
</ResponsiveContainer>
```

</details>

**Advanced Path (Additional):** 🔴
- [ ] Advanced chart customization and interactions
- [ ] Data export and sharing features
- [ ] Custom visualization components

**Resources:**
- [Recharts Documentation](https://recharts.org/en-US/)
- [Chart.js Examples](https://www.chartjs.org/docs/latest/samples/)
- [Data Visualization Best Practices](https://www.tableau.com/learn/articles/data-visualization)

---

### Week 7: AI Integration & Insights 🔴
**Core Path:**
- [ ] Basic AI concepts and API integration  
- [ ] Chat interface for data questions
- [ ] Automated insight generation
- [ ] **TODO**: Implement AI responses in [`src/components/ChatInterface.tsx`](src/components/ChatInterface.tsx)

<details>
<summary>💡 Hint for Week 7</summary>

**AI Integration Steps:**
1. Choose an AI provider (OpenAI, Anthropic)
2. Set up API credentials (use environment variables)
3. Create API endpoint for chat
4. Implement streaming responses (optional)

**API Integration Pattern:**
```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: userInput,
    dataContext: relevantData
  })
});
```

**Environment Variables:**
- Create `.env.local` file
- Add `OPENAI_API_KEY=your_key_here`
- Never commit API keys to version control!

</details>

**Advanced Path (Additional):** 🔴
- [ ] Connect to third-party AI services (OpenAI, Anthropic)
- [ ] Advanced prompt engineering
- [ ] Context-aware AI responses

**Resources:**
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [Environment Variables in Vite](https://vitejs.dev/guide/env-and-mode.html)

---

### Week 8: Enhanced Features 🟡
**Core Path:**
- [ ] Polish UI/UX and accessibility
- [ ] Error handling and user feedback
- [ ] Data export functionality
- [ ] **TODO**: Add export features in [`src/components/Dashboard.tsx`](src/components/Dashboard.tsx)

<details>
<summary>💡 Hint for Week 8</summary>

**Polish Checklist:**
1. Test on different screen sizes
2. Add loading states everywhere
3. Implement proper error boundaries
4. Add keyboard navigation support

**Export Functionality:**
- CSV export for filtered data
- PNG export for charts
- PDF export for reports
- Share links for insights

**Accessibility Audit:**
- Use tools like axe-core
- Test with screen readers
- Ensure proper contrast ratios
- Add focus indicators

</details>

**Advanced Path (Additional):** 🔴
- [ ] Comprehensive testing suite (unit, integration)
- [ ] Performance monitoring and analytics
- [ ] Advanced error tracking

**Resources:**
- [Web Accessibility Checklist](https://webaim.org/resources/evalquickref/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Performance Monitoring](https://web.dev/vitals/)

---

### Week 9: Testing & Polish 🟢
**Core Path:**
- [ ] Manual testing and bug fixes
- [ ] UI polish and final touches
- [ ] Performance optimization
- [ ] Documentation updates

<details>
<summary>💡 Hint for Week 9</summary>

**Testing Strategy:**
1. Create test data scenarios
2. Test edge cases (empty data, large files)
3. Cross-browser testing
4. Mobile device testing

**Performance Optimization:**
- Use React DevTools Profiler
- Optimize re-renders with `useMemo`
- Implement code splitting
- Compress images and assets

**Documentation:**
- Update README with setup instructions
- Add code comments for complex logic
- Create user guide for the application

</details>

**Advanced Path (Additional):** 🔴
- [ ] Automated testing pipeline
- [ ] Code coverage and quality metrics
- [ ] Advanced performance optimization

---

### Week 10: Deployment & Demo 🟢
**Core Path:**
- [ ] Prepare demo presentation
- [ ] Deploy to hosting platform
- [ ] Create demo video/presentation  
- [ ] Submit final project

<details>
<summary>💡 Hint for Week 10</summary>

**Deployment Options:**
- **Vercel**: Easy deployment for React apps
- **Netlify**: Great for static sites
- **GitHub Pages**: Free hosting for open source

**Demo Preparation:**
1. Prepare interesting sample datasets
2. Create a compelling story with your data
3. Practice explaining your code
4. Record a demo video

**Deployment Checklist:**
- Remove console.logs
- Set up environment variables
- Test production build locally
- Monitor for errors after deployment

</details>

**Advanced Path (Additional):** 🔴
- [ ] Production deployment with CI/CD
- [ ] Monitoring and observability setup
- [ ] Performance benchmarking

**Resources:**
- [Vercel Deployment Guide](https://vercel.com/docs/deployments/overview)
- [Netlify Documentation](https://docs.netlify.com/)
- [Creating Effective Demos](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

---

## 🤖 AI Integration Details

The project includes a chat interface ([`src/components/ChatInterface.tsx`](src/components/ChatInterface.tsx)) that currently shows a placeholder response. Students will implement actual AI integration in weeks 7-8:

### For Students:
1. **Week 7**: Set up API integration with OpenAI or Anthropic
2. **Week 8**: Implement context-aware responses using the uploaded data
3. **Advanced**: Add prompt engineering and conversation memory

### Current AI Features:
- ✅ Chat interface UI
- ✅ Message history management
- ⏳ AI API integration (students implement)
- ⏳ Data-aware responses (students implement)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher) - [Download here](https://nodejs.org/)
- npm or yarn - [Installation guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Basic knowledge of React and TypeScript - [Learning resources](#📚-learning-resources)

### Installation
```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd plug-n-learn

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## ✏️ Editing This Project

### Using Lovable (Recommended for Students)
This project can be edited directly in Lovable, an AI-powered web development platform:

1. **Fork/Remix**: Create your own copy of this project in Lovable
2. **Live Preview**: See changes instantly in the right panel as you make edits
3. **AI Assistance**: Chat with the AI to implement features and fix issues
4. **GitHub Integration**: Connect to GitHub for version control and collaboration

**To edit this project in Lovable:**
1. Click the "Edit in Lovable" button (if available)
2. Or visit [lovable.dev](https://lovable.dev) and import this project
3. Connect your GitHub account for version control

### Local Development
If you prefer to use your own IDE:
1. Clone the repository locally
2. Set up the development environment as described above
3. Use your preferred code editor (VS Code, WebStorm, etc.)
4. Connect to GitHub for version control

**Recommended VS Code Extensions:**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag

## 📁 Project Structure

```
src/
├── components/              # React components
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── ChatInterface.tsx   # 🔴 AI chat component (Week 7-8)
│   ├── ChartSection.tsx    # 🟡 Data visualization (Week 6)
│   ├── Dashboard.tsx       # 🟢 Main dashboard (Week 3)
│   ├── DataTable.tsx       # 🟡 Data display table (Week 4)
│   ├── DataUpload.tsx      # 🟡 File upload component (Week 5)
│   └── InsightsPanel.tsx   # 🟡 Automated insights display (Week 4-5)
├── pages/                  # Page components
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
│   └── dataAnalysis.ts     # 🟡 Data processing utilities (Week 2)
└── hooks/                  # Custom React hooks
```

## 🎓 Learning Objectives

By the end of this project, students will understand:
- Modern React development with TypeScript
- Component-based architecture  
- Data visualization and analysis
- API integration and async programming
- UI/UX design principles
- Testing and deployment strategies (Advanced path)

## 🆘 How to Get Help

### 🤝 Support Channels
- **GitHub Issues** - For bugs and technical problems
- **Discussions** - For questions and general help
- **Discord/Slack** - Quick questions and peer support
- **Office Hours** - Complex problems and architecture decisions

### 📋 Before Asking for Help
1. **Check existing issues** - Your question might already be answered
2. **Review the code comments** - Look for TODO hints and explanations
3. **Try debugging** - Use console.log, React DevTools
4. **Check the documentation** - README, contributing guide, code comments

### 🎯 How to Report Issues
```markdown
**What I'm trying to do:**
Brief description of your goal

**Expected behavior:**
What should happen

**Actual behavior:**  
What actually happens

**Steps to reproduce:**
1. Step one
2. Step two
3. Step three

**Code sample:**
```typescript
// Include relevant code
```

**Environment:**
- OS: [e.g., Windows 10, macOS 12]
- Browser: [e.g., Chrome 91, Firefox 89]
- Node version: [run `node --version`]
```

## 🔧 Technologies Deep Dive

### Frontend Stack
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type safety and better developer experience  
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality component library

### Data & Visualization
- **Recharts**: Powerful charting library for React
- **Custom CSV Parser**: Handle various data formats
- **Data Analysis Utils**: Statistical calculations and insights

### Future Enhancements (Student Implementation)
- **AI Integration**: OpenAI/Anthropic for intelligent data analysis
- **Backend**: Supabase for authentication and data storage
- **Advanced Charts**: Custom visualizations and interactions

## 📚 Learning Resources

### 🟢 Beginner Resources
- [React Tutorial](https://react.dev/learn/tutorial-tic-tac-toe) - Interactive tutorial
- [JavaScript Fundamentals](https://javascript.info/) - Comprehensive guide
- [CSS Flexbox Game](https://flexboxfroggy.com/) - Learn flexbox through games
- [Git Basics](https://learngitbranching.js.org/) - Interactive git tutorial

### 🟡 Intermediate Resources  
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Official documentation
- [React Patterns](https://reactpatterns.com/) - Common React patterns
- [Tailwind Components](https://tailwindui.com/components) - UI component examples
- [API Design Guide](https://restfulapi.net/) - REST API best practices

### 🔴 Advanced Resources
- [React Performance](https://react.dev/learn/render-and-commit) - Optimization techniques
- [Testing JavaScript](https://testingjavascript.com/) - Comprehensive testing guide
- [Web Security](https://owasp.org/www-project-top-ten/) - Security best practices
- [System Design](https://github.com/donnemartin/system-design-primer) - Architecture patterns

### 📺 Video Tutorials
- [React Crash Course](https://www.youtube.com/watch?v=Dorf8i6lCuk) - 2 hour overview
- [TypeScript for Beginners](https://www.youtube.com/watch?v=BwuLxPH8IDs) - 1 hour intro  
- [Tailwind CSS Tutorial](https://www.youtube.com/watch?v=pfaSUYaSgRo) - Complete guide
- [Git & GitHub](https://www.youtube.com/watch?v=RGOj5yH7evk) - Version control basics

## 📝 Weekly Assignments

Each week includes:
- **📖 Concept Review**: Key topics and terminology
- **💻 Hands-on Coding**: Practical implementation tasks  
- **👥 Code Review**: Peer review and feedback
- **🎯 Mini-Project**: Weekly deliverable

### Assignment Submission
1. Create a branch for your weekly work
2. Complete the TODO items for that week
3. Commit your changes with descriptive messages
4. Create a pull request for review
5. Address feedback and iterate

## 🎯 Final Project Requirements

### Core Path Deliverables: 🟢
1. ✅ Fully functional data upload and visualization
2. ✅ Interactive charts and data tables
3. ✅ Basic AI chat interface  
4. ✅ Deployed application with demo

### Advanced Path Deliverables: 🔴
1. ✅ Everything from Core Path
2. ✅ API validation and security
3. ✅ Comprehensive testing suite
4. ✅ Production deployment with monitoring

## 🤝 Contributing

Students should:
1. Fork the repository
2. Create feature branches for weekly assignments  
3. Submit pull requests for code review
4. Document their learning journey

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📞 Support

- **Office Hours**: Tuesdays & Thursdays 2-4 PM EST
- **Discussion Forum**: [GitHub Discussions](../../discussions)
- **Code Review**: Weekly sessions Fridays 1-3 PM EST
- **Emergency Help**: Create an issue with "urgent" label

## 📄 License

This project is for educational purposes. See LICENSE file for details.

---

**Happy Coding!** 🚀

Remember: The goal is not just to complete the project, but to understand the underlying concepts and build confidence in modern web development.

### 🌟 Success Tips
- **Start Early** - Don't wait until the last minute
- **Ask Questions** - No question is too basic
- **Help Others** - Teaching reinforces learning
- **Document Progress** - Keep notes on what you learn
- **Celebrate Wins** - Acknowledge your progress!

### 🏆 Hall of Fame
Outstanding student projects will be featured here:
- 🥇 **Best Overall Project**: TBD
- 🎨 **Best UI/UX**: TBD  
- 🤖 **Most Creative AI Integration**: TBD
- 🚀 **Best Performance Optimization**: TBD
