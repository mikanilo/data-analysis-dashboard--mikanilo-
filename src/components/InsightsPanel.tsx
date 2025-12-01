import { TrendingUp, AlertTriangle, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { DataRow } from "@/types/data";

/**
 * Player Stat Over/Under Analyzer
 * --------------------------------------
 * User uploads a CSV of game logs.
 * User inputs:
 *   - Stat name (e.g., "points")
 *   - Prop line number (e.g., 27.5)
 *
 * Component calculates:
 *   - Over count
 *   - Under count
 *   - Push count
 */

interface InsightsPanelProps {
  data: DataRow[];
}

const InsightsPanel = ({ data }: InsightsPanelProps) => {
  const [stat, setStat] = useState("");
  const [line, setLine] = useState<number | null>(null);

  const [results, setResults] = useState<{
    over: number;
    under: number;
    push: number;
  } | null>(null);

  const calculate = () => {
    if (!stat || line === null) return;

    let over = 0;
    let under = 0;
    let push = 0;

    data.forEach((row) => {
      const value = Number(row[stat]);

      if (isNaN(value)) return;

      if (value > line) over++;
      else if (value < line) under++;
      else push++;
    });

    setResults({ over, under, push });
  };

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stat Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            Upload a CSV file with player game logs to begin.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Stat Over/Under Insights</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* INPUTS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            placeholder="Stat name (e.g., points)"
            value={stat}
            onChange={(e) => setStat(e.target.value)}
          />
          <Input
            placeholder="Prop line (e.g., 27.5)"
            type="number"
            step="0.1"
            value={line ?? ""}
            onChange={(e) => setLine(Number(e.target.value))}
          />
          <Button onClick={calculate}>Analyze</Button>
        </div>

        {/* INSIGHTS */}
        {results && (
          <div className="space-y-4">
            <div className="border p-4 rounded-lg flex items-center gap-4">
              <div className="bg-green-100 text-green-800 p-2 rounded-full">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-lg">
                  {results.over} Games OVER
                </p>
                <p className="text-sm text-gray-600">
                  Player exceeded {line} {stat} this many times.
                </p>
              </div>
            </div>

            <div className="border p-4 rounded-lg flex items-center gap-4">
              <div className="bg-red-100 text-red-800 p-2 rounded-full">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-lg">
                  {results.under} Games UNDER
                </p>
                <p className="text-sm text-gray-600">
                  Player failed to reach {line} {stat} this many times.
                </p>
              </div>
            </div>

            <div className="border p-4 rounded-lg flex items-center gap-4">
              <div className="bg-blue-100 text-blue-800 p-2 rounded-full">
                <BarChart3 className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-lg">{results.push} Pushes</p>
                <p className="text-sm text-gray-600">
                  Player hit exactly {line} {stat}.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightsPanel;
