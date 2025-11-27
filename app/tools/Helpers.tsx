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
  helpers: {
    'Array Element': () => faker.helpers.arrayElement(['red', 'blue', 'green', 'yellow']),
    'Object Key': () => faker.helpers.objectKey({ name: 'John', age: 30, city: 'New York' }),
    'Object Value': () => faker.helpers.objectValue({ name: 'John', age: 30, city: 'New York' }),
    'Shuffle Array': () => faker.helpers.shuffle(['apple', 'banana', 'cherry']).join(', '),
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
    Object.keys(categoryFields['helpers']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('helpers');
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
                  Array & Object Data Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Generate mock arrays, objects, and utility data for testing, APIs, and UI design. Developer-ready online tool for structured sample data creation. Fast, flexible, and free.              </p>
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
                        {Object.keys(categoryFields['helpers']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is an Array & Object Data Generator?</h2>
                  <p className="mb-4">
                    An array data generator or object data generator is a tool that produces structured values formatted as arrays and objects. Instead of writing manual entries, you can use the FakerBox mock array data and mock object data generator to:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate array elements for sample datasets</li>
                    <li>Create mock object data for APIs and applications</li>
                    <li>Shuffle arrays to simulate randomized structures</li>
                    <li>Use fake utility data for building mock helper functions</li>
                  </ul>
                  <p className="mb-8">
                    The tool is developer-friendly and adapts to multiple scenarios, making it valuable for testing, prototyping, and demos.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use Mock Array and Object Data?</h2>

                  <h3 className="text-xl font-semibold mb-2">Efficient for Development</h3>
                  <p className="mb-4">
                    Using an array data generator saves time by creating arrays and objects instantly.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Safe for Testing</h3>
                  <p className="mb-4">
                    Mock object data prevents the exposure of sensitive or real information during development.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Authentic and Structured Outputs</h3>
                  <p className="mb-4">
                    The object data generator creates realistic key-value pairs and structured arrays that look like production-ready data.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Versatile Applications</h3>
                  <p className="mb-8">
                    You can create mock array data for forms, dashboards, and APIs, while mock helper functions support educational and training use cases.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">How to Generate Arrays and Objects with FakerBox?</h2>

                  <h3 className="text-xl font-semibold mb-2">Pick Your Fields</h3>
                  <p className="mb-4">
                    Select from fields such as array element, object key, object value, or shuffle array.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Generate Arrays and Objects</h3>
                  <p className="mb-4">
                    Click Generate to create results such as:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Array Element: [“apple”, “banana”, “cherry”]</li>
                    <li>Object Key: username</li>
                    <li>Object Value: johndoe_123</li>
                    <li>Shuffle Array: [“cherry”, “apple”, “banana”]</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Regex Options</h3>
                  <p className="mb-4">
                    Advanced users can apply regex rules to format array elements or object values with custom rules, such as enforcing length or naming conventions.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Save Your Outputs</h3>
                  <p className="mb-8">
                    Copy single arrays and objects for quick testing or export bulk mock array data and mock object data in CSV or JSON formats for large-scale workflows.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Features of the FakerBox Array & Object Data Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Works as both an array data generator and object data generator</li>
                    <li>Create mock array data with randomized outputs</li>
                    <li>Generate mock object data with key-value pairs instantly</li>
                    <li>Supports fake utility data for testing APIs and UI mockups</li>
                    <li>Shuffle arrays to create non-repetitive datasets</li>
                    <li>Works as a base for mock helper functions and dummy helper functions</li>
                    <li>Regex customization for advanced array and object patterns</li>
                    <li>Export datasets in CSV or JSON formats</li>
                    <li>Free and unlimited online tool</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Examples of Mock Array and Object Data</h2>

                  <h3 className="text-xl font-semibold mb-2">Example 1</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Array Element: [“red”, “blue”, “green”]</li>
                    <li>Object Key: email</li>
                    <li>Object Value: user@example.com</li>
                    <li>Shuffle Array: [“blue”, “green”, “red”]</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 2</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Array Element: [“car”, “bike”, “train”]</li>
                    <li>Object Key: role</li>
                    <li>Object Value: admin</li>
                    <li>Shuffle Array: [“train”, “bike”, “car”]</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 3</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Array Element: [“mango”, “pear”, “apple”]</li>
                    <li>Object Key: status</li>
                    <li>Object Value: active</li>
                    <li>Shuffle Array: [“pear”, “apple”, “mango”]</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Benefits of Using FakerBox Array & Object Data Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Generate mock array data instantly without coding effort</li>
                    <li>Create mock object data for APIs and applications</li>
                    <li>Populate testing workflows</li>
                    <li>Provides support for mock helper functions for educational purposes and demonstrations</li>
                    <li>Dummy helper functions allow flexible experimentation</li>
                    <li>Free, online, and unlimited tool for developers</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Array & Object Data for Projects</h2>

                  <h3 className="text-xl font-semibold mb-2">Developers and QA Teams</h3>
                  <p className="mb-4">
                    Use the array data generator to create structured mock data for APIs, dashboards, and testing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Educators and Trainers</h3>
                  <p className="mb-4">
                    Teach programming and data structure concepts with mock object data and fake utility data.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Researchers and Analysts</h3>
                  <p className="mb-4">
                    Simulate experimental datasets using shuffled arrays and key-value pairs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Prototypers and Designers</h3>
                  <p className="mb-4">
                    Fill user interfaces with mock helper functions and dummy helper functions to make prototypes look realistic.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Writers and Creators</h3>
                  <p className="mb-8">
                    Use mock array data to simulate examples in tutorials or technical writing.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">FAQs: Array & Object Data Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">What is an array data generator?</h3>
                  <p className="mb-4">
                    It is a tool that creates arrays of sample data elements for testing and demos.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">What is an object data generator?</h3>
                  <p className="mb-4">
                    It generates mock object data with key-value pairs that resemble real-world structures.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I shuffle arrays with this tool?</h3>
                  <p className="mb-4">
                    Yes, the shuffle array feature creates randomized outputs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Does it generate fake utility data?</h3>
                  <p className="mb-4">
                    Yes, the tool provides fake utility data useful for APIs and dashboards.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">What are mock helper functions?</h3>
                  <p className="mb-4">
                    They are simulated helper functions that developers can use in demos and prototypes.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">What are dummy helper functions?</h3>
                  <p className="mb-4">
                    They are placeholder functions created with mock data for safe testing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Is this tool free?</h3>
                  <p className="mb-4">
                    Yes, the FakerBox array & object data generator is free and unlimited.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Who uses mock array data?</h3>
                  <p>
                    Developers, testers, educators, and designers all use mock array data and mock object data for testing and prototyping.
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
