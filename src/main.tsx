
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// 🟢 EASY - Week 1: Project Foundation
// TODO: Students - This is the entry point of your React application
// This file renders the main App component into the DOM
// 
// Learning objectives:
// - Understand how React applications start
// - Learn about the createRoot API (React 18 feature)
// - See how CSS is imported globally
//
// What's happening here:
// 1. We import React's createRoot function (the new way to start React apps)
// 2. We import our main App component (the heart of our application)
// 3. We import global CSS styles that apply to the entire app
// 4. We tell React to render our App inside the HTML element with id="root"
//
// Why is this important?
// - Every React app needs an entry point - this is it!
// - The createRoot API is React 18's modern way to start applications
// - This pattern is used in almost every React project you'll see
//
// Next steps:
// 1. Explore the App.tsx file to see the main application structure
// 2. Check out index.css to understand global styles
// 3. Run `npm run dev` to start the development server

createRoot(document.getElementById("root")!).render(<App />);

// 💡 HINT: The exclamation mark (!) tells TypeScript we're certain the element exists
// This is called a "non-null assertion operator"
// We know the element exists because it's defined in index.html
