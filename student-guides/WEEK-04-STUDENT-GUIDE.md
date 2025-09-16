# 🎓 WEEK 4 STUDENT GUIDE
**JavaScript Data Processing & Array Methods**

## 📅 This Week's Mission
Master JavaScript array methods to process and analyze data! You'll learn the essential tools for transforming raw data into insights - the core of any data analysis application.

## 🎯 Learning Goals
- ✅ Use map() to transform arrays of data
- ✅ Use filter() to find specific data points
- ✅ Use reduce() to calculate summaries and aggregations
- ✅ Chain multiple array methods together
- ✅ Process CSV data and extract meaningful insights

## 🔄 Pre-Session Check
- [ ] Your form input from Week 3 should be working with validation
- [ ] You should understand useState and controlled components
- [ ] Development environment should run smoothly

**Quick test**: Your name input should validate and show greeting properly.

## 📚 Key Concepts This Week

### Array Methods Overview
JavaScript provides powerful methods to work with data arrays:

```jsx
const data = [1, 2, 3, 4, 5];

// map() - transform each item
const doubled = data.map(x => x * 2);        // [2, 4, 6, 8, 10]

// filter() - find items that match criteria  
const evens = data.filter(x => x % 2 === 0); // [2, 4]

// reduce() - combine all items into a single value
const sum = data.reduce((total, x) => total + x, 0); // 15
```

### Working with Objects
Most real data comes as arrays of objects:

```jsx
const employees = [
  { name: "Alice", department: "Engineering", salary: 75000 },
  { name: "Bob", department: "Marketing", salary: 65000 },
  { name: "Carol", department: "Engineering", salary: 80000 }
];
```

## 🛠️ Today's Hands-On Project: Data Processor Component

### Step 1: Create DataProcessor Component
**File**: `src/components/DataProcessor.tsx`

```tsx
import { useState } from 'react';

interface Employee {
  name: string;
  department: string;
  salary: number;
  experience: number;
}

const DataProcessor = () => {
  // Sample data for learning
  const [employees] = useState<Employee[]>([
    { name: "Alice Johnson", department: "Engineering", salary: 75000, experience: 5 },
    { name: "Bob Smith", department: "Marketing", salary: 65000, experience: 3 },
    { name: "Carol Davis", department: "Engineering", salary: 80000, experience: 7 },
    { name: "David Wilson", department: "Sales", salary: 70000, experience: 4 },
    { name: "Eve Brown", department: "Marketing", salary: 62000, experience: 2 },
    { name: "Frank Miller", department: "Engineering", salary: 85000, experience: 8 }
  ]);

  // 1. MAP: Transform data - add calculated bonus
  const employeesWithBonus = employees.map(emp => ({
    ...emp,
    bonus: emp.salary * 0.1, // 10% bonus
    fullInfo: `${emp.name} (${emp.department})`
  }));

  // 2. FILTER: Find specific employees
  const engineeringEmployees = employees.filter(emp => 
    emp.department === "Engineering"
  );

  const highEarners = employees.filter(emp => 
    emp.salary > 70000
  );

  const experiencedWorkers = employees.filter(emp => 
    emp.experience >= 5
  );

  // 3. REDUCE: Calculate summaries
  const totalSalaries = employees.reduce((total, emp) => 
    total + emp.salary, 0
  );

  const averageSalary = totalSalaries / employees.length;

  const departmentCounts = employees.reduce((counts, emp) => {
    counts[emp.department] = (counts[emp.department] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  // 4. CHAINING: Combine multiple operations
  const seniorEngineeringSalaries = employees
    .filter(emp => emp.department === "Engineering")  // Only engineers
    .filter(emp => emp.experience >= 5)               // With 5+ years
    .map(emp => emp.salary);                          // Get just salaries

  const averageSeniorEngSalary = seniorEngineeringSalaries.length > 0 
    ? seniorEngineeringSalaries.reduce((sum, sal) => sum + sal, 0) / seniorEngineeringSalaries.length
    : 0;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Data Processing Demo</h2>
      
      {/* Original Data */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">📊 Original Employee Data</h3>
        <div className="bg-gray-50 p-3 rounded text-sm">
          {employees.map((emp, i) => (
            <div key={i} className="mb-1">
              {emp.name} - {emp.department} - ${emp.salary.toLocaleString()} - {emp.experience}yr
            </div>
          ))}
        </div>
      </div>

      {/* MAP Results */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔄 MAP: Add Bonus Calculation</h3>
        <div className="bg-blue-50 p-3 rounded text-sm">
          {employeesWithBonus.slice(0, 3).map((emp, i) => (
            <div key={i} className="mb-1">
              {emp.fullInfo} - Salary: ${emp.salary.toLocaleString()} - Bonus: ${emp.bonus.toLocaleString()}
            </div>
          ))}
          <div className="text-gray-600">... and {employeesWithBonus.length - 3} more</div>
        </div>
      </div>

      {/* FILTER Results */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔍 FILTER: Find Specific Groups</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-3 rounded text-sm">
            <div className="font-medium mb-1">Engineering Dept ({engineeringEmployees.length})</div>
            {engineeringEmployees.map((emp, i) => (
              <div key={i}>{emp.name}</div>
            ))}
          </div>
          
          <div className="bg-yellow-50 p-3 rounded text-sm">
            <div className="font-medium mb-1">High Earners ({highEarners.length})</div>
            {highEarners.map((emp, i) => (
              <div key={i}>{emp.name} - ${emp.salary.toLocaleString()}</div>
            ))}
          </div>
          
          <div className="bg-purple-50 p-3 rounded text-sm">
            <div className="font-medium mb-1">5+ Years Experience ({experiencedWorkers.length})</div>
            {experiencedWorkers.map((emp, i) => (
              <div key={i}>{emp.name} - {emp.experience}yr</div>
            ))}
          </div>
        </div>
      </div>

      {/* REDUCE Results */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">📈 REDUCE: Calculate Summaries</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-red-50 p-3 rounded text-center">
            <div className="text-2xl font-bold">${totalSalaries.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Salaries</div>
          </div>
          <div className="bg-orange-50 p-3 rounded text-center">
            <div className="text-2xl font-bold">${Math.round(averageSalary).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Average Salary</div>
          </div>
          <div className="bg-teal-50 p-3 rounded text-center">
            <div className="text-2xl font-bold">{employees.length}</div>
            <div className="text-sm text-gray-600">Total Employees</div>
          </div>
          <div className="bg-indigo-50 p-3 rounded text-center">
            <div className="text-2xl font-bold">{Object.keys(departmentCounts).length}</div>
            <div className="text-sm text-gray-600">Departments</div>
          </div>
        </div>
        
        <div className="mt-3 bg-gray-50 p-3 rounded text-sm">
          <div className="font-medium mb-1">Department Breakdown:</div>
          {Object.entries(departmentCounts).map(([dept, count]) => (
            <span key={dept} className="inline-block mr-4">
              {dept}: {count} people
            </span>
          ))}
        </div>
      </div>

      {/* CHAINING Results */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">⛓️ CHAINING: Complex Analysis</h3>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded">
          <div className="text-lg font-medium">Senior Engineering Analysis</div>
          <div className="text-sm text-gray-600 mb-2">
            Engineers with 5+ years experience: {seniorEngineeringSalaries.length} people
          </div>
          <div className="text-2xl font-bold text-purple-600">
            ${Math.round(averageSeniorEngSalary).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Average salary for senior engineers</div>
        </div>
      </div>
    </div>
  );
};

export default DataProcessor;
```

### Step 2: Add to Homepage
**File**: `src/pages/Index.tsx`

```tsx
import DataProcessor from "@/components/DataProcessor";

// Add after your other components
<div className="mb-8">
  <DataProcessor />
</div>
```

### Step 3: Test Data Processing
Observe how each method transforms the data:
- **MAP**: See bonus calculations added to each employee
- **FILTER**: Notice how different criteria create different groups
- **REDUCE**: Watch how complex summaries are calculated
- **CHAINING**: See multiple operations combined for advanced analysis

## 📊 Sample Data for Practice

### Student Dataset: Course Grades
```csv
Student,Math,Science,English,Hours_Studied
Alice,85,92,78,25
Bob,92,88,85,30
Carol,78,85,92,22
David,88,90,82,28
Eve,95,87,89,35
```

**Practice exercises with this data**:
1. Calculate average grade for each subject
2. Find students with overall average > 85
3. Calculate total study hours
4. Find top performer in each subject

## 🏠 Homework Assignments

### Required Tasks
- [ ] **Task 1**: Add a new filter to find employees with salary between $65,000-$75,000
- [ ] **Task 2**: Use map() to convert all salaries from annual to monthly
- [ ] **Task 3**: Use reduce() to find the highest and lowest salaries
- [ ] **Task 4**: Chain methods to find the average experience of Marketing employees

### Stretch Goals (Optional)
- [ ] **Challenge 1**: Create a function that groups employees by experience level (Junior: 0-3, Mid: 4-6, Senior: 7+)
- [ ] **Challenge 2**: Calculate the salary range (max - min) for each department
- [ ] **Challenge 3**: Find employees whose names start with a specific letter
- [ ] **Challenge 4**: Create a "promotion candidate" filter (high performers with 3+ years experience)

### Advanced Challenge: Grade Processor
Using the student grades CSV data:
1. Calculate each student's overall average
2. Assign letter grades (A: 90+, B: 80-89, C: 70-79, etc.)
3. Find correlations between study hours and performance
4. Identify students who need tutoring (average < 80)

## 🔬 Method Deep Dive

### Map() - Transform Every Item
```jsx
// Adding calculated fields
const withTax = prices.map(price => price * 1.08);

// Formatting for display
const formatted = employees.map(emp => 
  `${emp.name}: ${emp.department}`
);

// Converting types
const numbers = strings.map(str => parseInt(str));
```

### Filter() - Find Items That Match
```jsx
// Simple conditions
const adults = people.filter(person => person.age >= 18);

// Complex conditions
const qualifiedCandidates = employees.filter(emp => 
  emp.experience >= 3 && emp.salary < 80000 && emp.department === "Engineering"
);

// Using includes for arrays
const techDepts = ["Engineering", "IT", "Data Science"];
const techEmployees = employees.filter(emp => 
  techDepts.includes(emp.department)
);
```

### Reduce() - Combine Into Single Value
```jsx
// Sum numbers
const total = numbers.reduce((sum, num) => sum + num, 0);

// Build objects
const grouped = items.reduce((groups, item) => {
  const key = item.category;
  groups[key] = groups[key] || [];
  groups[key].push(item);
  return groups;
}, {});

// Find max/min
const max = numbers.reduce((highest, num) => 
  num > highest ? num : highest, numbers[0]
);
```

## 🆘 Troubleshooting

### "Cannot read property of undefined"
**Common cause**: Trying to access object properties that don't exist
```jsx
// ❌ Unsafe
emp.salary.toFixed(2)

// ✅ Safe
emp.salary?.toFixed(2) || "N/A"
```

### Array method returns undefined
**Check**: Are you returning a value from your callback function?
```jsx
// ❌ Missing return
const doubled = numbers.map(num => { num * 2 });

// ✅ Explicit return
const doubled = numbers.map(num => { return num * 2 });

// ✅ Implicit return
const doubled = numbers.map(num => num * 2);
```

### TypeScript errors with array methods
**Use proper typing**:
```tsx
interface Employee {
  name: string;
  salary: number;
}

const employees: Employee[] = [...];
```

## 🎯 Success Criteria
By the end of Week 4, you should:
- ✅ Have a working data processor showing all array methods
- ✅ Understand how map(), filter(), and reduce() work
- ✅ Be able to chain multiple array methods together
- ✅ Process object arrays and extract meaningful insights
- ✅ Successfully completed at least 3 homework tasks

## 💡 Real-World Applications
Array processing skills you're learning are used in:
- **Data dashboards** - calculating KPIs and summaries
- **E-commerce** - filtering products and calculating totals
- **Social media** - processing feeds and user interactions
- **Analytics** - transforming raw data into insights
- **Financial apps** - calculating balances and transactions
- **Your data tool** - exactly what you're building!

## 📞 Getting Help
- **During class**: Ask about array method logic immediately!
- **Slack/Discord**: Share code snippets for debugging
- **Email instructor**: [Instructor email]
- **Study group**: Practice explaining each method's purpose

---

**Next Week Preview**: We'll integrate file upload with your data processing skills to handle real CSV files! You'll combine forms, state, and array methods to build the core of your data analysis tool! 🚀

*Week 4 Guide - Updated September 2025*
