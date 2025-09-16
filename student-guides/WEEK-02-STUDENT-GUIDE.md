# 🎓 WEEK 2 STUDENT GUIDE
**State Management & Interactive Components**

## 📅 This Week's Mission
Learn how to make your React components interactive! You'll discover the magic of React state and build your first component that remembers and changes data.

## 🎯 Learning Goals
- ✅ Understand what React state is and why components need memory
- ✅ Use the useState hook to create interactive features
- ✅ Handle button clicks and update component state
- ✅ Watch how state changes trigger automatic re-renders
- ✅ Build a working counter component from scratch

## 🔄 Pre-Session Check
- [ ] Your app from Week 1 should be running without errors
- [ ] You should have successfully personalized the homepage
- [ ] Node.js and development server should work properly

**Quick test**: Run `npm run dev` and visit `http://localhost:5173`

## 📚 Key Concepts This Week

### What is React State?
State is a component's **memory** - data that can change over time.

**Real-world analogy**: 
- A light switch remembers if it's ON or OFF
- A shopping cart remembers what items you've added
- A counter remembers the current number

### useState Hook Explained
```jsx
import { useState } from 'react';

const [count, setCount] = useState(0);
//     ↑        ↑           ↑
//  current  function    starting
//  value   to change    value
```

**What happens**:
1. `count` - holds the current value
2. `setCount` - function to change the value
3. `0` - the initial/starting value
4. When `setCount` is called, React re-renders the component

### Event Handlers
Functions that respond to user actions:
```jsx
const handleClick = () => {
  setCount(count + 1);  // Increase count by 1
};

<button onClick={handleClick}>Click me!</button>
```

## 🛠️ Today's Hands-On Project: Interactive Counter

### Step 1: Create the Counter Component
**File**: `src/components/Counter.tsx`

```tsx
import { useState } from 'react';

const Counter = () => {
  // State: component memory
  const [count, setCount] = useState(0);

  // Event handlers: what happens when user clicks
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Counter</h2>
      
      {/* Display current count */}
      <div className="text-4xl font-mono text-center mb-6">
        {count}
      </div>

      {/* Control buttons */}
      <div className="flex gap-4 justify-center">
        <button 
          onClick={handleDecrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -1
        </button>
        
        <button 
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
        
        <button 
          onClick={handleIncrement}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +1
        </button>
      </div>
    </div>
  );
};

export default Counter;
```

### Step 2: Add Counter to Homepage
**File**: `src/pages/Index.tsx`

1. **Import** the Counter component:
```tsx
import Counter from "@/components/Counter";
```

2. **Add** it to the page (around line 40):
```tsx
{/* Add this inside the main div */}
<div className="mb-8">
  <Counter />
</div>
```

### Step 3: Test Your Counter
- Click the +1 button - number should increase
- Click the -1 button - number should decrease  
- Click Reset - should go back to 0
- Try clicking fast - see how React keeps up!

## 📊 Sample Data & Experiments

### Dataset for Testing: Counter Analytics
Create this data to simulate counter usage:
```csv
Day,Button_Clicks,Final_Count
Monday,25,10
Tuesday,45,20
Wednesday,30,15
Thursday,60,25
Friday,40,18
```

**Use this to think about**: How could you track user interactions in your counter?

## 🏠 Homework Assignments

### Required Tasks
- [ ] **Task 1**: Add a "+5" button that increases count by 5
- [ ] **Task 2**: Add a "-5" button that decreases count by 5
- [ ] **Task 3**: Change the starting value from 0 to 10
- [ ] **Task 4**: Add visual feedback when count reaches 20 (change colors)

### Stretch Goals (Optional)
- [ ] **Challenge 1**: Prevent count from going below 0
- [ ] **Challenge 2**: Add a "+10" and "-10" button
- [ ] **Challenge 3**: Show different messages based on count value
- [ ] **Challenge 4**: Add a "double" button that multiplies count by 2

### Advanced Challenge
Build a **Color Picker Counter**:
- When count is 0-5: background is red
- When count is 6-10: background is yellow  
- When count is 11+: background is green

## 🔬 Understanding State Updates

### Common Beginner Mistakes
```jsx
// ❌ WRONG - directly changing state
count = count + 1;

// ✅ CORRECT - using the setter function
setCount(count + 1);
```

### Why useState is Special
When you call `setCount()`:
1. React updates the component's memory
2. React automatically re-renders the component
3. User sees the new value instantly
4. All without page refresh!

## 🆘 Troubleshooting

### "useState is not defined"
**Fix**: Add the import statement:
```tsx
import { useState } from 'react';
```

### Counter not updating when clicked
**Check**:
1. Are you using `setCount()` in the click handler?
2. Is the `onClick` prop correctly connected?
3. Are there any console errors?

### Buttons not responding
**Debug steps**:
1. Add `console.log("Button clicked!")` inside handlers
2. Check browser console (F12) when clicking
3. Verify button `onClick` props are set correctly

## 🎯 Success Criteria
By the end of Week 2, you should:
- ✅ Have a working counter with +1, -1, and reset buttons
- ✅ Understand how useState creates component memory
- ✅ See how state changes trigger automatic re-renders
- ✅ Be comfortable adding event handlers to buttons
- ✅ Successfully completed at least 2 homework tasks

## 💡 Real-World Applications
State management like you're learning is used in:
- **Shopping carts** - remembering items added
- **Form inputs** - tracking what user types
- **Like buttons** - remembering if you liked something
- **Game scores** - keeping track of points
- **Settings panels** - remembering user preferences

## 📞 Getting Help
- **During class**: Ask about any state concepts immediately!
- **Slack/Discord**: Share screenshots of errors
- **Email instructor**: [Instructor email]
- **Study group**: Practice explaining useState to classmates

---

**Next Week Preview**: We'll learn about forms and user input - how to let users type data and validate it! Your counter skills will help with input handling. 🎯

*Week 2 Guide - Updated September 2025*
