
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
// Next steps:
// 1. Explore the App.tsx file to see the main application structure
// 2. Check out index.css to understand global styles
// 3. Run `npm run dev` to start the development server

createRoot(document.getElementById("root")!).render(<App />);

// 💡 HINT: The exclamation mark (!) tells TypeScript we're certain the element exists
// This is called a "non-null assertion operator"
