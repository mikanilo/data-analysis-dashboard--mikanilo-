# 🎓 WEEK 8 STUDENT GUIDE
**Personal Dataset Integration & Advanced Analytics**

## 📅 This Week's Mission
Integrate your chosen personal dataset into the application and build advanced analytics features! You'll create custom insights, advanced filtering, and begin developing your unique data story.

## 🎯 Learning Goals
- ✅ Successfully import and process your personal dataset
- ✅ Create custom analytics functions for your specific data
- ✅ Build advanced filtering and search capabilities
- ✅ Develop preliminary insights and hypotheses about your data
- ✅ Design custom visualizations tailored to your dataset

## 🔄 Pre-Session Check
- [ ] You should have chosen and downloaded your personal dataset
- [ ] Your Dataset Evaluation Form should be completed
- [ ] Your API fetcher from Week 7 should be working
- [ ] All basic chart types should display correctly

**Quick test**: Upload a sample CSV and create different chart types successfully.

## 📊 **YOUR PERSONAL DATA INTEGRATION BEGINS!**

### From Generic Tool to Personalized Analysis
This week transforms your data discovery tool from a general-purpose application into a specialized analytics platform designed around YOUR data and YOUR questions.

### What Makes This Week Special?
✅ **Your Data, Your Rules** - Custom features based on your dataset  
✅ **Real Insights** - Discover actual patterns in data you care about  
✅ **Portfolio Piece** - Build something unique for job interviews  
✅ **Problem-Solving** - Handle real-world data challenges  

## 🛠️ Today's Hands-On Project: Personal Data Analytics Engine

### Step 1: Create PersonalDataAnalyzer Component
**File**: `src/components/PersonalDataAnalyzer.tsx`

```tsx
import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalysisResult {
  name: string;
  value: number | string;
  type: 'number' | 'text' | 'percentage';
  insight?: string;
}

interface PersonalDataAnalyzerProps {
  data: any[];
  fileName?: string;
}

const PersonalDataAnalyzer = ({ data, fileName }: PersonalDataAnalyzerProps) => {
  const [insights, setInsights] = useState<AnalysisResult[]>([]);
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Get available columns
  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  const numericColumns = columns.filter(col => 
    data.some(row => typeof row[col] === 'number' && !isNaN(row[col]))
  );
  const textColumns = columns.filter(col => 
    !numericColumns.includes(col)
  );

  // Generate advanced insights
  useEffect(() => {
    if (data.length === 0) return;

    const newInsights: AnalysisResult[] = [];

    // Basic statistics
    newInsights.push({
      name: 'Total Records',
      value: data.length,
      type: 'number',
      insight: 'Total number of data points in your dataset'
    });

    // Numeric column analysis
    numericColumns.forEach(column => {
      const values = data
        .map(row => Number(row[column]))
        .filter(val => !isNaN(val));

      if (values.length > 0) {
        const sum = values.reduce((a, b) => a + b, 0);
        const avg = sum / values.length;
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min;

        newInsights.push({
          name: `${column} Average`,
          value: avg.toFixed(2),
          type: 'number',
          insight: `Average value across all records`
        });

        newInsights.push({
          name: `${column} Range`,
          value: `${min} - ${max}`,
          type: 'text',
          insight: `Minimum and maximum values (Range: ${range.toFixed(2)})`
        });

        // Identify outliers (values more than 2 standard deviations from mean)
        const variance = values.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / values.length;
        const stdDev = Math.sqrt(variance);
        const outliers = values.filter(val => Math.abs(val - avg) > 2 * stdDev);
        
        if (outliers.length > 0) {
          newInsights.push({
            name: `${column} Outliers`,
            value: outliers.length,
            type: 'number',
            insight: `Data points that are unusually high or low`
          });
        }
      }
    });

    // Text column analysis
    textColumns.forEach(column => {
      const values = data.map(row => String(row[column])).filter(val => val && val !== 'undefined');
      const uniqueValues = [...new Set(values)];
      
      newInsights.push({
        name: `${column} Categories`,
        value: uniqueValues.length,
        type: 'number',
        insight: `Number of unique values in ${column}`
      });

      // Most common value
      if (values.length > 0) {
        const frequency: Record<string, number> = {};
        values.forEach(val => {
          frequency[val] = (frequency[val] || 0) + 1;
        });

        const mostCommon = Object.entries(frequency)
          .sort(([,a], [,b]) => b - a)[0];

        if (mostCommon) {
          newInsights.push({
            name: `Most Common ${column}`,
            value: `${mostCommon[0]} (${mostCommon[1]} times)`,
            type: 'text',
            insight: `Most frequently occurring value`
          });
        }
      }
    });

    // Data quality insights
    const missingValues = columns.reduce((acc, col) => {
      const missing = data.filter(row => 
        row[col] === null || row[col] === undefined || row[col] === ''
      ).length;
      return acc + missing;
    }, 0);

    if (missingValues > 0) {
      const completeness = ((data.length * columns.length - missingValues) / (data.length * columns.length)) * 100;
      newInsights.push({
        name: 'Data Completeness',
        value: `${completeness.toFixed(1)}%`,
        type: 'percentage',
        insight: `Percentage of cells with valid data`
      });
    }

    setInsights(newInsights);
  }, [data, numericColumns, textColumns, columns]);

  // Apply filters and search
  useEffect(() => {
    let result = [...data];

    // Apply column filter
    if (filterColumn && filterValue) {
      result = result.filter(row => {
        const cellValue = String(row[filterColumn]).toLowerCase();
        return cellValue.includes(filterValue.toLowerCase());
      });
    }

    // Apply search across all columns
    if (searchTerm) {
      result = result.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortColumn) {
      result.sort((a, b) => {
        let aVal = a[sortColumn];
        let bVal = b[sortColumn];

        // Handle numeric sorting
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }

        // Handle string sorting
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
        
        if (sortDirection === 'asc') {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        } else {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
      });
    }

    setFilteredData(result);
  }, [data, filterColumn, filterValue, searchTerm, sortColumn, sortDirection]);

  // Generate correlation insights for numeric columns
  const generateCorrelations = () => {
    if (numericColumns.length < 2) return [];

    const correlations: any[] = [];

    for (let i = 0; i < numericColumns.length; i++) {
      for (let j = i + 1; j < numericColumns.length; j++) {
        const col1 = numericColumns[i];
        const col2 = numericColumns[j];

        const pairs = data
          .map(row => [Number(row[col1]), Number(row[col2])])
          .filter(([a, b]) => !isNaN(a) && !isNaN(b));

        if (pairs.length > 5) {
          // Simple correlation calculation
          const n = pairs.length;
          const sum1 = pairs.reduce((sum, [a]) => sum + a, 0);
          const sum2 = pairs.reduce((sum, [, b]) => sum + b, 0);
          const sum1Sq = pairs.reduce((sum, [a]) => sum + a * a, 0);
          const sum2Sq = pairs.reduce((sum, [, b]) => sum + b * b, 0);
          const pSum = pairs.reduce((sum, [a, b]) => sum + a * b, 0);

          const num = pSum - (sum1 * sum2 / n);
          const den = Math.sqrt((sum1Sq - sum1 * sum1 / n) * (sum2Sq - sum2 * sum2 / n));
          
          if (den !== 0) {
            const correlation = num / den;
            
            correlations.push({
              pair: `${col1} ↔ ${col2}`,
              correlation: correlation.toFixed(3),
              strength: Math.abs(correlation) > 0.7 ? 'Strong' : 
                       Math.abs(correlation) > 0.3 ? 'Moderate' : 'Weak',
              direction: correlation > 0 ? 'Positive' : 'Negative'
            });
          }
        }
      }
    }

    return correlations.sort((a, b) => 
      Math.abs(Number(b.correlation)) - Math.abs(Number(a.correlation))
    );
  };

  const correlations = generateCorrelations();

  if (data.length === 0) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg text-center">
        <div className="text-4xl mb-2">🔍</div>
        <div className="text-gray-600">Upload your personal dataset to see advanced analytics</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">🔬 Personal Data Analytics Engine</h2>
      
      {fileName && (
        <div className="mb-4 text-sm text-gray-600">
          Analyzing your dataset: <span className="font-medium">{fileName}</span>
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-3 rounded text-center">
          <div className="text-2xl font-bold">{data.length}</div>
          <div className="text-sm text-gray-600">Total Records</div>
        </div>
        <div className="bg-green-50 p-3 rounded text-center">
          <div className="text-2xl font-bold">{columns.length}</div>
          <div className="text-sm text-gray-600">Columns</div>
        </div>
        <div className="bg-purple-50 p-3 rounded text-center">
          <div className="text-2xl font-bold">{numericColumns.length}</div>
          <div className="text-sm text-gray-600">Numeric Fields</div>
        </div>
        <div className="bg-orange-50 p-3 rounded text-center">
          <div className="text-2xl font-bold">{textColumns.length}</div>
          <div className="text-sm text-gray-600">Text Fields</div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-3">🔍 Filter & Search Your Data</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {/* Global Search */}
          <div>
            <label className="block text-sm font-medium mb-1">Search All Columns</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search across all data..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Column Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Filter by Column</label>
            <select
              value={filterColumn}
              onChange={(e) => setFilterColumn(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select column...</option>
              {columns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

          {/* Filter Value */}
          <div>
            <label className="block text-sm font-medium mb-1">Filter Value</label>
            <input
              type="text"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              placeholder="Enter filter value..."
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!filterColumn}
            />
          </div>
        </div>

        {/* Sort Controls */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Sort by Column</label>
            <select
              value={sortColumn}
              onChange={(e) => setSortColumn(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">No sorting</option>
              {columns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sort Direction</label>
            <select
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!sortColumn}
            >
              <option value="asc">Ascending (A→Z, 1→9)</option>
              <option value="desc">Descending (Z→A, 9→1)</option>
            </select>
          </div>
        </div>

        {/* Filter Results Info */}
        {(searchTerm || filterColumn) && (
          <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
            Showing {filteredData.length} of {data.length} records
            {searchTerm && ` matching "${searchTerm}"`}
            {filterColumn && filterValue && ` where ${filterColumn} contains "${filterValue}"`}
          </div>
        )}
      </div>

      {/* Advanced Insights */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">📊 Advanced Insights</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <div className="font-medium text-blue-900">{insight.name}</div>
              <div className="text-2xl font-bold text-blue-700 my-1">
                {insight.value}
              </div>
              {insight.insight && (
                <div className="text-xs text-blue-600">{insight.insight}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Correlations */}
      {correlations.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">🔗 Data Relationships</h3>
          <div className="space-y-2">
            {correlations.slice(0, 5).map((corr, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded flex justify-between items-center">
                <div>
                  <div className="font-medium">{corr.pair}</div>
                  <div className="text-sm text-gray-600">
                    {corr.strength} {corr.direction} relationship
                  </div>
                </div>
                <div className={`text-lg font-bold ${
                  Math.abs(Number(corr.correlation)) > 0.7 ? 'text-red-600' :
                  Math.abs(Number(corr.correlation)) > 0.3 ? 'text-yellow-600' :
                  'text-gray-600'
                }`}>
                  {corr.correlation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtered Data Table */}
      <div>
        <h3 className="text-lg font-semibold mb-3">📋 Your Data</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                {columns.slice(0, 6).map(header => (
                  <th key={header} className="border border-gray-200 px-3 py-2 text-left font-medium">
                    <button
                      onClick={() => {
                        if (sortColumn === header) {
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortColumn(header);
                          setSortDirection('asc');
                        }
                      }}
                      className="flex items-center gap-1 hover:text-blue-600"
                    >
                      {header}
                      {sortColumn === header && (
                        <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(0, 10).map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {columns.slice(0, 6).map((col, cellIndex) => (
                    <td key={cellIndex} className="border border-gray-200 px-3 py-2">
                      {String(row[col]).length > 30 ? 
                        String(row[col]).substring(0, 30) + '...' : 
                        String(row[col])
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredData.length > 10 && (
          <div className="text-center mt-3 text-gray-600 text-sm">
            Showing first 10 of {filteredData.length} filtered records
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalDataAnalyzer;
```

### Step 2: Update CSVProcessor to Include Personal Analytics
**File**: Modify `src/components/CSVProcessor.tsx`

Add after the chart dashboard:

```tsx
import PersonalDataAnalyzer from './PersonalDataAnalyzer';

// Add this after ChartDashboard
{data.length > 0 && !isLoading && (
  <div className="mt-8">
    <PersonalDataAnalyzer data={data} fileName={fileName} />
  </div>
)}
```

### Step 3: Test with Your Personal Dataset
1. Upload your chosen personal dataset
2. Explore the advanced insights generated
3. Use filtering and search to find specific patterns
4. Test correlations between numeric fields
5. Document interesting findings

## 🏠 Homework Assignments

### Required Tasks
- [ ] **Task 1**: Upload your personal dataset and document 5 key insights
- [ ] **Task 2**: Use filtering to find the top 10% of records by a specific metric
- [ ] **Task 3**: Identify and explain the strongest correlation in your data
- [ ] **Task 4**: Write a 1-page summary of what your data reveals

### Dataset-Specific Challenges
Choose based on your data type:

#### For **Numeric-Heavy Data** (financial, sports, measurements):
- [ ] **Challenge 1**: Create a custom statistical analysis (median, mode, quartiles)
- [ ] **Challenge 2**: Identify and analyze outliers in your dataset
- [ ] **Challenge 3**: Build a trend analysis showing changes over time

#### For **Categorical Data** (surveys, demographics, ratings):
- [ ] **Challenge 1**: Create cross-tabulation analysis between categories
- [ ] **Challenge 2**: Build a frequency distribution analysis
- [ ] **Challenge 3**: Identify patterns in categorical combinations

#### For **Time-Series Data** (daily/monthly records):
- [ ] **Challenge 1**: Analyze seasonal patterns in your data
- [ ] **Challenge 2**: Create moving averages for trend analysis
- [ ] **Challenge 3**: Identify the fastest growing/declining periods

### Presentation Preparation
- [ ] **Task 5**: Create 3 compelling visualizations that tell your data story
- [ ] **Task 6**: Prepare a 2-minute explanation of your most surprising finding
- [ ] **Task 7**: Identify 3 questions your analysis raises for further investigation

## 🔬 Advanced Analytics Concepts

### Statistical Measures
```jsx
// Quartiles calculation
const calculateQuartiles = (values: number[]) => {
  const sorted = values.sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q2 = sorted[Math.floor(sorted.length * 0.5)]; // median
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  return { q1, q2, q3 };
};
```

### Pattern Recognition
```jsx
// Trend detection
const detectTrend = (values: number[]) => {
  let increasing = 0, decreasing = 0;
  for (let i = 1; i < values.length; i++) {
    if (values[i] > values[i-1]) increasing++;
    if (values[i] < values[i-1]) decreasing++;
  }
  return increasing > decreasing ? 'increasing' : 'decreasing';
};
```

### Data Quality Assessment
```jsx
// Completeness analysis
const assessDataQuality = (data: any[]) => {
  const totalCells = data.length * Object.keys(data[0]).length;
  const emptyCells = data.reduce((count, row) => {
    return count + Object.values(row).filter(val => 
      val === null || val === undefined || val === ''
    ).length;
  }, 0);
  
  return {
    completeness: ((totalCells - emptyCells) / totalCells) * 100,
    totalCells,
    emptyCells
  };
};
```

## 🎯 Success Criteria
By the end of Week 8, you should:
- ✅ Have successfully integrated your personal dataset
- ✅ Generate meaningful insights specific to your data
- ✅ Use advanced filtering and search effectively
- ✅ Identify at least 3 interesting patterns or relationships
- ✅ Have a clear direction for your final presentation

## 💡 Real-World Applications
Personal data analysis skills you're learning are used in:
- **Business Intelligence** - KPI dashboards and performance analysis
- **Market Research** - customer behavior and preference analysis
- **Academic Research** - hypothesis testing and pattern discovery
- **Product Analytics** - user engagement and feature usage analysis
- **Personal Projects** - fitness tracking, budget analysis, hobby insights
- **Your Career** - demonstrating analytical thinking and technical skills!

## 📞 Getting Help
- **During class**: Ask about specific patterns in your data!
- **Slack/Discord**: Share interesting findings and get feedback
- **Email instructor**: [Instructor email]
- **Peer analysis**: Review each other's datasets and insights

---

**Next Week Preview**: You'll enhance your application with AI-powered insights and prepare for deployment! The final stretch begins! 🚀

*Week 8 Guide - Updated September 2025*
