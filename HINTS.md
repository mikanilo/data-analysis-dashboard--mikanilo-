
# 💡 Hints and Solutions Guide

This file contains detailed hints and solutions for common challenges in the Plug-N-Learn project. Use these when you're stuck, but try to solve problems on your own first!

## 📋 How to Use This Guide

1. **Try First** - Attempt the problem yourself
2. **Check Hints** - Look at the relevant hint section
3. **Ask for Help** - If still stuck, ask on Discord/GitHub
4. **Share Solutions** - Help others once you figure it out

---

## 🟢 Week 1: Project Foundation

<details>
<summary>🔧 Setup Issues</summary>

### Common Problems:

**Port Already in Use:**
```bash
# Solution 1: Use different port
npm run dev -- --port 3001

# Solution 2: Kill existing process
# On Mac/Linux:
lsof -ti:5173 | xargs kill -9

# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

**Node Version Issues:**
```bash
# Check your Node version
node --version

# Should be 18+ for this project
# If not, install the latest LTS version from nodejs.org
```

**Permission Errors:**
```bash
# On Mac/Linux, never use sudo with npm
# Instead, configure npm to use a different directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

</details>

<details>
<summary>📁 Understanding Project Structure</summary>

### Key Files Explanation:

```
src/
├── main.tsx           # 🎯 App entry point - starts everything
├── App.tsx            # 🏠 Main app component with routing
├── components/        # 🧩 Reusable UI pieces
│   ├── Dashboard.tsx  # 📊 Main page layout
│   └── ui/           # 🎨 Basic components (buttons, cards, etc.)
├── utils/            # 🛠️ Helper functions
│   └── dataAnalysis.ts # 📈 Data processing logic
└── types/            # 📝 TypeScript definitions
    └── data.ts       # 📊 Data structure definitions
```

### What Each File Does:
- **main.tsx**: Boots up your React app
- **App.tsx**: Sets up routing and global providers
- **Dashboard.tsx**: The main screen users see
- **dataAnalysis.ts**: Where the data magic happens

</details>

---

## 🟡 Week 2: Data Processing

<details>
<summary>📊 Understanding Data Types</summary>

### Type Detection Strategy:

```typescript
// ✅ Good approach
const detectColumnType = (values: any[]) => {
  // Remove null/undefined values
  const cleanValues = values.filter(v => v !== null && v !== undefined && v !== '');
  
  if (cleanValues.length === 0) return 'string';
  
  // Check if all values are numbers
  const allNumbers = cleanValues.every(v => !isNaN(Number(v)) && typeof v !== 'boolean');
  if (allNumbers) return 'number';
  
  // Check if all values are booleans
  const allBooleans = cleanValues.every(v => typeof v === 'boolean' || v === 'true' || v === 'false');
  if (allBooleans) return 'boolean';
  
  return 'string';
};
```

### Common Edge Cases:
- Empty strings (`""`)
- Number strings (`"123"` vs `123`)
- Boolean strings (`"true"` vs `true`)
- Mixed types in same column

</details>

<details>
<summary>🔢 Statistical Calculations</summary>

### Basic Statistics Implementation:

```typescript
// Mean (Average)
const mean = (numbers: number[]) => {
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
};

// Median (Middle value)
const median = (numbers: number[]) => {
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
};

// Mode (Most frequent value)
const mode = (numbers: number[]) => {
  const frequency: { [key: number]: number } = {};
  
  numbers.forEach(n => {
    frequency[n] = (frequency[n] || 0) + 1;
  });
  
  let maxCount = 0;
  let mostFrequent = numbers[0];
  
  for (const [value, count] of Object.entries(frequency)) {
    if (count > maxCount) {
      maxCount = count;
      mostFrequent = Number(value);
    }
  }
  
  return mostFrequent;
};

// Standard Deviation
const standardDeviation = (numbers: number[]) => {
  const avg = mean(numbers);
  const squareDiffs = numbers.map(n => Math.pow(n - avg, 2));
  return Math.sqrt(mean(squareDiffs));
};
```

</details>

<details>
<summary>🎯 Outlier Detection</summary>

### IQR Method (Interquartile Range):

```typescript
const findOutliers = (numbers: number[]) => {
  const sorted = [...numbers].sort((a, b) => a - b);
  const n = sorted.length;
  
  // Calculate quartiles
  const q1Index = Math.floor(n * 0.25);
  const q3Index = Math.floor(n * 0.75);
  
  const q1 = sorted[q1Index];
  const q3 = sorted[q3Index];
  const iqr = q3 - q1;
  
  // Outlier boundaries
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  
  // Find outliers
  return numbers.filter(n => n < lowerBound || n > upperBound);
};
```

### Z-Score Method (Alternative):

```typescript
const findOutliersZScore = (numbers: number[], threshold = 2) => {
  const avg = mean(numbers);
  const stdDev = standardDeviation(numbers);
  
  return numbers.filter(n => {
    const zScore = Math.abs((n - avg) / stdDev);
    return zScore > threshold;
  });
};
```

</details>

---

## 🟢 Week 3: UI Components

<details>
<summary>🎨 Tailwind CSS Quick Reference</summary>

### Layout Classes:
```css
/* Flexbox */
flex flex-col        /* Vertical stack */
flex flex-row        /* Horizontal stack */
justify-center       /* Center horizontally */
items-center         /* Center vertically */
gap-4               /* Space between items */

/* Grid */
grid grid-cols-2     /* 2 column grid */
grid grid-cols-1 md:grid-cols-2  /* Responsive grid */

/* Spacing */
p-4                 /* Padding all sides */
px-4 py-2           /* Padding horizontal/vertical */
m-4                 /* Margin all sides */
space-y-4           /* Vertical spacing between children */

/* Responsive */
sm:text-lg          /* Large text on small screens+ */
md:hidden           /* Hide on medium screens+ */
lg:grid-cols-3      /* 3 columns on large screens+ */
```

### Component Styling:
```css
/* Cards */
bg-white rounded-lg shadow-md p-6

/* Buttons */
bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded

/* Text */
text-gray-900 font-semibold text-lg
text-gray-600 text-sm

/* States */
hover:bg-gray-50
focus:ring-2 focus:ring-blue-500
disabled:opacity-50
```

</details>

<details>
<summary>📱 Responsive Design Tips</summary>

### Mobile-First Approach:
```tsx
// ✅ Good - Start with mobile, add larger screen styles
<div className="
  flex flex-col       // Mobile: stack vertically
  md:flex-row         // Tablet+: side by side
  lg:max-w-6xl        // Desktop: max width
  mx-auto             // Center on large screens
">
  <div className="
    w-full              // Mobile: full width
    md:w-1/2            // Tablet+: half width
    p-4                 // Padding on all sizes
    md:p-6              // More padding on larger screens
  ">
    Content here
  </div>
</div>
```

### Breakpoint Reference:
- `sm:` - 640px and up (tablet)
- `md:` - 768px and up (desktop)
- `lg:` - 1024px and up (large desktop)
- `xl:` - 1280px and up (extra large)

</details>

---

## 🟡 Week 4: Data Tables

<details>
<summary>📋 Table Performance</summary>

### Virtualization for Large Datasets:

```tsx
import { useMemo } from 'react';

const DataTable = ({ data }: { data: DataRow[] }) => {
  // Only render visible rows
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(50);
  
  const visibleData = useMemo(() => {
    return data.slice(startIndex, endIndex);
  }, [data, startIndex, endIndex]);
  
  return (
    <div className="h-96 overflow-auto">
      {/* Render only visible rows */}
      {visibleData.map((row, index) => (
        <TableRow key={startIndex + index} data={row} />
      ))}
    </div>
  );
};
```

### Search and Filter:

```tsx
const [searchTerm, setSearchTerm] = useState('');
const [sortColumn, setSortColumn] = useState<string | null>(null);
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

const filteredAndSortedData = useMemo(() => {
  let result = data;
  
  // Filter by search term
  if (searchTerm) {
    result = result.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }
  
  // Sort by column
  if (sortColumn) {
    result = [...result].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      
      if (sortDirection === 'asc') {
        return aStr.localeCompare(bStr);
      }
      return bStr.localeCompare(aStr);
    });
  }
  
  return result;
}, [data, searchTerm, sortColumn, sortDirection]);
```

</details>

---

## 🟡 Week 5: File Upload

<details>
<summary>📁 File Handling</summary>

### CSV File Processing:

```tsx
const handleFileUpload = async (file: File) => {
  // Validate file type
  if (!file.name.endsWith('.csv')) {
    throw new Error('Please upload a CSV file');
  }
  
  // Validate file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File too large. Please upload a file smaller than 5MB');
  }
  
  // Read file content
  const text = await file.text();
  
  // Parse CSV
  const rows = text.split('\n').map(row => 
    row.split(',').map(cell => cell.trim())
  );
  
  // First row is headers
  const headers = rows[0];
  const data = rows.slice(1).map(row => {
    const obj: DataRow = {};
    headers.forEach((header, index) => {
      const value = row[index];
      
      // Try to convert to number
      const numValue = Number(value);
      if (!isNaN(numValue) && value !== '') {
        obj[header] = numValue;
      } else if (value === 'true' || value === 'false') {
        obj[header] = value === 'true';
      } else {
        obj[header] = value;
      }
    });
    return obj;
  });
  
  return data;
};
```

### Drag and Drop:

```tsx
const [isDragOver, setIsDragOver] = useState(false);

const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
  setIsDragOver(true);
};

const handleDragLeave = (e: React.DragEvent) => {
  e.preventDefault();
  setIsDragOver(false);
};

const handleDrop = async (e: React.DragEvent) => {
  e.preventDefault();
  setIsDragOver(false);
  
  const files = Array.from(e.dataTransfer.files);
  const csvFile = files.find(file => file.name.endsWith('.csv'));
  
  if (csvFile) {
    await handleFileUpload(csvFile);
  }
};

return (
  <div
    className={`
      border-2 border-dashed rounded-lg p-8 text-center
      ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
    `}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
  >
    <p>Drag and drop your CSV file here, or click to select</p>
  </div>
);
```

</details>

---

## 🟡 Week 6: Charts

<details>
<summary>📊 Chart Selection Logic</summary>

### When to Use Each Chart Type:

```typescript
const getRecommendedChartType = (data: DataRow[], column: string) => {
  const values = data.map(row => row[column]);
  const uniqueValues = new Set(values);
  
  // Categorical data with few categories -> Pie Chart
  if (uniqueValues.size <= 10 && typeof values[0] === 'string') {
    return 'pie';
  }
  
  // Time series data -> Line Chart
  if (column.toLowerCase().includes('date') || column.toLowerCase().includes('time')) {
    return 'line';
  }
  
  // Numeric data for comparison -> Bar Chart
  if (typeof values[0] === 'number' && uniqueValues.size > 2) {
    return 'bar';
  }
  
  // Two numeric columns -> Scatter Plot
  return 'scatter';
};
```

### Dynamic Color Generation:

```typescript
const generateColors = (count: number) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = (i * 360) / count;
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
};
```

</details>

<details>
<summary>📈 Advanced Chart Features</summary>

### Custom Tooltip:

```tsx
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-lg">
        <p className="font-semibold">{`Category: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Use in chart
<BarChart data={data}>
  <Tooltip content={<CustomTooltip />} />
</BarChart>
```

### Interactive Features:

```tsx
const [selectedData, setSelectedData] = useState(null);

const handleBarClick = (data: any) => {
  setSelectedData(data);
  // Could trigger drill-down view, filter table, etc.
};

<Bar 
  dataKey="value" 
  fill="#8884d8"
  onClick={handleBarClick}
  style={{ cursor: 'pointer' }}
/>
```

</details>

---

## 🔴 Week 7: AI Integration

<details>
<summary>🤖 OpenAI Integration</summary>

### Environment Setup:

```bash
# Create .env.local file
echo "VITE_OPENAI_API_KEY=your_api_key_here" > .env.local

# Add to .gitignore (IMPORTANT!)
echo ".env.local" >> .gitignore
```

### API Call Implementation:

```typescript
const sendMessageToAI = async (message: string, dataContext: DataRow[]) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a data analyst. The user has uploaded a dataset with ${dataContext.length} rows. 
                   Here's a sample of the data: ${JSON.stringify(dataContext.slice(0, 3))}.
                   Answer questions about this data and provide insights.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 500
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to get AI response');
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
};
```

### Error Handling:

```typescript
const handleSendMessage = async () => {
  setIsLoading(true);
  setError(null);
  
  try {
    const aiResponse = await sendMessageToAI(input, data);
    
    const aiMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'ai',
      content: aiResponse,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Unknown error');
    
    // Show error message to user
    const errorMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'ai',
      content: 'Sorry, I encountered an error. Please try again.',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsLoading(false);
  }
};
```

</details>

<details>
<summary>💬 Context Management</summary>

### Conversation Memory:

```typescript
const buildConversationContext = (messages: ChatMessage[], dataContext: DataRow[]) => {
  const conversationHistory = messages
    .slice(-5) // Last 5 messages for context
    .map(msg => `${msg.type}: ${msg.content}`)
    .join('\n');
  
  const dataInfo = {
    totalRows: dataContext.length,
    columns: Object.keys(dataContext[0] || {}),
    sampleData: dataContext.slice(0, 2)
  };
  
  return {
    conversation: conversationHistory,
    data: dataInfo
  };
};
```

### Smart Data Sampling:

```typescript
const getRelevantDataSample = (data: DataRow[], query: string) => {
  // Extract mentioned columns from query
  const columns = Object.keys(data[0] || {});
  const mentionedColumns = columns.filter(col => 
    query.toLowerCase().includes(col.toLowerCase())
  );
  
  if (mentionedColumns.length > 0) {
    // Return data with only relevant columns
    return data.slice(0, 10).map(row => {
      const relevantRow: DataRow = {};
      mentionedColumns.forEach(col => {
        relevantRow[col] = row[col];
      });
      return relevantRow;
    });
  }
  
  // Return general sample
  return data.slice(0, 5);
};
```

</details>

---

## 🟡 Week 8: Polish & Features

<details>
<summary>♿ Accessibility Improvements</summary>

### ARIA Labels and Roles:

```tsx
// Data table
<table role="table" aria-label="Data analysis results">
  <thead>
    <tr role="row">
      <th 
        role="columnheader"
        aria-sort={sortColumn === 'name' ? sortDirection : 'none'}
        onClick={() => handleSort('name')}
      >
        Name
      </th>
    </tr>
  </thead>
</table>

// Chart section
<div 
  role="img" 
  aria-label={`Bar chart showing ${data.length} data points`}
>
  <ResponsiveContainer>
    <BarChart data={data}>
      {/* Chart content */}
    </BarChart>
  </ResponsiveContainer>
</div>

// Loading states
<div 
  role="status" 
  aria-live="polite"
  aria-label={isLoading ? "Loading data" : "Data loaded"}
>
  {isLoading ? <Spinner /> : <DataTable data={data} />}
</div>
```

### Keyboard Navigation:

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
    case ' ': // Space bar
      e.preventDefault();
      handleClick();
      break;
    case 'Escape':
      handleClose();
      break;
    case 'ArrowUp':
    case 'ArrowDown':
      e.preventDefault();
      navigateOptions(e.key === 'ArrowUp' ? -1 : 1);
      break;
  }
};

<button
  onKeyDown={handleKeyDown}
  aria-pressed={isActive}
  className="focus:ring-2 focus:ring-blue-500 focus:outline-none"
>
  Button Text
</button>
```

</details>

<details>
<summary>📤 Export Functionality</summary>

### CSV Export:

```typescript
const exportToCSV = (data: DataRow[], filename: string) => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape values that contain commas
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};
```

### Chart Export:

```typescript
const exportChartAsPNG = async (chartRef: React.RefObject<HTMLDivElement>) => {
  if (!chartRef.current) return;
  
  // You'll need to install html2canvas
  // npm install html2canvas @types/html2canvas
  const html2canvas = (await import('html2canvas')).default;
  
  const canvas = await html2canvas(chartRef.current);
  const link = document.createElement('a');
  link.download = 'chart.png';
  link.href = canvas.toDataURL();
  link.click();
};
```

</details>

---

## 🟢 Week 9: Testing

<details>
<summary>🧪 Unit Testing Examples</summary>

### Testing Utility Functions:

```typescript
// utils/dataAnalysis.test.ts
import { getDataSummary, generateDataInsights } from './dataAnalysis';

describe('getDataSummary', () => {
  test('handles empty data', () => {
    const result = getDataSummary([]);
    expect(result.totalRows).toBe(0);
    expect(result.totalColumns).toBe(0);
  });
  
  test('correctly identifies column types', () => {
    const data = [
      { name: 'John', age: 25, active: true },
      { name: 'Jane', age: 30, active: false }
    ];
    
    const result = getDataSummary(data);
    expect(result.columnTypes.name).toBe('string');
    expect(result.columnTypes.age).toBe('number');
    expect(result.columnTypes.active).toBe('boolean');
  });
});
```

### Testing React Components:

```typescript
// components/DataTable.test.tsx
import { render, screen } from '@testing-library/react';
import DataTable from './DataTable';

test('renders table with data', () => {
  const data = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 }
  ];
  
  render(<DataTable data={data} />);
  
  expect(screen.getByText('John')).toBeInTheDocument();
  expect(screen.getByText('Jane')).toBeInTheDocument();
  expect(screen.getByText('25')).toBeInTheDocument();
  expect(screen.getByText('30')).toBeInTheDocument();
});

test('shows empty state when no data', () => {
  render(<DataTable data={[]} />);
  
  expect(screen.getByText(/no data available/i)).toBeInTheDocument();
});
```

</details>

---

## 🟢 Week 10: Deployment

<details>
<summary>🚀 Deployment Checklist</summary>

### Pre-Deployment:

```bash
# 1. Build for production
npm run build

# 2. Test production build locally
npm run preview

# 3. Check for console errors
# Open browser dev tools and look for errors

# 4. Test on different devices/browsers
# Chrome, Firefox, Safari
# Desktop, tablet, mobile

# 5. Performance audit
# Use Chrome DevTools Lighthouse
```

### Environment Variables:

```typescript
// vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_APP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

### Vercel Deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add VITE_OPENAI_API_KEY production
```

</details>

<details>
<summary>🎥 Demo Preparation</summary>

### Demo Script Structure:

1. **Hook** (30 seconds)
   - Start with an interesting insight from sample data
   - "What if I told you this dataset reveals..."

2. **Problem** (1 minute)
   - Explain the challenge of data analysis
   - "Most people struggle to find patterns in their data"

3. **Solution Demo** (3-4 minutes)
   - Upload data live
   - Show automatic insights
   - Generate charts
   - Ask AI questions

4. **Technical Highlights** (2 minutes)
   - Mention key technologies used
   - Highlight challenging features you built
   - Show code snippets

5. **Conclusion** (30 seconds)
   - Summarize what you built
   - Mention what you learned
   - Next steps/future features

### Sample Data Ideas:
- Sales data (monthly trends, product performance)
- Survey responses (satisfaction scores, demographics)
- Sports statistics (player performance, team rankings)
- Weather data (temperature trends, precipitation)

</details>

---

## 🆘 Common Error Solutions

<details>
<summary>❌ TypeError: Cannot read property 'X' of undefined</summary>

This usually means you're trying to access a property on something that doesn't exist.

**Common causes:**
```typescript
// ❌ Bad - data might be undefined
const summary = getDataSummary(data);

// ✅ Good - check if data exists first
const summary = data ? getDataSummary(data) : null;

// ❌ Bad - row might not have the property
const value = row[columnName];

// ✅ Good - provide fallback
const value = row[columnName] ?? 'N/A';
```

**React component fix:**
```tsx
// ❌ Bad
const Component = ({ data }: { data: DataRow[] }) => {
  const summary = getDataSummary(data);
  return <div>{summary.totalRows}</div>;
};

// ✅ Good
const Component = ({ data }: { data: DataRow[] }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }
  
  const summary = getDataSummary(data);
  return <div>{summary.totalRows}</div>;
};
```

</details>

<details>
<summary>❌ Module not found errors</summary>

**Missing dependency:**
```bash
# Error: Cannot resolve module 'recharts'
npm install recharts

# Error: Cannot resolve module '@types/node'  
npm install -D @types/node
```

**Wrong import path:**
```typescript
// ❌ Bad - wrong path
import { DataRow } from '../types/data';

// ✅ Good - correct path
import { DataRow } from '@/types/data';
```

**Missing file:**
```typescript
// ❌ Error: Cannot find module './utils/helper'
// Make sure the file exists: src/utils/helper.ts

// ✅ Create the missing file or fix the import
import { helper } from '@/utils/dataAnalysis'; // Use existing file
```

</details>

<details>
<summary>❌ Build/Compilation Errors</summary>

**TypeScript errors:**
```typescript
// ❌ Type 'string | number' is not assignable to type 'number'
const age: number = row.age; // row.age might be string

// ✅ Fix with type checking
const age: number = typeof row.age === 'number' ? row.age : 0;

// ❌ Property 'map' does not exist on type 'undefined'
data.map(item => ...); // data might be undefined

// ✅ Fix with optional chaining
data?.map(item => ...) ?? [];
```

**ESLint errors:**
```typescript
// ❌ 'React' must be in scope when using JSX
// Add to top of file:
import React from 'react';

// ❌ 'console' is not defined
// Add to eslint config or remove console.log statements
```

</details>

---

## 📝 Final Tips

### Debugging Strategies:
1. **Use console.log liberally** - Don't be afraid to add logs
2. **React DevTools** - Install the browser extension
3. **TypeScript errors** - Read them carefully, they're usually helpful
4. **Network tab** - Check API calls in browser dev tools
5. **Google the error** - Usually someone else has had the same problem

### Best Practices:
- **Commit early and often** - Small commits are easier to understand
- **Write descriptive commit messages** - Your future self will thank you
- **Keep components small** - Easier to understand and test
- **Use TypeScript properly** - Don't use `any` type unless absolutely necessary
- **Handle errors gracefully** - Always think about what could go wrong

### Getting Unstuck:
1. Take a break - Sometimes stepping away helps
2. Explain the problem out loud - Rubber duck debugging
3. Break the problem into smaller pieces
4. Ask for help - Don't struggle alone for hours
5. Check the solution branch - But try to understand, don't just copy

Remember: Making mistakes is part of learning! Every developer has been where you are now. Keep going! 🚀
