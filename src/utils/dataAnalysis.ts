
import { DataRow, DataInsight } from '@/types/data';

// 🟡 MEDIUM - Week 2: Data Processing & Analysis
// TODO: Students - This file contains utilities for analyzing uploaded CSV data
// You'll enhance these functions to provide more sophisticated insights

export interface DataSummary {
  totalRows: number;
  totalColumns: number;
  numericColumns: number;
  textColumns: number;
  columnTypes: Record<string, 'number' | 'string' | 'boolean'>;
}

// 🟢 EASY - Week 2: Basic Data Summary
// TODO: Students - This function analyzes the structure of your dataset
// Learning objectives:
// - Understand data type detection
// - Learn about JavaScript array methods (forEach, filter, map)
// - Practice TypeScript interfaces
export const getDataSummary = (data: DataRow[]): DataSummary => {
  // TODO: Add error handling for malformed data
  // HINT: What happens if data is null or contains invalid rows?
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
  
  // 🟡 MEDIUM - Data Type Detection Algorithm
  // TODO: Students - Enhance this logic to handle edge cases
  // Current approach: Sample first 10 rows to determine column types
  // Consider: What if the first 10 rows don't represent the whole dataset?
  columns.forEach(column => {
    const sampleValues = data.slice(0, 10).map(row => row[column]).filter(val => val !== null && val !== undefined);
    
    // TODO: Improve type detection logic
    // HINT: Consider using regex for number detection, handle dates, etc.
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

// 🔴 ADVANCED - Week 2-3: Automated Insight Generation
// TODO: Students - This is where the magic happens! 
// You'll build an AI-like system that automatically finds patterns in data
// Learning objectives:
// - Statistical analysis (mean, median, outliers)
// - Pattern recognition algorithms
// - Data storytelling
export const generateDataInsights = (data: DataRow[]): DataInsight[] => {
  if (data.length === 0) return [];

  const insights: DataInsight[] = [];
  const summary = getDataSummary(data);

  // 🟢 EASY - Basic Dataset Summary
  // TODO: Students - Add more descriptive summary insights
  // HINT: What other interesting facts can you tell about the dataset?
  insights.push({
    type: 'summary',
    title: 'Dataset Overview',
    description: `Your dataset contains ${summary.totalRows} rows and ${summary.totalColumns} columns with ${summary.numericColumns} numeric fields for analysis.`,
    value: `${summary.totalRows} rows`
  });

  // 🟡 MEDIUM - Statistical Analysis for Numeric Columns
  // TODO: Students - Week 3: Add more statistical measures
  // Current: mean, min, max
  // Add: median, mode, standard deviation, percentiles
  Object.entries(summary.columnTypes).forEach(([column, type]) => {
    if (type === 'number') {
      const values = data.map(row => row[column] as number).filter(val => typeof val === 'number' && !isNaN(val));
      
      if (values.length > 0) {
        const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
        const max = Math.max(...values);
        const min = Math.min(...values);
        
        // TODO: Add more statistical measures here
        // HINT: median = sorted array middle value
        // HINT: mode = most frequently occurring value
        insights.push({
          type: 'summary',
          title: `${column} Statistics`,
          description: `Average: ${avg.toFixed(2)}, Range: ${min} - ${max}`,
          value: avg.toFixed(2)
        });

        // 🟡 MEDIUM - Outlier Detection Algorithm
        // TODO: Students - Week 4: Improve outlier detection
        // Current method: Interquartile Range (IQR)
        // Consider: Z-score method, modified Z-score, isolation forest
        const sorted = [...values].sort((a, b) => a - b);
        const q1 = sorted[Math.floor(sorted.length * 0.25)];
        const q3 = sorted[Math.floor(sorted.length * 0.75)];
        const iqr = q3 - q1;
        const outliers = values.filter(val => val < q1 - 1.5 * iqr || val > q3 + 1.5 * iqr);
        
        if (outliers.length > 0) {
          // TODO: Provide more context about outliers
          // HINT: Show which specific values are outliers
          // HINT: Explain why they might be significant
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

  // 🟡 MEDIUM - Categorical Data Analysis
  // TODO: Students - Week 4: Add more categorical insights
  // Current: unique value count
  // Add: most/least common categories, category distribution analysis
  Object.entries(summary.columnTypes).forEach(([column, type]) => {
    if (type === 'string') {
      const values = data.map(row => row[column] as string).filter(val => val !== null && val !== '');
      const uniqueValues = new Set(values);
      
      // TODO: Add frequency analysis
      // HINT: Create a Map to count occurrences of each category
      // TODO: Identify most/least common categories
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

  // 🔴 ADVANCED - Week 5-6: Add correlation analysis, trend detection, anomaly detection
  // TODO: Students - Implement advanced analytics
  // Ideas:
  // - Correlation matrix between numeric columns
  // - Time series analysis if date columns exist
  // - Clustering analysis for similar rows
  // - Predictive insights

  return insights.slice(0, 10); // Limit to 10 insights for performance
};

// 🟢 EASY - Week 6: Chart Data Preparation
// TODO: Students - This function prepares data for visualization
// Learning objectives:
// - Data transformation for charts
// - Understanding chart data requirements
export const getColumnData = (data: DataRow[], column: string) => {
  // TODO: Add data validation
  // HINT: What if the column doesn't exist in the data?
  
  // TODO: Week 6 - Improve data preparation for different chart types
  // HINT: Different charts need different data structures
  return data.map(row => ({
    name: String(row[Object.keys(row)[0]] || 'Unknown'),
    value: typeof row[column] === 'number' ? row[column] : 0
  })).slice(0, 20); // Limit for performance - TODO: Make this configurable
};

// 🔴 ADVANCED - Week 8-9: Add more utility functions
// TODO: Students - Add functions for:
// - Data cleaning (remove duplicates, handle missing values)
// - Data validation (check data quality)
// - Export functions (CSV, JSON)
// - Performance optimization for large datasets
