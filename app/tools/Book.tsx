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
  book: {
    'Author': () => faker.book.author(),
    'Format': () => faker.book.format(),
    'Genre': () => faker.book.genre(),
    'Publisher': () => faker.book.publisher(),
    'Series': () => faker.book.series(),
    'Title': () => faker.book.title(),
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
    Object.keys(categoryFields['book']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('book');
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
                  Fake Book Data Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Quickly create mock book data and author details with our free fake book data generator to speed up development and testing of library or reading applications.              </p>
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
                        {Object.keys(categoryFields['book']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Fake Book Data Generator?</h2>
                  <p className="mb-4">
                    A fake book data generator is a tool that produces random book data such as titles, genres, publishers, and author names. Instead of creating records manually, you can:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate fake book titles in seconds</li>
                    <li>Use the fake book title generator for writing projects or testing apps</li>
                    <li>Build mock book data for catalogs and reading apps</li>
                    <li>Export sample book data for developers and educators</li>
                  </ul>
                  <p className="mb-8">
                    With <span className="font-bold">FakerBox</span>, you can generate fake book titles and authors together, making it the best option for realistic mockups.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Why Use Mock Book Data?</h2>

                  <h3 className="text-xl font-semibold mb-2">Safe for Testing</h3>
                  <p className="mb-4">
                    Using mock book data avoids the risk of copyright or misuse of real book titles.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Faster Development</h3>
                  <p className="mb-4">
                    Developers can generate random book data instantly without creating datasets manually.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Looks Realistic</h3>
                  <p className="mb-4">
                    Sample book data outputs resemble authentic records, making apps and prototypes look polished.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Supports Multiple Projects</h3>
                  <p className="mb-8">
                    From reading applications to library management systems, fake book data is versatile and useful.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">How to Use the FakerBox Book Data Generator?</h2>
                  <h3 className="text-xl font-semibold mb-2">Step 1: Select Fields</h3>
                  <p className="mb-4">
                    Choose the data points you want:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Author</li>
                    <li>Format</li>
                    <li>Genre</li>
                    <li>Publisher</li>
                    <li>Series</li>
                    <li>Title</li>
                  </ul>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Generate Random Book Data</h3>
                  <p className="mb-4">
                    Click Generate to instantly receive fake book titles and author details. Example:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Title: The Silent Horizon</li>
                    <li>Author: Emily J. Carter</li>
                    <li>Format: Hardcover</li>
                    <li>Genre: Science Fiction</li>
                    <li>Publisher: Northwood Press</li>
                    <li>Series: Horizon Trilogy</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Step 3: Export or Copy</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Copy single records for small projects</li>
                    <li>Export CSV for larger sample book data sets</li>
                    <li>Export JSON for developers and automation</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Features of the FakerBox Fake Book Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">Generate Fake Book Data Instantly</h3>
                  <p className="mb-4">
                    Create fake book titles, authors, and publishers in seconds.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Fake Book Title Generator</h3>
                  <p className="mb-4">
                    Quickly create fake book titles for testing, creative writing, or mockups.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Generate Fake Book Titles and Authors</h3>
                  <p className="mb-4">
                    Get both author and title combinations for realistic outputs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Random Book Data</h3>
                  <p className="mb-4">
                    Each result is unique, delivering variety for catalogs and apps.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Sample Book Data in Bulk</h3>
                  <p className="mb-4">
                    Generate hundreds of records to fill systems during development.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Free and Unlimited</h3>
                  <p className="mb-8">
                    The FakerBox fake book data generator is free to use without restrictions.
                  </p>
                  <h2 className="text-2xl font-bold my-4">Examples of Random Book Data</h2>

                  <h3 className="text-xl font-semibold mb-2">Example 1</h3>
                  <ul className="list-disc list-inside mb-2">
                    <li>Title: Whispers in the Wind</li>
                    <li>Author: Jonathan M. Hale</li>
                    <li>Format: Paperback</li>
                    <li>Genre: Romance</li>
                    <li>Publisher: Oakwood House</li>
                    <li>Series: Whispering Hearts</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 2</h3>
                  <ul className="list-disc list-inside mb-2">
                    <li>Title: Beyond the Edge</li>
                    <li>Author: Sarah K. Monroe</li>
                    <li>Format: eBook</li>
                    <li>Genre: Adventure</li>
                    <li>Publisher: Summit Publishing</li>
                    <li>Series: Explorer’s Saga</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 3</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Title: Midnight Betrayal</li>
                    <li>Author: David R. Stone</li>
                    <li>Format: Hardcover</li>
                    <li>Genre: Thriller</li>
                    <li>Publisher: Ravencrest Books</li>
                    <li>Series: Nightfall Chronicles</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Benefits of Using FakerBox Book Data Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
                  <p className="mb-4">
                    Get fake book titles and author names in seconds.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Professional Output</h3>
                  <p className="mb-4">
                    Data looks authentic enough for realistic catalogs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Safe and Copyright-Free</h3>
                  <p className="mb-4">
                    All generated data is fictional and safe to use.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Scalable for Projects</h3>
                  <p className="mb-4">
                    Generate one record or thousands of sample book data entries.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Creative Inspiration</h3>
                  <p className="mb-8">
                    Writers and creators can use the fake book title generator for ideas.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Fake Book Data for Projects</h2>

                  <h3 className="text-xl font-semibold mb-2">Developers and QA Teams</h3>
                  <p className="mb-4">
                    Use mock book data to test library software, e-commerce sites, or reading apps.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Writers and Creatives</h3>
                  <p className="mb-4">
                    Get inspiration using the fake book title generator for story development.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Educators and Trainers</h3>
                  <p className="mb-4">
                    Teach cataloging or database management with sample book data.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Game Designers</h3>
                  <p className="mb-4">
                    Use fake book titles and authors for immersive storytelling in games.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Researchers and Analysts</h3>
                  <p className="mb-8">
                    Simulate book-related datasets for analysis or academic work.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Responsible Use of Fake Book Data</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>
                      Generated fake book data is fictional and should not replace real bibliographic information.
                    </li>
                    <li>
                      Always use verified records for academic, publishing, or library systems.
                    </li>
                    <li>
                      This tool is designed only for testing, prototyping, and creative exploration.
                    </li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">FAQs: Fake Book Data Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">What is a fake book data generator?</h3>
                  <p className="mb-4">
                    It’s a tool that lets you generate random book data such as titles, authors, publishers, and genres.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I use it as a fake book title generator?</h3>
                  <p className="mb-4">
                    Yes. You can create fake book titles instantly for creative or technical projects.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Does it generate authors too?</h3>
                  <p className="mb-4">
                    Yes. The FakerBox generator produces fake book titles and authors together for more realistic results.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I generate mock book data in bulk?</h3>
                  <p className="mb-4">
                    Yes. You can export large sets of mock book data in CSV or JSON formats.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Is this tool free to use?</h3>
                  <p className="mb-4">
                    Yes. The FakerBox fake book data generator is free forever.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Who uses sample book data?</h3>
                  <p className="mb-4">
                    Developers, educators, writers, and testers use sample book data for design, training, and inspiration.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">What kind of random book data can I generate?</h3>
                  <p>
                    You can generate author names, book titles, genres, formats, publishers, and series names.
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
