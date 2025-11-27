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
  finance: {
    'Account Number': () => faker.finance.accountNumber(),
    'Account Name': () => faker.finance.accountName(),
    'Amount': () => faker.finance.amount(),
    'Transaction Type': () => faker.finance.transactionType(),
    'Currency Code': () => faker.finance.currencyCode(),
    'Currency Name': () => faker.finance.currencyName(),
    'Currency Symbol': () => faker.finance.currencySymbol(),
    'Bitcoin Address': () => faker.finance.bitcoinAddress(),
    'Credit Card Number': () => faker.finance.creditCardNumber(),
    'IBAN': () => faker.finance.iban(),
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
    Object.keys(categoryFields['finance']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('finance');
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
                  Generate Fake Finance & Banking Data
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Simplify testing and development by generating mock financial and bank transaction data instantly. Fast, easy, and highly efficient.              </p>
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
                        {Object.keys(categoryFields['finance']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Fake Finance Data Generator?</h2>
                  <p className="mb-4">
                    A fake finance data generator is a tool that creates mock financial data like account numbers, transaction details, and credit card formats. Instead of using sensitive banking information, you can create fake finance data that looks authentic but carries no risk.
                  </p>
                  <p className="mb-4">
                    The <span className="font-bold">FakerBox</span> tool lets you:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate random finance data instantly</li>
                    <li>Export structured datasets for APIs and databases</li>
                    <li>Simulate transactions with realistic values</li>
                    <li>Use dummy financial data across testing and training environments</li>
                  </ul>
                  <p className="mb-8">
                    This ensures that your financial systems are tested safely, without risking compliance violations or privacy leaks.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use Dummy Financial Data?</h2>
                  <h3 className="text-xl font-semibold mb-2">Protects Real User Information</h3>
                  <p className="mb-4">
                    Using dummy financial data avoids exposing sensitive details like account numbers or IBANs.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Speeds Up Development &amp; Testing</h3>
                  <p className="mb-4">
                    With random finance data, developers can build features without waiting for real inputs.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Provides Realistic Outputs</h3>
                  <p className="mb-4">
                    Generated mock financial data mirrors real-world formats, making UI and system tests reliable.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Works Across Multiple Scenarios</h3>
                  <p className="mb-8">
                    From mobile banking apps to e-commerce systems, fake finance data fits all testing workflows.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">How to Use the FakerBox Fake Finance Generator?</h2>
                  <h3 className="text-xl font-semibold mb-2">Step 1: Select Fields</h3>
                  <p className="mb-2">Choose the data points you need:</p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Account Number</li>
                    <li>Transaction Type</li>
                    <li>Currency Details</li>
                    <li>Credit Card Number</li>
                    <li>IBAN</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Step 2: Generate Fake Finance Data Instantly</h3>
                  <p className="mb-4">
                    Click Generate and get structured outputs immediately. Example:
                  </p>
                  <pre className="bg-slate-100 p-3 rounded mb-4">
                    {`Account Number: 456789102345

Account Name: John M. Smith

Transaction Type: Debit

Amount: $1,250.75

Currency Code: USD

Currency Symbol: $

Credit Card Number: 4532-7412-9834-5610`}
                  </pre>
                  <h3 className="text-xl font-semibold mb-2">Step 3: Export or Copy</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Copy single values quickly</li>
                    <li>Download CSV for sample finance data</li>
                    <li>Export JSON for developers and automation</li>
                  </ul>

                  <h2 className="text-2xl font-bold my-4">
                    Features of the FakerBox Finance Data Generator
                  </h2>
                  <h3 className="text-xl font-semibold mb-2">Generate Random Finance Data</h3>
                  <p className="mb-4">
                    Quickly create random finance data for banking apps, fintech prototypes, or analytics dashboards.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Create Fake Finance Data by Field</h3>
                  <p className="mb-4">
                    Choose fields like credit card number, IBAN, or Bitcoin address for targeted needs.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Generate Mock Financial Data for Testing</h3>
                  <p className="mb-4">
                    Use structured datasets to test payment gateways, validations, and reporting systems.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Currency Simulation</h3>
                  <p className="mb-4">
                    Output includes currency codes (USD, EUR, INR), names, and symbols to support multi-currency workflows.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Bulk Dummy Financial Data</h3>
                  <p className="mb-4">
                    Generate hundreds or thousands of entries of dummy financial data for stress testing.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Free &amp; Unlimited</h3>
                  <p className="mb-8">
                    The FakerBox fake finance data generator is free to use without limits.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Examples of Random Finance Data</h2>
                  <p className="mb-4">
                    Here are a few sample finance data outputs you can generate with FakerBox:
                  </p>
                  <div className="mb-8">
                    <p className="font-semibold">Example 1:</p>
                    <pre className="bg-slate-100 p-3 rounded mb-4">
                      {`Account Number: 302918374562
Account Name: Emily R. Davis
Transaction Type: Credit
Amount: €480.00
Currency Code: EUR
Currency Symbol: €
IBAN: GB29 NWBK 6016 1331 9268 19
Bitcoin Address: 1Az1P1eP5QGefi2DMPTfTL5SLmv7DivfNa`}
                    </pre>
                    <p className="font-semibold">Example 2:</p>
                    <pre className="bg-slate-100 p-3 rounded">
                      {`Account Number: 789654123098
Account Name: Rajesh K. Patel
Transaction Type: Debit
Amount: $2,750.40
Currency Code: USD
Currency Symbol: $
Credit Card Number: 6011-9832-4751-2245
Bitcoin Address: 3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy`}
                    </pre>
                  </div>

                  <h2 className="text-2xl font-bold mb-4">Benefits of Using Fake Finance Data</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Instant Results: Create datasets on demand</li>
                    <li>Safe Testing: No risk of exposing personal finance details</li>
                    <li>Flexible: Generate mock financial data for any industry</li>
                    <li>Professional: Outputs mirror real-world banking formats</li>
                    <li>Scalable: From one record to thousands of dummy financial data entries</li>
                    <li>Reusable: Export in multiple formats anytime you need</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Use Cases for FakerBox Finance Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">Developers & QA Teams</h3>
                  <p className="mb-4">
                    Test APIs, validate inputs, and simulate transactions with random finance data.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">FinTech Startups</h3>
                  <p className="mb-4">
                    Build demos for investors using fake finance data that looks professional.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Banks & Training Institutes</h3>
                  <p className="mb-4">
                    Train staff and students with sample finance data that is safe but realistic.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Designers & Prototypers</h3>
                  <p className="mb-4">
                    Fill dashboards and reports with mock financial data to visualize layouts.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Researchers & Analysts</h3>
                  <p className="mb-8">
                    Use dummy financial data in studies without breaching privacy.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">FAQs: Fake Finance Data Generator</h2>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">
                      What is a fake finance data generator?
                    </h3>
                    <p>
                      It’s a tool that creates random finance data like account numbers, credit cards, and IBANs for testing and demos.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">
                      Can I create dummy financial data for my project?
                    </h3>
                    <p>
                      Yes. The FakerBox tool lets you create fake finance data tailored to your fields.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">
                      Is this tool free to use?
                    </h3>
                    <p>
                      Yes. The FakerBox mock financial data generator is free forever.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">
                      What kind of sample finance data can I generate?
                    </h3>
                    <p>
                      You can generate account numbers, names, amounts, transaction types, currency details, Bitcoin addresses, credit card numbers, and IBANs.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">
                      Can I export the data?
                    </h3>
                    <p>
                      Yes. Copy instantly, or export to CSV and JSON for bulk use.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Is it safe to use fake finance data?
                    </h3>
                    <p>
                      Yes. All outputs are fictional and safe to use in apps, prototypes, or research.
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
