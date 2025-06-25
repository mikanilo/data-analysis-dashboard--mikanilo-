
import { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DataRow } from '@/types/data';

interface DataUploadProps {
  onDataLoad: (data: DataRow[], fileName: string) => void;
}

const DataUpload = ({ onDataLoad }: DataUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseCSV = (text: string): DataRow[] => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('CSV must have at least a header row and one data row');
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data: DataRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      if (values.length !== headers.length) continue;

      const row: DataRow = {};
      headers.forEach((header, index) => {
        const value = values[index];
        // Try to parse as number
        const numValue = Number(value);
        if (!isNaN(numValue) && value !== '') {
          row[header] = numValue;
        } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
          row[header] = value.toLowerCase() === 'true';
        } else {
          row[header] = value || null;
        }
      });
      data.push(row);
    }

    return data;
  };

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const data = parseCSV(text);
      console.log('Parsed CSV data:', data);
      onDataLoad(data, file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse CSV file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-blue-100 p-4 rounded-full">
            {isLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            ) : (
              <Upload className="h-8 w-8 text-blue-600" />
            )}
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900">
              {isLoading ? 'Processing your file...' : 'Drop your CSV file here'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              or click to browse your files
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => document.getElementById('file-input')?.click()}
            className="flex items-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span>Choose File</span>
          </Button>

          <input
            id="file-input"
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="hidden"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center">
        <p>Supported format: CSV files with headers</p>
        <p>Maximum file size: 10MB</p>
      </div>
    </div>
  );
};

export default DataUpload;
