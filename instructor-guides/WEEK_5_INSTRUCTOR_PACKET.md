# 📋 WEEK 5 INSTRUCTOR PACKET
**Session 5: Charts & Data Visualization**

## 🎯 LEARNING OBJECTIVES
By the end of this session, students will:
- ✅ Create interactive charts using Recharts library
- ✅ Understand different chart types and their use cases
- ✅ Transform data for visualization
- ✅ Make charts responsive and accessible
- ✅ Build a complete chart component with multiple visualization options

---

## ⏰ DETAILED SESSION TIMELINE

### 0:00 - 0:10: Welcome & Check-In (10 minutes)
**Your Role**: Connect data analysis to visual storytelling

**Ice Breaker**: "What's your favorite type of chart or graph?"

**Examples to Discuss**:
- Bar charts: Comparing categories (sales by month, grades by subject)
- Line charts: Trends over time (stock prices, temperature changes)
- Pie charts: Parts of a whole (budget breakdown, survey responses)
- Scatter plots: Relationships between variables (height vs weight)

**Show Real Examples**: Weather apps, sports statistics, news charts, social media analytics

**Bridge**: "Numbers tell stories, but charts make stories visible!"

---

### 0:10 - 0:30: Concept Overview (20 minutes)
**Your Role**: Demonstrate chart creation with live coding

#### **Data Visualization Principles (5 minutes)**
**The Golden Rules**:
1. **Choose the right chart type**:
   - Comparison → Bar chart
   - Trend over time → Line chart  
   - Parts of whole → Pie chart
   - Relationship → Scatter plot

2. **Keep it simple**: Don't overwhelm with too much data
3. **Use color meaningfully**: Consistent, accessible colors
4. **Label everything**: Axes, legends, titles
5. **Make it responsive**: Works on all screen sizes

#### **Recharts Library Introduction (8 minutes)**
**Why Recharts?**
- Built specifically for React
- Responsive by default
- Easy to customize
- Great performance

**Basic Pattern**:
```jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', sales: 100 },
  { month: 'Feb', sales: 150 },
  { month: 'Mar', sales: 200 }
];

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="sales" fill="#3b82f6" />
  </BarChart>
</ResponsiveContainer>
```

#### **Data Transformation (4 minutes)**
**From Analysis to Visualization**:
```javascript
// Raw data from last week
const scores = [85, 92, 78, 96, 88, 94, 82];

// Transform for chart
const chartData = scores.map((score, index) => ({
  student: `Student ${index + 1}`,
  score: score
}));
// Result: [{ student: 'Student 1', score: 85 }, ...]
```

#### **Responsive Design (3 minutes)**
**Making Charts Work Everywhere**:
```jsx
// Always wrap charts in ResponsiveContainer
<ResponsiveContainer width="100%" height={300}>
  {/* Chart goes here */}
</ResponsiveContainer>

// Use appropriate heights for different contexts
// Mobile: 250px, Desktop: 400px, Dashboard: 300px
```

---

### 0:30 - 1:15: Build Time (45 minutes)
**Your Role**: Guide chart creation step-by-step

#### **Phase 1: Create Simple Bar Chart (20 minutes)**

**Student Task**: Create `src/components/SimpleChart.tsx`

**Step 1** (5 minutes): Setup and imports
```tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SimpleChart = () => {
  const data = [
    { month: 'Jan', sales: 65 },
    { month: 'Feb', sales: 85 },
    { month: 'Mar', sales: 75 },
    { month: 'Apr', sales: 95 },
    { month: 'May', sales: 110 },
    { month: 'Jun', sales: 125 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Sales Performance</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Chart will go here */}
      </CardContent>
    </Card>
  );
};

export default SimpleChart;
```

**Step 2** (10 minutes): Add the bar chart
```tsx
return (
  <Card>
    <CardHeader>
      <CardTitle>Monthly Sales Performance</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
```

**Step 3** (5 minutes): Test and adjust
- Add to homepage to see it render
- Try different colors: `fill="#10b981"`, `fill="#f59e0b"`
- Experiment with height values

**Your Role During This Phase**:
- Help with Recharts imports (common issue)
- Explain each chart component's purpose
- Show how to customize colors and styling
- Address responsive container questions

#### **Phase 2: Add Multiple Chart Types (15 minutes)**

**Student Task**: Extend component with line and pie charts

**Step 1** (5 minutes): Add chart type selector
```tsx
import { useState } from 'react';
// ... other imports
import { LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const SimpleChart = () => {
  const [chartType, setChartType] = useState('bar');
  const data = [/* same data */];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Sales Performance</CardTitle>
        <div className="flex space-x-2">
          <button 
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded ${chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Bar Chart
          </button>
          <button 
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded ${chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Line Chart
          </button>
          <button 
            onClick={() => setChartType('pie')}
            className={`px-3 py-1 rounded ${chartType === 'pie' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Pie Chart
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Chart rendering will go here */}
      </CardContent>
    </Card>
  );
};
```

**Step 2** (10 minutes): Add conditional rendering for different charts
```tsx
<CardContent>
  <ResponsiveContainer width="100%" height={300}>
    {chartType === 'bar' && (
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sales" fill="#3b82f6" />
      </BarChart>
    )}
    
    {chartType === 'line' && (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} />
      </LineChart>
    )}
    
    {chartType === 'pie' && (
      <PieChart>
        <Pie
          data={data}
          dataKey="sales"
          nameKey="month"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#3b82f6"
          label
        />
        <Tooltip />
      </PieChart>
    )}
  </ResponsiveContainer>
</CardContent>
```

#### **Phase 3: Connect to Real Data (10 minutes)**

**Student Task**: Use DataAnalyzer results in charts

**Step 1** (5 minutes): Create data transformation function
```tsx
const transformAnalysisToChart = (analysis) => {
  if (!analysis || analysis.error) return [];
  
  return [
    { name: 'Average', value: analysis.average },
    { name: 'Maximum', value: analysis.maximum },
    { name: 'Minimum', value: analysis.minimum },
    { name: 'Range', value: analysis.range }
  ];
};
```

**Step 2** (5 minutes): Pass data from parent component
```tsx
// In src/pages/Index.tsx
const [analysisResults, setAnalysisResults] = useState(null);

// Pass to both components
<DataAnalyzer onAnalysisComplete={setAnalysisResults} />
<SimpleChart analysisData={analysisResults} />
```

---

### 1:15 - 1:45: Group Share/Troubleshooting (30 minutes)
**Your Role**: Facilitate chart exploration and refinement

#### **Chart Gallery Showcase (10 minutes)**
- Students demonstrate their different chart types
- Compare how same data looks in bar vs line vs pie
- Discuss: "Which chart tells the story best?"

#### **Customization Workshop (15 minutes)**
**Challenge Students With**:

**Color Customization**:
```tsx
const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

// For pie chart
<Pie>
  {data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
  ))}
</Pie>
```

**Styling Enhancements**:
```tsx
// Rounded bars
<Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />

// Smooth lines
<Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} />

// Custom tooltips
<Tooltip 
  contentStyle={{ backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px' }}
  labelStyle={{ color: '#374151' }}
/>
```

**Common Issues & Solutions**:
1. **Charts not appearing**: Check imports and data structure
2. **Responsive issues**: Verify ResponsiveContainer usage
3. **Data format errors**: Ensure objects have correct keys
4. **Styling problems**: Check Tailwind classes vs Recharts props

#### **Performance and Accessibility (5 minutes)**
**Best Practices**:
- Always use ResponsiveContainer for mobile
- Provide alt text or data tables for screen readers
- Use sufficient color contrast
- Don't rely solely on color to convey information

---

### 1:45 - 2:00: Wrap Up & Next Steps (15 minutes)
**Your Role**: Celebrate visualization achievements

#### **Data Visualization Achievement (5 minutes)**
"You're now data visualization experts!"
- You can create multiple chart types
- You understand when to use each type
- You can make charts responsive and interactive
- You're ready to tell data stories visually!

#### **Homework Assignment (5 minutes)**
**Required**: Create a chart with your own data
```tsx
// Example: Track your own data for a week
const myData = [
  { day: 'Mon', hours_studied: 2 },
  { day: 'Tue', hours_studied: 3 },
  { day: 'Wed', hours_studied: 1 },
  // ... add your own data
];
```

**Challenge Options**:
1. **Easy**: Change colors and styling of existing charts
2. **Medium**: Add a scatter plot or area chart
3. **Hard**: Create a dashboard with multiple charts

#### **Next Week Preview (5 minutes)**
"Next week we add AI intelligence! Your charts will become smart - automatically generating insights, finding patterns, and explaining what the data means in plain English."

---

## 🛠️ INSTRUCTOR PREP CHECKLIST

### Before Session:
- [ ] Ensure Recharts is installed (`npm install recharts`)
- [ ] Test all chart examples work correctly
- [ ] Prepare real-world chart examples for inspiration
- [ ] Have backup data sets ready

### Materials Needed:
- [ ] Color palette reference for chart customization
- [ ] Examples of good vs bad charts
- [ ] Mobile device to test responsive behavior
- [ ] Screenshot examples of professional dashboards

### Key Teaching Points:
- [ ] Emphasize choosing right chart for data story
- [ ] Show importance of responsive design
- [ ] Demonstrate accessibility considerations
- [ ] Connect to real-world data visualization examples

---

## 🆘 TROUBLESHOOTING GUIDE

### Critical Issues:

1. **Recharts import errors**
```tsx
// ❌ Wrong - trying to import everything
import Recharts from 'recharts';

// ✅ Correct - named imports
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
```

2. **Data format mismatches**
```tsx
// ❌ Wrong data structure
const data = [65, 85, 75, 95];  // Array of numbers

// ✅ Correct data structure
const data = [
  { month: 'Jan', sales: 65 },
  { month: 'Feb', sales: 85 }
];  // Array of objects
```

3. **ResponsiveContainer issues**
```tsx
// ❌ Missing responsive wrapper
<BarChart data={data}>
  {/* Chart content */}
</BarChart>

// ✅ Properly wrapped
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    {/* Chart content */}
  </BarChart>
</ResponsiveContainer>
```

### Learning Issues:

1. **"Which chart should I use?"**
   - Show decision tree: Time series → Line, Categories → Bar, Parts of whole → Pie
   - Give examples from their daily life (grades, weather, sports)

2. **"Charts look different than expected"**
   - Check data key names match what's in data objects
   - Verify chart component props (dataKey, nameKey, etc.)

3. **"Responsive behavior isn't working"**
   - Ensure ResponsiveContainer is used
   - Check parent container has defined width/height

---

## 📝 COMPLETE WORKING SOLUTIONS

### Advanced Chart Component:
```tsx
import { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdvancedChart = ({ data: rawData, title = "Data Visualization" }) => {
  const [chartType, setChartType] = useState('bar');
  
  // Transform data for charts
  const data = rawData || [
    { name: 'Jan', value: 65, category: 'Q1' },
    { name: 'Feb', value: 85, category: 'Q1' },
    { name: 'Mar', value: 75, category: 'Q1' },
    { name: 'Apr', value: 95, category: 'Q2' },
    { name: 'May', value: 110, category: 'Q2' },
    { name: 'Jun', value: 125, category: 'Q2' }
  ];

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const chartTypes = [
    { key: 'bar', label: 'Bar Chart', icon: '📊' },
    { key: 'line', label: 'Line Chart', icon: '📈' },
    { key: 'pie', label: 'Pie Chart', icon: '🥧' }
  ];

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#f9fafb', 
                border: 'none', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ r: 6, fill: '#3b82f6' }}
              activeDot={{ r: 8, fill: '#1d4ed8' }}
            />
          </LineChart>
        );
      
      case 'pie':
        return (
          <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <div className="flex space-x-1">
            {chartTypes.map(type => (
              <Button
                key={type.key}
                variant={chartType === type.key ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType(type.key)}
                className="text-xs"
              >
                {type.icon} {type.label}
              </Button>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {renderChart()}
        </ResponsiveContainer>
        
        <div className="mt-4 text-sm text-gray-500">
          <p>Showing {data.length} data points</p>
          <p>Total value: {data.reduce((sum, item) => sum + item.value, 0)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedChart;
```

---

## 📊 ASSESSMENT RUBRIC

**Exceeds Expectations (A)**:
- Creates multiple chart types independently
- Implements advanced customizations (colors, styling, interactions)
- Connects charts to dynamic data sources
- Explains appropriate chart usage for different data types

**Meets Expectations (B)**:
- Creates working charts with minimal guidance
- Successfully implements chart type switching
- Demonstrates understanding of responsive design
- Makes basic customizations to appearance

**Approaching Expectations (C)**:
- Creates basic charts with significant guidance
- Has working solution but needs help with customization
- Shows effort with data visualization concepts

**Needs Support (D)**:
- Unable to create working charts
- Struggles with Recharts library usage
- Requires additional one-on-one help

---

## 🔍 WHAT TO LOOK FOR

### Students are "getting it" when they:
- Experiment with different chart types for same data
- Ask about advanced customization options
- Connect charts to their own real-world data
- Discuss when different chart types are appropriate

### Red flags that need attention:
- Charts not rendering (import/data structure issues)
- Confused about responsive design concepts
- Struggling with conditional rendering for chart switching
- Frustrated with styling and customization

---

**💡 INSTRUCTOR TIP**: Visualization is where students often have their "wow" moment - seeing their data come to life visually is incredibly powerful! Encourage experimentation with colors, styles, and chart types. This is also a great time to discuss design principles and user experience.
