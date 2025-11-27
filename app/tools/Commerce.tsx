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
// Sample category data — replace with your actual


const categoryFields = {
  commerce: {
    'Department': () => faker.commerce.department(),
    'ProductName': () => faker.commerce.productName(),
    'Price': () => faker.commerce.price(),
    'ProductAdjective': () => faker.commerce.productAdjective(),
    'ProductMaterial': () => faker.commerce.productMaterial(),
    'Product': () => faker.commerce.product(),
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
    Object.keys(categoryFields['commerce']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('commerce');
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
                  Fake Product Data & Retail Info Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Fake Product Data Generator lets you create random product names, descriptions, prices, and retail info in seconds. Perfect for testing online stores, building e-commerce demos, or generating sample catalog data.              </p>
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
                        {Object.keys(categoryFields['commerce']).map((fieldName) => (
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
                  <h2 className="text-2xl font-bold mb-4">What Is a Fake Product Data Generator?</h2>
                  <p className="mb-4">
                    A fake product data generator is a tool that creates random product data including fields such as:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Department (e.g., Electronics, Clothing, Furniture)</li>
                    <li>Product Name (e.g., UltraComfort Sofa, SmartWear Watch)</li>
                    <li>Product Adjective (e.g., sleek, durable, premium)</li>
                    <li>Product Material (e.g., leather, steel, cotton)</li>
                    <li>Product (category-specific label)</li>
                    <li>Price (realistic values with currency formatting)</li>
                  </ul>
                  <p className="mb-8">
                    Instead of manually brainstorming product names and details, you can use the <span className="font-bold">FakerBox</span> tool to generate fake product information instantly and at scale.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use Fake Product Data?</h2>
                  <h3 className="text-xl font-semibold mb-2">Speed Up E-Commerce Development</h3>
                  <p className="mb-4">
                    When building an online shop or catalog, you don’t need real inventory yet. Use dummy product data to populate pages and test flows.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Safer Than Real Data</h3>
                  <p className="mb-4">
                    Using real customer or vendor details may cause privacy risks. FakerBox ensures all fake product information is fictional and safe.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Perfect for Testing &amp; QA</h3>
                  <p className="mb-4">
                    Test shopping carts, search filters, or price displays using random product data that looks authentic.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Flexible for Any Industry</h3>
                  <p className="mb-8">
                    From fashion to electronics, you can generate sample retail data across multiple departments.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">How to Use the FakerBox Random Product Data Generator</h2>
                  <h3 className="text-xl font-semibold mb-2">Step 1: Select Fields</h3>
                  <p className="mb-2">Choose the product details you want:</p>
                  <ul className="list-disc list-inside mb-5">
                    <li>Department (e.g., Electronics, Sports, Apparel)</li>
                    <li>Product Name (complete product label)</li>
                    <li>Product Adjective (premium, classic, rugged)</li>
                    <li>Product Material (plastic, steel, cotton)</li>
                    <li>Product (core category name)</li>
                    <li>Price (numerical, realistic values)</li>
                  </ul>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Generate Random Product Data</h3>
                  <p className="mb-2">
                    Click Generate and instantly see a complete fake product profile with a product name, category, and retail price.
                  </p>
                  <p className="mb-4">
                    Example output:
                  </p>
                  <pre className="mb-4 bg-slate-100 p-3 rounded">
                    {`Department: Electronics
Product Name: EcoCharge Solar Power Bank
Price: $49.99
Product Adjective: Portable
Product Material: Aluminum
Product: Power Bank`}
                  </pre>

                  <h3 className="text-xl font-semibold mb-2">Step 3: Copy or Export</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Copy to clipboard for small needs</li>
                    <li>Download CSV for bulk sample retail data</li>
                    <li>Export JSON for developers integrating into apps or APIs</li>
                  </ul>

                  <h2 className="text-2xl font-bold my-4">Features of FakerBox Fake Product Information Generator</h2>
                  <h3 className="text-xl font-semibold mb-2">Generate Realistic Fake Product Data</h3>
                  <p className="mb-4">
                    Get random product names, adjectives, materials, and prices that resemble authentic catalog entries.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Bulk Product Data Generation</h3>
                  <p className="mb-4">
                    Generate multiple products at once — perfect for large sample retail data or dummy product data sets.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Structured Fields</h3>
                  <p className="mb-4">
                    All outputs are organized by field (Department, Product Name, Price, Product Material) for easy integration.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Export Options</h3>
                  <p className="mb-8">
                    Save your random product data in CSV or JSON formats for use in databases, spreadsheets, or code.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Use Cases for Fake Product Data</h2>

                  <h3 className="text-xl font-semibold mb-2">E-Commerce Websites & Demos</h3>
                  <p className="mb-4">
                    Populate shopping carts, product pages, and catalogs with fake product data before adding real inventory.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">API & Database Testing</h3>
                  <p className="mb-4">
                    Developers can use dummy product data to test schema handling, API integrations, and search queries.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">UX/UI Prototyping</h3>
                  <p className="mb-4">
                    Designers can showcase product grids, pricing displays, and detail pages with sample retail data that feels authentic.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Marketing & Training</h3>
                  <p className="mb-4">
                    Use fake product information to build mock campaigns, user personas, or training datasets.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Academic & Research Projects</h3>
                  <p className="mb-8">
                    Students or educators can use random product data generators for coursework, simulations, or prototypes.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Examples of Random Product Data</h2>
                  <p className="mb-4">
                    Here’s how FakerBox might generate random product data:
                  </p>
                  <div className="mb-8">
                    <p className="font-semibold">Product Example 1:</p>
                    <p>Department: Clothing</p>
                    <p>Product Name: LuxeFit Denim Jacket</p>
                    <p>Price: $89.95</p>
                    <p>Product Adjective: Stylish</p>
                    <p>Product Material: Cotton Blend</p>
                    <p className="mb-4">Product: Jacket</p>

                    <p className="font-semibold">Product Example 2:</p>
                    <p>Department: Electronics</p>
                    <p>Product Name: SonicWave Wireless Earbuds</p>
                    <p>Price: $59.99</p>
                    <p>Product Adjective: Compact</p>
                    <p>Product Material: Plastic</p>
                    <p>Product: Earbuds</p>
                  </div>

                  <h2 className="text-2xl font-bold mb-4">Benefits of Using FakerBox Fake Product Generator</h2>
                  <p className="mb-4">
                    Fast &amp; Efficient: Create fake product data in seconds
                  </p>
                  <ul className="list-disc list-inside mb-8">
                    <li>Scalable: Generate one item or thousands of random product data entries</li>
                    <li>Structured &amp; Realistic: Outputs look professional and well-formatted</li>
                    <li>Safe to Use: No real brands, trademarks, or copyrighted names used</li>
                    <li>Free Forever: No subscription or hidden costs</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">FAQs: Fake Product Data Generator</h2>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What is a fake product data generator?</h3>
                    <p>
                      It’s a tool that creates fake product information such as names, categories, and prices for testing and design purposes.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I generate random product data in bulk?</h3>
                    <p>
                      Yes. The FakerBox random product data generator allows you to export large sets in CSV or JSON.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What fields are included in the fake product profiles?</h3>
                    <p>
                      Fields include product name, price/cost, product Adjective, product material, etc.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I use this as sample retail data?</h3>
                    <p>
                      Yes. The FakerBox tool is perfect for creating sample retail data for e-commerce platforms.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What is dummy product data used for?</h3>
                    <p>
                      It’s used to populate shopping carts, catalogs, or test environments when real products aren’t available.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Is this tool free?</h3>
                    <p>
                      Yes. The FakerBox fake product data generator is completely free and unlimited.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Can I export fake product information?</h3>
                    <p>
                      Yes. Copy, download as CSV, or export as JSON for developers and testers.
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
