
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { DataRow } from '@/types/data';
import { getDataSummary, getColumnData } from '@/utils/dataAnalysis';

// 🟡 MEDIUM - Week 6: Data Visualization Component
// TODO: Students - This component creates interactive charts from your data
// Learning objectives:
// - React hooks (useMemo for performance)
// - Recharts library usage
// - Dynamic chart generation
// - Responsive design principles

interface ChartSectionProps {
  data: DataRow[];
  showAll?: boolean;
}

// Color palette for charts - TODO: Week 6 - Make this customizable
const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

const ChartSection = ({ data, showAll = false }: ChartSectionProps) => {
  // 🟢 EASY - React Performance Optimization
  // TODO: Students - Learn about useMemo hook
  // Why do we use useMemo here? What happens without it?
  // HINT: Prevents expensive recalculations on every render
  const summary = useMemo(() => getDataSummary(data), [data]);
  
  // 🟡 MEDIUM - Dynamic Column Selection
  // TODO: Students - Week 6: Add user control over which columns to visualize
  // Current: Automatically selects first 2 numeric columns
  // Enhancement: Let users choose which columns to display
  const numericColumns = useMemo(() => {
    return Object.entries(summary.columnTypes)
      .filter(([_, type]) => type === 'number')
      .map(([column]) => column)
      .slice(0, showAll ? 10 : 2);
  }, [summary, showAll]);

  // 🟡 MEDIUM - Chart Data Preparation
  // TODO: Students - Week 6: Optimize data preparation
  // Current limitation: Only shows first 20 rows
  // Consider: Pagination, aggregation, or sampling for large datasets
  const chartData = useMemo(() => {
    if (numericColumns.length === 0) return [];
    
    // TODO: Improve row labeling strategy
    // HINT: Try to use meaningful labels instead of "Row 1, Row 2..."
    return data.slice(0, 20).map((row, index) => {
      const item: any = { name: `Row ${index + 1}` };
      numericColumns.forEach(col => {
        item[col] = typeof row[col] === 'number' ? row[col] : 0;
      });
      return item;
    });
  }, [data, numericColumns]);

  // 🟢 EASY - Error Handling & User Feedback
  // TODO: Students - Week 3: Improve error messages
  // Make them more helpful and actionable
  if (numericColumns.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Charts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            No numeric columns found for visualization. Upload data with numeric values to see charts.
          </p>
          {/* TODO: Add helpful tips for data format */}
        </CardContent>
      </Card>
    );
  }

  // 🟡 MEDIUM - Chart Configuration
  // TODO: Students - Week 6: Add more chart types
  // Current: bar, line, pie
  // Add: scatter plot, area chart, histogram, box plot
  const charts = showAll ? [
    { type: 'bar', title: 'Bar Chart' },
    { type: 'line', title: 'Line Chart' },
    { type: 'pie', title: 'Distribution' }
  ] : [{ type: 'bar', title: 'Data Overview' }];

  return (
    <div className={`space-y-6 ${showAll ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : ''}`}>
      {charts.map(({ type, title }) => (
        <Card key={type}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {/* TODO: Week 6 - Add chart controls (zoom, filter, export) */}
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                {/* 🟡 MEDIUM - Chart Type Implementation */}
                {/* TODO: Students - Week 6: Understand each chart type */}
                {/* When to use bar vs line vs pie charts? */}
                {type === 'bar' ? (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    {/* TODO: Add custom tooltip content */}
                    {numericColumns.map((column, idx) => (
                      <Bar 
                        key={column} 
                        dataKey={column} 
                        fill={COLORS[idx % COLORS.length]} 
                      />
                    ))}
                  </BarChart>
                ) : type === 'line' ? (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    {numericColumns.map((column, idx) => (
                      <Line 
                        key={column}
                        type="monotone" 
                        dataKey={column} 
                        stroke={COLORS[idx % COLORS.length]}
                        strokeWidth={2}
                      />
                    ))}
                  </LineChart>
                ) : (
                  // 🔴 ADVANCED - Pie Chart Implementation
                  // TODO: Students - Week 6: Handle pie chart data properly
                  // Current limitation: Only uses first numeric column
                  // Consider: How to meaningfully represent multiple columns in pie chart?
                  <PieChart>
                    <Pie
                      data={getColumnData(data, numericColumns[0]).slice(0, 6)}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {getColumnData(data, numericColumns[0]).slice(0, 6).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ChartSection;

// 🔴 ADVANCED - Week 7-8: Component Enhancement Ideas
// TODO: Students - Add these advanced features:
// 1. Chart interaction (click to drill down)
// 2. Real-time data updates
// 3. Chart export functionality (PNG, PDF)
// 4. Custom chart themes
// 5. Accessibility improvements (ARIA labels, keyboard navigation)
