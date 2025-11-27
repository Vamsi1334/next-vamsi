"use client"

import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { CheckCircle, Copy, Settings, Download, Eye } from 'lucide-react';
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import { Textarea } from "../components/ui/textarea"
import DownloadButton from '../components/DownloadButton';
import { useToast } from '../hooks/use-toast';
import { useDataGenerator } from './useDataGenerator';
import Head from 'next/head';
import Footer from '../components/Footer';
import CustomRecordGenerator from '../components/CustomRecordGenerator';
import ToolsNav from "../tools/ToolsNav";

import Navigation from '../components/Navigation';


const categoryFields = {
  system: {
    'File Name': () => faker.system.fileName(),
    'File Path': () => faker.system.filePath(),
    'MIME Type': () => faker.system.mimeType(),
    'File Extension': () => faker.system.fileExt(),
  },
};

const Person = ({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) => {
  const sizeClasses = {
    small: 'text-2xl',
    default: 'text-4xl',
    large: 'text-5xl'
  };

  const {
    generatedData,
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
    setGeneratedData,
    handleRowCountChange,
    openCategoryDialog,
    handleFieldToggle,
    handleGenerate,
    copyAllData,
    downloadData,
    setSelectedFields
  } = useDataGenerator(categoryFields);


  useEffect(() => {
    const initial: any = {};
    Object.keys(categoryFields['system']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('system');
    setSelectedFields(initial);
  }, []);

  return (
    <>
     

      <div className="min-h-screen">
        <Navigation />

        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <h1 className={`${sizeClasses[size]} font-bold text-gray-900`}>
                  Fake File Data Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Generate realistic file names, folder paths, and extensions along with mock system information for seamless software development testing and simulations.              </p>
            </div>
          </div>
        </div>

        {/* Data Generation Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-8">
              <div className="flex-1 min-w-0">

                {/* ✅ Integrated HTML grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
                  {/* Left Side - Configuration */}
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Select Fields to Generate</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 max-h-64 overflow-y-auto">
                        {Object.keys(categoryFields['system']).map((fieldName) => (
                          <div key={fieldName} className="flex items-center space-x-2">
                            <Checkbox
                              id={fieldName}
                              checked={selectedFields[fieldName]}
                              onCheckedChange={(checked) => handleFieldToggle(fieldName, checked as boolean)}
                            />
                            <Label htmlFor={fieldName} className="text-sm">{fieldName}</Label>
                          </div>
                        ))}
                      </div>

                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Regex Pattern (Optional)</h3>
                      <div className="space-y-2">
                        <Label htmlFor="regex-pattern">Custom Regex Pattern</Label>
                        <Textarea
                          id="regex-pattern"
                          placeholder="Enter regex pattern (e.g., [A-Z]{3}[0-9]{3}, \d{4}-\d{2}-\d{2})"
                          value={regexPattern}
                          onChange={(e) => setRegexPattern(e.target.value)}
                          className="min-h-[60px]"
                        />
                        <p className="text-sm text-gray-600">
                          Use regex patterns to generate custom formatted data. Examples: [A-Z]{3}[0-9]{3} for ABC123, \d{4}-\d{2}-\d{2} for dates like 2024-01-15
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="row-count">Number of Rows</Label>
                      <Input
                        id="row-count"
                        type="number"
                        value={rowCount}
                        onChange={(e) => handleRowCountChange(e.target.value)}
                        min={1}
                        max={5000}
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">Maximum: 5,000 rows</p>
                    </div>

                    <div>
                      <Label htmlFor="download-format">Download Format</Label>
                      <select
                        id="download-format"
                        value={downloadFormat}
                        onChange={(e) => setDownloadFormat(e.target.value as 'csv' | 'json')}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="csv">CSV (Comma Separated Values)</option>
                        <option value="json">JSON (JavaScript Object Notation)</option>
                      </select>
                    </div>
                  </div>

                  {/* Right Side - Data Preview */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Generated Data Preview</h3>

                    <Button
                      onClick={handleGenerate}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6"
                      disabled={Object.values(selectedFields).every(v => !v) && !regexPattern.trim()}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Generate & Preview
                    </Button>

                    {generatedData ? (
                      <>
                        <div className="flex gap-2 mb-4">
                          <Button
                            onClick={copyAllData}
                            variant="outline"
                            className="flex-1"
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Copy Data
                          </Button>

                          <Button
                            onClick={downloadData}
                            variant="outline"
                            className="flex-1"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download {downloadFormat.toUpperCase()}
                          </Button>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                          <div className="overflow-x-auto max-h-96 overflow-y-auto">
                            <table className="w-full border-collapse text-sm">
                              <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                  {Object.keys(generatedData[0] || {}).map((header) => (
                                    <th key={header} className="border px-3 py-2 text-left font-semibold text-gray-900">
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {generatedData.map((record: any, index: number) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    {Object.values(record).map((value: any, cellIndex: number) => (
                                      <td key={cellIndex} className="border px-3 py-2 max-w-xs truncate" title={String(value)}>
                                        {String(value)}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12 text-gray-500 border border-dashed rounded-lg">
                        <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Select fields and click "Generate & Preview" to see your data</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom Record Generator */}
                <div className="text-center mt-12 mb-8 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border-2 border-slate-200 pb-5">
                  <div className=" p-8">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">Custom Test Data Generator Tool</h3>
                    <p className="text-slate-600 mb-4">Generate custom CSV and JSON test data with unlimited columns and data types. Perfect for database testing, software development, API testing, and data analysis. Create realistic fake data including names, emails, addresses, phone numbers, financial data, and more for your testing needs.

                    </p>
                  </div>
                  <CustomRecordGenerator />

                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Similar Tools</h2>

                  {/* Navigation buttons */}
                  <ToolsNav />
                </div>
                <div className="rounded-xl border-2 border-slate-200 p-10 shadow-md mx-auto my-8">

                  <h2 className="text-2xl font-bold mb-4">What Is a Fake File Data Generator?</h2>
                  <p className="mb-4">
                    A fake file data generator is a tool that creates random file information such as file names, file paths, extensions, and MIME types. It works as both a dummy file info generator and a fake system information generator. You can use it to:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate fake file data for software testing</li>
                    <li>Produce random file generator outputs for QA environments</li>
                    <li>Create fake system information for training or demos</li>
                    <li>Export structured data in CSV or JSON for developers</li>
                  </ul>
                  <p className="mb-8">
                    The FakerBox tool also supports regex pattern customization, allowing you to define specific formats for file names and outputs.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use Fake File Data?</h2>

                  <h3 className="text-xl font-semibold mb-2">Helps Developers Test Efficiently</h3>
                  <p className="mb-4">
                    Developers can use fake file data to test storage workflows, uploads, and system behavior without creating real files.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Prevents Risks with Real Data</h3>
                  <p className="mb-4">
                    The fake system information generator avoids exposing sensitive or private data during development.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Produces Realistic Outputs</h3>
                  <p className="mb-4">
                    The dummy file info generator provides file names, extensions, and MIME types that mimic real-world formats.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Flexible for Multiple Scenarios</h3>
                  <p className="mb-8">
                    Whether for UI demos, API testing, or research simulations, you can generate file data quickly and reliably.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">How to Generate File Data with FakerBox?</h2>

                  <h3 className="text-xl font-semibold mb-2">Choosing Output Fields</h3>
                  <p className="mb-4">
                    You can generate specific outputs like: file name, file path, MIME type, or file extension.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Creating Fake File Data</h3>
                  <p className="mb-4">
                    Click Generate and instantly receive random file generator outputs such as:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>File Name: report_2025.docx</li>
                    <li>File Path: /users/admin/documents/finance/</li>
                    <li>MIME Type: application/pdf</li>
                    <li>File Extension: .pdf</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Regex Customization</h3>
                  <p className="mb-4">
                    Advanced users can apply regex patterns to generate file names or extensions that match custom rules, such as specific prefixes, suffixes, or length formats.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Exporting File Data</h3>
                  <p className="mb-8">
                    You can copy single outputs for quick use or export complete sets of fake file data in CSV and JSON formats for integration with testing platforms.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Features of the FakerBox Fake File Data Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Generate fake file data such as file names, MIME types, and extensions instantly</li>
                    <li>Works as a fake system information generator to simulate directory structures</li>
                    <li>Dummy file info generator produces data that resembles authentic records</li>
                    <li>Random file generator delivers variety with every click</li>
                    <li>Regex pattern support for generating file names in custom formats</li>
                    <li>Export datasets in CSV or JSON for testing and development workflows</li>
                    <li>Free to use forever with unlimited access</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Examples of Random File Data</h2>

                  <h3 className="text-xl font-semibold mb-2">Example 1</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>File Name: draft_notes.txt</li>
                    <li>File Path: C:/users/guest/docs/</li>
                    <li>MIME Type: text/plain</li>
                    <li>File Extension: .txt</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 2</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>File Name: project_summary_2024.xlsx</li>
                    <li>File Path: /home/data/projects/reports/</li>
                    <li>MIME Type: application/vnd.ms-excel</li>
                    <li>File Extension: .xlsx</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 3</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>File Name: server_log_05_12_21.log</li>
                    <li>File Path: /var/logs/system/</li>
                    <li>MIME Type: text/x-log</li>
                    <li>File Extension: .log</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 4</h3>
                  <ul className="list-disc list-inside  mb-8">
                    <li>File Name: sample_presentation.pptx</li>
                    <li>File Path: /users/demo/downloads/</li>
                    <li>MIME Type: application/vnd.ms-powerpoint</li>
                    <li>File Extension: .pptx</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Benefits of Using FakerBox File Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Instantly generate file names, paths, and MIME types for any project</li>
                    <li>Fake system information generator ensures safe and secure testing</li>
                    <li>Random file generator provides realistic but fictional outputs</li>
                    <li>Dummy file info generator saves time in building test environments</li>
                    <li>Always free and unlimited for developers and testers</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Fake File Data for Projects</h2>

                  <h3 className="text-xl font-semibold mb-2">Developers and QA Engineers</h3>
                  <p className="mb-4">
                    Use fake file data to test file handling systems, uploads, and directories without using sensitive information.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Educators and Trainers</h3>
                  <p className="mb-4">
                    Teach file system structures using dummy file info generator results instead of real system records.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Researchers and Analysts</h3>
                  <p className="mb-4">
                    Generate random file data for experiments, analysis, or simulations.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Software Prototypers and Designers</h3>
                  <p className="mb-4">
                    Fill UI mockups with fake system information that looks complete.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Security Trainers</h3>
                  <p className="mb-8">
                    Use random file generator data to simulate penetration tests and system resilience exercises.
                  </p>
                  <h2 className="text-2xl font-bold my-4">FAQs: Fake File Data Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">What is a fake file data generator?</h3>
                  <p className="mb-4">
                    It is a tool that generates fake file data such as names, paths, MIME types, and extensions for testing and development.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I use this tool as a random file generator?</h3>
                  <p className="mb-4">
                    Yes, the FakerBox tool produces random file generator outputs instantly.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Does it generate actual files?</h3>
                  <p className="mb-4">
                    No, it only creates fake system information such as file metadata and does not produce real files.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">What is a dummy file info generator?</h3>
                  <p className="mb-4">
                    It is part of this tool that creates sample data like file paths and names for safe testing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I customize results with regex?</h3>
                  <p className="mb-4">
                    Yes, you can apply regex rules to control file naming formats.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Is this a free tool?</h3>
                  <p className="mb-4">
                    Yes, the FakerBox fake file data generator is free to use without limits.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Who uses fake file data?</h3>
                  <p>
                    Developers, QA testers, educators, researchers, and trainers all use fake file data for testing, simulations, and education.
                  </p>


                </div>

              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Person;
