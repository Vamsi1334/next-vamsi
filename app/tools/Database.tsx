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
  database: {
    'Column': () => faker.database.column(),
    'Type': () => faker.database.type(),
    'Collation': () => faker.database.collation(),
    'Engine': () => faker.database.engine(),
    'MongoDB Object ID': () => faker.database.mongodbObjectId(),
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
    Object.keys(categoryFields['database']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('database');
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
                  Fake Database Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                FakerBox lets you build fake databases and dummy SQL tables with custom columns, types, and engines. Create sample schemas, mock table data, and randomized records for testing, prototyping, and development.
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
                        {Object.keys(categoryFields['database']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Fake Database Generator?</h2>
                  <p className="mb-4">
                    A fake database generator is a tool that creates structured sample database outputs including columns, types, collations, and engines. Developers and testers use it to:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate SQL database structures instantly for testing</li>
                    <li>Create dummy database records for applications</li>
                    <li>Use it as a random database generator to simulate real-world workloads</li>
                  </ul>
                  <p className="mb-8">
                    The FakerBox tool also supports MongoDB Object ID creation, making it flexible for SQL and NoSQL projects.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use a Fake Database?</h2>

                  <h3 className="text-xl font-semibold mb-2">Safe for Development</h3>
                  <p className="mb-4">
                    Using a fake database ensures no sensitive production records are exposed during testing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Faster Testing Workflows</h3>
                  <p className="mb-4">
                    The database generator quickly creates schemas and mock records to speed up QA.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Authentic-Looking Outputs</h3>
                  <p className="mb-4">
                    The random database generator produces tables that emulate the structures of real SQL databases.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Versatile for Multiple Projects</h3>
                  <p className="mb-8">
                    Whether you want to generate SQL database schemas or create MongoDB-style outputs, the tool adapts easily.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">How to Generate a Fake Database?</h2>

                  <h3 className="text-xl font-semibold mb-2">Pick Schema Fields</h3>
                  <p className="mb-4">
                    Choose fields like column name, type, collation, engine, and MongoDB Object ID.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Build Sample Database</h3>
                  <p className="mb-4">
                    Click Generate to instantly create sample records such as:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Column: user_id</li>
                    <li>Type: INT</li>
                    <li>Collation: utf8_general_ci</li>
                    <li>Engine: InnoDB</li>
                    <li>MongoDB Object ID: 64e82ab312de98f2d6f98a4f</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Regex Customization</h3>
                  <p className="mb-4">
                    Apply regex to create specific column naming patterns, enforce length rules, or generate IDs in particular formats.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Save Outputs</h3>
                  <p className="mb-8">
                    Copy small sets for quick testing or export large random database datasets in CSV and JSON formats for integration with apps and workflows.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Features of the FakerBox Database Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Fake database generator for instant schema and record creation</li>
                    <li>Acts as a tool to generate random databases suitable for both small and large-scale testing.</li>
                    <li>Generate SQL database tables with columns, types, and collations</li>
                    <li>AI database generator logic for realistic structured outputs</li>
                    <li>Supports MongoDB Object ID creation for NoSQL simulations</li>
                    <li>Export results in CSV and JSON formats</li>
                    <li>Free, online database maker with unlimited use</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Examples of Random Database Data</h2>

                  <h3 className="text-xl font-semibold mb-2">Example 1</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Column: customer_id</li>
                    <li>Type: BIGINT</li>
                    <li>Collation: utf8_general_ci</li>
                    <li>Engine: InnoDB</li>
                    <li>MongoDB Object ID: 650f82ba12df91c2e8a2b311</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 2</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Column: product_name</li>
                    <li>Type: VARCHAR(255)</li>
                    <li>Collation: utf8_unicode_ci</li>
                    <li>Engine: MyISAM</li>
                    <li>MongoDB Object ID: 64b9e1aa82df1c7e24bc9d87</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 3</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Column: created_at</li>
                    <li>Type: DATETIME</li>
                    <li>Collation: utf8_bin</li>
                    <li>Engine: InnoDB</li>
                    <li>MongoDB Object ID: 6521ae3c8df2317fa3d24c99</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 4</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Column: order_total</li>
                    <li>Type: DECIMAL(10,2)</li>
                    <li>Collation: utf8_general_ci</li>
                    <li>Engine: MEMORY</li>
                    <li>MongoDB Object ID: 653e7af19ccfe2b3ac14a51e</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Benefits of Using FakerBox Fake Database Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Create dummy database tables instantly for development</li>
                    <li>Generate SQL database schemas with realistic formatting</li>
                    <li>Random database generator ensures non-repetitive test data</li>
                    <li>Works as both SQL and NoSQL mock database creator</li>
                    <li>Scalable datasets can handle large projects</li>
                    <li>Free forever and online with no setup needed</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Fake Database Generator for Projects</h2>

                  <h3 className="text-xl font-semibold mb-2">Developers and QA Engineers</h3>
                  <p className="mb-4">
                    Use the fake database generator to test applications, schema validation, and system behavior with sample data.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Database Administrators</h3>
                  <p className="mb-4">
                    Create fake databases for migration practice, schema testing, or optimization drills.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Educators and Trainers</h3>
                  <p className="mb-4">
                    Teach SQL and NoSQL database concepts with dummy database records.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Researchers and Analysts</h3>
                  <p className="mb-4">
                    Generate random database data to simulate workloads and analyze performance.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Designers and Prototypers</h3>
                  <p className="mb-8">
                    Use fake database outputs to power dashboards and app interfaces with authentic-looking structures.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">FAQs: Fake Database Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">What is a fake database generator?</h3>
                  <p className="mb-4">
                    It is a tool that creates fake databases, sample schemas, and dummy SQL tables for safe development and testing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I generate SQL database structures?</h3>
                  <p className="mb-4">
                    Yes, the FakerBox tool works as a database table creator and can generate SQL database outputs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Does it support MongoDB?</h3>
                  <p className="mb-4">
                    Yes, it includes MongoDB Object ID generation for NoSQL projects.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">What is an AI database generator?</h3>
                  <p className="mb-4">
                    It refers to the tool’s ability to generate realistic random database outputs with intelligent patterns.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I use it as an online database maker?</h3>
                  <p className="mb-4">
                    Yes, you can use it as an online database maker to create sample schemas and mock records.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">What is a random database generator?</h3>
                  <p className="mb-4">
                    It produces randomized records and schemas to simulate real-world data for testing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Is this tool free?</h3>
                  <p className="mb-4">
                    Yes, the FakerBox fake database generator is completely free and unlimited.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Who uses fake databases?</h3>
                  <p>
                    Developers, testers, DBAs, educators, and researchers use fake databases for testing, training, and prototyping.
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
