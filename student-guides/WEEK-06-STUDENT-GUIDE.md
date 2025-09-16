# 🎓 WEEK 6 STUDENT GUIDE
**Data Visualization & Charts**

## 📅 This Week's Mission
Transform your processed data into beautiful, interactive charts! You'll learn to create visualizations that make data insights immediately clear and compelling.

## 🎯 Learning Goals
- ✅ Integrate charting libraries (Recharts) into React
- ✅ Create bar charts, line charts, and pie charts
- ✅ Transform processed CSV data into chart-ready formats
- ✅ Make charts interactive with hover effects and tooltips
- ✅ Build a complete data visualization dashboard

## 🔄 Pre-Session Check
- [ ] Your CSV processor from Week 5 should handle file uploads
- [ ] You should see data summaries and previews working
- [ ] Array methods should be processing data correctly

**Quick test**: Upload a CSV file and verify data parsing works.

## 📚 Key Concepts This Week

### Chart Libraries in React
We'll use **Recharts** - a popular, easy-to-use charting library:

```jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Simple bar chart
<BarChart width={400} height={300} data={chartData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="value" fill="#8884d8" />
</BarChart>
```

### Data Transformation for Charts
Raw CSV data needs to be transformed for charts:

```jsx
// Raw data
const employees = [
  { name: "Alice", department: "Engineering", salary: 75000 },
  { name: "Bob", department: "Marketing", salary: 65000 }
];

// Transform for chart
const chartData = employees.map(emp => ({
  name: emp.name,
  salary: emp.salary
}));
```

## 🛠️ Today's Hands-On Project: Data Visualization Dashboard

### Step 1: Install Recharts
```bash
npm install recharts
```

### Step 2: Create ChartDashboard Component
**File**: `src/components/ChartDashboard.tsx`

```tsx
import { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface ChartData {
  [key: string]: string | number;
}

interface ChartDashboardProps {
  data: ChartData[];
  fileName?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const ChartDashboard = ({ data, fileName }: ChartDashboardProps) => {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  // Get available columns
  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  const numericColumns = columns.filter(col => 
    data.some(row => typeof row[col] === 'number')
  );
  const textColumns = columns.filter(col => 
    !numericColumns.includes(col)
  );

  // Set default columns on data change
  useEffect(() => {
    if (numericColumns.length > 0 && textColumns.length > 0) {
      setSelectedColumns([textColumns[0], numericColumns[0]]);
    }
  }, [data]);

  // Generate chart data based on selections
  useEffect(() => {
    if (selectedColumns.length >= 2 && data.length > 0) {
      const [categoryColumn, valueColumn] = selectedColumns;
      
      if (chartType === 'pie') {
        // For pie charts, group by category and sum values
        const grouped = data.reduce((acc, row) => {
          const category = String(row[categoryColumn]);
          const value = Number(row[valueColumn]) || 0;
          acc[category] = (acc[category] || 0) + value;
          return acc;
        }, {} as Record<string, number>);

        const pieData = Object.entries(grouped).map(([name, value]) => ({
          name,
          value
        }));
        
        setChartData(pieData);
      } else {
        // For bar/line charts, use data as-is or limit to first 10 rows
        const limitedData = data.slice(0, 10).map(row => ({
          [categoryColumn]: String(row[categoryColumn]),
          [valueColumn]: Number(row[valueColumn]) || 0
        }));
        
        setChartData(limitedData);
      }
    }
  }, [selectedColumns, chartType, data]);

  // Handle column selection
  const handleColumnChange = (index: number, column: string) => {
    const newColumns = [...selectedColumns];
    newColumns[index] = column;
    setSelectedColumns(newColumns);
  };

  if (data.length === 0) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg text-center">
        <div className="text-4xl mb-2">📊</div>
        <div className="text-gray-600">Upload a CSV file to see visualizations</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">📈 Data Visualization Dashboard</h2>
      
      {fileName && (
        <div className="mb-4 text-sm text-gray-600">
          Visualizing data from: <span className="font-medium">{fileName}</span>
        </div>
      )}

      {/* Chart Controls */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-3">Chart Configuration</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          {/* Chart Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Chart Type</label>
            <select 
              value={chartType} 
              onChange={(e) => setChartType(e.target.value as any)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
            </select>
          </div>

          {/* Category Column */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {chartType === 'pie' ? 'Group By' : 'X-Axis'} (Category)
            </label>
            <select 
              value={selectedColumns[0] || ''} 
              onChange={(e) => handleColumnChange(0, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select column...</option>
              {textColumns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

          {/* Value Column */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {chartType === 'pie' ? 'Values' : 'Y-Axis'} (Numeric)
            </label>
            <select 
              value={selectedColumns[1] || ''} 
              onChange={(e) => handleColumnChange(1, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select column...</option>
              {numericColumns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Chart Display */}
      {selectedColumns.length >= 2 && chartData.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3">
            {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart: 
            {selectedColumns[1]} by {selectedColumns[0]}
          </h3>
          
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' && (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey={selectedColumns[0]} 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey={selectedColumns[1]} 
                    fill="#0088FE"
                    name={selectedColumns[1]}
                  />
                </BarChart>
              )}

              {chartType === 'line' && (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey={selectedColumns[0]}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={selectedColumns[1]} 
                    stroke="#00C49F"
                    strokeWidth={2}
                    name={selectedColumns[1]}
                  />
                </LineChart>
              )}

              {chartType === 'pie' && (
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Chart Insights */}
      {chartData.length > 0 && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold mb-2">📊 Quick Insights</h4>
          <div className="text-sm space-y-1">
            {chartType === 'pie' ? (
              <>
                <div>• Total categories: {chartData.length}</div>
                <div>• Largest segment: {chartData.reduce((max, item) => 
                  item.value > max.value ? item : max, chartData[0]
                )?.name}</div>
                <div>• Total value: {chartData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}</div>
              </>
            ) : (
              <>
                <div>• Data points shown: {chartData.length}</div>
                <div>• Highest value: {Math.max(...chartData.map(item => item[selectedColumns[1]] || 0)).toLocaleString()}</div>
                <div>• Lowest value: {Math.min(...chartData.map(item => item[selectedColumns[1]] || 0)).toLocaleString()}</div>
                <div>• Average: {(chartData.reduce((sum, item) => sum + (item[selectedColumns[1]] || 0), 0) / chartData.length).toFixed(2)}</div>
              </>
            )}
          </div>
        </div>
      )}

      {/* No valid data message */}
      {selectedColumns.length < 2 && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-700">
          ⚠️ Please select both a category column and a numeric column to create a chart.
        </div>
      )}

      {/* Data limitations note */}
      {data.length > 10 && chartType !== 'pie' && (
        <div className="mt-4 text-xs text-gray-500 text-center">
          Note: Chart shows first 10 rows of data for performance. Pie charts show all data grouped by category.
        </div>
      )}
    </div>
  );
};

export default ChartDashboard;
```

### Step 3: Update CSVProcessor to Include Charts
**File**: Modify `src/components/CSVProcessor.tsx`

Add the import and component usage:

```tsx
import ChartDashboard from './ChartDashboard';

// Add this after the data preview section, before the closing div
{data.length > 0 && !isLoading && (
  <div className="mt-8">
    <ChartDashboard data={data} fileName={fileName} />
  </div>
)}
```

### Step 4: Test Your Visualizations
1. Upload the `sales-data.csv` file
2. Try different chart types with different column combinations
3. Observe how insights change with different visualizations

## 📊 Sample Data Perfect for Charts

### Monthly Sales Performance
```csv
Month,Revenue,Units_Sold,Marketing_Spend
January,25000,150,5000
February,28000,165,5500
March,32000,180,6000
April,30000,170,5800
May,35000,200,6500
June,38000,220,7000
```

### Product Categories
```csv
Category,Sales,Profit_Margin
Electronics,150000,25
Clothing,120000,45
Home,90000,35
Sports,75000,40
Books,45000,50
```

## 🏠 Homework Assignments

### Required Tasks
- [ ] **Task 1**: Add a scatter plot chart type option
- [ ] **Task 2**: Implement chart export functionality (save as image)
- [ ] **Task 3**: Add more color options for charts
- [ ] **Task 4**: Create a "Multiple Charts" view showing 2-3 charts at once

### Stretch Goals (Optional)
- [ ] **Challenge 1**: Add chart animation effects
- [ ] **Challenge 2**: Implement zoom functionality for detailed viewing
- [ ] **Challenge 3**: Add chart comparison (overlay multiple data series)
- [ ] **Challenge 4**: Create custom chart themes (dark mode, colorblind-friendly)

### Advanced Challenge: Smart Chart Recommendations
Build a feature that automatically suggests the best chart type based on data:
- **Categorical data**: Suggest bar or pie charts
- **Time series data**: Suggest line charts
- **Two numeric columns**: Suggest scatter plots
- **Multiple categories**: Suggest stacked bar charts

## 🔬 Chart Selection Guidelines

### When to Use Each Chart Type

#### Bar Charts 📊
- **Best for**: Comparing categories
- **Use when**: You have categorical data and want to compare values
- **Example**: Sales by product, employees by department

#### Line Charts 📈
- **Best for**: Showing trends over time
- **Use when**: You have sequential data (dates, time periods)
- **Example**: Revenue over months, temperature over days

#### Pie Charts 🥧
- **Best for**: Showing parts of a whole
- **Use when**: You want to show percentages or proportions
- **Example**: Market share, budget allocation

#### Scatter Plots 📍
- **Best for**: Showing relationships between two numeric variables
- **Use when**: Looking for correlations
- **Example**: Height vs weight, experience vs salary

## 🆘 Troubleshooting

### Charts not displaying
**Check**:
1. Is Recharts properly installed? (`npm install recharts`)
2. Are you selecting valid columns for your chart type?
3. Does your data have numeric values for the value column?

### "Cannot read property" errors
**Common causes**:
- Missing or undefined data
- Incorrect column names
- Data transformation errors

**Fix with defensive programming**:
```tsx
const safeData = data?.filter(row => row && typeof row === 'object') || [];
```

### Charts look weird or cramped
**Solutions**:
- Adjust ResponsiveContainer height
- Rotate X-axis labels for long text
- Limit data points for better readability
- Use appropriate chart margins

### Performance issues with large datasets
**Optimization strategies**:
- Limit chart data to reasonable number of points
- Use data sampling for very large datasets
- Implement data aggregation for summary charts
- Show loading states during data processing

## 🎯 Success Criteria
By the end of Week 6, you should:
- ✅ Have working bar, line, and pie charts
- ✅ Be able to switch between chart types dynamically
- ✅ Display meaningful insights from your visualizations
- ✅ Handle different data types appropriately in charts
- ✅ Successfully completed at least 3 homework tasks

## 💡 Real-World Applications
Data visualization skills you're learning are used in:
- **Business dashboards** - KPI tracking and reporting
- **Analytics platforms** - Google Analytics, social media insights
- **Financial applications** - investment tracking, expense analysis
- **Scientific research** - data analysis and presentation
- **Marketing tools** - campaign performance visualization
- **Your future career** - data visualization is essential in most fields!

## 📞 Getting Help
- **During class**: Ask about chart selection and data transformation!
- **Slack/Discord**: Share screenshots of chart issues
- **Email instructor**: [Instructor email]
- **Visualization practice**: Work with classmates to interpret charts

---

**Next Week Preview**: We'll learn to work with APIs and external data sources! You'll connect your application to real-time data and build more dynamic features. 🌐

*Week 6 Guide - Updated September 2025*
