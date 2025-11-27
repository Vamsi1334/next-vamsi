"use client"

// src/hooks/useDataGenerator.ts
import { useState } from "react";
import { faker } from "@faker-js/faker";
import { useToast } from "../hooks/use-toast"; // Adjust import path to your project

export function useDataGenerator(categoryFields: Record<string, Record<string, () => any>>) {
  const [generatedData, setGeneratedData] = useState<any>(null);
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: boolean | string }>({});
  const [rowCount, setRowCount] = useState(10);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState<{ [key: string]: boolean }>({});
  const [downloadFormat, setDownloadFormat] = useState<"csv" | "json">("csv");
  const [regexPattern, setRegexPattern] = useState("");
  const { toast } = useToast();

  const generateRegexData = (pattern: string) => {
    try {
      return faker.helpers.fromRegExp(pattern);
    } catch (error) {
      console.error("Invalid regex pattern:", error);
      return "Invalid Pattern";
    }
  };

  const generateData = (category: string, count: number = 10) => {
    if (count < 1 || count > 5000) {
      toast({
        title: "Invalid Row Count",
        description: "Please enter a number between 1 and 5,000 rows.",
        variant: "destructive",
      });
      return;
    }

    let dataArray: any[] = [];
    const fields = categoryFields[category];
    const selectedFieldNames = Object.keys(selectedFields).filter((key) => selectedFields[key]);

    if (regexPattern.trim() && selectedFieldNames.length === 0) {
      for (let i = 0; i < count; i++) {
        dataArray.push({ "Regex Pattern": generateRegexData(regexPattern.trim()) });
      }
    } else if (selectedFieldNames.length === 0 && !regexPattern.trim()) {
      toast({
        title: "No Fields or Pattern Selected",
        description: "Please select at least one field or provide a regex pattern to generate data.",
        variant: "destructive",
      });
      return;
    } else {
      for (let i = 0; i < count; i++) {
        let newData: any = {};

        selectedFieldNames.forEach((fieldName) => {
          if (fields[fieldName]) {
            newData[fieldName] = fields[fieldName]();
          }
        });

        if (regexPattern.trim()) {
          newData["Regex Pattern"] = generateRegexData(regexPattern.trim());
        }

        dataArray.push(newData);
      }
    }

    setGeneratedData(dataArray);
    setCopyStatus({});
  };

  const handleCopyToClipboard = (key: string, value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopyStatus((prev) => ({ ...prev, [key]: true }));
        setTimeout(() => {
          setCopyStatus((prev) => ({ ...prev, [key]: false }));
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        setCopyStatus((prev) => ({ ...prev, [key]: "error" }));
        setTimeout(() => {
          setCopyStatus((prev) => ({ ...prev, [key]: false }));
        }, 2000);
      });
  };

  const copyAllData = () => {
    if (!generatedData) return;

    const allDataText = generatedData
      .map((record: any, index: number) => {
        const recordText = Object.entries(record)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n");
        return `Record ${index + 1}:\n${recordText}`;
      })
      .join("\n\n");

    navigator.clipboard.writeText(allDataText);
  };

  const openCategoryDialog = (category: string) => {
    setActiveCategory(category);
    setRowCount(10);
    setGeneratedData(null);
    setIsDialogOpen(true);
    setDownloadFormat("csv");
    setRegexPattern("");

    const fields = categoryFields[category];
    const fieldNames = Object.keys(fields);
    const initialSelection: { [key: string]: boolean } = {};
    fieldNames.forEach((field, index) => {
      initialSelection[field] = index < 3;
    });
    setSelectedFields(initialSelection);
  };

  const handleGenerate = () => {
    generateData(activeCategory, rowCount);
  };

  const handleRowCountChange = (value: string) => {
    const numValue = parseInt(value) || 1;
    const clampedValue = Math.min(Math.max(numValue, 1), 5000);
    setRowCount(clampedValue);

    if (numValue > 5000) {
      toast({
        title: "Maximum Limit Reached",
        description: "Maximum of 5,000 rows allowed to prevent performance issues.",
        variant: "destructive",
      });
    }
  };

  const getDataAsStringArray = () => {
    if (!generatedData) return [];
    return generatedData.map((record: any, index: number) => {
      const recordText = Object.entries(record)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");
      return `Record ${index + 1}: ${recordText}`;
    });
  };

  const handleFieldToggle = (fieldName: string, checked: boolean) => {
    setSelectedFields((prev) => ({ ...prev, [fieldName]: checked }));
    
  };
  

  const downloadData = () => {
    if (!generatedData || generatedData.length === 0) return;

    let fileContent: string;
    let mimeType: string;
    let fileExtension: string;

    if (downloadFormat === "csv") {
      const headers = Object.keys(generatedData[0]);
      const csvContent = [
        headers.join(","),
        ...generatedData.map((record: any) =>
          headers.map((header) => `"${String(record[header]).replace(/"/g, '""')}"`).join(",")
        ),
      ].join("\n");

      fileContent = csvContent;
      mimeType = "text/csv";
      fileExtension = "csv";
    } else {
      fileContent = JSON.stringify(generatedData, null, 2);
      mimeType = "application/json";
      fileExtension = "json";
    }

    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeCategory}-data.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    setDownloadFormat("csv");
    downloadData();
  };

  return {
    generatedData,
    copyStatus,
    rowCount,
    activeCategory,
    isDialogOpen,
    selectedFields,
    downloadFormat,
    regexPattern,
    setRegexPattern,
    setDownloadFormat,
    setIsDialogOpen,
    setActiveCategory,
    setSelectedFields,
    setGeneratedData,
    generateData,
    handleCopyToClipboard,
    copyAllData,
    openCategoryDialog,
    handleGenerate,
    handleRowCountChange,
    getDataAsStringArray,
    handleFieldToggle,
    downloadData,
    downloadCSV,
  };
}
