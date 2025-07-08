
# Plug-N-Learn: Data Analysis Dashboard

A beginner-friendly project to learn React, TypeScript, and data visualization by building a CSV data analysis tool.

## 🚀 Getting Started

### How to Start the Project
```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open your browser to http://localhost:5173
```

That's it! You should see the app running.

## 📖 What You'll Build

You're building a **data dashboard** that:
- Lets users upload CSV files
- Shows the data in tables and charts
- Provides insights about the data
- Has an AI chat feature to ask questions about the data

## 🎯 What This Project Teaches You

### React Basics
- How to create components
- How to pass data between components
- How to handle user interactions (clicks, file uploads)
- How to manage state (data that changes)

### TypeScript
- Adding types to make your code more reliable
- Working with interfaces and type definitions
- Catching errors before they happen

### Data Visualization
- Creating charts from data
- Making data interactive and user-friendly
- Understanding different chart types

### Real-World Skills
- Reading and understanding existing code
- Working with APIs
- Handling file uploads
- Building responsive layouts

## 📅 10-Week Learning Plan

### Week 1: Get Familiar 🟢 EASY
**What you'll learn in class:**
- How React works (components, JSX)
- Project structure and file organization
- Using the terminal and development tools

**What you'll do:**
- Get the project running on your computer
- Explore the existing code
- Understand what each file does
- Make your first small change

**Files to look at:**
- `src/main.tsx` - Where the app starts
- `src/App.tsx` - The main app component
- `src/components/` - Individual pieces of the UI

### Week 2: Understand the Data Flow 🟢 EASY
**What you'll learn in class:**
- How data moves through a React app
- What props are and how to use them
- Basic JavaScript array and object manipulation

**What you'll do:**
- Look at `src/utils/dataAnalysis.ts`
- Understand how CSV data gets processed
- Add simple data calculations
- See how data flows to different components

**Key concept:** Data goes from file → processing → display

### Week 3: Work with Components 🟡 MEDIUM
**What you'll learn in class:**
- Component composition (building with smaller pieces)
- Conditional rendering (showing/hiding things)
- Event handling (clicks, form submissions)

**What you'll do:**
- Enhance the `DataTable` component
- Add sorting and filtering features
- Make the upload component more user-friendly
- Practice passing data between components

### Week 4: Add Interactivity 🟡 MEDIUM
**What you'll learn in class:**
- React state management
- Form handling
- User experience principles

**What you'll do:**
- Make the data table interactive
- Add search functionality
- Improve error handling
- Make the UI more responsive

### Week 5: Create Charts 🟡 MEDIUM
**What you'll learn in class:**
- Data visualization principles
- When to use different chart types
- Making charts responsive

**What you'll do:**
- Work with the Recharts library
- Create bar, line, and pie charts
- Make charts update when data changes
- Add chart customization options

### Week 6: Generate Insights 🟡 MEDIUM
**What you'll learn in class:**
- Basic statistics and data analysis
- Pattern recognition in data
- Communicating insights to users

**What you'll do:**
- Enhance the insights generation
- Add more statistical calculations
- Create better insight descriptions
- Make insights more actionable

### Week 7: Add AI Features 🔴 ADVANCED
**What you'll learn in class:**
- Working with APIs
- Async programming in JavaScript
- AI integration basics

**What you'll do:**
- Connect to an AI service (OpenAI/Anthropic)
- Make the chat interface work
- Send data context to the AI
- Handle API responses

### Week 8: Polish and Improve 🔴 ADVANCED
**What you'll learn in class:**
- Error handling strategies
- Performance optimization
- User experience improvements

**What you'll do:**
- Add loading states
- Improve error messages
- Add data export features
- Make the app more professional

### Week 9: Test and Debug 🔴 ADVANCED
**What you'll learn in class:**
- Testing strategies
- Debugging techniques
- Code quality principles

**What you'll do:**
- Test your app thoroughly
- Fix bugs and edge cases
- Improve code organization
- Add documentation

### Week 10: Deploy and Present 🔴 ADVANCED
**What you'll learn in class:**
- Deployment strategies
- Presentation skills
- Portfolio building

**What you'll do:**
- Deploy your app online
- Create a demo presentation
- Document your learning journey
- Celebrate your accomplishment!

## 🤔 What Each File Does

### Main App Files
- `src/App.tsx` - The main app that holds everything together
- `src/main.tsx` - Starts the React app (you won't need to change this much)
- `src/index.css` - Global styles for the whole app

### Components (UI Pieces)
- `src/components/DataUpload.tsx` - The file upload area
- `src/components/DataTable.tsx` - Shows data in a table
- `src/components/ChartSection.tsx` - Creates charts from data
- `src/components/InsightsPanel.tsx` - Shows interesting facts about data
- `src/components/ChatInterface.tsx` - AI chat feature
- `src/components/Dashboard.tsx` - Main dashboard that combines everything

### Utilities (Helper Functions)
- `src/utils/dataAnalysis.ts` - Functions that analyze and process data
- `src/types/data.ts` - TypeScript definitions for data structures

### UI Components
- `src/components/ui/` - Pre-built UI components (buttons, cards, etc.)

## 🆘 Need Help?

### If the app won't start:
1. Make sure you have Node.js installed
2. Run `npm install` to install dependencies
3. Check for error messages in the terminal

### If you're stuck on code:
1. Check the `HINTS.md` file for solutions
2. Look at the TODO comments in the code
3. Ask your instructor or classmates

### If you want to see a working example:
Switch to the `solution` branch to see completed features:
```bash
git checkout solution
```

## 🎉 What Success Looks Like

By the end of this project, you'll have:
- A working data analysis dashboard
- Understanding of React and TypeScript
- Experience with real-world development tools
- A portfolio project to show employers
- Confidence to build your own web applications

## 📚 Additional Resources

- [React Official Tutorial](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/en-US/)

---

**Remember:** This is a learning project! It's okay to make mistakes and ask questions. The goal is to understand, not to be perfect.
