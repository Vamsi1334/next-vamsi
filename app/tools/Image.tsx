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
  image: {
    'URL': () => faker.image.url(),
    'Avatar URL': () => faker.image.avatar(),
    'Data URI': () => faker.image.dataUri(),
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
    Object.keys(categoryFields['image']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('image');
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
                  Fake Image URL Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Generate fake image URLs and mock photo data for testing and design. Instantly get sample visual links for media, UI, and development workflows.              </p>
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
                        {Object.keys(categoryFields['image']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Fake Image URL Generator?</h2>
                  <p className="mb-4">
                    A fake image URL generator is a tool that creates fake image URLs for placeholders, mockups, and testing environments. Rather than providing actual pictures, it delivers links and URIs that can be used in code or designs. You can:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate random image URL outputs for testing image fields</li>
                    <li>Use avatar URL options to simulate user profile pictures</li>
                    <li>Create mock photo data for website or app designs</li>
                    <li>Export fake image URLs in bulk for system-wide integration</li>
                  </ul>
                  <p className="mb-8">
                    This makes it an essential tool for testing projects that require media content without handling real images.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use Fake Image URLs?</h2>

                  <h3 className="text-xl font-semibold mb-2">Safe for Testing</h3>
                  <p className="mb-4">
                    By using fake image URLs, you don’t have to deal with sensitive or licensed image files.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Speeds Up Development</h3>
                  <p className="mb-4">
                    Developers can generate random image URLs instantly to test UI layouts or database fields.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Looks Realistic</h3>
                  <p className="mb-4">
                    Mock photo data resembles authentic image links, making designs look polished.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Flexible for Multiple Projects</h3>
                  <p className="mb-8">
                    You can generate random image URL datasets for web development, mobile apps, or research simulations.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">How to Generate Fake Image URLs?</h2>

                  <h3 className="text-xl font-semibold mb-2">Select Data Fields</h3>
                  <p className="mb-4">
                    Choose what you want to generate: URL, Avatar URL, or Data URI.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Generate Mock Photo Data</h3>
                  <p className="mb-4">
                    Click Generate to receive results such as:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>URL: https://fakerbox.com/images/sample_1.jpg</li>
                    <li>Avatar URL: https://fakerbox.com/avatars/user_45.png</li>
                    <li>Data URI: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA…</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Regex Customization</h3>
                  <p className="mb-4">
                    Advanced users can apply regex rules to structure fake image URLs in specific formats, such as naming conventions or file extensions.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Save and Reuse Outputs</h3>
                  <p className="mb-8">
                    Copy single fake image URLs or export random image URL datasets in CSV or JSON for larger projects.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Features of the FakerBox Fake Image URL Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Generate fake image URLs instantly for media and UI testing</li>
                    <li>Create avatar URL links for profile mockups</li>
                    <li>Provide mock photo data using Data URI format</li>
                    <li>Random image URL outputs ensure unique results</li>
                    <li>Regex support for controlling URL structure and file type</li>
                    <li>Export datasets in CSV and JSON formats</li>
                    <li>Free and unlimited tool with no restrictions</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Examples of Random Image URL Data</h2>

                  <h3 className="text-xl font-semibold mb-2">Example 1</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>URL: https://fakerbox.com/images/product_123.jpg</li>
                    <li>Avatar URL: https://fakerbox.com/avatars/avatar_88.png</li>
                    <li>Data URI: data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ…</li>
                  </ul>
                  <h3 className="text-xl font-semibold mb-2">Example 2</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>URL: https://fakerbox.com/images/banner_45.png</li>
                    <li>Avatar URL: https://fakerbox.com/avatars/user_24.jpg</li>
                    <li>Data URI: data:image/png;base64,iVBORw0KGgoAAAANSUhEUg…</li>
                  </ul>
                  <h3 className="text-xl font-semibold mb-2">Example 3</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>URL: https://fakerbox.com/images/cover_567.jpeg</li>
                    <li>Avatar URL: https://fakerbox.com/avatars/profile_12.png</li>
                    <li>Data URI: data:image/svg+xml;base64,PHN2ZyB4bWxu…</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Benefits of Using FakerBox Fake Image URL Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Quickly generate fake image URLs without storing real files</li>
                    <li>Random image URL outputs save time in prototyping</li>
                    <li>Avatar URL support is perfect for user profile mockups</li>
                    <li>Mock photo data works seamlessly in UI testing</li>
                    <li>Exportable datasets make it scalable for large projects</li>
                    <li>Always free and available online</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Fake Image URLs for Projects</h2>

                  <h3 className="text-xl font-semibold mb-2">Developers and QA Testers</h3>
                  <p className="mb-4">
                    Create random image URLs to test software, APIs, and form inputs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Web Designers</h3>
                  <p className="mb-4">
                    Use fake image URLs to make layouts and templates look realistic.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Educators and Trainers</h3>
                  <p className="mb-4">
                    Teach UI, HTML, or media handling with mock photo data.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Researchers and Analysts</h3>
                  <p className="mb-4">
                    Use random image URL datasets to simulate visual datasets.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">App Prototypers</h3>
                  <p className="mb-8">
                    Fill design mockups with avatar URL and Data URI placeholders.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">FAQs: Fake Image URL Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">What is a fake image URL generator?</h3>
                  <p className="mb-4">
                    It is a tool that generates fake image URLs, avatar URLs, and Data URIs for testing and design.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Does it generate actual images?</h3>
                  <p className="mb-4">
                    No, the tool only produces fake image URLs and mock photo data, not real pictures.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">What is mock photo data?</h3>
                  <p className="mb-4">
                    It refers to fake image URL links and Data URIs that act as placeholders in apps and designs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I customize outputs with regex?</h3>
                  <p className="mb-4">
                    Yes, regex allows you to structure URLs or file formats in specific ways.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Is this tool free to use?</h3>
                  <p className="mb-4">
                    Yes, the FakerBox fake image URL generator is free and unlimited.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Who uses fake image URLs?</h3>
                  <p>
                    Developers, testers, educators, and designers use fake image URLs for safe and scalable projects.
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
