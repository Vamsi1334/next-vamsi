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
  string: {
    'Alpha': () => faker.string.alpha(10),
    'Alphanumeric': () => faker.string.alphanumeric(10),
    'Numeric': () => faker.string.numeric(10),
    'UUID': () => faker.string.uuid(),
    'Nano ID': () => faker.string.nanoid(),
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
    Object.keys(categoryFields['string']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('string');
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
                  Random Text String Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Generate random text strings with alpha, alphanumeric, UUID and NanoID. Select field length and count in a developer-friendly mock string data tool              </p>
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
                        {Object.keys(categoryFields['string']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Random Text String Generator?</h2>
                  <p className="mb-4">
                    Random text string generator is a free tool that creates random text strings in multiple formats, unlimited times with 5000 rows. It can be used to generate random text strings for APIs, forms, authentication tokens, or mock databases. The FakerBox tool supports:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Create a fake text string for prototypes and demos</li>
                    <li>Generate random text strings for unit testing and QA</li>
                    <li>Use as a mock string data generator for structured mockups</li>
                    <li>Produce a 32 char random string or UUID for schema testing</li>
                  </ul>
                  <p className="mb-8">
                    This flexibility makes the FakerBox tool a versatile fake string generator for all developer and testing needs.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use Random Text Strings?</h2>

                  <h3 className="text-xl font-semibold mb-2">Safe for Development</h3>
                  <p className="mb-4">
                    Using generated random text strings avoids exposing real user tokens, UUIDs, or secure data.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Speeds Up Testing</h3>
                  <p className="mb-4">
                    Instead of creating placeholders manually, you can create a fake text string instantly.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Realistic and Flexible</h3>
                  <p className="mb-4">
                    The sample text string generator produces outputs like UUIDs, NanoIDs, or 32 char random strings that mimic real formats.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Useful for Multiple Projects</h3>
                  <p className="mb-8">
                    Random text strings are valuable for APIs, form validations, authentication mockups, and research.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">How to Generate Random Text Strings?</h2>

                  <h3 className="text-xl font-semibold mb-2">Choose Your String Type</h3>
                  <p className="mb-4">
                    Pick the format you need: alpha, alphanumeric, numeric, UUID, or NanoID.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Generate a Fake Text String</h3>
                  <p className="mb-4">
                    Click Generate to create results such as:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Alpha: qwerty</li>
                    <li>Alphanumeric: A9bC3kL7</li>
                    <li>Numeric: 9283746</li>
                    <li>UUID: 550e8400-e29b-41d4-a716-446655440000</li>
                    <li>NanoID: V1StGXR8_Z5jdHi6B-myT</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Regex Options</h3>
                  <p className="mb-4">
                    For advanced users, regex patterns allow you to create a fake text string with precise rules, such as generating only lowercase alphanumeric strings or exactly 32 char random string outputs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Save Results</h3>
                  <p className="mb-8">
                    You can copy a single random text string or export multiple values in CSV and JSON formats for developer workflows.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Features of the FakerBox Random Text String Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Generate random text strings in alpha, alphanumeric, numeric, UUID, and NanoID formats</li>
                    <li>Create a fake text string instantly for testing or demos</li>
                    <li>Works as a mock string data generator for structured outputs</li>
                    <li>Produce 32 char random string values for UUID-style testing</li>
                    <li>Regex support for customized string generation rules</li>
                    <li>Export datasets as CSV or JSON for developer integration</li>
                    <li>Free to use with no limits</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Examples of Random Text Strings</h2>

                  <h3 className="text-xl font-semibold mb-2">Example 1</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Alpha: abcxyz</li>
                    <li>Alphanumeric: x7K3p9D2</li>
                    <li>Numeric: 748392</li>
                    <li>UUID: 123e4567-e89b-12d3-a456-426614174000</li>
                    <li>NanoID: bqZ5jdHi6BM2y7V1StGX</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 2</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Alpha: uvwqrs</li>
                    <li>Alphanumeric: A8m3X4p7</li>
                    <li>Numeric: 345678</li>
                    <li>UUID: f47ac10b-58cc-4372-a567-0e02b2c3d479</li>
                    <li>NanoID: 93DiF_Xh5s6oZpk7XUu</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 3</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Alpha: mnopqr</li>
                    <li>Alphanumeric: z9K8j3T2</li>
                    <li>Numeric: 9823746</li>
                    <li>UUID: 6ba7b810-9dad-11d1-80b4-00c04fd430c8</li>
                    <li>NanoID: V1StGXR8_Z5jdHi6B-myT</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Benefits of Using FakerBox Fake String Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Create random string values instantly for safe testing</li>
                    <li>Works as both a mock string data generator and sample text string generator</li>
                    <li>32 char random string support ensures compatibility with UUID-like structures</li>
                    <li>Random text strings prevent repetitive placeholder patterns</li>
                    <li>Free forever with unlimited access for developers and testers</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Random Text String Generator for Projects</h2>

                  <h3 className="text-xl font-semibold mb-2">Developers and Testers</h3>
                  <p className="mb-4">
                    Generate random text strings for APIs, authentication tokens, and input testing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Database Designers</h3>
                  <p className="mb-4">
                    Use fake string generator results such as UUIDs and NanoIDs for schema validation.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Educators and Trainers</h3>
                  <p className="mb-4">
                    Leverage safe sample text string generator results to train students on security and data management.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Researchers and Analysts</h3>
                  <p className="mb-4">
                    Create a fake text string dataset for safe experimental models.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Designers and Prototypers</h3>
                  <p className="mb-8">
                    Use random text strings to make mockups realistic and functional.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">FAQs: Random Text String Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">What is a random text string generator?</h3>
                  <p className="mb-4">
                    It is a tool that creates random text strings such as alphanumeric, numeric, UUID, and NanoID values.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I create a fake text string for testing?</h3>
                  <p className="mb-4">
                    Yes, the FakerBox tool lets you create a fake text string instantly.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Does it support 32 char random string outputs?</h3>
                  <p className="mb-4">
                    Yes, you can generate 32 char random string values similar to UUID formats.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Is this tool a mock string data generator?</h3>
                  <p className="mb-4">
                    Yes, it works as a mock string data generator for structured development outputs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">What is the difference between random string generator and fake string generator?</h3>
                  <p className="mb-4">
                    Both generate test strings, but the fake string generator emphasizes safety and mock use cases.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I use regex for control?</h3>
                  <p className="mb-4">
                    Yes, regex rules let you generate random text strings with specific lengths or character patterns.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Is this tool free?</h3>
                  <p className="mb-4">
                    Yes, the FakerBox random text string generator is free to use without limits.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Who uses random text strings?</h3>
                  <p>
                    Developers, QA engineers, trainers, and researchers use random text strings for safe testing and education.
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
