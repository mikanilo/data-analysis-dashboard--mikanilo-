
import { DataRow, DataInsight } from '@/types/data';

export interface DataSummary {
  totalRows: number;
  totalColumns: number;
  numericColumns: number;
  textColumns: number;
  columnTypes: Record<string, 'number' | 'string' | 'boolean'>;
}

export const getDataSummary = (data: DataRow[]): DataSummary => {
  if (data.length === 0) {
    return {
      totalRows: 0,
      totalColumns: 0,
      numericColumns: 0,
      textColumns: 0,
      columnTypes: {}
    };
  }

  const columns = Object.keys(data[0]);
  const columnTypes: Record<string, 'number' | 'string' | 'boolean'> = {};
  
  columns.forEach(column => {
    const sampleValues = data.slice(0, 10).map(row => row[column]).filter(val => val !== null && val !== undefined);
    
    if (sampleValues.every(val => typeof val === 'number')) {
      columnTypes[column] = 'number';
    } else if (sampleValues.every(val => typeof val === 'boolean')) {
      columnTypes[column] = 'boolean';
    } else {
      columnTypes[column] = 'string';
    }
  });

  const numericColumns = Object.values(columnTypes).filter(type => type === 'number').length;
  const textColumns = Object.values(columnTypes).filter(type => type === 'string').length;

  return {
    totalRows: data.length,
    totalColumns: columns.length,
    numericColumns,
    textColumns,
    columnTypes
  };
};

export const generateDataInsights = (data: DataRow[]): DataInsight[] => {
  if (data.length === 0) return [];

  const insights: DataInsight[] = [];
  const summary = getDataSummary(data);

  // Basic summary insight
  insights.push({
    type: 'summary',
    title: 'Dataset Overview',
    description: `Your dataset contains ${summary.totalRows} rows and ${summary.totalColumns} columns with ${summary.numericColumns} numeric fields for analysis.`,
    value: `${summary.totalRows} rows`
  });

  // Analyze numeric columns for trends
  Object.entries(summary.columnTypes).forEach(([column, type]) => {
    if (type === 'number') {
      const values = data.map(row => row[column] as number).filter(val => typeof val === 'number' && !isNaN(val));
      
      if (values.length > 0) {
        const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
        const max = Math.max(...values);
        const min = Math.min(...values);
        
        insights.push({
          type: 'summary',
          title: `${column} Statistics`,
          description: `Average: ${avg.toFixed(2)}, Range: ${min} - ${max}`,
          value: avg.toFixed(2)
        });

        // Check for potential outliers (simple method)
        const sorted = [...values].sort((a, b) => a - b);
        const q1 = sorted[Math.floor(sorted.length * 0.25)];
        const q3 = sorted[Math.floor(sorted.length * 0.75)];
        const iqr = q3 - q1;
        const outliers = values.filter(val => val < q1 - 1.5 * iqr || val > q3 + 1.5 * iqr);
        
        if (outliers.length > 0) {
          insights.push({
            type: 'outlier',
            title: `${column} Outliers Detected`,
            description: `Found ${outliers.length} potential outliers that may need investigation.`,
            value: outliers.length.toString(),
            confidence: 0.7
          });
        }
      }
    }
  });

  // Analyze categorical data
  Object.entries(summary.columnTypes).forEach(([column, type]) => {
    if (type === 'string') {
      const values = data.map(row => row[column] as string).filter(val => val !== null && val !== '');
      const uniqueValues = new Set(values);
      
      if (uniqueValues.size < values.length * 0.5 && uniqueValues.size > 1) {
        insights.push({
          type: 'summary',
          title: `${column} Categories`,
          description: `Contains ${uniqueValues.size} unique categories across ${values.length} entries.`,
          value: `${uniqueValues.size} categories`
        });
      }
    }
  });

  return insights.slice(0, 10); // Limit to 10 insights
};

export const getColumnData = (data: DataRow[], column: string) => {
  return data.map(row => ({
    name: String(row[Object.keys(row)[0]] || 'Unknown'),
    value: typeof row[column] === 'number' ? row[column] : 0
  })).slice(0, 20); // Limit for performance
};
