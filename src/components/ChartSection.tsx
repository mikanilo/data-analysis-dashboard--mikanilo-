
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { DataRow } from '@/types/data';
import { getDataSummary, getColumnData } from '@/utils/dataAnalysis';

interface ChartSectionProps {
  data: DataRow[];
  showAll?: boolean;
}

const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

const ChartSection = ({ data, showAll = false }: ChartSectionProps) => {
  const summary = useMemo(() => getDataSummary(data), [data]);
  
  const numericColumns = useMemo(() => {
    return Object.entries(summary.columnTypes)
      .filter(([_, type]) => type === 'number')
      .map(([column]) => column)
      .slice(0, showAll ? 10 : 2);
  }, [summary, showAll]);

  const chartData = useMemo(() => {
    if (numericColumns.length === 0) return [];
    
    return data.slice(0, 20).map((row, index) => {
      const item: any = { name: `Row ${index + 1}` };
      numericColumns.forEach(col => {
        item[col] = typeof row[col] === 'number' ? row[col] : 0;
      });
      return item;
    });
  }, [data, numericColumns]);

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
        </CardContent>
      </Card>
    );
  }

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
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                {type === 'bar' && (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    {numericColumns.map((column, idx) => (
                      <Bar 
                        key={column} 
                        dataKey={column} 
                        fill={COLORS[idx % COLORS.length]} 
                      />
                    ))}
                  </BarChart>
                )}
                {type === 'line' && (
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
                )}
                {type === 'pie' && numericColumns.length > 0 && (
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
