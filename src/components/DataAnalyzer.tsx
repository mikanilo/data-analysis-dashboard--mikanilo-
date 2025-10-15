import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DataAnalyzer = () => {
  const [analysis, setAnalysis] = useState(null);
  const [currentDataset, setCurrentDataset] = useState("temperatures");

  const datasets = {
    temperatures: [72, 75, 68, 80, 77, 74, 69, 78, 76, 73],
    testScores: [88, 92, 79, 95, 87, 90, 84, 89, 93, 86],
    salesFigures: [1200, 1450, 980, 1680, 1250, 1520, 1100, 1400],
  };

  const analyzeData = () => {
    const data = datasets[currentDataset];
    const validNumbers = data.filter(
      (item) => typeof item === "number" && !isNaN(item)
    );

    if (validNumbers.length === 0) {
      setAnalysis({ error: "No valid numbers found" });
      return;
    }

    const sum = validNumbers.reduce((total, num) => total + num, 0);
    const average = sum / validNumbers.length;
    const maximum = Math.max(...validNumbers);
    const minimum = Math.min(...validNumbers);
    const range = maximum - minimum;
    const sorted = [...validNumbers].sort((a, b) => a - b);
    const median =
      sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)];

    setAnalysis({
      sum,
      average: Number(average.toFixed(2)),
      maximum,
      minimum,
      range,
      median: Number(median.toFixed(2)),
      count: validNumbers.length,
    });
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Data Analyzer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <select
          value={currentDataset}
          onChange={(e) => setCurrentDataset(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="temperatures">Temperatures (°F)</option>
          <option value="testScores">Test Scores</option>
          <option value="salesFigures">Sales Figures ($)</option>
        </select>

        <Button onClick={analyzeData} className="w-full">
          Analyze Data
        </Button>

        {analysis && (
          <div>
            {analysis.error ? (
              <div className="p-3 bg-red-50 text-red-800 rounded">
                {analysis.error}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 p-4 bg-blue-50 rounded">
                <div>
                  <strong>Count:</strong> {analysis.count}
                </div>
                <div>
                  <strong>Sum:</strong> {analysis.sum}
                </div>
                <div>
                  <strong>Average:</strong> {analysis.average}
                </div>
                <div>
                  <strong>Median:</strong> {analysis.median}
                </div>
                <div>
                  <strong>Maximum:</strong> {analysis.maximum}
                </div>
                <div>
                  <strong>Minimum:</strong> {analysis.minimum}
                </div>
                <div>
                  <strong>Range:</strong> {analysis.range}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataAnalyzer;
