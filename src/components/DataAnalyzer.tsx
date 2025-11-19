import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DataAnalyzer = () => {
  const [analysis, setAnalysis] = useState<any>(null);

  // Sample data to work with
  const sampleData = [23, 45, 67, 89, 34, 56, 78, 90, 12, 45, 67, 89];

  const analyzeData = () => {
    const validNumber = sampleData.filter(
      (item) => typeof item === "number" && !isNaN(item)
    );

    if (validNumber.length === 0) {
      setAnalysis({ message: "No valid numeric data available for analysis." });
      return;
    }

    // Calculate statistics
    const sum = validNumber.reduce((total, num) => total + num, 0);
    const average = sum / validNumber.length;
    const maximum = Math.max(...validNumber);
    const minimum = Math.min(...validNumber);
    const count = validNumber.length;
    const sorted = [...validNumber].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median =
      sorted.length % 2 !== 0
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;

    setAnalysis({
      sum,
      average: average.toFixed(2),
      maximum,
      minimum,
      count,
      median,
    });
  };

  const resetAnalysis = () => {
    setAnalysis(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Sample data: {sampleData.join(", ")}</p>

        <div className="flex gap-2 mt-4">
          <Button onClick={analyzeData}>Analyze Data</Button>
          <Button variant="outline" onClick={resetAnalysis}>
            Reset
          </Button>
        </div>

        {analysis && (
          <div className="grid grid-cols-2 gap-4 p-4 bg-card rounded mt-4">
            {analysis.message ? (
              <p>{analysis.message}</p>
            ) : (
              <>
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
                  <strong>Maximum:</strong> {analysis.maximum}
                </div>
                <div>
                  <strong>Minimum:</strong> {analysis.minimum}
                </div>
                <div>
                  <strong>Range:</strong> {analysis.maximum - analysis.minimum}
                </div>
                <div>
                  <strong>Median:</strong> {analysis.median}
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataAnalyzer;
