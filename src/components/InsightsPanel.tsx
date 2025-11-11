import { useState } from "react";
import { TrendingUp, AlertTriangle, BarChart3, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataInsight, DataRow } from "@/types/data";

interface InsightsPanelProps {
  data?: DataRow[];
  insights: DataInsight[];
  showAll?: boolean;
}

const InsightsPanel = ({
  data,
  insights,
  showAll = false,
}: InsightsPanelProps) => {
  // 🟢 State for AI Insight
  const [isLoading, setIsLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState<{
    summary: string;
    anomalies: string[];
  }>();
  const [error, setError] = useState("");

  // 🟢 Icon Mapping
  const getInsightIcon = (type: DataInsight["type"]) => {
    switch (type) {
      case "trend":
        return <TrendingUp className="h-4 w-4" />;
      case "outlier":
        return <AlertTriangle className="h-4 w-4" />;
      case "correlation":
        return <BarChart3 className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  // 🟢 Dynamic Styling
  const getInsightColor = (type: DataInsight["type"]) => {
    switch (type) {
      case "trend":
        return "bg-green-100 text-green-800";
      case "outlier":
        return "bg-yellow-100 text-yellow-800";
      case "correlation":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 🧠 Week 6 — AI Insight Fetch Logic using AI SDK backend
  const handleGenerateInsight = () => {
    setIsLoading(true);
    setError("");
    setAiInsight(undefined);

    fetch("http://localhost:4000/insight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `Be concise and find any anomalies in the following dataset: ${JSON.stringify(
          data
        )}`,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // Expecting structured output: { summary: string, anomalies: string[] }
        if (result.summary) {
          setAiInsight(result);
        } else if (result.insight) {
          // fallback if backend still returns text only
          setAiInsight({ summary: result.insight, anomalies: [] });
        } else {
          setError(result.error || "No insight returned");
        }
      })
      .catch(() => {
        setError("Failed to fetch AI insight");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // 🟢 Empty State Handling
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
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 🧠 AI Insight Generator Button */}
        <Button onClick={handleGenerateInsight} disabled={isLoading || !data}>
          {isLoading ? "Generating..." : "Generate AI Insight"}
        </Button>

        {/* 🧩 Display AI Insight (Structured Output) */}
        {aiInsight && (
          <div className="my-4 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <h4 className="font-medium text-gray-900 mb-1">AI Insight</h4>
            <p className="text-sm text-gray-600 mb-2 text-balance">
              {aiInsight.summary}
            </p>
            {aiInsight.anomalies.length > 0 && (
              <ul className="list-disc list-inside text-sm text-gray-600 mb-2 text-balance">
                {aiInsight.anomalies.map((anomaly, index) => (
                  <li key={index}>{anomaly}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* 🔴 Error Handling */}
        {error && (
          <div className="mt-2 text-red-600">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Existing Manual Insights */}
        <div className="space-y-4 mt-6">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className={`p-2 rounded-full ${getInsightColor(
                      insight.type
                    )}`}
                  >
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {insight.description}
                    </p>
                    {insight.value && (
                      <Badge variant="secondary" className="text-xs">
                        {insight.value}
                      </Badge>
                    )}
                  </div>
                </div>

                {insight.confidence && (
                  <Badge variant="outline" className="text-xs">
                    {insight.confidence} confidence
                  </Badge>
                )}
              </div>
            </div>
          ))}

          {!showAll && insights.length > 4 && (
            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                {insights.length - 4} more insights available in the Insights
                tab
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsPanel;
