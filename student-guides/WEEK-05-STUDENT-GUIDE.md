# 🎓 WEEK 5 STUDENT GUIDE
**File Upload & CSV Processing**

## 📅 This Week's Mission
Combine everything you've learned to build a real file upload system! You'll handle CSV files, parse data, and apply your array processing skills to real datasets.

## 🎯 Learning Goals
- ✅ Handle file upload events in React
- ✅ Parse CSV data into JavaScript objects
- ✅ Validate file types and data quality
- ✅ Display processing results with error handling
- ✅ Build the core functionality of your data analysis tool

## 🔄 Pre-Session Check
- [ ] Your data processor from Week 4 should show all array methods working
- [ ] You should understand map(), filter(), and reduce()
- [ ] Form validation from Week 3 should be working

**Quick test**: Your data processor should show employee analytics properly.

## 📚 Key Concepts This Week

### File Handling in React
```jsx
// File input component
<input 
  type="file" 
  accept=".csv"
  onChange={handleFileUpload}
/>

// File processing
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    // Process the file
  }
};
```

### CSV Parsing Process
1. **Read file** as text
2. **Split by lines** to get rows
3. **Split each line** by commas to get columns
4. **Convert to objects** using headers

```jsx
// Simple CSV parsing
const parseCSV = (csvText: string) => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  const data = lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index]?.trim() || '';
    });
    return obj;
  });
  return data;
};
```

## 🛠️ Today's Hands-On Project: CSV File Processor

### Step 1: Create CSVProcessor Component
**File**: `src/components/CSVProcessor.tsx`

```tsx
import { useState } from 'react';

interface ParsedData {
  [key: string]: string | number;
}

const CSVProcessor = () => {
  const [data, setData] = useState<ParsedData[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [summary, setSummary] = useState<any>(null);

  // File upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      setError("Please upload a CSV file (.csv)");
      return;
    }

    // Validate file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setIsLoading(true);
    setError("");
    setFileName(file.name);

    try {
      const text = await file.text();
      const parsedData = parseCSV(text);
      
      if (parsedData.length === 0) {
        throw new Error("No data found in file");
      }

      setData(parsedData);
      generateSummary(parsedData);
      
    } catch (err) {
      setError(`Error processing file: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // CSV parsing function
  const parseCSV = (csvText: string): ParsedData[] => {
    const lines = csvText.trim().split('\n');
    
    if (lines.length < 2) {
      throw new Error("CSV must have at least a header row and one data row");
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const dataRows: ParsedData[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; // Skip empty lines

      const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
      const row: ParsedData = {};

      headers.forEach((header, index) => {
        const value = values[index] || '';
        // Try to convert to number if possible
        const numValue = parseFloat(value);
        row[header] = !isNaN(numValue) && value !== '' ? numValue : value;
      });

      dataRows.push(row);
    }

    return dataRows;
  };

  // Generate data summary using array methods
  const generateSummary = (parsedData: ParsedData[]) => {
    const headers = Object.keys(parsedData[0] || {});
    
    // Identify numeric columns
    const numericColumns = headers.filter(header => 
      parsedData.some(row => typeof row[header] === 'number')
    );

    // Calculate statistics for numeric columns
    const numericStats = numericColumns.reduce((stats, column) => {
      const values = parsedData
        .map(row => row[column])
        .filter(val => typeof val === 'number') as number[];

      if (values.length > 0) {
        stats[column] = {
          count: values.length,
          sum: values.reduce((sum, val) => sum + val, 0),
          average: values.reduce((sum, val) => sum + val, 0) / values.length,
          min: Math.min(...values),
          max: Math.max(...values)
        };
      }

      return stats;
    }, {} as Record<string, any>);

    // Count unique values in text columns
    const textColumns = headers.filter(header => 
      !numericColumns.includes(header)
    );

    const textStats = textColumns.reduce((stats, column) => {
      const values = parsedData.map(row => String(row[column]));
      const uniqueValues = [...new Set(values)];
      
      stats[column] = {
        uniqueCount: uniqueValues.length,
        mostCommon: values.length > 0 ? 
          values.reduce((a, b, _, arr) => 
            arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
          ) : null
      };

      return stats;
    }, {} as Record<string, any>);

    setSummary({
      totalRows: parsedData.length,
      totalColumns: headers.length,
      headers,
      numericColumns,
      textColumns,
      numericStats,
      textStats
    });
  };

  // Clear all data
  const handleClear = () => {
    setData([]);
    setFileName("");
    setError("");
    setSummary(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">CSV File Processor</h2>

      {/* File Upload Section */}
      <div className="mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csv-upload"
            disabled={isLoading}
          />
          <label 
            htmlFor="csv-upload" 
            className={`cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
          >
            <div className="text-4xl mb-2">📊</div>
            <div className="text-lg font-medium mb-2">
              {isLoading ? "Processing..." : "Upload CSV File"}
            </div>
            <div className="text-sm text-gray-600">
              Click to select a .csv file (max 5MB)
            </div>
          </label>
        </div>

        {fileName && (
          <div className="mt-3 flex items-center justify-between bg-blue-50 p-3 rounded">
            <span className="font-medium">📁 {fileName}</span>
            <button 
              onClick={handleClear}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Clear
            </button>
          </div>
        )}

        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-red-700">
            ❌ {error}
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin text-4xl mb-2">⏳</div>
          <div>Processing your file...</div>
        </div>
      )}

      {/* Data Summary */}
      {summary && !isLoading && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">📈 Data Summary</h3>
          
          {/* Basic Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-50 p-3 rounded text-center">
              <div className="text-2xl font-bold">{summary.totalRows}</div>
              <div className="text-sm text-gray-600">Rows</div>
            </div>
            <div className="bg-green-50 p-3 rounded text-center">
              <div className="text-2xl font-bold">{summary.totalColumns}</div>
              <div className="text-sm text-gray-600">Columns</div>
            </div>
            <div className="bg-purple-50 p-3 rounded text-center">
              <div className="text-2xl font-bold">{summary.numericColumns.length}</div>
              <div className="text-sm text-gray-600">Numeric</div>
            </div>
            <div className="bg-orange-50 p-3 rounded text-center">
              <div className="text-2xl font-bold">{summary.textColumns.length}</div>
              <div className="text-sm text-gray-600">Text</div>
            </div>
          </div>

          {/* Column Details */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Numeric Columns */}
            {summary.numericColumns.length > 0 && (
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-medium mb-2">🔢 Numeric Columns</h4>
                {Object.entries(summary.numericStats).map(([column, stats]: [string, any]) => (
                  <div key={column} className="mb-3 p-2 bg-white rounded text-sm">
                    <div className="font-medium">{column}</div>
                    <div className="grid grid-cols-2 gap-2 mt-1 text-xs text-gray-600">
                      <div>Avg: {stats.average.toFixed(2)}</div>
                      <div>Count: {stats.count}</div>
                      <div>Min: {stats.min}</div>
                      <div>Max: {stats.max}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Text Columns */}
            {summary.textColumns.length > 0 && (
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-medium mb-2">📝 Text Columns</h4>
                {Object.entries(summary.textStats).map(([column, stats]: [string, any]) => (
                  <div key={column} className="mb-3 p-2 bg-white rounded text-sm">
                    <div className="font-medium">{column}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      <div>Unique values: {stats.uniqueCount}</div>
                      <div>Most common: {stats.mostCommon}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Data Preview */}
      {data.length > 0 && !isLoading && (
        <div>
          <h3 className="text-lg font-semibold mb-3">👀 Data Preview (First 5 rows)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(data[0]).map(header => (
                    <th key={header} className="border border-gray-200 px-3 py-2 text-left font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 5).map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {Object.values(row).map((value, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-200 px-3 py-2">
                        {String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {data.length > 5 && (
            <div className="text-center mt-3 text-gray-600 text-sm">
              ... and {data.length - 5} more rows
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CSVProcessor;
```

### Step 2: Add to Homepage
**File**: `src/pages/Index.tsx`

```tsx
import CSVProcessor from "@/components/CSVProcessor";

// Add after your other components
<div className="mb-8">
  <CSVProcessor />
</div>
```

### Step 3: Test with Sample Data
Use the sample CSV files from the `sample-data` folder to test your processor:

1. **sales-data.csv** - Test numeric calculations
2. **employee-data.csv** - Test mixed data types
3. **weather-data.csv** - Test multiple numeric columns

## 📊 Using Your Own Data

### Create Test Files
Try creating these simple CSV files to test:

#### Simple Budget Data
```csv
Category,Amount,Month
Food,450,January
Transportation,200,January
Entertainment,150,January
Food,480,February
Transportation,220,February
Entertainment,120,February
```

#### Grade Tracker
```csv
Student,Math,Science,English,Total_Hours
Alice,85,92,78,25
Bob,92,88,85,30
Carol,78,85,92,22
```

## 🏠 Homework Assignments

### Required Tasks
- [ ] **Task 1**: Add file size validation (reject files over 1MB)
- [ ] **Task 2**: Display the number of rows processed
- [ ] **Task 3**: Show column data types (number vs text) in the summary
- [ ] **Task 4**: Add a download button to export processed data

### Stretch Goals (Optional)
- [ ] **Challenge 1**: Add support for different delimiters (semicolon, tab)
- [ ] **Challenge 2**: Handle CSV files with quotes and commas in values
- [ ] **Challenge 3**: Add data filtering capabilities (show only certain rows)
- [ ] **Challenge 4**: Create a "data quality" score based on missing values

### Advanced Challenge: Smart Data Type Detection
Enhance the CSV processor to:
1. Detect dates and convert them properly
2. Identify percentage values (ending with %)
3. Handle currency values (starting with $)
4. Provide suggestions for data cleaning

## 🔬 File Processing Deep Dive

### File API Methods
```jsx
// Read as text
const text = await file.text();

// Read as array buffer (for binary files)
const buffer = await file.arrayBuffer();

// Read as data URL (for images)
const dataURL = await file.stream();
```

### Error Handling Patterns
```jsx
try {
  const data = await processFile(file);
  setData(data);
} catch (error) {
  if (error instanceof Error) {
    setError(error.message);
  } else {
    setError('An unknown error occurred');
  }
}
```

### Performance Considerations
- **Large files**: Show progress indicators
- **Memory usage**: Process data in chunks for very large files
- **UI responsiveness**: Use setTimeout or Web Workers for heavy processing

## 🆘 Troubleshooting

### File not reading properly
**Check**:
1. Is the file actually a CSV (text) file?
2. Are you using the correct encoding (UTF-8)?
3. Does the file have proper line endings?

### CSV parsing errors
**Common issues**:
- Extra commas in data values
- Missing closing quotes
- Different line ending formats (Windows vs Mac/Linux)
- Empty rows in the middle of data

### Memory issues with large files
**Solutions**:
- Limit preview to first 100 rows
- Process data in smaller chunks
- Show loading indicators for user feedback

## 🎯 Success Criteria
By the end of Week 5, you should:
- ✅ Have a working CSV file upload and processing system
- ✅ Parse CSV data into JavaScript objects correctly
- ✅ Display meaningful summaries using array methods
- ✅ Handle errors gracefully with user feedback
- ✅ Successfully completed at least 3 homework tasks

## 💡 Real-World Applications
File processing skills you're learning are used in:
- **Data analysis tools** - importing datasets for analysis
- **Business applications** - bulk data imports
- **Reporting systems** - processing uploaded data files
- **E-commerce** - product catalog imports
- **Financial systems** - transaction file processing
- **Your career** - most data jobs involve file processing!

## 📞 Getting Help
- **During class**: Ask about file handling patterns immediately!
- **Slack/Discord**: Share error messages and sample files
- **Email instructor**: [Instructor email]
- **Debugging together**: Work with classmates on parsing logic

---

**Next Week Preview**: We'll add data visualization with charts and graphs! You'll learn to turn your processed data into beautiful, interactive visualizations. 📊

*Week 5 Guide - Updated September 2025*
