import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CustomDataAnalyzer = () => {
  const [data, setData] = useState<number[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);

  // Handle CSV upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      // Split CSV into numbers
      const parsedNumbers = text
        .split(/\r?\n/) // split lines
        .flatMap((line) => line.split(","))
        .map((item) => parseFloat(item.trim()))
        .filter((num) => !isNaN(num));

      if (parsedNumbers.length === 0) {
        setAnalysis({ message: "No valid numeric data found in CSV." });
      } else {
        setData(parsedNumbers);
        setAnalysis(null); // reset previous analysis
      }
    };
    reader.readAsText(file);
  };

  const analyzeData = () => {
    if (data.length === 0) {
      setAnalysis({ message: "No data available for analysis." });
      return;
    }

    const sum = data.reduce((total, num) => total + num, 0);
    const average = sum / data.length;
    const maximum = Math.max(...data);
    const minimum = Math.min(...data);
    const count = data.length;
    const sorted = [...data].sort((a, b) => a - b);
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
    setData([]);
    setAnalysis(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="border p-2 rounded"
          />
          <div className="flex gap-2 mt-2">
            <Button onClick={analyzeData} disabled={data.length === 0}>
              Analyze Data
            </Button>
            <Button variant="outline" onClick={resetAnalysis}>
              Reset
            </Button>
          </div>
        </div>

        {data.length > 0 && (
          <p className="mt-4 text-sm text-gray-600">
            Uploaded data: {data.join(", ")}
          </p>
        )}

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

export default CustomDataAnalyzer;
