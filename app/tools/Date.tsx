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
  date: {
    'Past': () => faker.date.past().toString(),
    'Future': () => faker.date.future().toString(),
    'Soon': () => faker.date.soon().toString(),
    'Recent': () => faker.date.recent().toString(),
    'Month': () => faker.date.month(),
    'Weekday': () => faker.date.weekday(),
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
    Object.keys(categoryFields['date']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('date');
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
                  Free Random Date Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Random Date Generator instantly creates dates, months, years, or time in seconds. Speed up your project, whether it is testing software, creating game events, simulating timelines, or adding unpredictability to projects.               </p>
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
                        {Object.keys(categoryFields['date']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Random Date Generator?</h2>
                  <p className="mb-4">
                    A random date generator is a tool that creates random dates in structured formats (day, month, year, time). Instead of manually picking or calculating dates, you can:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Get random dates instantly</li>
                    <li>Generate random years for simulations</li>
                    <li>Use the random time generator to create hours and minutes</li>
                    <li>Produce random days of the week or specific months</li>
                  </ul>
                  <p className="mb-8">
                    The <span className="font-bold">FakerBox</span> calendar date generator is designed for developers, designers, researchers, and educators who need realistic and diverse outputs.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use a Date Generator?</h2>
                  <h3 className="text-xl font-semibold mb-2">Adds Unpredictability to Projects</h3>
                  <p className="mb-4">
                    The random date generator introduces variety, making testing and games more realistic.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Saves Time During Testing</h3>
                  <p className="mb-4">
                    Developers can get random dates instantly without manual input, ensuring smoother QA cycles.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Works Across Multiple Scenarios</h3>
                  <p className="mb-4">
                    From random year generator outputs for simulations to random month generator results for apps, <span className="font-bold">FakerBox</span> adapts to every use case.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Reduces Human Error</h3>
                  <p className="mb-8">
                    Automated random time generator and random day generator outputs are more accurate and faster than manual methods.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">How to Use the FakerBox Random Date Generator?</h2>

                  <h3 className="text-xl font-semibold mb-2">Step 1: Select Your Date Range</h3>
                  <p className="mb-4">Choose from fields like:</p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Past – Generate historical dates</li>
                    <li>Future – Create predictive timelines</li>
                    <li>Soon – Near-term dates</li>
                    <li>Recent – Dates from the past few weeks</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Step 2: Choose Your Output Format</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate Month (e.g., September, March)</li>
                    <li>Generate Weekday (e.g., Monday, Friday)</li>
                    <li>Generate Year with the random year generator</li>
                    <li>Generate Time with the random time generator</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Step 3: Generate and Export</h3>
                  <p className="mb-2">
                    Click Generate and instantly get outputs like:
                  </p>
                  <pre className="bg-slate-100 p-3 rounded mb-4">
                    {`Date: July 14, 2007
Weekday: Saturday
Time: 15:42:10
Month: November`}
                  </pre>
                  <p className="mb-8">
                    Export results as CSV or JSON for large-scale projects.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">
                    Features of the FakerBox Calendar Date Generator
                  </h2>

                  <h3 className="text-xl font-semibold mb-2">Random Date Generator for Past &amp; Future</h3>
                  <p className="mb-4">
                    Generate random dates from both the past and future, spanning across decades or even centuries.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Random Year Generator</h3>
                  <p className="mb-4">
                    Quickly create years for simulations, research, or time-based models.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Random Time Generator</h3>
                  <p className="mb-4">
                    Add realistic time elements with hours, minutes, and seconds.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Random Day Generator</h3>
                  <p className="mb-4">
                    Pick random weekdays to simulate schedules or events.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Random Month Generator</h3>
                  <p className="mb-4">
                    Produce months like January, July, or December with the random month generator feature.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Bulk Random Dates</h3>
                  <p className="mb-4">
                    Generate hundreds of random dates at once for testing datasets.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Free &amp; Unlimited</h3>
                  <p className="mb-8">
                    The FakerBox date generator is free to use without restrictions.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Examples of Random Dates</h2>
                  <p className="mb-4">
                    Here are a few sample random dates generated with FakerBox:
                  </p>

                  <div className="mb-8">
                    <p className="font-semibold">Example 1:</p>
                    <pre className="bg-slate-100 p-3 rounded mb-4">
                      {`Date: February 12, 1988
Year: 1988
Weekday: Friday
Month: February
Time: 04:23:45`}
                    </pre>

                    <p className="font-semibold">Example 2:</p>
                    <pre className="bg-slate-100 p-3 rounded mb-4">
                      {`Date: August 27, 2029
Year: 2029
Weekday: Monday
Month: August
Time: 22:11:09`}
                    </pre>

                    <p className="font-semibold">Example 3:</p>
                    <pre className="bg-slate-100 p-3 rounded">
                      {`Date: December 3, 2001
Year: 2001
Weekday: Tuesday
Month: December
Time: 10:07:33`}
                    </pre>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Benefits of Using FakerBox Random Date Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Instant Results: Get random dates instantly for projects</li>
                    <li>Versatile Outputs: Generate random years, times, days, and months</li>
                    <li>Save Time: Eliminate manual effort with automated outputs</li>
                    <li>Realistic Data: Perfect for testing, research, and prototyping</li>
                    <li>Scalable: Create bulk random date datasets for QA and automation</li>
                    <li>Free Forever: The FakerBox calendar date generator is completely free</li>
                  </ul>

                  <h2 className="text-2xl font-bold my-4">Random Date Generator for Projects</h2>
                  <h3 className="text-xl font-semibold mb-2">Developers & QA Testers</h3>
                  <p className="mb-4">
                    Utilize random dates to effectively test form inputs, scheduling features, and project timelines.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Game Designers</h3>
                  <p className="mb-4">
                    Add unpredictability by assigning random days and times to in-game events.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Researchers & Analysts</h3>
                  <p className="mb-4">
                    Simulate experiments and projections with random years and timelines.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Educators & Trainers</h3>
                  <p className="mb-4">
                    Teach students using random month generator outputs for calendars and scheduling tasks.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Writers & Creators</h3>
                  <p className="mb-8">
                    Incorporate random dates into storylines, roleplay events, or alternate history scenarios.
                  </p>
                  <h2 className="text-2xl font-bold my-4">FAQs: Random Date Generator</h2>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What is a random date generator?</h3>
                    <p>
                      It is a tool that provides random dates for testing, timelines, and simulations.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I generate random years?</h3>
                    <p>
                      Yes. The random year generator produces years across wide ranges.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Does the tool generate time too?</h3>
                    <p>
                      Yes. The random time generator outputs hours, minutes, and seconds.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I generate weekdays and months?</h3>
                    <p>
                      Yes. The random day generator and random month generator create weekdays and months instantly.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I export random dates?</h3>
                    <p>
                      Yes. Export datasets in CSV or JSON for bulk projects.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Is this tool free?</h3>
                    <p>
                      Yes. The FakerBox date generator is free, unlimited, and always available.
                    </p>
                  </div>
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
