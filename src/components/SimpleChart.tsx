import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const SimpleChart = () => {
  const barLineData = [
    { month: "Jan", sales: 100 },
    { month: "Feb", sales: 150 },
    { month: "Mar", sales: 200 },
  ];
  const pieData = [
    { name: "Jan", value: 100 },
    { name: "Feb", value: 150 },
    { name: "Mar", value: 200 },
  ];
  const scatterData = [
    { x: 1, y: 100 },
    { x: 2, y: 150 },
    { x: 3, y: 200 },
  ];
  const COLORS = ["#3b82f6", "#10b981", "#f59e42"];
  const [chartType, setChartType] = useState("");
  return (
    <div>
      <div>
        <button onClick={() => setChartType("bar")}>Bar</button>
        <br />
        <button onClick={() => setChartType("line")}>Line</button>
        <br />
        <button onClick={() => setChartType("pie")}>Pie</button>
        <br />
        <button onClick={() => setChartType("scatter")}>Scatter</button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        {(chartType == "bar" && (
          <BarChart data={barLineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#3b82f6" />
          </BarChart>
        )) ||
          (chartType == "line" && (
            <LineChart data={barLineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#10b981" />
            </LineChart>
          )) ||
          (chartType == "pie" && (
            <PieChart data={pieData}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#f59e42"
                label
              ></Pie>
            </PieChart>
          )) ||
          (chartType == "scatter" && (
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="X Axis" />
              <YAxis type="number" dataKey="y" name="Y Axis" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={scatterData} fill="#8884d8" />
            </ScatterChart>
          ))}
      </ResponsiveContainer>
    </div>
  );
};
export default SimpleChart;
