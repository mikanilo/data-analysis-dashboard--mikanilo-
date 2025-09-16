# 🎓 WEEK 1: COMPLETE STUDENT GUIDE
**React Fundamentals & Foundation Building**

## 📅 This Week's Mission
Get your development environment set up and make your first React component modifications. By the end of this week, you'll have a working data analysis application running on your computer and understand the core concepts of React development!

## 🎯 Learning Objectives
- Understand React component structure
- Practice reading and modifying existing code
- Learn about props and state basics
- Explore the project file structure
- Have the project running locally on your machine
- Know the difference between JSX and regular HTML
- Be able to identify props in existing code
- Make your first code modification successfully

---

## 🚀 Pre-Session Setup

### Required Software Check
Before class, make sure you have these installed:

#### 1. Node.js (JavaScript Runtime)
```bash
# Test if installed
node --version
# Should show v18.x.x or higher
```
**If not installed**: Download from [nodejs.org](https://nodejs.org) (LTS version)

#### 2. Git (Version Control)
```bash
# Test if installed
git --version
# Should show git version 2.x.x
```
**If not installed**: Download from [git-scm.com](https://git-scm.com)

#### 3. VS Code (Code Editor)
**Download**: [code.visualstudio.com](https://code.visualstudio.com)

**Required Extensions**:
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- Auto Rename Tag
- Bracket Pair Colorizer

#### 4. GitHub Account
**Create account**: [github.com](https://github.com)

### Project Setup
```bash
# 1. Clone the starter project
git clone https://github.com/bvcc-swe/data-discovery-plug.git
cd data-discovery-plug

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser to http://localhost:5173
```

**✅ Success Check**: You should see "Plug-N-Learn" homepage with a file upload area.

---

## 📚 Key Concepts Explained

### What is a React Component?
Think of components like LEGO blocks:
- Each component has **one specific job**
- You can **reuse** components anywhere in your app
- You **combine** smaller components to build bigger features

**Example**: The `DataUpload` component's only job is handling file uploads.

### JSX vs HTML
JSX looks like HTML but it's actually JavaScript:

```jsx
// JSX (what we write)
<button onClick={handleClick}>Upload File</button>

// What JSX becomes (pure JavaScript)
React.createElement('button', { onClick: handleClick }, 'Upload File')
```

**Key Difference**: JSX lets you mix HTML-like syntax with JavaScript logic.

### Props (Properties)
Props are how components talk to each other:
```jsx
// Parent component passes data
<DataUpload onDataLoad={handleDataLoad} />

// Child component receives data
const DataUpload = ({ onDataLoad }) => {
  // Use the onDataLoad function here
}
```

---

## 📚 Exercise 1: Customize Your App Title
**Difficulty:** ⭐ Easy  
**Time:** 10 minutes

### Task
Personalize the main title in `src/pages/Index.tsx` to include your name.

### Steps
1. Open `src/pages/Index.tsx`
2. Find line 52-54 with the main title
3. Change "Plug-N-Learn" to "[Your Name]'s Data Hub"
4. Save and observe the changes in the preview

### Success Criteria
- [ ] Title displays your personal name
- [ ] Styling remains unchanged
- [ ] No console errors appear

### Learning Focus
Understanding JSX and how React renders content.

---

## 📚 Exercise 2: Add a Personal Subtitle
**Difficulty:** ⭐ Easy  
**Time:** 15 minutes

### Task
Add your own custom subtitle below the main description.

### Steps
1. In `src/pages/Index.tsx`, find the description paragraph (lines 56-58)
2. Add a new paragraph after it with your own message
3. Use the same styling classes: `text-lg text-slate-500 max-w-2xl mx-auto`
4. Make it personal! Example: "Built by [Your Name] - Future Data Scientist"

### Success Criteria
- [ ] New subtitle appears below the main description
- [ ] Uses consistent styling with existing text
- [ ] Appears properly centered and styled

### Learning Focus
JSX structure and CSS class application.

---

## 📚 Exercise 3: Explore Component Props
**Difficulty:** ⭐⭐ Medium  
**Time:** 20 minutes

### Task
Examine how the `DataUpload` component receives and uses props.

### Investigation Questions
1. What props does `DataUpload` expect? (Check the interface)
2. How is the `onDataLoad` function passed from parent to child?
3. What happens when you upload a CSV file?

### Steps
1. Open `src/components/DataUpload.tsx`
2. Find the `DataUploadProps` interface (line 21)
3. Trace how `onDataLoad` is used in the component
4. Look at how it's called in `Index.tsx` (line 121)

### Success Criteria
- [ ] Can identify the prop interface
- [ ] Understand the data flow from child to parent
- [ ] Can explain what `onDataLoad` does

### Learning Focus
React props, interfaces, and parent-child communication.

---

## 📚 Exercise 4: State Management Investigation
**Difficulty:** ⭐⭐ Medium  
**Time:** 25 minutes

### Task
Analyze the state management in the main `Index` component.

### Investigation Checklist
- [ ] Identify all `useState` hooks in `Index.tsx`
- [ ] Understand what data each state variable stores
- [ ] Trace how state changes when a file is uploaded
- [ ] Find where the conditional rendering happens (data vs. no data)

### Questions to Answer
1. What are the two main pieces of state being managed?
2. What triggers the state to change?
3. How does the UI change based on state?

### Success Criteria
- [ ] Can list all state variables and their purposes
- [ ] Understand the conditional rendering logic
- [ ] Can predict UI changes based on state changes

### Learning Focus
React hooks, state management, and conditional rendering.

---

## 🛠️ Additional Hands-On Tasks

### Task A: Explore the File Structure
Open these files and see how they connect:
```
src/
├── App.tsx              # Main app container
├── pages/Index.tsx      # Homepage component
└── components/
    ├── DataUpload.tsx   # File upload feature
    ├── Dashboard.tsx    # Main dashboard
    └── ui/              # Reusable UI pieces
```

### Task B: Experiment with Styling
**Try changing colors**:
1. Look for `"blue-600"` in any file
2. Change it to `"purple-600"` or `"green-600"`
3. See what changes in your browser!

---

## 📊 Sample Data for Testing
Download and save these CSV files to test your app:

### Beginner Dataset: Simple Sales
**File**: `week1-simple-sales.csv`
```csv
Product,Sales,Month
T-Shirts,150,January
Jeans,200,January
Shoes,175,January
T-Shirts,180,February
Jeans,220,February
Shoes,160,February
```

**How to use**: 
1. Copy the data above
2. Save as `week1-simple-sales.csv` on your desktop
3. Try uploading it to your app

---

## 🔍 Self-Assessment Quiz

### Question 1
What does JSX stand for and why is it useful?
- [ ] A. JavaScript XML - allows HTML-like syntax in JavaScript
- [ ] B. JavaScript Extension - adds new features to JavaScript  
- [ ] C. Java Syntax Extension - connects Java and JavaScript
- [ ] D. JSON XML - converts between data formats

### Question 2
In React, what is a "prop"?
- [ ] A. A CSS property for styling components
- [ ] B. Data passed from parent component to child component
- [ ] C. A JavaScript function that returns HTML
- [ ] D. A file that contains component code

### Question 3
What happens when you call a `setState` function in React?
- [ ] A. The component immediately re-renders
- [ ] B. The component schedules a re-render for the next cycle
- [ ] C. The entire page refreshes
- [ ] D. Nothing happens until you manually refresh

### Answer Key
1. A - JSX allows HTML-like syntax in JavaScript
2. B - Props are data passed from parent to child
3. B - setState schedules a re-render for the next cycle

---

## 🏆 Challenge Exercise: Add a Footer
**Difficulty:** ⭐⭐⭐ Advanced  
**Time:** 30 minutes

### Task
Add a footer component to the bottom of your app with your name and the current year.

### Requirements
- Create the footer inside the main container
- Include your name and copyright notice
- Use consistent styling with the rest of the app
- Make it stick to the bottom of the page

### Bonus Points
- Add social media links (can be placeholder)
- Include a "Built with React" message
- Make the footer responsive

### Learning Focus
Component creation, styling, and layout management.

---

## 🏠 Homework Assignments

### Required Tasks
- [ ] **Task 1**: Complete all 4 structured exercises above
- [ ] **Task 2**: Change one more piece of text in the application
- [ ] **Task 3**: Try changing a different color (find `"gray-"` and change the number)
- [ ] **Task 4**: Explore `src/components/Dashboard.tsx` and identify 3 different components being used

### Stretch Goals (Optional)
- [ ] **Challenge 1**: Find where the page title (browser tab) is set and change it
- [ ] **Challenge 2**: Add your name to the footer or header
- [ ] **Challenge 3**: Create a simple CSV file with your own data to test
- [ ] **Challenge 4**: Complete the footer challenge exercise

---

## 📝 Reflection Questions
Write answers to these (bring to next class):
1. What was the most challenging part of today's exercises?
2. Which concept (JSX, props, state) do you want to explore more?
3. How comfortable do you feel reading existing React code?
4. What questions do you have about the project structure?
5. What's the difference between a component and regular HTML?
6. How do props help components work together?
7. What happens when you save a file - how does the browser update?

---

## 🆘 Troubleshooting

### "npm run dev" isn't working
```bash
# Try these steps:
npm cache clean --force
rm -rf node_modules
npm install
npm run dev
```

### Browser shows errors
1. Check the terminal for red error messages
2. Look at browser console (F12 → Console tab)
3. Make sure you saved your files

### Changes not showing
1. Save your file (Ctrl+S or Cmd+S)
2. Refresh browser (F5)
3. Check if development server is still running

---

## 🎯 Success Criteria
By the end of Week 1, you should:
- ✅ Have the app running without errors
- ✅ Successfully completed at least 3 of the 4 structured exercises
- ✅ Made at least 2 text changes
- ✅ Understand the basic file structure
- ✅ Know what components, JSX, and props are
- ✅ Feel comfortable making small changes
- ✅ Can identify prop interfaces
- ✅ Understand conditional rendering logic
- ✅ Can predict UI changes based on state changes

---

## 🔗 Additional Resources
- [React Documentation - Components and Props](https://react.dev/learn/passing-props-to-a-component)
- [React Documentation - State](https://react.dev/learn/state-a-components-memory)
- [JSX Introduction](https://react.dev/learn/writing-markup-with-jsx)

---

## 📞 Getting Help
- **During class**: Ask questions immediately!
- **Slack/Discord**: [Your class channel]
- **Email instructor**: [Instructor email]
- **Study buddy**: Partner with a classmate

---

**Next Week Preview**: We'll learn about React state - how to make components remember and change data. You'll build your first interactive feature! 🚀

*Week 1 Comprehensive Guide - Updated September 2025*