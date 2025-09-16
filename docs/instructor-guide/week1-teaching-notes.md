# Week 1 Instructor Guide: Foundation Building

## 📚 Overview
Week 1 focuses on introducing students to the React ecosystem and helping them understand the existing project structure. This is primarily an exploration and understanding week rather than heavy coding.

---

## 🎯 Learning Objectives

### Primary Objectives
- [ ] Students can navigate the project file structure
- [ ] Students understand JSX syntax and React components
- [ ] Students can identify props, state, and event handlers
- [ ] Students feel comfortable reading existing React code

### Secondary Objectives  
- [ ] Students can make simple text/content modifications
- [ ] Students understand the relationship between parent and child components
- [ ] Students can use browser developer tools for debugging

---

## ⏰ Suggested Timeline

### Class Period 1 (50 minutes)
**Topic: Project Tour and Setup**

- **0-10 min**: Welcome and project overview
- **10-25 min**: Guided tour of file structure
- **25-40 min**: Students explore `App.tsx` and `Index.tsx`
- **40-50 min**: Q&A and troubleshooting setup issues

### Class Period 2 (50 minutes)  
**Topic: React Fundamentals**

- **0-15 min**: JSX syntax explanation with live examples
- **15-30 min**: Props and state walkthrough using existing code
- **30-45 min**: Students complete Exercise 1 & 2
- **45-50 min**: Share customizations and discuss

### Class Period 3 (50 minutes)
**Topic: Component Communication**

- **0-20 min**: Deep dive into DataUpload component
- **20-35 min**: Students complete Exercise 3 & 4  
- **35-45 min**: Debugging challenge introduction
- **45-50 min**: Reflection and next week preview

---

## 🎓 Teaching Strategies

### For Beginners
- **Start with familiar concepts**: Compare JSX to HTML they already know
- **Use analogies**: Components are like "custom HTML tags"
- **Visual learning**: Use browser dev tools to show component hierarchy
- **Pair programming**: Have experienced students mentor beginners

### For Advanced Students
- **Challenge exercises**: Direct them to the advanced footer challenge
- **Exploration tasks**: Have them trace data flow through multiple components
- **Research assignments**: Ask them to read React documentation
- **Peer teaching**: Have them help explain concepts to others

### For Different Learning Styles
- **Visual learners**: Use component tree diagrams and flowcharts
- **Hands-on learners**: Provide plenty of guided practice exercises
- **Conceptual learners**: Explain the "why" behind React patterns
- **Social learners**: Encourage group discussions and code reviews

---

## 🚨 Common Student Issues

### Issue 1: "I don't understand the file structure"
**Symptoms**: Students getting lost in folders, not knowing where to find things
**Solutions**: 
- Create a visual file tree diagram on the board
- Use the "house analogy": `src` is your house, `components` are rooms
- Have students create their own annotated file structure map
- Practice navigating together as a class

### Issue 2: "JSX looks confusing"
**Symptoms**: Students mixing up HTML and JavaScript syntax
**Solutions**:
- Show side-by-side comparison of HTML vs JSX
- Highlight the key differences (`className` vs `class`, etc.)
- Start with simple examples before showing complex ones
- Practice converting HTML snippets to JSX

### Issue 3: "I can't tell what's a component vs regular JavaScript"
**Symptoms**: Students confused about component boundaries
**Solutions**:
- Use color coding to highlight different parts
- Show component import/export statements
- Draw boxes around components in the code
- Practice identifying components in different files

### Issue 4: "The props and state concept is unclear"
**Symptoms**: Students can't distinguish between props and state
**Solutions**:
- Use real-world analogies (props = ingredients you give a chef, state = chef's memory)
- Trace data flow with arrows on printed code
- Show what happens when props change vs state changes
- Practice identifying each in existing code

---

## 📊 Assessment Rubric

### Basic Completion (60-70%)
- [ ] Completed Exercises 1-2 successfully
- [ ] Can navigate to correct files when directed
- [ ] Shows basic understanding of JSX structure
- [ ] Participates in class discussions

### Proficient (70-85%)
- [ ] Completed Exercises 1-4 successfully
- [ ] Can explain props vs state in their own words
- [ ] Successfully traces data flow in simple components
- [ ] Helps classmates with basic issues

### Advanced (85-100%)
- [ ] Completed all exercises including advanced challenge
- [ ] Can debug simple component issues independently
- [ ] Explains React concepts clearly to peers
- [ ] Demonstrates curiosity by exploring beyond requirements

---

## 🔧 Troubleshooting Guide

### Setup Issues
- **Node.js not installed**: Direct to official Node.js website
- **Port conflicts**: Show how to use different ports (`npm run dev -- --port 3001`)
- **Browser compatibility**: Recommend Chrome or Firefox for development
- **VS Code extensions**: Suggest ES7+ React snippets and Prettier

### Runtime Issues
- **Blank screen**: Check browser console for errors
- **Changes not appearing**: Ensure dev server is running and files are saved
- **Syntax errors**: Use VS Code error highlighting to identify issues
- **Import errors**: Check file paths and spelling

---

## 📝 Homework Assignments

### Required (All Students)
1. Complete any unfinished exercises from class
2. Read through all educational comments in the core files
3. Write 3 questions about React concepts for next week's Q&A
4. Customize the app title and description with personal information

### Optional (Advanced Students)
1. Research React hooks and write a 1-paragraph summary
2. Find 2 online React tutorials and share links with class
3. Complete the footer challenge with bonus features
4. Explore the sample data files and predict what visualizations might be generated

---

## 🎯 Success Indicators

By the end of Week 1, students should:
- **Feel confident** opening and reading React files
- **Understand** the basic structure of the project
- **Be able to** make simple content modifications
- **Show curiosity** about how components work together
- **Ask thoughtful questions** about React concepts

---

## 📚 Additional Resources

### For Instructors
- [React Developer Tools Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Visual Guide to React](https://react.gg/visualized)
- [Interactive React Tutorial](https://scrimba.com/learn/learnreact)

### For Students  
- [React Official Tutorial](https://react.dev/learn/tutorial-tic-tac-toe)
- [JavaScript ES6+ Features](https://github.com/lukehoban/es6features)
- [VSCode React Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

---

## 🔄 Week 2 Preparation

### What to Prepare
- [ ] Create sample broken code for debugging exercises
- [ ] Set up examples of interactive components
- [ ] Prepare more complex prop examples
- [ ] Review state management concepts

### Student Prerequisites for Week 2
- [ ] Comfortable with basic JSX syntax
- [ ] Can identify components in existing code  
- [ ] Understands the difference between props and state
- [ ] Has completed Week 1 exercises

---

## 💬 Discussion Prompts

Use these throughout the week to encourage engagement:

1. "What similarities do you see between JSX and HTML?"
2. "Why might we want to break our UI into separate components?"
3. "What happens in your daily life that's similar to passing props?"
4. "How do you think state management scales to larger applications?"
5. "What questions would you ask the developers who built this project?"