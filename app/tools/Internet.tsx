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
  internet: {
    'Email': () => faker.internet.email(),
    'Example Email': () => faker.internet.exampleEmail(),
    'User Name': () => faker.internet.username(),
    'Protocol': () => faker.internet.protocol(),
    'URL': () => faker.internet.url(),
    'Domain Name': () => faker.internet.domainName(),
    'Domain Suffix': () => faker.internet.domainSuffix(),
    'Domain Word': () => faker.internet.domainWord(),
    'IP': () => faker.internet.ip(),
    'IPv6': () => faker.internet.ipv6(),
    'Mac': () => faker.internet.mac(),
    'Password': () => faker.internet.password(),
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
    Object.keys(categoryFields['internet']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('internet');
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
                  Random Email Generator: Copy & Paste
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Generate random fake email addresses instantly for testing apps, form submissions, signups, or privacy protection. Forever free.              </p>
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
                        {Object.keys(categoryFields['internet']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Fake Email Address Generator?</h2>
                  <p className="mb-4">
                    A fake email address generator is a Fakerbox tool designed to create fake email addresses that resemble genuine email formats. These addresses are useful for various purposes, including testing applications, maintaining privacy, or avoiding spam.
                  </p>
                  <p className="mb-2">You get structured outputs like:</p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Email (complete fake email address)</li>
                    <li>Example Email</li>
                    <li>User Name</li>
                    <li>Domain Name</li>
                    <li>Domain Suffix</li>
                    <li>Domain Word</li>
                    <li>Password</li>
                  </ul>
                  <p className="mb-8">
                    This makes <span className="font-bold">FakerBox</span> the best fake email generator for projects where you need test-ready data.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use a Random Fake Email Address Generator?</h2>

                  <h3 className="text-xl font-semibold mb-2">Safe Testing for Developers & QA</h3>
                  <p className="mb-4">
                    Don’t use your personal email in test databases. Instead, utilize a random fake email generator to instantly create addresses like user123@mockmail.com.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Protect Your Privacy</h3>
                  <p className="mb-4">
                    Need to fill a form but don’t want to give out personal info? The dummy email address generator keeps your data safe.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Bulk Data for Automation</h3>
                  <p className="mb-4">
                    Utilize the fake email list generator to rapidly create thousands of fake email addresses for stress-testing applications or filling mock CRMs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Realism Without Risk</h3>
                  <p className="mb-8">
                    These generated emails appear authentic, complete with credible usernames, domains, suffixes, and even passwords, yet they are completely fictitious.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">
                    How to Use the FakerBox Fake Email Generator (3 Simple Steps)
                  </h2>
                  <h3 className="text-xl font-semibold mb-2">
                    Step 1: Click “Generate” for Instant Fake Email IDs
                  </h3>
                  <p className="mb-4">
                    One click is all it takes. FakerBox will produce a random email address complete with:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>User Name (e.g., john.smith89)</li>
                    <li>Domain Name (e.g., mailhost, example)</li>
                    <li>Domain Suffix (.com, .net, .org, etc.)</li>
                    <li>Password (randomized for realism)</li>
                  </ul>
                  <p className="mb-4">
                    Example output: alex.martinez@dataworld.org
                  </p>

                  <h3 className="text-xl font-semibold mb-2">
                    Step 2: Customize with Fields or Regex
                  </h3>
                  <p className="mb-4">
                    Want control? Choose fields or use regex to create fake email addresses that fit your project:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Names starting with a specific letter (e.g., sarah@...)</li>
                    <li>Company-themed emails like hr@faketechcorp.com</li>
                    <li>Bulk fake business email generator output for B2B mockups</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">
                    Step 3: Export & Reuse Instantly
                  </h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Copy to clipboard for one-off use</li>
                    <li>Download CSV for datasets</li>
                    <li>Export JSON for APIs and automation pipelines</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Features of FakerBox Fake Email Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">Generate Fake Email IDs in Seconds</h3>
                  <p className="mb-4">
                    No waiting. Just click and get a new fake email ID generator output every time.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Bulk Fake Email List Generator</h3>
                  <p className="mb-4">
                    Create thousands of emails in one go. Perfect for QA, automation, or data-heavy projects.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Customization with Regex</h3>
                  <p className="mb-4">
                    Use patterns to generate company-like or industry-specific emails. Ideal for fake company email generator use cases.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Multiple Domain Options</h3>
                  <p className="mb-4">
                    Generate with random domains, suffixes, and usernames to keep your datasets diverse.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Fake Business Email Generator</h3>
                  <p className="mb-4">
                    Simulate professional corporate emails (e.g., support@mockenterprise.com) for realistic personas.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Free Forever</h3>
                  <p className="mb-8">
                    The FakerBox fake email generator AI free edition is available to everyone. No hidden charges.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">
                    Types of Fake Email Generators on FakerBox
                  </h2>
                  <h3 className="text-xl font-semibold mb-2">
                    Fake Email ID Generator
                  </h3>
                  <p className="mb-4">
                    Produces structured email IDs like emma.green@mocksolutions.com.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">
                    Fake Company Email Generator
                  </h3>
                  <p className="mb-4">
                    Simulates organization-style emails, e.g., hr@fakeycorp.net.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">
                    Fake Custom Email Generator
                  </h3>
                  <p className="mb-4">
                    Use regex or filters to create custom formats, e.g., specific domains, initials, or suffixes.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">
                    Random Fake Email Address Generator
                  </h3>
                  <p className="mb-8">
                    Default mode creates diverse outputs that resemble real-world randomness.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">
                    Use Cases for Random Email Generator
                  </h2>
                  <h3 className="text-xl font-semibold mb-2">
                    Developers & QA Teams
                  </h3>
                  <p className="mb-4">
                    Populate test databases with dummy email addresses. Ensure apps handle email fields correctly.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">
                    Designers & Prototypers
                  </h3>
                  <p className="mb-4">
                    Build realistic sign-up flows, user profiles, and dashboards using random email addresses.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">
                    Writers & Content Creators
                  </h3>
                  <p className="mb-4">
                    Add realism to fictional characters with bogus email addresses that look valid.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">
                    Trainers & Educators
                  </h3>
                  <p className="mb-4">
                    Teach database management, regex, or input validation with ready-to-use fake email lists.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Marketers &amp; Business Analysts</h3>
                  <p className="mb-4">
                    Create fake business emails to simulate user personas or campaign scenarios.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Fake Email Generator AI Free, Smarter Results</h3>
                  <p className="mb-2">
                    The FakerBox AI fake email generator uses structured logic to create realistic-looking data that resembles human-created accounts. Unlike generic tools, our system ensures:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Usernames look natural (e.g., michael.lee91)</li>
                    <li>Domains are varied but valid (e.g., inbox.net, fastmail.org)</li>
                    <li>Passwords are strong and randomized</li>
                    <li>Suffixes (.com, .net, .org, .io) follow real usage patterns</li>
                  </ul>
                  <p className="mb-8">
                    That’s why it’s the best fake email generator free for professional work.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Use Cases: Who Uses Fake Email Addresses?</h2>
                  <p className="mb-4">
                    This isn’t just for developers. Real professionals rely on FakerBox daily.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">App &amp; Web Developers</h3>
                  <p className="mb-2">Seed databases with real-looking contact data.</p>
                  <p className="mb-2">Test:</p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Email input validation</li>
                    <li>Regex patterns</li>
                    <li>Form error handling</li>
                    <li>API payload structure</li>
                    <li>Without risking real PII.</li>
                  </ul>
                  <h3 className="text-xl font-semibold mb-2">QA &amp; Automation Engineers</h3>
                  <p className="mb-4">
                    Feed dummy email addresses into Selenium, Cypress, or Playwright scripts.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">UI/UX Designers</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Replace “user@example.com” with realistic, varied emails in mockups.</li>
                    <li>Makes prototypes feel lived-in — not fake.</li>
                    <li>Clients notice the difference.</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Privacy-Conscious Users</h3>
                  <p className="mb-2">
                    Protect your real email when signing up for:
                  </p>
                  <ul className="list-disc list-inside mb-8">
                    <li>Free trials</li>
                    <li>Newsletters</li>
                    <li>Online forums</li>
                    <li>App downloads</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">FAQs: Fake Email Generator</h2>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What is a fake email address generator?</h3>
                    <p>
                      It’s a tool that creates random fake email addresses for safe use in projects, without exposing real data.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can these fake emails receive OTP or login?</h3>
                    <p>
                      No. The FakerBox fake email generator does not create real inboxes. They are dummy addresses only.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I generate fake business emails?</h3>
                    <p>
                      Yes. The fake business email generator can produce professional-looking emails.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I export a fake email list?</h3>
                    <p>
                      Yes. Use the fake email list generator to export CSV or JSON files.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Is this the best fake email generator online?</h3>
                    <p>
                      Yes. FakerBox is widely trusted because it’s fast, free, and allows bulk generation with customizable fields.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Is this free to use?</h3>
                    <p>
                      Yes. The FakerBox fake email generator free is available forever, no sign-up required.

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
