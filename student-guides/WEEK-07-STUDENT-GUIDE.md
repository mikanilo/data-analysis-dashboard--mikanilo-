# 🎓 WEEK 7 STUDENT GUIDE
**APIs & External Data Sources - STUDENT DATASET CHALLENGE BEGINS!**

## 📅 This Week's Mission
Learn to fetch data from external APIs AND begin your personal dataset journey! You'll work with real-time data sources while starting to search for a dataset that genuinely interests you for your final project.

## 🎯 Learning Goals
- ✅ Understand APIs and how to fetch external data
- ✅ Use the fetch() function to get data from web APIs
- ✅ Handle asynchronous operations with async/await
- ✅ Integrate API data with your existing components
- ✅ **CHOOSE YOUR PERSONAL DATASET** for the final project

## 🚀 **DATASET CHALLENGE STARTS NOW!**

### Your Mission: Find Data You Actually Care About! 
Starting this week, you'll find and use your own dataset for the final project. This isn't just a coding exercise - it's your chance to explore something you're passionate about!

### What Makes a Good Personal Dataset?
✅ **Something you're curious about** - sports, music, movies, games, local data  
✅ **Real-world relevance** - career interests, hobbies, community issues  
✅ **Story potential** - data that can reveal interesting insights  
✅ **Technical requirements** - CSV format, 20+ rows, 4+ columns, mixed data types  

### Dataset Ideas by Interest:

#### 🎮 **Gaming & Entertainment**
- Steam game statistics and player reviews
- Movie box office and ratings data
- Music streaming charts and popularity trends
- YouTube video performance metrics
- Twitch streamer statistics

#### 🏆 **Sports & Fitness**
- Local sports team performance data
- Fantasy football/basketball statistics
- Olympic Games historical data
- Fitness tracking data (your own or aggregated)
- Marathon/running race results

#### 💼 **Career & Business**
- Job market data for your field
- Salary trends in different industries
- Startup success rates and funding data
- Local business reviews and ratings
- Economic indicators for your region

#### 🌍 **Social & Environmental**
- Local environmental data (air quality, weather patterns)
- Social media trends and engagement
- Community demographics and development
- Transportation and traffic data
- Housing market and rent prices

## 🔄 Pre-Session Check
- [ ] Your chart dashboard from Week 6 should display visualizations
- [ ] You should be able to upload CSV files and see charts
- [ ] All chart types (bar, line, pie) should work

**Quick test**: Upload a sample CSV and create a bar chart.

## 📚 Key Concepts This Week

### What are APIs?
**API** (Application Programming Interface) = a way for different applications to talk to each other.

**Real-world analogy**: A restaurant menu
- **Menu** = API documentation (what's available)
- **Order** = API request (what you want)
- **Food delivery** = API response (what you get back)

### Fetch API in JavaScript
```jsx
// Basic API call
const response = await fetch('https://api.example.com/data');
const data = await response.json();
```

### Async/Await Pattern
```jsx
const getData = async () => {
  try {
    setLoading(true);
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    setData(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

## 🛠️ Today's Hands-On Project: API Data Fetcher

### Step 1: Create APIDataFetcher Component
**File**: `src/components/APIDataFetcher.tsx`

```tsx
import { useState } from 'react';
import ChartDashboard from './ChartDashboard';

interface APIData {
  [key: string]: any;
}

const APIDataFetcher = () => {
  const [data, setData] = useState<APIData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [selectedAPI, setSelectedAPI] = useState<string>("");

  // Available APIs for demonstration
  const availableAPIs = {
    'jsonplaceholder-users': {
      name: 'Sample User Data',
      url: 'https://jsonplaceholder.typicode.com/users',
      description: 'Fake user data for testing',
      expectedFields: ['name', 'email', 'phone', 'website']
    },
    'jsonplaceholder-posts': {
      name: 'Sample Posts Data',
      url: 'https://jsonplaceholder.typicode.com/posts',
      description: 'Fake blog posts for testing',
      expectedFields: ['userId', 'title', 'body']
    },
    'httpbin-uuid': {
      name: 'Random Data Generator',
      url: 'https://httpbin.org/uuid',
      description: 'Generates random UUID data',
      expectedFields: ['uuid']
    }
  };

  // Fetch data from selected API
  const fetchAPIData = async () => {
    if (!selectedAPI) {
      setError("Please select an API first");
      return;
    }

    const apiConfig = availableAPIs[selectedAPI as keyof typeof availableAPIs];
    
    setLoading(true);
    setError("");
    
    try {
      console.log(`Fetching data from: ${apiConfig.url}`);
      
      const response = await fetch(apiConfig.url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json();
      
      // Handle different response formats
      let processedData: APIData[];
      
      if (Array.isArray(responseData)) {
        processedData = responseData;
      } else if (typeof responseData === 'object') {
        // Single object - wrap in array
        processedData = [responseData];
      } else {
        throw new Error("Unexpected data format received");
      }

      // Transform data for charts (flatten nested objects)
      const flattenedData = processedData.map((item, index) => {
        const flattened: APIData = { id: index + 1 };
        
        Object.entries(item).forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            // Flatten nested objects (like address.city)
            Object.entries(value).forEach(([nestedKey, nestedValue]) => {
              flattened[`${key}_${nestedKey}`] = nestedValue;
            });
          } else {
            flattened[key] = value;
          }
        });
        
        return flattened;
      });

      setData(flattenedData);
      console.log(`Successfully loaded ${flattenedData.length} records`);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to fetch data: ${errorMessage}`);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Clear data
  const clearData = () => {
    setData([]);
    setError("");
    setSelectedAPI("");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">🌐 API Data Fetcher</h2>
      
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold mb-2">💡 Learning About APIs</h3>
        <p className="text-sm text-gray-700 mb-2">
          APIs let your app get data from other websites and services in real-time. 
          This is how apps show live weather, stock prices, social media feeds, and more!
        </p>
        <p className="text-xs text-gray-600">
          Note: These are demo APIs for learning. In real projects, you'd use APIs relevant to your data needs.
        </p>
      </div>

      {/* API Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Choose an API to test:</label>
        <select 
          value={selectedAPI} 
          onChange={(e) => setSelectedAPI(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          disabled={loading}
        >
          <option value="">Select an API...</option>
          {Object.entries(availableAPIs).map(([key, api]) => (
            <option key={key} value={key}>
              {api.name} - {api.description}
            </option>
          ))}
        </select>
        
        {selectedAPI && (
          <div className="mt-2 p-3 bg-gray-50 rounded text-sm">
            <div className="font-medium">API Details:</div>
            <div>URL: {availableAPIs[selectedAPI as keyof typeof availableAPIs].url}</div>
            <div>Expected fields: {availableAPIs[selectedAPI as keyof typeof availableAPIs].expectedFields.join(', ')}</div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={fetchAPIData}
          disabled={loading || !selectedAPI}
          className={`px-6 py-2 rounded-md font-medium ${
            loading || !selectedAPI
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {loading ? '⏳ Fetching...' : '🚀 Fetch Data'}
        </button>
        
        {data.length > 0 && (
          <button
            onClick={clearData}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium"
          >
            🗑️ Clear Data
          </button>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-700">❌ {error}</div>
          <div className="text-xs text-red-600 mt-1">
            Check your internet connection and try again.
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mb-6 text-center py-8">
          <div className="animate-spin text-4xl mb-2">🌐</div>
          <div>Fetching data from API...</div>
          <div className="text-sm text-gray-600 mt-1">This may take a few seconds</div>
        </div>
      )}

      {/* Success Message */}
      {data.length > 0 && !loading && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-green-700">
            ✅ Successfully loaded {data.length} records from API!
          </div>
        </div>
      )}

      {/* Data Preview */}
      {data.length > 0 && !loading && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">📋 API Data Preview</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(data[0]).slice(0, 6).map(header => (
                    <th key={header} className="border border-gray-200 px-3 py-2 text-left font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 3).map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {Object.values(row).slice(0, 6).map((value, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-200 px-3 py-2">
                        {String(value).length > 30 ? 
                          String(value).substring(0, 30) + '...' : 
                          String(value)
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {data.length > 3 && (
            <div className="text-center mt-3 text-gray-600 text-sm">
              ... and {data.length - 3} more records
            </div>
          )}
        </div>
      )}

      {/* Chart Integration */}
      {data.length > 0 && !loading && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">📊 Visualize API Data</h3>
          <ChartDashboard data={data} fileName={`API: ${selectedAPI}`} />
        </div>
      )}
    </div>
  );
};

export default APIDataFetcher;
```

### Step 2: Add to Homepage
**File**: `src/pages/Index.tsx`

```tsx
import APIDataFetcher from "@/components/APIDataFetcher";

// Add after your other components
<div className="mb-8">
  <APIDataFetcher />
</div>
```

### Step 3: Test API Integration
1. Select "Sample User Data" from the dropdown
2. Click "Fetch Data" and watch the loading state
3. Observe how API data is transformed for charts
4. Try different APIs and see how data varies

## 🎯 **WEEK 7 DATASET CHALLENGE ASSIGNMENT**

### Required: Find Your Personal Dataset
By next class, you must:

#### 1. **Explore Data Sources** (30 minutes minimum)
Visit these recommended sources and browse:
- **Government Data**: [data.gov](https://data.gov), [census.gov](https://census.gov)
- **Sports**: [sports-reference.com](https://sports-reference.com), [kaggle.com/datasets](https://kaggle.com/datasets)
- **Entertainment**: [themoviedb.org](https://themoviedb.org), [spotify charts](https://spotifycharts.com)
- **Academic**: [google.com/publicdata](https://google.com/publicdata), university research data
- **Local**: Your city's open data portal, local business data

#### 2. **Choose Your Dataset**
Select ONE dataset that:
- ✅ Has at least 20 rows of data
- ✅ Has at least 4 columns
- ✅ Includes both numeric and text data
- ✅ Is something you're genuinely interested in
- ✅ Can be converted to CSV format

#### 3. **Complete Dataset Evaluation Form**
**Bring to next class**: Written answers to these questions:

1. **Dataset Source**: Where did you find it?
2. **Why This Data**: What made you choose this specific dataset?
3. **Personal Connection**: How does this relate to your interests or career goals?
4. **Initial Questions**: What 3 things do you want to discover from this data?
5. **Data Quality**: Describe the condition of the data (clean, messy, missing values?)
6. **Story Potential**: What story do you think this data might tell?

## 🏠 Homework Assignments

### Required Tasks
- [ ] **Task 1**: Find and download your personal dataset
- [ ] **Task 2**: Complete the Dataset Evaluation Form
- [ ] **Task 3**: Add error handling to the API fetcher for network failures
- [ ] **Task 4**: Test your personal dataset with the CSV processor from Week 5

### Stretch Goals (Optional)
- [ ] **Challenge 1**: Add a custom API endpoint (with instructor guidance)
- [ ] **Challenge 2**: Implement data caching to avoid repeated API calls
- [ ] **Challenge 3**: Add API rate limiting awareness
- [ ] **Challenge 4**: Create a "favorite APIs" feature

### Advanced Challenge: API + Personal Data Combination
Explore how you might combine API data with your personal dataset:
- Weather API + your local business data
- Stock API + your investment tracking data
- Social media API + your content analysis data

## 🔬 API Best Practices

### Error Handling Patterns
```jsx
// Always check response status
if (!response.ok) {
  throw new Error(`HTTP ${response.status}: ${response.statusText}`);
}

// Handle different error types
try {
  const data = await response.json();
} catch (error) {
  if (error instanceof TypeError) {
    // Network error
    setError("Network connection failed");
  } else {
    // Other errors
    setError(error.message);
  }
}
```

### Loading States
```jsx
// Show what's happening
setLoading(true);
setError(""); // Clear previous errors

// Always clean up
finally {
  setLoading(false);
}
```

### Data Validation
```jsx
// Validate API response structure
if (!data || !Array.isArray(data)) {
  throw new Error("Invalid data format received");
}

// Check for required fields
const requiredFields = ['id', 'name'];
const isValid = data.every(item => 
  requiredFields.every(field => field in item)
);
```

## 🆘 Troubleshooting

### API calls not working
**Common issues**:
1. **CORS errors**: API doesn't allow requests from your domain
2. **Network timeouts**: API is slow or unreachable
3. **Invalid URLs**: Check the API endpoint carefully
4. **Authentication required**: Some APIs need API keys

### Data not displaying correctly
**Check**:
1. Is the API returning the expected format?
2. Are you handling nested objects properly?
3. Do the field names match what you expect?

### TypeScript errors with API data
**Solutions**:
```tsx
// Use flexible types for unknown API structures
interface APIResponse {
  [key: string]: any;
}

// Or create specific interfaces when you know the structure
interface User {
  id: number;
  name: string;
  email: string;
}
```

## 🎯 Success Criteria
By the end of Week 7, you should:
- ✅ Have a working API data fetcher with error handling
- ✅ Understand async/await and API integration patterns
- ✅ **HAVE CHOSEN YOUR PERSONAL DATASET**
- ✅ Be able to visualize API data with your chart component
- ✅ Successfully completed the Dataset Evaluation Form

## 💡 Real-World Applications
API skills you're learning are used in:
- **Social media apps** - fetching posts, comments, user profiles
- **Weather apps** - real-time weather data
- **Financial apps** - stock prices, currency exchange rates
- **E-commerce** - product information, inventory levels
- **News apps** - article feeds, breaking news updates
- **Your data tool** - enhancing static data with live information!

## 📞 Getting Help
- **During class**: Ask about API concepts and dataset selection!
- **Slack/Discord**: Share your dataset choices for feedback
- **Email instructor**: [Instructor email]
- **Dataset consultation**: Schedule time to discuss your data choice

---

**Next Week Preview**: You'll integrate your personal dataset into the application and start building advanced analytics features! Your data story begins! 📈

*Week 7 Guide - Updated September 2025*
