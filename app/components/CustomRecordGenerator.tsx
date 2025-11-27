"use client";


import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Plus, X, Download, Database, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { useToast } from '../hooks/use-toast';

interface ColumnDefinition {
  id: string;
  name: string;
  dataType: string;
}

const dataCategories = [
  { value: 'names', label: 'Person Names' },
  { value: 'emails', label: 'Email Addresses' },
  { value: 'phones', label: 'Phone Numbers' },
  { value: 'addresses', label: 'Street Addresses' },
  { value: 'companies', label: 'Company Names' },
  { value: 'dates', label: 'Random Dates' },
  { value: 'numbers', label: 'Random Numbers' },
  { value: 'finance', label: 'Financial Data' },
  { value: 'internet', label: 'Internet Data' },
  { value: 'vehicles', label: 'Vehicle Data' },
  { value: 'colors', label: 'Color Codes' },
  { value: 'commerce', label: 'Commerce Data' },
  { value: 'words', label: 'Random Words' },
  { value: 'lorem', label: 'Lorem Text' },
  { value: 'location', label: 'Location Data' }
];

const CustomRecordGenerator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [columns, setColumns] = useState<ColumnDefinition[]>([]);
  const [rowCount, setRowCount] = useState(10);
  const [outputFormat, setOutputFormat] = useState('csv');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewData, setPreviewData] = useState<{ [key: string]: string }[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const addColumn = () => {
    const newColumn: ColumnDefinition = {
      id: Date.now().toString(),
      name: '',
      dataType: 'names'
    };
    setColumns([...columns, newColumn]);
  };

  const removeColumn = (id: string) => {
    setColumns(columns.filter(col => col.id !== id));
    setShowPreview(false);
    setPreviewData([]);
  };

  const updateColumn = (id: string, field: keyof ColumnDefinition, value: string) => {
    setColumns(columns.map(col =>
      col.id === id ? { ...col, [field]: value } : col
    ));
    // Reset preview when columns change
    setShowPreview(false);
    setPreviewData([]);
  };

  const generateDataValue = (dataType: string): string => {
    switch (dataType) {
      case 'names':
        return faker.person.fullName();
      case 'emails':
        return faker.internet.email();
      case 'phones':
        return faker.phone.number();
      case 'addresses':
        return faker.location.streetAddress({ useFullAddress: true });
      case 'companies':
        return faker.company.name();
      case 'dates':
        return faker.date.between({ from: new Date('1990-01-01'), to: new Date() }).toISOString().split('T')[0];
      case 'numbers':
        return faker.number.int({ min: 1, max: 10000 }).toString();
      case 'finance':
        return faker.finance.accountNumber();
      case 'internet':
        return faker.internet.url();
      case 'vehicles':
        return faker.vehicle.vehicle();
      case 'colors':
        return faker.color.rgb({ format: 'css' });
      case 'commerce':
        return faker.commerce.productName();
      case 'words':
        return faker.lorem.word();
      case 'lorem':
        return faker.lorem.sentence();
      case 'location':
        return faker.location.city();
      default:
        return faker.lorem.word();
    }
  };

  const generatePreview = () => {
    if (columns.length === 0) {
      toast({
        title: "No Columns Defined",
        description: "Please add at least one column to preview data.",
        variant: "destructive"
      });
      return;
    }

    const invalidColumns = columns.filter(col => !col.name.trim());
    if (invalidColumns.length > 0) {
      toast({
        title: "Invalid Column Names",
        description: "Please provide names for all columns.",
        variant: "destructive"
      });
      return;
    }

    // Generate 5 sample records for preview
    const sampleData = [];
    for (let i = 0; i < 5; i++) {
      const record: { [key: string]: string } = {};

      for (const column of columns) {
        const value = generateDataValue(column.dataType);
        record[column.name] = value;
      }

      sampleData.push(record);
    }

    setPreviewData(sampleData);
    setShowPreview(true);

    toast({
      title: "Preview Generated",
      description: "Sample data generated successfully!"
    });
  };

  const generateCustomData = async () => {
    if (columns.length === 0) {
      toast({
        title: "No Columns Defined",
        description: "Please add at least one column to generate data.",
        variant: "destructive"
      });
      return;
    }

    const invalidColumns = columns.filter(col => !col.name.trim());
    if (invalidColumns.length > 0) {
      toast({
        title: "Invalid Column Names",
        description: "Please provide names for all columns.",
        variant: "destructive"
      });
      return;
    }

    if (rowCount < 1 || rowCount > 5000) {
      toast({
        title: "Invalid Row Count",
        description: "Please enter a number between 1 and 5000.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const data = [];

      // Generate header row for CSV
      if (outputFormat === 'csv') {
        data.push(columns.map(col => col.name).join(','));
      }

      // Generate data rows
      const records = [];
      for (let i = 0; i < rowCount; i++) {
        const record: { [key: string]: string } = {};

        for (const column of columns) {
          const value = generateDataValue(column.dataType);
          record[column.name] = value;
        }

        if (outputFormat === 'csv') {
          data.push(columns.map(col => `"${record[col.name].replace(/"/g, '""')}"`).join(','));
        } else {
          records.push(record);
        }
      }

      // Create file content
      let fileContent: string;
      let mimeType: string;
      let fileExtension: string;

      if (outputFormat === 'csv') {
        fileContent = data.join('\n');
        mimeType = 'text/csv';
        fileExtension = 'csv';
      } else {
        fileContent = JSON.stringify(records, null, 2);
        mimeType = 'application/json';
        fileExtension = 'json';
      }

      // Create and download file
      const blob = new Blob([fileContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `fakerbox_custom_data_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Data Generated Successfully!",
        description: `Generated ${rowCount} records with ${columns.length} columns.`
      });

      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "An error occurred while generating the data.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
    setColumns([]);
    setRowCount(10);
    setOutputFormat('csv');
    setPreviewData([]);
    setShowPreview(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="
    bg-gradient-to-r from-purple-600 to-indigo-600
    hover:from-purple-700 hover:to-indigo-700
    text-white font-semibold
    px-4 py-2                /* mobile */
    sm:px-6 sm:py-2.5        /* ≥640px */
    md:px-8 md:py-3         /* ≥768px */
    rounded-lg shadow-lg
    transition-all duration-200
    hover:shadow-xl
  "
        >
          <Database className="w-5 h-5 mr-2" />
          Generate Custom Test Records
        </Button>

      </DialogTrigger>

      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200">
        <DialogHeader className="border-b border-slate-200 pb-4">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Custom Record Generator
          </DialogTitle>
          <p className="text-slate-600 mt-2">Create customized test data with your own column definitions</p>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {/* Column Definition Section */}
          <div className="bg-white rounded-xl border-2 border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800 flex items-center">
                  <Database className="w-5 h-5 mr-2 text-purple-600" />
                  Column Definitions
                </h3>
                <p className="text-slate-600 text-sm mt-1">Define the structure of your data</p>
              </div>
              <Button
                onClick={addColumn}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Column
              </Button>
            </div>

            {columns.length === 0 && (
              <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                <Database className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                <p className="text-slate-500 text-lg font-medium">No columns defined yet</p>
                <p className="text-slate-400 text-sm mt-1">Click "Add Column" to get started</p>
              </div>
            )}

            <div className="space-y-4">
              {columns.map((column, index) => (
                <div key={column.id} className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:bg-slate-100 transition-colors">
                  <div className="flex gap-4 items-end">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <Label htmlFor={`column-name-${column.id}`} className="text-slate-700 font-medium">
                        Column Name
                      </Label>
                      <Input
                        id={`column-name-${column.id}`}
                        value={column.name}
                        onChange={(e) => updateColumn(column.id, 'name', e.target.value)}
                        placeholder="e.g., EmployeeID, ProductName"
                        className="mt-2 border-slate-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>

                    <div className="flex-1">
                      <Label htmlFor={`data-type-${column.id}`} className="text-slate-700 font-medium">
                        Data Category
                      </Label>
                      <select
                        id={`data-type-${column.id}`}
                        value={column.dataType}
                        onChange={(e) => updateColumn(column.id, 'dataType', e.target.value)}
                        className="w-full mt-2 px-3 py-2 border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                      >
                        {dataCategories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Button
                      onClick={() => removeColumn(column.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          {columns.length > 0 && (
            <div className="bg-white rounded-xl border-2 border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-blue-600" />
                    Data Preview
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">See a sample of your generated data</p>
                </div>
                <Button
                  onClick={generatePreview}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md"
                  size="sm"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Generate Preview
                </Button>
              </div>

              {showPreview && previewData.length > 0 && (
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 overflow-hidden shadow-inner">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 border-b border-blue-300">
                    <p className="text-white font-semibold flex items-center">
                      <Database className="w-4 h-4 mr-2" />
                      Sample of 5 records
                    </p>
                  </div>
                  <div className="overflow-x-auto max-h-60 bg-white border-2 border-blue-100 m-2 rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50">
                          {columns.map((column) => (
                            <TableHead key={column.id} className="whitespace-nowrap font-semibold text-slate-700 border-r border-slate-200 last:border-r-0">
                              {column.name}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {previewData.map((record, index) => (
                          <TableRow key={index} className="hover:bg-slate-50">
                            {columns.map((column) => (
                              <TableCell key={column.id} className="whitespace-nowrap max-w-48 truncate border-r border-slate-100 last:border-r-0">
                                {record[column.name]}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Configuration Section */}
          <div className="bg-white rounded-xl border-2 border-slate-200 shadow-sm p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <Download className="w-5 h-5 mr-2 text-emerald-600" />
              Generation Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <Label htmlFor="row-count" className="text-slate-700 font-medium">Number of Rows</Label>
                <Input
                  id="row-count"
                  type="number"
                  value={rowCount}
                  onChange={(e) => setRowCount(parseInt(e.target.value) || 1)}
                  min={1}
                  max={5000}
                  className="mt-2 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
                <p className="text-sm text-slate-500 mt-2">Maximum: 5,000 rows</p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <Label htmlFor="output-format" className="text-slate-700 font-medium">Output Format</Label>
                <select
                  id="output-format"
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="w-full mt-2 px-3 py-2 border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                >
                  <option value="csv">CSV (Comma Separated)</option>
                  <option value="json">JSON (JavaScript Object)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-end pt-6 border-t-2 border-slate-200">
            <Button
              onClick={generateCustomData}
              disabled={isGenerating || columns.length === 0}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-12 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Data...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-3" />
                  Generate Custom Data
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomRecordGenerator;
