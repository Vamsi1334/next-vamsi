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
  hacker: {
    'Abbreviation': () => faker.hacker.abbreviation(),
    'Adjective': () => faker.hacker.adjective(),
    'Ingverb': () => faker.hacker.ingverb(),
    'Noun': () => faker.hacker.noun(),
    'Phrase': () => faker.hacker.phrase(),
    'Verb': () => faker.hacker.verb(),
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
    Object.keys(categoryFields['hacker']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('hacker');
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
                  Fake Developer Data Generator                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Instantly generate realistic developer phrases, abbreviations, and code-style vocabulary—customizable for QA, demos, or platform prototyping. Flexible field selection and format options help you streamline test data creation and build authentic dev environments faster.              </p>
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
                        {Object.keys(categoryFields['hacker']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Fake Developer Data Generator?</h2>
                  <p className="mb-4">
                    A fake developer data generator is a tool designed to create random programming data such as code-style words, phrases, verbs, and abbreviations. This tool works as a sample programming content generator that enables you to:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate fake developer data for testing QA workflows</li>
                    <li>Create dummy programming metadata for demos or training environments</li>
                    <li>Produce random programming data that looks authentic without being tied to actual codebases</li>
                    <li>Export structured datasets in CSV or JSON for multiple platforms</li>
                  </ul>
                  <p className="mb-8">
                    By using <span className="font-bold">FakerBox</span>, you can create fake developer data that is fast, safe, and scalable.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use Fake Developer Data for Testing?</h2>

                  <h3 className="text-xl font-semibold mb-2">Speeds Up Development and QA</h3>
                  <p className="mb-4">
                    Developers and testers can quickly populate environments with sample programming content instead of writing it manually.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Safe and Secure</h3>
                  <p className="mb-4">
                    Using fake developer data avoids exposing sensitive code or company-specific programming details.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Looks Realistic</h3>
                  <p className="mb-4">
                    The random programming data generated resembles authentic developer vocabulary and makes prototypes feel professional.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Works Across Multiple Scenarios</h3>
                  <p className="mb-8">
                    You can generate dummy programming metadata for apps, platforms, teaching, or research without limitations.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">How to Use the FakerBox Developer Data Generator?</h2>

                  <h3 className="text-xl font-semibold mb-2">Step 1: Select Fields</h3>
                  <p className="mb-4">
                    Choose the fields you want to generate, such as abbreviation, adjective, ingverb, noun, phrase, or verb.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Step 2: Generate Developer Data</h3>
                  <p className="mb-4">
                    Click Generate to instantly receive random programming data such as:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Abbreviation: API</li>
                    <li>Noun: Database</li>
                    <li>Verb: Compile</li>
                    <li>Ingverb: Debugging</li>
                    <li>Phrase: “Refactor legacy code”</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Step 3: Export or Copy</h3>
                  <p className="mb-8">
                    Copy individual developer terms for quick use or export datasets in CSV and JSON formats for integration into QA and testing workflows.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Features of the FakerBox Fake Developer Data Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Generate fake developer data for testing instantly</li>
                    <li>Works as a sample programming content generator with multiple fields</li>
                    <li>Create dummy programming metadata for safe training and development</li>
                    <li>Export your data into CSV or JSON formats</li>
                    <li>Free to use forever with no restrictions</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Examples of Random Programming Data</h2>

                  <h3 className="text-xl font-semibold mb-2">Example 1</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Abbreviation: SDK</li>
                    <li>Adjective: Scalable</li>
                    <li>Ingverb: Compiling</li>
                    <li>Noun: Server</li>
                    <li>Verb: Deploy</li>
                    <li>Phrase: “Optimize the framework”</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 2</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Abbreviation: API</li>
                    <li>Adjective: Modular</li>
                    <li>Ingverb: Debugging</li>
                    <li>Noun: Algorithm</li>
                    <li>Verb: Execute</li>
                    <li>Phrase: “Refactor legacy code”</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 3</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Abbreviation: IDE</li>
                    <li>Adjective: Responsive</li>
                    <li>Ingverb: Testing</li>
                    <li>Noun: Module</li>
                    <li>Verb: Compile</li>
                    <li>Phrase: “Implement secure login”</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Benefits of Using FakerBox Developer Data Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Instantly generate fake developer data for testing platforms and QA (h3)</li>
                    <li>Sample programming content generator provides realistic content for demos (h3)</li>
                    <li>Random programming data ensures variety and prevents repetitive placeholders (h3)</li>
                    <li>Dummy programming metadata helps simulate development workflows safely (h3)</li>
                    <li>Scalable datasets support both small and large development teams (h3)</li>
                    <li>Free and unlimited tool accessible to all developers (h3)</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Fake Developer Data for Projects</h2>

                  <h3 className="text-xl font-semibold mb-2">Developers and QA Engineers</h3>
                  <p className="mb-4">
                    Use fake developer data for testing code editors, platforms, or QA environments.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Educators and Trainers</h3>
                  <p className="mb-4">
                    Generate random programming data for teaching coding principles and classroom practice.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Researchers and Analysts</h3>
                  <p className="mb-4">
                    Create dummy programming metadata to simulate technical datasets without exposing sensitive information.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Writers and Content Creators</h3>
                  <p className="mb-4">
                    Use the sample programming content generator to create authentic-sounding developer terminology for documentation or writing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Prototypers and Designers</h3>
                  <p className="mb-8">
                    Fill mockups and demos with random programming data that makes software interfaces look complete.
                  </p>
                  <h2 className="text-2xl font-bold mb-5">FAQs: Fake Developer Data Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">What is a fake developer data generator?</h3>
                  <p className="mb-4">
                    It is a tool that lets you generate random programming data like abbreviations, phrases, and verbs for safe testing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I use this tool as a sample programming content generator?</h3>
                  <p className="mb-4">
                    Yes, the <span className="font-bold">FakerBox</span> tool creates realistic code-related content for demos and projects.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Does it generate dummy programming metadata?</h3>
                  <p className="mb-4">
                    Yes, the tool allows you to generate dummy programming metadata that looks authentic.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I create random programming data in bulk?</h3>
                  <p className="mb-4">
                    Yes, you can generate large datasets and export them in CSV or JSON formats.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Is this tool free to use?</h3>
                  <p className="mb-4">
                    Yes, the FakerBox fake developer data for testing generator is completely free and unlimited.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Who uses fake developer data?</h3>
                  <p>
                    Developers, QA testers, educators, researchers, and content creators all use random programming data for safe and efficient testing.
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
