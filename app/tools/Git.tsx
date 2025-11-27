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
  git: {
    'Commit Message': () => faker.git.commitMessage(),
    'Branch': () => faker.git.branch(),
    'Commit SHA': () => faker.git.commitSha(),
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
    Object.keys(categoryFields['git']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('git');
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
                  Fake Repository Data Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Simplify development and testing workflows with FakerBox’s Fake Repository Data Generator. Quickly produce realistic git repo structures to accelerate coding platform demos and QA.              </p>
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
                        {Object.keys(categoryFields['git']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Fake Repository Data Generator?</h2>
                  <p className="mb-4">
                    A fake repository data generator is a tool that produces realistic but fictional git repository details. You can use it as a fake git repository generator to:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate fake repository data for testing coding platforms</li>
                    <li>Create dummy git repos for safe QA workflows</li>
                    <li>Produce mock repository data for UI demos and software showcases</li>
                    <li>Export structured datasets for research or prototyping</li>
                  </ul>
                  <p className="mb-8">
                    The FakerBox tool also includes regex options, allowing you to generate commit SHAs or branch names that follow specific patterns.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use Fake Repository Data?</h2>

                  <h3 className="text-xl font-semibold mb-2">Safe for Testing</h3>
                  <p className="mb-4">
                    Using a fake repository ensures no sensitive or private code is exposed during development or demos.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Speeds Up QA Workflows</h3>
                  <p className="mb-4">
                    Developers can generate fake repository data instantly to populate dashboards or commit logs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Looks Realistic</h3>
                  <p className="mb-4">
                    The mock repository generator produces branch names, commit messages, and SHAs that look like real Git data.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Flexible for Multiple Use Cases</h3>
                  <p className="mb-8">
                    Fake repository data is valuable for prototyping coding platforms, teaching Git workflows, and simulating analytics.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">How to Generate Fake Git Repository Data?</h2>

                  <h3 className="text-xl font-semibold mb-2">Pick Output Fields</h3>
                  <p className="mb-4">
                    Choose the type of data you need to generate, such as commit message, branch, or commit SHA.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Generate Fake Repository Data</h3>
                  <p className="mb-4">
                    Click Generate to instantly receive results such as:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Commit Message: “Fix bug in authentication flow”</li>
                    <li>Branch: feature/user-login</li>
                    <li>Commit SHA: e9f5a7c2b134ac98d2e4f37e8df012c1a5bb4f21</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Regex Customization</h3>
                  <p className="mb-4">
                    You can customize results with regex, for example by defining SHA lengths or forcing branch names to start with feature/ or bugfix/.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Save and Share Data</h3>
                  <p className="mb-8">
                    You can copy individual entries for small projects or export large sets of fake repository data as CSV or JSON for integration into testing and automation pipelines.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Features of the FakerBox Fake Git Repository Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Generate fake repository data instantly with commit messages, branches, and SHAs</li>
                    <li>Acts as a simulated Git repository tool useful for training and early-stage prototyping</li>
                    <li>Mock repository data looks realistic and professional for demos</li>
                    <li>Dummy git repos can be created in bulk for larger workflows</li>
                    <li>Regex support for commit SHA formats and branch naming conventions</li>
                    <li>Export outputs in CSV or JSON formats</li>
                    <li>Free forever with unlimited access</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Examples of Mock Repository Data</h2>

                  <h3 className="text-xl font-semibold mb-2">Example 1</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Commit Message: Update README with installation steps</li>
                    <li>Branch: main</li>
                    <li>Commit SHA: 12a9f5c7d62e8f4b987e213acfd1f72b93ab3d45</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 2</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Commit Message: Add search filter for user profiles</li>
                    <li>Branch: feature/search-users</li>
                    <li>Commit SHA: 45f8b21c34de9a2a1f8d674e2f35af8d29bb7e11</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 3</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Commit Message: Resolve merge conflict in payment module</li>
                    <li>Branch: hotfix/payment</li>
                    <li>Commit SHA: f1d2d2f924e986ac86fdf7b36c94bcdf32beec15</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 4</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Commit Message: Implement JWT token validation</li>
                    <li>Branch: feature/auth</li>
                    <li>Commit SHA: 89a7e1f6b5123cc9df142a7a83e9b7d3fa5c9f42</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Benefits of Using FakerBox Repository Data Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Instantly generate fake repository data for testing workflows</li>
                    <li>Safe replacement for real repos in demos and prototyping</li>
                    <li>Random outputs prevent repetitive placeholders in commit history</li>
                    <li>Mock repository data improves the realism of dashboards and logs</li>
                    <li>Dummy git repos can scale to thousands of records for bulk testing</li>
                    <li>Free and unlimited for developers, trainers, and testers</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Fake Repository Data for Projects</h2>

                  <h3 className="text-xl font-semibold mb-2">Developers and QA Engineers</h3>
                  <p className="mb-4">
                    Generate random programming data for commit logs, repos, and dashboards without relying on actual codebases.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Educators and Trainers</h3>
                  <p className="mb-4">
                    Use fake git repository generator outputs to teach branching strategies and commit workflows.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Researchers and Analysts</h3>
                  <p className="mb-4">
                    Simulate repository activity with mock repository data for software engineering research.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Writers and Content Creators</h3>
                  <p className="mb-4">
                    Fill articles, documentation, or tutorials with dummy git repos that look authentic.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Platform Designers</h3>
                  <p className="mb-8">
                    Create UI mockups for coding platforms with mock repo structure generator outputs.
                  </p>
                  <h2 className="text-2xl font-bold my-4">FAQs: Fake Repository Data Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">What is a fake repository data generator?</h3>
                  <p className="mb-4">
                    It is a tool that creates fake repository data including commit messages, branches, and commit SHAs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I use this as a fake git repository generator?</h3>
                  <p className="mb-4">
                    Yes, the FakerBox tool generates dummy git repos that look authentic for safe use.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Does it generate real commits or code?</h3>
                  <p className="mb-4">
                    No, it only generates mock repository data such as metadata fields.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">What is a mock repo structure generator?</h3>
                  <p className="mb-4">
                    It is part of the tool that simulates repo structures with realistic commit and branch outputs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I customize results with regex?</h3>
                  <p className="mb-4">
                    Yes, regex can be used to control branch naming patterns or commit SHA formats.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Is this tool free to use?</h3>
                  <p className="mb-4">
                    Yes, the FakerBox fake repository data generator is completely free and unlimited.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Who uses fake repository data?</h3>
                  <p>
                    Developers, QA testers, trainers, researchers, and writers use mock repository data for testing, teaching, and demos.
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
