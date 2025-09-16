# 📋 WEEK 1 INSTRUCTOR PACKET
**Session 1: Project Setup & React Basics**

## 🎯 LEARNING OBJECTIVES
By the end of this session, students will:
- ✅ Have the project running locally on their machines
- ✅ Understand what React components are and how they work
- ✅ Know the difference between JSX and regular HTML
- ✅ Be able to identify props in existing code
- ✅ Make their first code modification successfully

---

## ⏰ DETAILED SESSION TIMELINE

### 0:00 - 0:10: Welcome & Check-In (10 minutes)
**Your Role**: Create excitement and set clear expectations

**Ice Breaker**: "Share your name and one thing you hope to build with code in the future"

**Key Points to Cover**:
- Welcome to 10-week journey building a professional data analysis platform
- Show COMPLETED demo at: `http://localhost:5173` (have it ready)
- Explain this isn't just a tutorial - they're building something real and deployable
- Address any nervousness about coding

**Logistics Checklist**:
- [ ] Ensure all students have GitHub accounts
- [ ] Confirm Node.js is installed (version 16+)
- [ ] Have backup plan for students without proper setup

---

### 0:10 - 0:30: Concept Overview (20 minutes)
**Your Role**: Explain concepts with live code examples

#### **React Components (5 minutes)**
**Show them**: Open `src/components/DataUpload.tsx`

**Explain**:
```jsx
// This is a React component - a reusable piece of UI
const DataUpload = ({ onDataLoad }: DataUploadProps) => {
  return (
    <div>
      {/* This component handles file uploads */}
    </div>
  );
};
```

**Key Points**:
- Components are like LEGO blocks - you build bigger things from smaller pieces
- Each component has ONE job (DataUpload handles file uploads)
- Components can be reused anywhere in the app

#### **JSX (5 minutes)**
**Show them**: Compare these two:
```jsx
// JSX (what we write):
<Button onClick={handleClick}>Upload File</Button>

// What JSX becomes (regular JavaScript):
React.createElement('button', { onClick: handleClick }, 'Upload File')
```

**Key Points**:
- JSX lets us write HTML-like code inside JavaScript
- It's more readable than pure JavaScript
- The {} brackets let us inject JavaScript into our HTML

#### **Props (5 minutes)**
**Show them**: In `src/pages/Index.tsx` line 16:
```jsx
<DataUpload onDataLoad={handleDataLoad} />
```

**Explain**:
- `onDataLoad` is a prop - data passed from parent to child
- Like arguments to a function
- Props flow DOWN from parent to child components

#### **Component Hierarchy (5 minutes)**
**Draw on board**:
```
Index (main page)
├── DataUpload (handles file uploads)
├── Dashboard (shows data)
    ├── DataTable (shows rows/columns)
    ├── ChartSection (shows graphs)
    └── InsightsPanel (shows analysis)
```

---

### 0:30 - 1:15: Build Time (45 minutes)
**Your Role**: Hands-on support, troubleshooting, encouragement

#### **Phase 1: Environment Setup (15 minutes)**

**Student Instructions**:
```bash
# 1. Clone the repository
git clone https://github.com/bvcc-swe/data-discovery-plug.git
cd data-discovery-plug

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser to http://localhost:5173
```

**Common Issues & Solutions**:
- **Port already in use**: `npm run dev -- --port 3000`
- **Permission errors**: `sudo chown -R $(whoami) ~/.npm`
- **Node version**: `node --version` (need 16+)

**Success Criteria**: Student sees the landing page with "Plug-N-Learn" title

#### **Phase 2: Project Exploration (15 minutes)**

**Student Task**: Open these files and answer questions:

1. **`src/App.tsx`** - "What components do you see imported?"
2. **`src/pages/Index.tsx`** - "What is the useState hook doing?"
3. **`src/components/DataUpload.tsx`** - "Find the onDataLoad prop"

**Your Role**: Walk around, help students navigate VS Code, explain file structure

#### **Phase 3: First Modification (15 minutes)**

**Student Task**: Modify `src/pages/Index.tsx` line 28:

**BEFORE**:
```jsx
<h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
  Plug-N-Learn
</h1>
```

**AFTER**:
```jsx
<h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
  Plug-N-Learn: [Your Name]'s Dashboard
</h1>
```

**Success Criteria**: Student sees their name in the browser title

---

### 1:15 - 1:45: Group Share/Troubleshooting (30 minutes)
**Your Role**: Facilitate sharing and collective problem-solving

#### **Wins Round (10 minutes)**
- Each student shows their personalized dashboard
- Celebrate every working modification
- Ask: "What surprised you about React?"

#### **Blockers Round (15 minutes)**
**Common Issues**:
- Server won't start → Check Node.js version, port conflicts
- File not found → Explain VS Code navigation, file paths
- Changes not showing → Browser refresh, save files

**Your Approach**:
- Let students help each other first
- Show solutions on shared screen
- Explain the "why" behind fixes

#### **Concept Check (5 minutes)**
Quick verbal quiz:
- "What makes something a React component?"
- "What's the difference between props and regular variables?"
- "Why do we use JSX instead of regular HTML?"

---

### 1:45 - 2:00: Wrap Up & Next Steps (15 minutes)
**Your Role**: Motivate and prepare for next week

#### **Shoutouts (5 minutes)**
- Celebrate specific achievements
- "Sarah figured out the file structure quickly!"
- "Mike helped troubleshoot port issues!"

#### **Homework Assignment (5 minutes)**
**Required**:
- Change one more piece of text in the app (description, button text, etc.)
- Explore the project - click around, look at different files

**Optional Challenge**:
- Try changing colors (look for className="text-blue-600")
- Find where the icons come from (import statements)

#### **Next Week Preview (5 minutes)**
"Next week we'll make our app interactive! You'll learn about React state - how components remember things and respond to user actions. You'll build a counter that actually works!"

---

## 🛠️ INSTRUCTOR PREP CHECKLIST

### Before Session:
- [ ] Test that the demo app runs on your machine
- [ ] Prepare VS Code with files pre-opened
- [ ] Have backup GitHub accounts ready
- [ ] Test Node.js installation on different OS
- [ ] Prepare simple analogies for React concepts

### Materials Needed:
- [ ] Laptop with working development environment
- [ ] Projector/screen sharing capability
- [ ] Whiteboard/digital board for component hierarchy diagram
- [ ] Student contact list for follow-up help

### Success Metrics:
- [ ] 90%+ of students have working local environment
- [ ] All students successfully make one code modification
- [ ] Students can identify components in existing code
- [ ] No student leaves feeling lost or behind

---

## 🆘 TROUBLESHOOTING GUIDE

### Critical Issues:
1. **Node.js not installed**
   - Solution: Guide to nodejs.org, install LTS version
   - Backup: Use StackBlitz online environment

2. **Git not configured**
   - Solution: `git config --global user.name "Name"`
   - Solution: `git config --global user.email "email"`

3. **npm install fails**
   - Solution: Delete node_modules, clear npm cache
   - Solution: Try `npm install --legacy-peer-deps`

### Learning Issues:
1. **"I don't understand components"**
   - Analogy: Components are like recipes - reusable instructions
   - Show: Point to button, explain how it's used multiple places

2. **"JSX looks weird"**
   - Reassure: It takes time to get used to
   - Show: Regular HTML vs JSX side by side

3. **"I can't find the file"**
   - Solution: Show VS Code file explorer
   - Solution: Use Ctrl+P (Cmd+P) to search files

---

## 📝 HOMEWORK SOLUTIONS

**If students ask about homework:**

**Basic Text Change**:
```jsx
// In src/pages/Index.tsx, line 31:
<p className="text-lg text-slate-500 max-w-2xl mx-auto">
  [Your Name]'s amazing data analysis journey starts here!
</p>
```

**Color Change**:
```jsx
// Change any "blue-600" to "purple-600" or "green-600"
<div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
```

---

## 📊 ASSESSMENT RUBRIC

**Exceeds Expectations (A)**:
- Environment setup completed independently
- Successfully makes multiple code modifications
- Helps other students with issues
- Asks insightful questions about React concepts

**Meets Expectations (B)**:
- Environment setup completed with minimal help
- Successfully makes required code modification
- Demonstrates basic understanding of components

**Approaching Expectations (C)**:
- Environment setup completed with significant help
- Makes code modification with guidance
- Shows effort but needs concept reinforcement

**Needs Support (D)**:
- Environment setup incomplete
- Unable to make code modifications
- Requires additional one-on-one help

---

**💡 INSTRUCTOR TIP**: Remember, this is their first exposure to React! Focus on building confidence and curiosity rather than perfect understanding. Many concepts will click in later weeks.
