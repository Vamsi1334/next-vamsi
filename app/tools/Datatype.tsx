'use client'

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
  datatype: {
    'Boolean': () => faker.datatype.boolean().toString(),
    'Number': () => faker.number.int().toString(),
    'Float': () => faker.number.float().toString(),
    'Big Int': () => faker.number.bigInt().toString(),
    'UUID': () => faker.string.uuid(),
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
    Object.keys(categoryFields['datatype']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('datatype');
    setSelectedFields(initial);
  }, []);

  return (
    <>
      <Head>
        <title>Data Type Generator | Mock Primitive & Structured Data</title>
        <meta
          name="description"
          content="Create mock primitive values and sample structured data for testing databases, APIs, and apps. Free online data type generator for developers and QA teams."
        />
      </Head>

      <div className="min-h-screen">
        <Navigation />

        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <h1 className={`${sizeClasses[size]} font-bold text-gray-900`}>
                  Fake Data Type Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Generate mock primitive data types, sample structured values, and realistic database column types for software testing. Flexible, developer-ready, and free online.</p>
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
                        {Object.keys(categoryFields['datatype']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Fake Data Type Generator?</h2>
                  <p className="mb-4">
                    A fake data type generator is a tool that produces mock primitive values and structured sample data for development and QA. It works as both a mock primitive data generator and a sample structured data generator. Developers and testers can use it to:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate mock primitive values for unit testing</li>
                    <li>Create structured datasets for prototyping or demos</li>
                    <li>Simulate fake database column types for schema testing</li>
                    <li>Export sample structured data for use across platforms</li>
                  </ul>
                  <p className="mb-8">
                    This makes the FakerBox tool ideal for building reliable test environments without exposing real production data.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use Mock Primitive Data?</h2>

                  <h3 className="text-xl font-semibold mb-2">Safe for Testing</h3>
                  <p className="mb-4">
                    Fake database column types generator results let you simulate data without depending on live databases.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Saves Development Time</h3>
                  <p className="mb-4">
                    Instead of writing manual entries, the data type generator produces values instantly.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Realistic Results</h3>
                  <p className="mb-4">
                    Mock primitive data generator outputs resemble authentic system values like UUIDs or floats.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Flexible Applications</h3>
                  <p className="mb-8">
                    Use it for demos, prototypes, APIs, and database schema validations.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">How to Generate Sample Data Types?</h2>

                  <h3 className="text-xl font-semibold mb-2">Choose Your Data Fields</h3>
                  <p className="mb-4">
                    Pick from options like Boolean, Number, Float, Big Int, or UUID depending on your testing needs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Create Sample Primitive Values</h3>
                  <p className="mb-4">
                    Click Generate to receive realistic random results such as:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Boolean: true</li>
                    <li>Number: 2345</li>
                    <li>Float: 12.4567</li>
                    <li>Big Int: 82937498237498234</li>
                    <li>UUID: 550e8400-e29b-41d4-a716-446655440000</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Regex Options</h3>
                  <p className="mb-4">
                    Advanced users can apply regex patterns to control formats, for example ensuring UUIDs follow specific versions or number ranges are within defined limits.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Download Outputs</h3>
                  <p className="mb-8">
                    Copy single results quickly, or export bulk outputs in CSV and JSON formats for integration into apps, tests, or research environments.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Features of the FakerBox Data Type Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Generate mock primitive data instantly for testing</li>
                    <li>Works as a mock primitive data generator with booleans, floats, and integers</li>
                    <li>Create sample structured data with UUIDs and column-like outputs</li>
                    <li>Fake database column types generator produces realistic schema values</li>
                    <li>Regex support for custom formatting and validation</li>
                    <li>Export as CSV or JSON for scalable workflows</li>
                    <li>Free and unlimited online tool</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Examples of Random Data Types</h2>

                  <h3 className="text-xl font-semibold mb-2">Example 1</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Boolean: false</li>
                    <li>Number: 984</li>
                    <li>Float: 23.456</li>
                    <li>Big Int: 49823749823749823</li>
                    <li>UUID: 123e4567-e89b-12d3-a456-426614174000</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 2</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Boolean: true</li>
                    <li>Number: 56</li>
                    <li>Float: 345.7894</li>
                    <li>Big Int: 90384938273904823</li>
                    <li>UUID: 550e8400-e29b-41d4-a716-446655440111</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 3</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Boolean: false</li>
                    <li>Number: 6789</li>
                    <li>Float: 0.2359</li>
                    <li>Big Int: 129384719283746281</li>
                    <li>UUID: 6ba7b810-9dad-11d1-80b4-00c04fd430c8</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Benefits of Using FakerBox Fake Data Type Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Generate mock primitive values for unit testing instantly</li>
                    <li>Sample structured data generator provides consistent results</li>
                    <li>Fake database column types generator simulates schema-level testing</li>
                    <li>Random outputs ensure variety across datasets</li>
                    <li>Saves time for developers, QA testers, and database admins</li>
                    <li>Free and unlimited usage for all projects</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Fake Data Types for Projects</h2>

                  <h3 className="text-xl font-semibold mb-2">Developers and Test Engineers</h3>
                  <p className="mb-4">
                    Use the data type generator to populate APIs and input fields with mock primitive data.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Database Administrators</h3>
                  <p className="mb-4">
                    Simulate fake database column types for schema tests and migration exercises.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Educators and Trainers</h3>
                  <p className="mb-4">
                    Teach database and coding concepts with sample structured data.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Researchers and Analysts</h3>
                  <p className="mb-4">
                    Generate safe random values for experiments, reports, or simulations.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Designers and Prototypers</h3>
                  <p className="mb-8">
                    Use dummy data in mockups or UX testing scenarios.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Responsible Use of Fake Data Types</h2>
                  <p className="mb-8">
                    Generated sample structured data is fictional and must not replace actual system records. The FakerBox data type generator is intended for safe testing, education, and demos only.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">FAQs: Fake Data Type Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">What is a data type generator?</h3>
                  <p className="mb-4">
                    It is a tool that produces mock primitive data such as booleans, numbers, floats, big integers, and UUIDs for testing and development.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I generate sample structured data?</h3>
                  <p className="mb-4">
                    Yes, the FakerBox tool works as a sample structured data generator for unit testing and schema demos.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Does it act as a mock primitive data generator?</h3>
                  <p className="mb-4">
                    Yes, it generates sample primitive values like true/false, integers, and floats.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">What is a fake database column types generator?</h3>
                  <p className="mb-4">
                    It simulates realistic database values like big integers or UUIDs for safe testing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I control the outputs with regex?</h3>
                  <p className="mb-4">
                    Yes, regex allows you to format numbers, floats, or UUIDs to meet custom rules.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Is this tool free?</h3>
                  <p className="mb-4">
                    Yes, the FakerBox data type generator is completely free and unlimited.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Who uses fake data types?</h3>
                  <p>
                    Fake data types are widely used by developers, testers, database administrators, educators, and researchers for testing and learning purposes.
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
