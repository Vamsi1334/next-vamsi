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
  random: {
    'Alpha': () => faker.string.alpha(10),
    'Alphanumeric': () => faker.string.alphanumeric(10),
    'Numeric': () => faker.string.numeric(10),
    'UUID': () => faker.string.uuid(),
    'Nano ID': () => faker.string.nanoid(),
    'Symbol': () => faker.string.symbol(10),
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
    Object.keys(categoryFields['random']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('random');
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
                  Generate Random Strings: UUID, NanoID, Alphanumeric & More
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Instantly create alphanumeric, numeric, symbol, UUID and NanoID strings for dev testing. Clean, flexible and made-up data tool tailored for developers needing unique mock data.              </p>
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
                        {Object.keys(categoryFields['random']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Random String Generator?</h2>
                  <p className="mb-4">
                    A random string generator is a tool that creates random strings in different formats, including alphanumeric, numeric, and UUID values. Developers and testers use it to:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate random strings for input testing and mock data creation</li>
                    <li>Use it as a random uuid generator or to generate random uuid values for databases</li>
                    <li>Get random string outputs for API keys, tokens, and identifiers</li>
                    <li>Simulate random number string generator outputs for forms or fields</li>
                  </ul>
                  <p className="mb-8">
                    The FakerBox tool combines multiple functions, working as a random string generator, random uuid generator, and NanoID generator, making it a powerful all-in-one solution.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use Random Strings for Testing?</h2>

                  <h3 className="text-xl font-semibold mb-2">Safe and Secure</h3>
                  <p className="mb-4">
                    Using generated random strings avoids exposing real tokens, UUIDs, or sensitive identifiers.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Speeds Up Development</h3>
                  <p className="mb-4">
                    Instead of manually creating test strings, you can generate random strings instantly.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Realistic and Unique Results</h3>
                  <p className="mb-4">
                    Outputs look authentic and cover multiple formats, including random uuid and random number string generator values.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Flexible for Multiple Projects</h3>
                  <p className="mb-8">
                    Whether you need to create random string values for mock APIs or generate random uuid identifiers for schemas, the tool adapts to your needs.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">How to Generate Random Strings with FakerBox?</h2>

                  <h3 className="text-xl font-semibold mb-2">Choose Your String Format</h3>
                  <p className="mb-4">
                    Select from fields such as alpha, alphanumeric, numeric, UUID, NanoID, or symbol.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Generate Random String Values</h3>
                  <p className="mb-4">
                    Click Generate to instantly get random strings, such as:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Alpha: abcxyz</li>
                    <li>Alphanumeric: 7fh29gkL3</li>
                    <li>Numeric: 9856734</li>
                    <li>UUID: 123e4567-e89b-12d3-a456-426614174000</li>
                    <li>NanoID: V1StGXR8_Z5jdHi6B-myT</li>
                    <li>Symbol: #@!*</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Regex Pattern Customization</h3>
                  <p className="mb-4">
                    Advanced users can apply regex patterns to generate random string values in custom formats, such as strings with fixed length or specific character rules.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Download and Share</h3>
                  <p className="mb-8">
                    Copy a single random string quickly, or export bulk outputs in CSV or JSON formats for testing workflows and development pipelines.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Features of the FakerBox Random String Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Generate random strings across multiple formats instantly</li>
                    <li>Works as a random uuid generator and NanoID generator</li>
                    <li>Create random string values for safe testing environments</li>
                    <li>Supports random number string generator outputs for forms and inputs</li>
                    <li>Generate random uuid or NanoID identifiers with one click</li>
                    <li>Regex support for creating random string formats with custom rules</li>
                    <li>Export outputs in CSV and JSON formats</li>
                    <li>Always free and unlimited</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Examples of Random Strings</h2>

                  <h3 className="text-xl font-semibold mb-2">Example 1</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Alpha: qwerty</li>
                    <li>Alphanumeric: A9x7p2K3</li>
                    <li>Numeric: 782903</li>
                    <li>UUID: 550e8400-e29b-41d4-a716-446655440000</li>
                    <li>NanoID: bqZ5jdHi6BM2y7V1StGX</li>
                    <li>Symbol: $%^</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 2</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Alpha: mnpqrs</li>
                    <li>Alphanumeric: x7F4kLp1</li>
                    <li>Numeric: 48291</li>
                    <li>UUID: 6ba7b810-9dad-11d1-80b4-00c04fd430c8</li>
                    <li>NanoID: V1StGXR8_Z5jdHi6B-myT</li>
                    <li>Symbol: #@!</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 3</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Alpha: uvwxyz</li>
                    <li>Alphanumeric: 5Lm8nRk9</li>
                    <li>Numeric: 9083746</li>
                    <li>UUID: f47ac10b-58cc-4372-a567-0e02b2c3d479</li>
                    <li>NanoID: 93DiF_Xh5s6oZpk7XUu</li>
                    <li>Symbol: *&^%</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Benefits of Using FakerBox Random String Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Instantly generate random strings for testing across formats</li>
                    <li>Use it to generate random uuid values safely and quickly</li>
                    <li>Random uuid generator ensures uniqueness across tests</li>
                    <li>Create random string values with regex customization</li>
                    <li>Get random string outputs for APIs, tokens, and mockups</li>
                    <li>Always free, unlimited, and developer-friendly</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Random String Generator for Projects</h2>

                  <h3 className="text-xl font-semibold mb-2">Developers and QA Engineers</h3>
                  <p className="mb-4">
                    Use the random string generator for testing APIs, UUIDs, and form validations.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Database Designers</h3>
                  <p className="mb-4">
                    Generate random uuid identifiers for safe schema testing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Educators and Trainers</h3>
                  <p className="mb-4">
                    Teach programming and security concepts with random strings and uuids.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Researchers and Analysts</h3>
                  <p className="mb-4">
                    Simulate random string datasets for experiments or models.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Prototypers and Designers</h3>
                  <p className="mb-8">
                    Create random strings to populate mock user interfaces with realistic identifiers.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">FAQs: Random String Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">What is a random string generator?</h3>
                  <p className="mb-4">
                    It is a tool that allows you to create random string outputs like alphanumeric, UUID, NanoID, numeric, and symbols.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I generate random uuid values?</h3>
                  <p className="mb-4">
                    Yes, the FakerBox tool acts as a random uuid generator and can generate random uuid outputs instantly.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Does it support NanoID?</h3>
                  <p className="mb-4">
                    Yes, you can generate NanoIDs as part of the tool’s random string capabilities.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">What is a random number string generator?</h3>
                  <p className="mb-4">
                    It creates numeric-only strings for testing number-based fields.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I use regex to control outputs?</h3>
                  <p className="mb-4">
                    Yes, regex patterns let you generate random string values with specific rules or lengths.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Is this tool free?</h3>
                  <p className="mb-4">
                    Yes, the FakerBox random string generator is free to use with no limits.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Who uses random strings?</h3>
                  <p>
                    Developers, QA testers, educators, and database admins use random strings for testing, teaching, and development.
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
