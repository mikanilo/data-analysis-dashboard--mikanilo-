
export interface DataRow {
  [key: string]: string | number | boolean | null;
}

export interface DataColumn {
  key: string;
  type: 'string' | 'number' | 'boolean' | 'date';
  label: string;
}

export interface DataInsight {
  type: 'summary' | 'trend' | 'correlation' | 'outlier' | 'distribution';
  title: string;
  description: string;
  value?: string | number;
  confidence?: 'high' | 'medium' | 'low';
}
