
import { TrendingUp, AlertTriangle, BarChart3, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataInsight } from '@/types/data';

// 🟡 MEDIUM - Week 4-5: Automated Insights Display Component
// TODO: Students - This component displays AI-generated insights about your data
// Learning objectives:
// - Component props and TypeScript interfaces
// - Conditional rendering patterns
// - Icon usage and visual hierarchy
// - Badge components for metadata display

interface InsightsPanelProps {
  insights: DataInsight[];
  showAll?: boolean;
}

const InsightsPanel = ({ insights, showAll = false }: InsightsPanelProps) => {
  // 🟢 EASY - Icon Mapping Function
  // TODO: Students - Week 3: Understand switch statements and icon libraries
  // Why do we use a function instead of inline conditionals?
  // HINT: Reusability and maintainability
  const getInsightIcon = (type: DataInsight['type']) => {
    switch (type) {
      case 'trend':
        return <TrendingUp className="h-4 w-4" />;
      case 'outlier':
        return <AlertTriangle className="h-4 w-4" />;
      case 'correlation':
        return <BarChart3 className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
    // TODO: Week 4 - Add more insight types (seasonal, anomaly, prediction)
  };

  // 🟢 EASY - Dynamic Styling Function
  // TODO: Students - Week 3: Learn about dynamic CSS classes
  // How does this create different colored badges for different insight types?
  const getInsightColor = (type: DataInsight['type']) => {
    switch (type) {
      case 'trend':
        return 'bg-green-100 text-green-800';
      case 'outlier':
        return 'bg-yellow-100 text-yellow-800';
      case 'correlation':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
    // TODO: Week 4 - Make colors configurable or theme-aware
  };

  // 🟢 EASY - Empty State Handling
  // TODO: Students - Week 3: Always handle empty states gracefully
  // What makes a good empty state? Helpful messaging and clear next steps
  if (insights.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            No insights available. Upload data to see automated analysis.
          </p>
          {/* TODO: Week 3 - Add loading skeleton when processing data */}
          {/* TODO: Week 4 - Add tips about what kind of data works best */}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Data Insights
          {/* TODO: Week 4 - Add insight count badge */}
          {/* TODO: Week 5 - Add refresh/regenerate insights button */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 🟡 MEDIUM - Dynamic List Rendering */}
          {/* TODO: Students - Week 4: Understand array mapping and complex layouts */}
          {insights.map((insight, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              {/* TODO: Week 4 - Add click handler to expand insight details */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  {/* 🟢 EASY - Dynamic Icon and Styling */}
                  <div className={`p-2 rounded-full ${getInsightColor(insight.type)}`}>
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                    
                    {/* 🟡 MEDIUM - Conditional Rendering */}
                    {/* TODO: Students - Week 4: When and why do we use conditional rendering? */}
                    {insight.value && (
                      <Badge variant="secondary" className="text-xs">
                        {insight.value}
                      </Badge>
                    )}
                    
                    {/* TODO: Week 5 - Add action buttons (explore, dismiss, share) */}
                  </div>
                </div>
                
                {/* 🟡 MEDIUM - Confidence Score Display */}
                {/* TODO: Students - Week 4: How do confidence scores help users trust insights? */}
                {insight.confidence && (
                  <Badge variant="outline" className="text-xs">
                    {Math.round(insight.confidence * 100)}% confidence
                  </Badge>
                )}
              </div>
              
              {/* TODO: Week 5 - Add expandable details section */}
              {/* TODO: Week 6 - Add related charts or visualizations */}
            </div>
          ))}
          
          {/* 🟢 EASY - Pagination/Truncation Logic */}
          {/* TODO: Students - Week 4: Understand user experience for long lists */}
          {!showAll && insights.length > 4 && (
            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                {insights.length - 4} more insights available in the Insights tab
              </p>
              {/* TODO: Week 5 - Add "Show More" button */}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsPanel;

// 🔴 ADVANCED - Week 6-8: Component Enhancement Ideas
// TODO: Students - Pick advanced features to implement:
// 
// 1. Interactive Insights
//    - Click to explore insight in detail
//    - Generate related charts on demand
//    - Filter data based on insight
// 
// 2. Insight Management
//    - Save/bookmark important insights
//    - Share insights with others
//    - Export insights to reports
// 
// 3. Advanced Analytics
//    - Trend prediction
//    - Comparative analysis
//    - Statistical significance testing
// 
// 4. User Customization
//    - Choose which insight types to show
//    - Set confidence thresholds
//    - Custom insight templates
