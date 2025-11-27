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
  phone: {
    'Phone Number': () => faker.phone.number(),
  },
};

const Phone = ({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) => {
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
    Object.keys(categoryFields['phone']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('phone');
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
                  Free Fake Phone Number Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Fake Phone Number Generator instantly creates realistic, fake phone numbers for personal or professional use. Create up to 5,000 numbers in seconds. Ideal for testing apps, filling forms, or protecting your privacy. No sign-up required.              </p>
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
                        {Object.keys(categoryFields['phone']).map((fieldName) => (
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
                  <h2 className="text-2xl font-bold mb-4">
                    What Is a Fake Phone Number Generator?
                  </h2>
                  <p className="mb-6">
                    A fake phone number generator creates numbers that look authentic but aren’t connected to any telecom carrier. These numbers follow valid numbering formats (country codes, area codes, digit lengths) so they appear realistic in databases, forms, and UIs.
                  </p>
                  <p className="mb-4">This makes them ideal when you need:</p>
                  <ul className="list-disc list-inside mb-8">
                    <li>Placeholders for mobile numbers in apps</li>
                    <li>Test datasets for forms and APIs</li>
                    <li>Dummy data for CRM or ERP systems</li>
                    <li>Realistic numbers for marketing personas</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">
                    How to Use the FakerBox Fake Phone Number Generator
                  </h2>
                  <h3 className="text-xl font-semibold mb-2">
                    Step 1: Choose How Many Numbers You Need
                  </h3>
                  <p className="mb-4">
                    Decide whether you want a single dummy phone number or a bulk fake phone number generator list. You can create up to 5,000 numbers instantly.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">
                    Step 2: Generate Random Phone Numbers
                  </h3>
                  <p className="mb-2">
                    Click Generate, and you’ll instantly see results formatted as:
                  </p>
                  <ul className="list-disc list-inside mb-2">
                    <li>Country code (e.g., +1 for US)</li>
                    <li>Area code (region-specific)</li>
                    <li>Subscriber number (random digits in correct length)</li>
                  </ul>
                  <p className="mb-4">Example output: +1 (312) 555-9273</p>

                  <h3 className="text-xl font-semibold mb-2">
                    Step 3: Copy, Export, or Save
                  </h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Use your numbers right away</li>
                    <li>Copy to clipboard for quick pasting</li>
                    <li>Export CSV for spreadsheets</li>
                    <li>Export JSON for developers and automation scripts</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">
                    Why Use a Random Fake Phone Number Generator?
                  </h2>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Safe Testing & QA</h3>
                    <p className="mb-4">
                      Don’t risk exposing real user data. Generate random phone numbers that fit required formats.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Bulk Data Creation</h3>
                    <p className="mb-4">
                      Need 1,000+ numbers for your test system? <span className="font-bold">FakerBox</span> delivers in seconds.
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Consistency & Structure</h3>
                    <p className="mb-4">
                      Every number follows proper numbering rules, so your app validations don’t fail.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Privacy Protection</h3>
                    <p>
                      Use dummy phone numbers instead of your own when testing or training teams.
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold mb-4">Features of Faker Phone Number Generator</h2>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Generate Random Phone Numbers in Bulk</h3>
                    <p className="mb-4">
                      Create up to 5,000 fake phone numbers online instantly.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">Country-Specific Options</h3>
                    <p className="mb-4">
                      Use the fake American phone number generator to produce US-formatted results, or expand for other locales.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
                    <p className="mb-4">
                      Numbers follow proper patterns with country code, area code, and subscriber digits.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">Export-Ready Data</h3>
                    <p className="mb-4">
                      Easily export data to CSV or JSON formats.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">100% Free, Always</h3>
                    <p className="mb-8">
                      No sign-up. No limits. FakerBox is free for personal and professional projects.
                    </p>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    Fake American(US) Phone Number Generator
                  </h2>
                  <p className="mb-4">
                    Need US-style phone numbers? The fake American number generator provides results like:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Country Code: +1</li>
                    <li>Area Code: Valid US-based digits</li>
                    <li>Subscriber Number: 7-digit random sequence</li>
                  </ul>
                  <p className="mb-4">Example output: +1 (646) 555-8294</p>
                  <p className="mb-8">
                    This makes FakerBox perfect for projects where you need US address and phone pairings or region-specific test data.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">
                    Create a Dummy Phone Number for Any Project
                  </h2>
                  <p className="mb-4">
                    Use FakerBox to create a dummy phone number that looks real but has zero risk. Perfect for:
                  </p>
                  <ul className="list-disc list-inside mb-8">
                    <li>App testing: Populate forms, sign-up flows, and checkout pages</li>
                    <li>Mock datasets: Build CRM or e-commerce records</li>
                    <li>Training demos: Use realistic contacts without breaching privacy</li>
                    <li>Marketing personas: Incorporate realistic phone details for your ideal users.</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">
                    Random Phone Number Generator for Developers
                  </h2>
                  <p className="mb-4">
                    If you’re a developer, the FakerBox phone number generator is designed with you in mind:
                  </p>
                  <ul className="list-disc list-inside mb-8">
                    <li>Generate JSON-ready outputs</li>
                    <li>Integrate with APIs easily</li>
                    <li>Produce bulk datasets for stress testing</li>
                    <li>Validate regex and input sanitizers with formatted phone numbers</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Why FakerBox Is Free (And Always Will Be)</h2>
                  <p className="mb-4">Because time-saving tools should be frictionless.</p>
                  <p className="mb-4">We built FakerBox to help:</p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Developers test faster</li>
                    <li>Designers create better mocks</li>
                    <li>Writers build believable characters</li>
                    <li>Users protect their privacy</li>
                    <li>No paywalls. No feature locks. No data harvesting.</li>
                  </ul>
                  <p className="mb-8">
                    Just a clean, fast, phone number generator — free for everyone.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">FAQs: Fake Phone Number Generator</h2>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What is a fake phone number generator?</h3>
                    <p>
                      It’s a tool that creates random phone numbers that look authentic but aren’t linked to any real telecom carrier.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I generate American numbers?</h3>
                    <p>
                      Yes. The fake American phone number generator produces US-style numbers with country codes, area codes, and subscriber digits.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Do these numbers work for calls or OTP?</h3>
                    <p>
                      No, these are placeholder phone numbers intended for testing and project purposes only. They cannot send or receive calls or SMS.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">How many numbers can I generate at once?</h3>
                    <p>
                      Up to 5,000 numbers in one click. and do the same unlimited times.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I export my list?</h3>
                    <p>
                      Yes. Copy instantly, or download in CSV or JSON format.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Is it free to use?</h3>
                    <p>
                      Yes. FakerBox’s fake phone number generator online is 100% free, forever.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Can I create a dummy phone number for my project?</h3>
                    <p>
                      Absolutely. You can generate random phone numbers for testing apps, forms, CRMs, or any mock dataset.

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

export default Phone;
