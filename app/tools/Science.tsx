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
  science: {
    'Chemical Element': () => faker.science.chemicalElement().name,
    'Chemical Symbol': () => faker.science.chemicalElement().symbol,
    'Unit': () => faker.science.unit().name,
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
    Object.keys(categoryFields['science']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('science');
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
                  Fake Science Data Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Generate realistic science data with chemical elements, symbols & units for research, education, testing and more.
              </p>
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
                        {Object.keys(categoryFields['science']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Fake Science Data Generator?</h2>
                  <p className="mb-4">
                    A fake science data generator is a tool that produces random science data including chemical elements, chemical symbols, and measurement units. It works as a scientific data generator that allows you to:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate science data for testing scientific apps</li>
                    <li>Create fake science data for safe training and demonstrations</li>
                    <li>Produce mock scientific data generator outputs for prototypes and projects</li>
                    <li>Export datasets as CSV or JSON for scalability</li>
                  </ul>
                  <p className="mb-8">
                    By using <span className="font-bold">FakerBox</span>, you can quickly generate fake research data that looks realistic without relying on actual experimental results.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use Fake Research Data?</h2>

                  <h3 className="text-xl font-semibold mb-2">Safe for Education and Testing</h3>
                  <p className="mb-4">
                    Fake research data avoids exposing sensitive or incomplete datasets during training or development.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Speeds Up Development</h3>
                  <p className="mb-4">
                    Developers can generate science data instantly for forms, APIs, and applications.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Realistic Outputs</h3>
                  <p className="mb-4">
                    The mock scientific data generator delivers results that look authentic, including elements, symbols, and standard units.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Supports Multiple Scenarios</h3>
                  <p className="mb-8">
                    You can create fake science data for research simulations, classroom exercises, and prototype testing.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">How to Use the FakerBox Scientific Data Generator?</h2>

                  <h3 className="text-xl font-semibold mb-2">Step 1: Select Fields</h3>
                  <p className="mb-4">
                    Choose whether you want chemical element, chemical symbol, or unit.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Step 2: Generate Science Data</h3>
                  <p className="mb-4">
                    Click Generate to instantly produce random science data such as H (Hydrogen), Na (Sodium), or units like Joule and Pascal.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Step 3: Export or Copy</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Copy single entries for quick use</li>
                    <li>Export CSV for large sets of random science data</li>
                    <li>Export JSON for developers and API workflows</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Features of the FakerBox Fake Science Data Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Generate random science data with elements, symbols, and units instantly</li>
                    <li>Works as a scientific data generator for structured outputs</li>
                    <li>Create fake science data in bulk for testing or training</li>
                    <li>Provides mock scientific data generator results for realistic demos</li>
                    <li>Download generated science data in both CSV and JSON formats for convenience</li>
                    <li>Free and unlimited with no sign-up required</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Examples of Random Science Data</h2>

                  <h3 className="text-xl font-semibold mb-2">Example 1</h3>
                  <ul className="list-disc list-inside mb-2">
                    <li>Chemical Element: Oxygen</li>
                    <li>Chemical Symbol: O</li>
                    <li>Unit: Pascal</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 2</h3>
                  <ul className="list-disc list-inside mb-2">
                    <li>Chemical Element: Sodium</li>
                    <li>Chemical Symbol: Na</li>
                    <li>Unit: Joule</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 3</h3>
                  <ul className="list-disc list-inside mb-2">
                    <li>Chemical Element: Carbon</li>
                    <li>Chemical Symbol: C</li>
                    <li>Unit: Kelvin</li>
                  </ul>
                  <h3 className="text-xl font-semibold mb-2">Example 4</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Chemical Element: Calcium</li>
                    <li>Chemical Symbol: Ca</li>
                    <li>Unit: Watt</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Benefits of Using FakerBox Scientific Data Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Instantly generate science data for multiple applications (h3)</li>
                    <li>Fake research data ensures safety in testing and teaching (h3)</li>
                    <li>Random science data looks structured and realistic (h3)</li>
                    <li>Bulk options allow thousands of records at once (h3)</li>
                    <li>Scalable for classrooms, research, and app testing (h3)</li>
                    <li>Free forever without restrictions (h3)</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Fake Science Data for Projects</h2>

                  <h3 className="text-xl font-semibold mb-2">Developers and QA Teams</h3>
                  <p className="mb-4">
                    Use random science data to test apps, software, or APIs with structured outputs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Educators and Trainers</h3>
                  <p className="mb-4">
                    Generate mock research data for training, classroom demonstrations, and educational science projects.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Researchers and Analysts</h3>
                  <p className="mb-4">
                    Use the mock scientific data generator to simulate datasets for analysis.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Students and Learners</h3>
                  <p className="mb-4">
                    Generate science data for experiments, practice work, and learning exercises.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Creatives and Writers</h3>
                  <p className="mb-8">
                    Incorporate random science data into writing, storytelling, or games.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">FAQs: Fake Science Data Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">What is a fake science data generator?</h3>
                  <p className="mb-4">
                    It is a tool that generates science data such as chemical elements, symbols, and units for safe use.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I generate random science data?</h3>
                  <p className="mb-4">
                    Yes, the tool instantly produces random science data for projects.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Does it create fake research data?</h3>
                  <p className="mb-4">
                    Yes, you can create fake research data for simulations, teaching, or testing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">What is a mock scientific data generator?</h3>
                  <p className="mb-4">
                    It is a generator that produces structured outputs like elements and units for mock datasets.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I export datasets?</h3>
                  <p className="mb-4">
                    Yes, <span className="font-bold">FakerBox</span> allows exporting in CSV or JSON formats.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Is the tool free to use?</h3>
                  <p className="mb-4">
                    Yes, the FakerBox scientific data generator is free and unlimited.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Who uses fake science data?</h3>
                  <p>
                    Educators, students, developers, testers, and researchers all use fake science data for safe training and testing.
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
