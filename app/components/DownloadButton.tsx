'use client';

import React from 'react';
import { Button } from '../components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface DownloadButtonProps {
  data: string[];
  filename: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  data, 
  filename, 
  variant = "outline", 
  size = "sm",
  className = ""
}) => {
  const { toast } = useToast();

  const downloadData = () => {
    try {
      const content = data.join('\n');
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Downloaded!",
        description: "Data exported successfully."
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to export data.",
        variant: "destructive"
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={downloadData}
      className={className}
    >
      <Download className="w-4 h-4 mr-1" />
      Download
    </Button>
  );
};

export default DownloadButton;
