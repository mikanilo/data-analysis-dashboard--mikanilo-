# 📋 WEEK 8 INSTRUCTOR PACKET
**Session 8: Polish & Performance**

## 🎯 LEARNING OBJECTIVES
By the end of this session, students will:
- ✅ Implement professional error boundaries and graceful error handling
- ✅ Create elegant loading states and skeleton screens
- ✅ Optimize performance with React best practices
- ✅ Build accessible and inclusive user interfaces
- ✅ Apply professional UX patterns and micro-interactions

---

## ⏰ DETAILED SESSION TIMELINE

### 0:00 - 0:10: Welcome & Production Mindset (10 minutes)
**Your Role**: Shift from "working" to "professional"

**Opening Hook**: "Your app works great... but is it ready for 1000 users? Let's find out!"

**Demo Quick Issues**:
- Rapidly click buttons to show multiple API calls
- Disconnect internet to show error states
- Show long loading times without feedback
- Try using app with screen reader or keyboard only

**Professional Standard Setting**:
"Today we transform your working prototype into a professional application. We'll handle edge cases, improve performance, and ensure everyone can use your app."

**Session Overview**:
1. Error boundaries & graceful failures
2. Loading states & skeleton screens
3. Performance optimization
4. Accessibility & inclusive design

---

### 0:10 - 0:30: Error Boundaries & Graceful Failures (20 minutes)
**Your Role**: Teach defensive programming patterns

#### **The Problem with Errors (5 minutes)**
**Show Error Demo**: Intentionally break React component
```tsx
// This will crash the entire app
const BrokenComponent = () => {
  const data = null;
  return <div>{data.property}</div>; // TypeError: Cannot read property of null
};
```

**Real-World Impact**:
- One error crashes entire application
- Users see blank white screen
- No recovery possible without refresh
- Lost user data and frustration

#### **Error Boundaries Solution (10 minutes)**

**Concept**: Error boundaries catch JavaScript errors anywhere in component tree and display fallback UI

```tsx
// Create src/components/ErrorBoundary.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Card className="max-w-md mx-auto mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              We're sorry, but something unexpected happened. This doesn't mean your data is lost!
            </p>
            <div className="flex gap-2">
              <Button onClick={this.handleReset} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 p-2 bg-gray-100 rounded text-xs">
                <summary>Error Details (Development)</summary>
                <pre className="mt-2 whitespace-pre-wrap">
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

#### **Wrap Your App (5 minutes)**
```tsx
// In src/App.tsx
import ErrorBoundary from '@/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Your existing app content */}
      </div>
    </ErrorBoundary>
  );
}
```

**Key Teaching Points**:
- Error boundaries only catch errors in child components
- They don't catch errors in event handlers, async code, or during SSR
- Always provide helpful error messages and recovery options

---

### 0:30 - 1:00: Loading States & Skeleton Screens (30 minutes)
**Your Role**: Transform boring loading into engaging UX

#### **Loading State Audit (5 minutes)**
**Current State Problems**:
- Basic "Loading..." text
- No indication of progress
- Jarring content shifts when data loads
- Users don't know what's happening

**Professional Standards**:
- Skeleton screens that match final content
- Progressive loading for different parts
- Meaningful loading messages
- Smooth transitions

#### **Skeleton Components (15 minutes)**

**Create Skeleton Library**:
```tsx
// Create src/components/ui/skeleton.tsx (if not exists)
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }

// Create src/components/skeletons/DataTableSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const DataTableSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTableSkeleton;

// Create src/components/skeletons/ChartSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ChartSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart bars */}
          <div className="flex items-end justify-between h-32 space-x-2">
            {[...Array(8)].map((_, i) => (
              <Skeleton 
                key={i} 
                className="w-8" 
                style={{ height: `${40 + Math.random() * 60}%` }}
              />
            ))}
          </div>
          {/* Chart labels */}
          <div className="flex justify-between">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-3 w-8" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartSkeleton;

// Create src/components/skeletons/ChatSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ChatSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* User message */}
          <div className="flex justify-end">
            <Skeleton className="h-12 w-64 rounded-lg" />
          </div>
          {/* AI response */}
          <div className="flex justify-start">
            <div className="space-y-2">
              <Skeleton className="h-4 w-80" />
              <Skeleton className="h-4 w-72" />
              <Skeleton className="h-4 w-60" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatSkeleton;
```

#### **Implement Progressive Loading (10 minutes)**

**Update Dashboard with Skeletons**:
```tsx
// In src/components/Dashboard.tsx
import DataTableSkeleton from '@/components/skeletons/DataTableSkeleton';
import ChartSkeleton from '@/components/skeletons/ChartSkeleton';

const Dashboard = ({ data, loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-6">
        <ChartSkeleton />
        <DataTableSkeleton />
      </div>
    );
  }

  // Existing dashboard content...
};
```

**Staggered Loading Effect**:
```tsx
// Create src/hooks/useStaggeredLoading.ts
import { useState, useEffect } from 'react';

export const useStaggeredLoading = (items: string[], delay = 300) => {
  const [loadedItems, setLoadedItems] = useState<string[]>([]);

  useEffect(() => {
    items.forEach((item, index) => {
      setTimeout(() => {
        setLoadedItems(prev => [...prev, item]);
      }, index * delay);
    });

    return () => setLoadedItems([]);
  }, [items, delay]);

  return loadedItems;
};

// Usage in components
const loadingStages = ['table', 'chart', 'insights', 'chat'];
const loadedStages = useStaggeredLoading(loadingStages);

return (
  <div className="space-y-6">
    {loadedStages.includes('table') ? <DataTable /> : <DataTableSkeleton />}
    {loadedStages.includes('chart') ? <ChartSection /> : <ChartSkeleton />}
    {loadedStages.includes('insights') ? <InsightsPanel /> : <InsightsSkeleton />}
    {loadedStages.includes('chat') ? <AIChat /> : <ChatSkeleton />}
  </div>
);
```

---

### 1:00 - 1:30: Performance Optimization (30 minutes)
**Your Role**: Teach React optimization techniques

#### **Performance Audit (5 minutes)**
**Common Performance Issues**:
- Unnecessary re-renders
- Heavy computations on every render
- Large bundle sizes
- Unoptimized images and assets

**Show React DevTools Profiler**: Demonstrate how to identify performance bottlenecks

#### **React Optimization Techniques (25 minutes)**

**1. Memoization with useMemo and useCallback (8 minutes)**
```tsx
// ❌ Expensive calculation on every render
const DataAnalysis = ({ data }) => {
  const expensiveCalculation = data.map(item => {
    // Complex processing
    return processComplexData(item);
  });

  return <div>{/* Render results */}</div>;
};

// ✅ Memoized calculation
const DataAnalysis = ({ data }) => {
  const expensiveCalculation = useMemo(() => {
    return data.map(item => processComplexData(item));
  }, [data]); // Only recalculate when data changes

  return <div>{/* Render results */}</div>;
};

// ❌ New function on every render
const ParentComponent = () => {
  const handleClick = () => console.log('clicked');
  return <ChildComponent onClick={handleClick} />; // Child re-renders unnecessarily
};

// ✅ Memoized callback
const ParentComponent = () => {
  const handleClick = useCallback(() => console.log('clicked'), []);
  return <ChildComponent onClick={handleClick} />; // Child won't re-render unnecessarily
};
```

**2. Component Memoization with React.memo (7 minutes)**
```tsx
// ❌ Re-renders even when props haven't changed
const ExpensiveChart = ({ data, title }) => {
  console.log('Chart rendering...'); // This runs on every parent re-render
  return (
    <div>
      <h3>{title}</h3>
      {/* Complex chart rendering */}
    </div>
  );
};

// ✅ Only re-renders when props change
const ExpensiveChart = React.memo(({ data, title }) => {
  console.log('Chart rendering...'); // This only runs when data or title changes
  return (
    <div>
      <h3>{title}</h3>
      {/* Complex chart rendering */}
    </div>
  );
});

// ✅ Custom comparison for complex objects
const ExpensiveChart = React.memo(({ data, title }) => {
  return (
    <div>
      <h3>{title}</h3>
      {/* Complex chart rendering */}
    </div>
  );
}, (prevProps, nextProps) => {
  // Return true if props are equal (don't re-render)
  return prevProps.title === nextProps.title && 
         JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});
```

**3. Virtual Scrolling for Large Data Sets (5 minutes)**
```tsx
// For very large datasets, implement virtual scrolling
import { FixedSizeList as List } from 'react-window';

const VirtualizedDataTable = ({ data }) => {
  const Row = ({ index, style }) => (
    <div style={style} className="flex border-b">
      <div className="w-1/4 p-2">{data[index].name}</div>
      <div className="w-1/4 p-2">{data[index].value}</div>
      <div className="w-1/4 p-2">{data[index].date}</div>
      <div className="w-1/4 p-2">{data[index].category}</div>
    </div>
  );

  return (
    <List
      height={400}
      itemCount={data.length}
      itemSize={50}
      className="border rounded"
    >
      {Row}
    </List>
  );
};
```

**4. Code Splitting and Lazy Loading (5 minutes)**
```tsx
// ❌ All components loaded immediately
import DataUpload from '@/components/DataUpload';
import Dashboard from '@/components/Dashboard';
import AIChat from '@/components/AIChat';

// ✅ Components loaded when needed
const DataUpload = lazy(() => import('@/components/DataUpload'));
const Dashboard = lazy(() => import('@/components/Dashboard'));
const AIChat = lazy(() => import('@/components/AIChat'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<DataUpload />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<AIChat />} />
      </Routes>
    </Suspense>
  );
};
```

---

### 1:30 - 1:50: Accessibility & Inclusive Design (20 minutes)
**Your Role**: Make technology accessible to everyone

#### **Accessibility Fundamentals (5 minutes)**
**Why Accessibility Matters**:
- 15% of the world has some form of disability
- Legal requirements (ADA compliance)
- Better UX for everyone
- SEO benefits

**Common Accessibility Issues**:
- Missing alt text on images
- Poor keyboard navigation
- Insufficient color contrast
- Missing ARIA labels

#### **Implementing Accessibility (15 minutes)**

**1. Semantic HTML and ARIA (5 minutes)**
```tsx
// ❌ Poor semantics
<div onClick={handleClick}>Submit</div>
<div>
  <div>Chart showing data trends</div>
  <div><!-- Chart content --></div>
</div>

// ✅ Proper semantics
<button onClick={handleClick} aria-label="Submit data for analysis">
  Submit
</button>
<section aria-labelledby="chart-title">
  <h2 id="chart-title">Chart showing data trends</h2>
  <div role="img" aria-label="Bar chart showing upward trend in sales data">
    <!-- Chart content -->
  </div>
</section>
```

**2. Keyboard Navigation (5 minutes)**
```tsx
// Ensure all interactive elements are keyboard accessible
const DataTable = ({ data }) => {
  const [selectedRow, setSelectedRow] = useState(0);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedRow(prev => Math.min(prev + 1, data.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedRow(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        handleRowAction(selectedRow);
        break;
    }
  };

  return (
    <table role="table" aria-label="Data analysis results">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Value</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody onKeyDown={handleKeyDown} tabIndex={0}>
        {data.map((row, index) => (
          <tr 
            key={row.id}
            aria-selected={selectedRow === index}
            className={selectedRow === index ? 'bg-blue-100' : ''}
          >
            <td>{row.name}</td>
            <td>{row.value}</td>
            <td>
              <button 
                aria-label={`Edit ${row.name}`}
                onClick={() => handleEdit(row.id)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
```

**3. Screen Reader Support (5 minutes)**
```tsx
// Provide meaningful descriptions for screen readers
const ChartSection = ({ data, loading }) => {
  const chartDescription = useMemo(() => {
    if (!data.length) return "No data available";
    
    const values = data.map(d => d.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    
    return `Chart displays ${data.length} data points. Values range from ${min} to ${max}, with an average of ${avg.toFixed(1)}. The overall trend shows ${avg > values[0] ? 'an increase' : 'a decrease'} over time.`;
  }, [data]);

  if (loading) {
    return (
      <div role="status" aria-live="polite">
        <span className="sr-only">Loading chart data...</span>
        <ChartSkeleton />
      </div>
    );
  }

  return (
    <section aria-labelledby="chart-title">
      <h2 id="chart-title">Data Visualization</h2>
      <div 
        role="img" 
        aria-label={chartDescription}
        aria-describedby="chart-description"
      >
        <Chart data={data} />
      </div>
      <p id="chart-description" className="sr-only">
        {chartDescription}
      </p>
    </section>
  );
};
```

---

### 1:50 - 2:00: Wrap Up & Professional Standards (10 minutes)
**Your Role**: Celebrate professional development achievement

#### **Professional Checklist Review (5 minutes)**
"Your app now meets professional standards!"

**✅ Error Handling**:
- Error boundaries prevent crashes
- Graceful failure recovery
- Helpful error messages

**✅ Loading Experience**:
- Skeleton screens match content
- Progressive loading stages
- Smooth transitions

**✅ Performance**:
- Optimized re-renders
- Efficient calculations
- Code splitting ready

**✅ Accessibility**:
- Keyboard navigation
- Screen reader support
- Semantic HTML structure

#### **Next Week Preview (3 minutes)**
"Next week we put it all together! You'll learn testing strategies, quality assurance practices, and how to catch issues before users do."

#### **Homework Assignment (2 minutes)**
**Required**: Add accessibility audit
```bash
# Install axe-core for accessibility testing
npm install @axe-core/react

# Add to your main.tsx
import { axeAccessibilityReporter } from '@axe-core/react';
if (process.env.NODE_ENV === 'development') {
  axeAccessibilityReporter(React, ReactDOM, 1000);
}
```

**Challenge**: Implement dark mode with proper contrast ratios

---

## 🛠️ INSTRUCTOR PREP CHECKLIST

### Before Session:
- [ ] Install React Developer Tools for performance demos
- [ ] Prepare accessibility testing tools (WAVE, axe)
- [ ] Have examples of good/bad loading states ready
- [ ] Test error boundary scenarios

### Materials Needed:
- [ ] Screen reader software for demos (or phone accessibility features)
- [ ] Performance profiling examples
- [ ] Color contrast checking tools
- [ ] Real-world accessibility case studies

### Key Teaching Points:
- [ ] Emphasize user experience impact of each optimization
- [ ] Show before/after comparisons for each improvement
- [ ] Connect accessibility to inclusive design principles
- [ ] Demonstrate professional development practices

---

## 🆘 TROUBLESHOOTING GUIDE

### Critical Issues:

1. **Error Boundary not catching errors**
```tsx
// ❌ These errors won't be caught by Error Boundaries
const Component = () => {
  useEffect(() => {
    throw new Error('This error happens in useEffect'); // Not caught!
  }, []);

  const handleClick = () => {
    throw new Error('This error happens in event handler'); // Not caught!
  };

  return <button onClick={handleClick}>Click me</button>;
};

// ✅ Wrap these in try-catch manually
const Component = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Risky operation
    } catch (err) {
      setError(err);
    }
  }, []);

  const handleClick = () => {
    try {
      // Risky operation
    } catch (err) {
      setError(err);
    }
  };

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return <button onClick={handleClick}>Click me</button>;
};
```

2. **useMemo dependency issues**
```tsx
// ❌ Missing dependencies
const expensiveValue = useMemo(() => {
  return data.map(item => item.value * multiplier);
}, [data]); // Missing 'multiplier' dependency!

// ✅ Include all dependencies
const expensiveValue = useMemo(() => {
  return data.map(item => item.value * multiplier);
}, [data, multiplier]);
```

3. **Accessibility issues**
```tsx
// ❌ Poor accessibility
<div onClick={handleClick}>Click me</div>
<img src="chart.png" />
<input placeholder="Enter name" />

// ✅ Accessible version
<button onClick={handleClick} aria-label="Submit form">
  Click me
</button>
<img src="chart.png" alt="Sales data showing 20% increase over last quarter" />
<label htmlFor="name-input">
  Name:
  <input id="name-input" placeholder="Enter your full name" />
</label>
```

### Learning Issues:

1. **"Performance optimization seems premature"**
   - Show examples of slow vs fast apps
   - Explain how good practices prevent future problems
   - Demonstrate React DevTools profiler

2. **"Accessibility feels like extra work"**
   - Show how accessibility helps everyone (captions, keyboard shortcuts)
   - Demonstrate screen reader usage
   - Explain legal and ethical importance

3. **"Error boundaries seem complex"**
   - Start with simple class component example
   - Show immediate benefit (no more white screen)
   - Explain error boundary placement strategy

---

## 📝 COMPLETE WORKING SOLUTIONS

### Professional Loading System:
```tsx
// src/hooks/useAsyncOperation.ts
import { useState, useCallback } from 'react';

export const useAsyncOperation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (asyncFunction) => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction();
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setLoading(false);
  }, []);

  return { loading, error, execute, reset };
};

// Usage in components
const DataComponent = () => {
  const [data, setData] = useState([]);
  const { loading, error, execute } = useAsyncOperation();

  const loadData = async () => {
    await execute(async () => {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    });
  };

  if (error) {
    return (
      <Card>
        <CardContent>
          <p className="text-red-600">Error loading data: {error.message}</p>
          <Button onClick={loadData}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return <DataTableSkeleton />;
  }

  return <DataTable data={data} />;
};
```

### Comprehensive Accessibility Component:
```tsx
// src/components/AccessibleDataTable.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronUp, ChevronDown } from 'lucide-react';

const AccessibleDataTable = ({ data, title = "Data Table" }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = useRef(null);

  // Announce changes to screen readers
  const [announcement, setAnnouncement] = useState('');

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;
    
    return [...data].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [data, sortColumn, sortDirection]);

  const handleSort = (column) => {
    const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newDirection);
    setAnnouncement(`Table sorted by ${column}, ${newDirection}ending order`);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextRow = Math.min(selectedRow + 1, sortedData.length - 1);
        setSelectedRow(nextRow);
        setAnnouncement(`Row ${nextRow + 1} of ${sortedData.length} selected`);
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        const prevRow = Math.max(selectedRow - 1, 0);
        setSelectedRow(prevRow);
        setAnnouncement(`Row ${prevRow + 1} of ${sortedData.length} selected`);
        break;
      
      case 'Home':
        e.preventDefault();
        setSelectedRow(0);
        setAnnouncement('First row selected');
        break;
      
      case 'End':
        e.preventDefault();
        setSelectedRow(sortedData.length - 1);
        setAnnouncement('Last row selected');
        break;
    }
  };

  const columns = Object.keys(data[0] || {});

  return (
    <Card>
      <CardHeader>
        <CardTitle id="table-title">{title}</CardTitle>
        <p className="text-sm text-gray-600">
          Use arrow keys to navigate, Home/End to jump to first/last row
        </p>
      </CardHeader>
      <CardContent>
        {/* Screen reader announcements */}
        <div 
          role="status" 
          aria-live="polite" 
          aria-atomic="true"
          className="sr-only"
        >
          {announcement}
        </div>

        <div className="overflow-x-auto">
          <table 
            ref={tableRef}
            role="table"
            aria-labelledby="table-title"
            aria-rowcount={sortedData.length + 1}
            className="w-full border-collapse border border-gray-200"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <thead>
              <tr role="row" aria-rowindex={1}>
                {columns.map((column, index) => (
                  <th
                    key={column}
                    role="columnheader"
                    aria-colindex={index + 1}
                    aria-sort={
                      sortColumn === column 
                        ? sortDirection === 'asc' ? 'ascending' : 'descending'
                        : 'none'
                    }
                    className="border border-gray-200 p-2 bg-gray-50 text-left"
                  >
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold"
                      onClick={() => handleSort(column)}
                      aria-label={`Sort by ${column}, currently ${
                        sortColumn === column 
                          ? sortDirection === 'asc' ? 'ascending' : 'descending'
                          : 'not sorted'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        {column.charAt(0).toUpperCase() + column.slice(1)}
                        {sortColumn === column && (
                          sortDirection === 'asc' 
                            ? <ChevronUp className="h-4 w-4" aria-hidden="true" />
                            : <ChevronDown className="h-4 w-4" aria-hidden="true" />
                        )}
                      </span>
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  role="row"
                  aria-rowindex={rowIndex + 2}
                  aria-selected={selectedRow === rowIndex}
                  className={`
                    ${selectedRow === rowIndex ? 'bg-blue-100' : 'hover:bg-gray-50'}
                    transition-colors
                  `}
                  onClick={() => setSelectedRow(rowIndex)}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={column}
                      role="gridcell"
                      aria-colindex={colIndex + 1}
                      className="border border-gray-200 p-2"
                    >
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-600" role="status">
          Showing {sortedData.length} rows
          {sortColumn && (
            <span>, sorted by {sortColumn} ({sortDirection}ending)</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessibleDataTable;
```

---

## 📊 ASSESSMENT RUBRIC

**Exceeds Expectations (A)**:
- Implements all optimization and accessibility features independently
- Creates sophisticated error handling with graceful recovery
- Demonstrates deep understanding of performance implications
- Goes beyond requirements with additional UX improvements

**Meets Expectations (B)**:
- Successfully implements error boundaries and loading states
- Shows good understanding of performance optimization concepts
- Applies basic accessibility principles correctly
- Creates professional-feeling user experience

**Approaching Expectations (C)**:
- Implements basic error handling and loading states with guidance
- Shows effort with performance optimization concepts
- Makes some accessibility improvements

**Needs Support (D)**:
- Struggles with error boundary implementation
- Has difficulty understanding performance optimization
- Requires significant help with accessibility concepts

---

## 🔍 WHAT TO LOOK FOR

### Students are "getting it" when they:
- Ask about performance implications of their code choices
- Proactively test with keyboard navigation and screen readers
- Think about edge cases and error scenarios
- Want to measure and optimize loading times

### Red flags that need attention:
- Dismissing accessibility as "extra work"
- Not understanding the connection between performance and user experience
- Struggling with async error handling patterns
- Adding loading states without considering the user journey

---

**💡 INSTRUCTOR TIP**: This session transforms students from "coders" to "engineers" - they're thinking about users, edge cases, and professional standards. Many students have "aha!" moments about what makes software feel professional vs amateur. Emphasize that these patterns are what separate hobbyist projects from production applications.
