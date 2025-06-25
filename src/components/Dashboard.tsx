
import { useState, useMemo } from 'react';
import { RefreshCw, Download, BarChart3, PieChart, LineChart, Table, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataRow } from '@/types/data';
import DataTable from './DataTable';
import ChartSection from './ChartSection';
import InsightsPanel from './InsightsPanel';
import ChatInterface from './ChatInterface';
import { generateDataInsights, getDataSummary } from '@/utils/dataAnalysis';

interface DashboardProps {
  data: DataRow[];
  fileName: string;
  onReset: () => void;
}

const Dashboard = ({ data, fileName, onReset }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const summary = useMemo(() => getDataSummary(data), [data]);
  const insights = useMemo(() => generateDataInsights(data), [data]);

  const handleExport = () => {
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `processed_${fileName}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Data Dashboard</h2>
          <p className="text-gray-600">
            Analyzing <span className="font-semibold">{fileName}</span> • {data.length} rows • {Object.keys(data[0] || {}).length} columns
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" onClick={onReset} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            New Dataset
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalRows.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Columns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalColumns}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Numeric Columns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.numericColumns}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Text Columns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.textColumns}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="charts" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Charts
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Table className="h-4 w-4" />
            Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartSection data={data} />
            <InsightsPanel insights={insights.slice(0, 4)} />
          </div>
        </TabsContent>

        <TabsContent value="charts">
          <ChartSection data={data} showAll />
        </TabsContent>

        <TabsContent value="insights">
          <InsightsPanel insights={insights} showAll />
        </TabsContent>

        <TabsContent value="chat">
          <ChatInterface data={data} />
        </TabsContent>

        <TabsContent value="data">
          <DataTable data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
