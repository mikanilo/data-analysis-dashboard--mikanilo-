# 🎓 WEEK 3 STUDENT GUIDE
**Interactive Components & User Input**

## 📅 This Week's Mission
Build components that can accept and validate user input! You'll learn how to create forms, handle text input, and provide real-time feedback to users.

## 🎯 Learning Goals
- ✅ Create controlled form components in React
- ✅ Handle different types of user input (text, buttons, forms)
- ✅ Implement real-time form validation 
- ✅ Understand controlled vs uncontrolled components
- ✅ Build a complete name input with validation

## 🔄 Pre-Session Check
- [ ] Your counter from Week 2 should be working
- [ ] You should understand useState and event handlers
- [ ] Development environment should run without issues

**Quick test**: Your counter should increment, decrement, and reset properly.

## 📚 Key Concepts This Week

### Controlled Components
In React, form inputs should be "controlled" by component state:

```jsx
const [name, setName] = useState("");

// The input value comes from state
// Changes update the state
<input 
  value={name} 
  onChange={(e) => setName(e.target.value)} 
/>
```

**Why controlled?**
- React controls the input value
- You can validate in real-time
- You can transform input as user types
- State and UI stay synchronized

### Form Validation Patterns
```jsx
// Real-time validation
const isValid = name.length >= 2;
const errorMessage = name.length === 0 ? "Name is required" : 
                    name.length < 2 ? "Name must be at least 2 characters" : "";
```

## 🛠️ Today's Hands-On Project: Name Input with Validation

### Step 1: Create NameInput Component
**File**: `src/components/NameInput.tsx`

```tsx
import { useState } from 'react';

const NameInput = () => {
  // State for the input value
  const [name, setName] = useState("");
  
  // State for showing greeting
  const [showGreeting, setShowGreeting] = useState(false);

  // Validation logic
  const isValid = name.length >= 2 && name.length <= 50;
  const isEmpty = name.length === 0;
  
  // Error message logic
  const getErrorMessage = () => {
    if (isEmpty) return "";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (name.length > 50) return "Name must be less than 50 characters";
    return "";
  };

  // Handle input changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setShowGreeting(false); // Hide greeting when typing
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    if (isValid) {
      setShowGreeting(true);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      <h2 className="text-2xl font-bold mb-4">Name Input Demo</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Enter Your Name:
          </label>
          
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Type your name here..."
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              isEmpty ? 'border-gray-300 focus:ring-blue-500' :
              isValid ? 'border-green-500 focus:ring-green-500' :
              'border-red-500 focus:ring-red-500'
            }`}
          />
          
          {/* Character count */}
          <div className="text-xs text-gray-500 mt-1">
            {name.length}/50 characters
          </div>
          
          {/* Error message */}
          {getErrorMessage() && (
            <div className="text-red-500 text-sm mt-1">
              {getErrorMessage()}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-2 px-4 rounded-md font-medium ${
            isValid 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Generate Greeting
        </button>
      </form>

      {/* Greeting display */}
      {showGreeting && isValid && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded-md">
          <p className="text-green-800">
            Hello, {name}! Welcome to the Data Discovery Tool! 🎉
          </p>
        </div>
      )}
    </div>
  );
};

export default NameInput;
```

### Step 2: Add to Homepage
**File**: `src/pages/Index.tsx`

Add the import and component:
```tsx
import NameInput from "@/components/NameInput";

// Add after your Counter component
<div className="mb-8">
  <NameInput />
</div>
```

### Step 3: Test Your Form
Try these scenarios:
- Type nothing - no error, button disabled
- Type "A" - error message appears
- Type "John" - validation passes, button enabled
- Submit valid name - greeting appears
- Type while greeting shows - greeting disappears

## 📊 Sample Data & User Input Patterns

### Dataset: Form Validation Analytics
```csv
Input_Length,Is_Valid,User_Action,Time_Spent_Seconds
0,false,typing,1
1,false,typing,2
2,true,typing,3
5,true,submit,15
```

**Questions to consider**:
- How do users interact with forms?
- What makes a good user experience?
- When should validation messages appear?

## 🏠 Homework Assignments

### Required Tasks
- [ ] **Task 1**: Add minimum length validation (at least 3 characters)
- [ ] **Task 2**: Add maximum length validation (no more than 30 characters)  
- [ ] **Task 3**: Show character count as user types
- [ ] **Task 4**: Add a "Clear" button that resets the form

### Stretch Goals (Optional)
- [ ] **Challenge 1**: Add email validation (must contain @ and .)
- [ ] **Challenge 2**: Create different greeting messages based on name length
- [ ] **Challenge 3**: Add a "favorite color" dropdown input
- [ ] **Challenge 4**: Remember the last entered name using localStorage

### Advanced Challenge: Multi-Field Form
Create a form with:
- Name input (required, 2-50 characters)
- Age input (number, 13-120)
- Email input (must be valid email format)
- Submit only when ALL fields are valid

## 🔬 Form Handling Patterns

### Event Object Breakdown
```jsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);    // What user typed
  console.log(e.target.name);     // Input name attribute
  console.log(e.target.type);     // Input type (text, email, etc.)
};
```

### Preventing Form Submission
```jsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault(); // Stops page from refreshing
  // Your form logic here
};
```

### Input Validation Strategies
1. **Real-time**: Validate as user types
2. **On blur**: Validate when user leaves input
3. **On submit**: Validate when form is submitted
4. **Combination**: Use multiple strategies together

## 🆘 Troubleshooting

### Input not updating when typing
**Check**:
1. Is `value={name}` set on the input?
2. Is `onChange={handleNameChange}` connected?
3. Is `setName()` called in the change handler?

### Form submits and page refreshes
**Fix**: Add `e.preventDefault()` to submit handler:
```jsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault(); // Add this line
  // rest of your code
};
```

### TypeScript errors with event handlers
**Use proper types**:
```tsx
// For input changes
React.ChangeEvent<HTMLInputElement>

// For form submission  
React.FormEvent<HTMLFormElement>
```

## 🎯 Success Criteria
By the end of Week 3, you should:
- ✅ Have a working name input with real-time validation
- ✅ Understand controlled components and why they're important
- ✅ Be able to handle form submission without page refresh
- ✅ Show appropriate error messages and visual feedback
- ✅ Successfully completed at least 3 homework tasks

## 💡 Real-World Applications
Form handling skills you're learning are used in:
- **User registration** - creating accounts
- **Search bars** - filtering and finding content
- **Settings panels** - updating user preferences  
- **Chat applications** - sending messages
- **E-commerce** - checkout and payment forms
- **Data entry tools** - exactly what you're building!

## 📞 Getting Help
- **During class**: Ask about form validation patterns immediately!
- **Slack/Discord**: Share form behavior questions
- **Email instructor**: [Instructor email]
- **Pair programming**: Work with a classmate on validation logic

---

**Next Week Preview**: We'll learn JavaScript array methods (map, filter, reduce) to process and analyze data - the foundation for your data analysis tool! 📊

*Week 3 Guide - Updated September 2025*
