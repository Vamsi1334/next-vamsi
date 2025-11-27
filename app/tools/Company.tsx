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

import Navigation from '../components/Navigation';
import ToolsNav from "../tools/ToolsNav";


const categoryFields = {
  company: {
    'Name': () => faker.company.name(),
    'Catch Phrase': () => faker.company.catchPhrase(),
    'Buzz Phrase': () => faker.company.buzzPhrase(),
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
    Object.keys(categoryFields['company']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('company');
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
                  Generate Fake Company Names in Seconds
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Fake Company Name Generator lets you create unique company names and mock business data in seconds. Speed up your project with ready-to-use, realistic company information.              </p>
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
                        {Object.keys(categoryFields['company']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Fake Company Name Generator?</h2>
                  <p className="mb-4">
                    A fake company name generator creates fictional but realistic-sounding business names along with related details like catch phrases and optional profiles. Instead of manually inventing names, you can use FakerBox to:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate fake company names for mockups, demos, and testing</li>
                    <li>Create random company names that sound authentic across industries</li>
                    <li>Produce fake company profiles with structured fields</li>
                    <li>Experiment with regex patterns for custom name formats</li>
                  </ul>
                  <p className="mb-8">
                    This tool ensures you always have believable, unique, and risk-free company data for any project.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">How to Use the FakerBox Fake Company Generator</h2>
                  <h3 className="text-xl font-semibold mb-2">Step 1: Click Generate</h3>
                  <p className="mb-2">With a single click, you’ll get:</p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Company Name (fictional but professional)</li>
                    <li>Catch Phrase (e.g., “Innovation for Tomorrow”)</li>
                    <li>Buzz Phrase</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Step 2: Customize With Regex Patterns</h3>
                  <p className="mb-2">
                    Need names with specific formats? Use regex to create:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Companies starting with “Tech-”</li>
                    <li>Names limited to 10–15 characters</li>
                    <li>Only alphabetic or alphanumeric outputs</li>
                  </ul>
                  <p className="mb-4">
                    This feature makes FakerBox more flexible than a simple random company name generator.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Step 3: Export & Use Instantly</h3>
                  <p className="mb-2">Once generated, you can:</p>
                  <ul className="list-disc list-inside mb-8">
                    <li>Copy names to your clipboard</li>
                    <li>Download lists in CSV for bulk use</li>
                    <li>Export in JSON for developers and databases</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">
                    Features of the Random Company Name Generator
                  </h2>
                  <h3 className="text-xl font-semibold mb-2">
                    Generate Fake Company Names in Seconds
                  </h3>
                  <p className="mb-4">
                    No brainstorming needed. Get random business names instantly.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">
                    Fake Company Profile Generator
                  </h3>
                  <p className="mb-4">
                    Add credibility with optional fake company profiles that include names, taglines, and structure-ready fields.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">
                    Regex Customization
                  </h3>
                  <p className="mb-4">
                    Use Regex Patterns for advanced control and to create consistent data for forms and automation.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">
                    Unlimited Random Organisation Name Generator
                  </h3>
                  <p className="mb-4">
                    Generate one company name or a list of 1,000+. Scale up for large projects without limits.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">
                    Free &amp; Reliable
                  </h3>
                  <p className="mb-8">
                    The FakerBox fake company information generator is 100% free and built for long-term professional use.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Why Use a Fake Company Generator?</h2>
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Speed Up Development & Testing</h3>
                    <p className="mb-4">
                      Instead of wasting time creating fake data, instantly generate random company names and use them in test environments.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Create Realistic Mockups</h3>
                    <p className="mb-4">
                      Pitch designs and prototypes with believable fake company profiles that make presentations look polished.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Avoid Legal Risks</h3>
                    <p className="mb-4">
                      By using fake company information, you stay safe from accidentally misusing real brands.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Boost Creativity</h3>
                    <p>
                      Stuck on a name idea? The fake company name ideas generator sparks inspiration for startups, side projects, or fictional worlds.
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold my-4">Use Cases for Fake Company Name Generator</h2>
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Random Business Names for Mock Projects</h3>
                    <p className="mb-4">
                      Fill templates, CRMs, or wireframes with random business names that look professional.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Fake Company Profiles for Demos</h3>
                    <p className="mb-4">
                      Create full datasets with names, catchphrases, and more for showcasing apps and websites.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Fiction & Creative Writing</h3>
                    <p className="mb-4">
                      Authors, scriptwriters, and game developers can generate fake company names that fit different industries.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Marketing Personas & Campaigns</h3>
                    <p>
                      Build customer personas and fictional competitors with random organisation names for strategy work.
                    </p>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Random Company Name Generator Examples</h2>
                  <p className="mb-2">
                    Here’s what the <span className="font-bold">FakerBox</span> random company name generator might produce:
                  </p>
                  <ul className="list-disc list-inside mb-8">
                    <li>Name: NovaCore Systems</li>
                    <li>Catch phrase: “Engineering Tomorrow”</li>
                    <li>Buzz phrase</li>
                    <li>Regex Pattern: [A-Z][a-z][5,10] Corp</li>
                    <li>Name: BrightLeaf Analytics</li>
                    <li>Catchphrase: “Data That Delivers”</li>
                    <li>Name: IronWave Manufacturing</li>
                    <li>Catchphrase: “Strength in Every Product”</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Benefits of Using FakerBox Company Name Generator</h2>
                  <ul className="list-disc list-inside mb-4">
                    <li>Time Savings: Generate names in seconds rather than spending hours brainstorming.</li>
                    <li>Scalable Data: Generate hundreds or thousands at once</li>
                    <li>Variety: Endless random company names across industries</li>
                    <li>Professional Results: Names and catchphrases sound credible</li>
                    <li>Free Forever: No sign-up or subscription needed</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Unlimited Free Access</h3>
                  <p className="mb-8">
                    Generate as many random organisation names as you want. No paywalls. No feature locks. No data harvesting. Just a clean, fast, random company name generator, free for everyone across the world.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">FAQs – Fake Company Name Generator</h2>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What is a fake company name generator?</h3>
                    <p>
                      It’s a tool that produces fictional yet realistic-sounding company names and profiles for safe use in projects.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Is it free to generate fake company names?</h3>
                    <p>
                      Yes. The FakerBox random company name generator is 100% free to use.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I generate a list of random company names?</h3>
                    <p>
                      Yes. You can generate one name or bulk lists for testing and mockups.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Does this tool work for creative writing?</h3>
                    <p>
                      Absolutely. Many writers use the fake company name ideas generator to add realism to fiction and scripts.
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">
                      What is the regex pattern option?
                    </h3>
                    <p>
                      It allows you to create company names that follow specific text patterns, ideal for structured testing.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      What are some use cases for fake company names?
                    </h3>
                    <p>
                      Mock data for apps, fictional writing, design prototypes, marketing personas, and QA testing.
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
