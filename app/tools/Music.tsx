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
  music: {
    'Genre': () => faker.music.genre(),
    'Song Name': () => faker.music.songName(),
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
    Object.keys(categoryFields['music']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('music');
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
                  Fake Music Data Generator                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Quickly create mock song information and audio metadata to speed up your music app testing and development processes.
              </p>
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
                        {Object.keys(categoryFields['music']).map((fieldName) => (
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
                  <h2 className="text-2xl font-bold mb-4">What Is a Fake Music Data Generator?</h2>
                  <p className="mb-4">
                    A fake music data generator is a tool that produces mock song information like titles and genres, along with fake audio metadata for testing. Instead of relying on copyrighted tracks or real artist data, you can:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate fake music data for playlists and libraries</li>
                    <li>Create random music data for QA environments</li>
                    <li>Use dummy music data to test search and filtering functions</li>
                    <li>Generate random audio metadata to validate file structures and UI designs</li>
                  </ul>
                  <p className="mb-8">
                    This ensures safe, copyright-free development and smoother testing.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use Fake Music Data?</h2>
                  <h3 className="text-xl font-semibold mb-2">Safe for Testing &amp; Development</h3>
                  <p className="mb-4">
                    Using fake music data means you avoid any legal or licensing issues during prototyping.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Saves Time with Automation</h3>
                  <p className="mb-4">
                    Instead of manually typing test titles and genres, generate fake music data with just one click.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Realistic Song Information</h3>
                  <p className="mb-4">
                    The generated random audio metadata looks authentic, making apps and mockups feel real.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Flexible Across Industries</h3>
                  <p className="mb-8">
                    Whether you’re a developer, designer, or researcher, dummy music data fits multiple workflows.
                  </p>
                  <h2 className="text-2xl font-bold my-4">
                    How to Use the FakerBox Fake Music Generator?
                  </h2>
                  <h3 className="text-xl font-semibold mb-2">Step 1: Select Fields</h3>
                  <p className="mb-4">Choose what you need to generate:</p>
                  <ul className="list-disc list-inside mb-8">
                    <li>Genre (e.g., Jazz, Rock, Classical, Electronic)</li>
                    <li>Song Name (randomly generated titles)</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Step 2: Generate Fake Music Data</h3>
                  <p className="mb-4">
                    Click Generate to instantly receive random music data like:
                  </p>
                  <ul className="list-disc list-inside mb-8">
                    <li>Genre: Rock</li>
                    <li>Song Name: “Whispers in the Dark”</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Step 3: Export or Copy</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Copy single entries for quick tests</li>
                    <li>Export CSV for bulk dummy music data</li>
                    <li>Export JSON for APIs, libraries, or automation</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">
                    Features of the FakerBox Music Data Generator
                  </h2>

                  <h3 className="text-xl font-semibold mb-2">Generate Fake Music Data Instantly</h3>
                  <p className="mb-4">
                    Get song names and genres without needing real tracks.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Random Music Data</h3>
                  <p className="mb-4">
                    Each click gives you random music data for variety and unpredictability.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Dummy Music Data for Testing</h3>
                  <p className="mb-4">
                    Populate your app or platform with dummy music data that feels authentic.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Create Fake Music Data in Bulk</h3>
                  <p className="mb-4">
                    Create extensive sets of fake audio metadata for load testing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Random Audio Metadata</h3>
                  <p className="mb-4">
                    Get random audio metadata such as titles and categories to validate UI and back-end systems.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Free &amp; Unlimited</h3>
                  <p className="mb-8">
                    The FakerBox <span className="font-bold">fake music data generator</span> is free, forever.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Examples of Random Music Data</h2>
                  <p className="mb-4">Here are some sample fake music data outputs:</p>

                  <div className="mb-8">
                    <p className="font-semibold mb-2">Example 1:</p>
                    <ul className="list-disc list-inside mb-4">
                      <li>Genre: Jazz</li>
                      <li>Song Name: “Silent Horizon”</li>
                    </ul>
                    <p className="font-semibold mb-2">Example 2:</p>
                    <ul className="list-disc list-inside mb-4">
                      <li>Genre: Electronic</li>
                      <li>Song Name: “Neon Pulse”</li>
                    </ul>
                    <p className="font-semibold mb-2">Example 3:</p>
                    <ul className="list-disc list-inside mb-4">
                      <li>Genre: Rock</li>
                      <li>Song Name: “Broken Chains”</li>
                    </ul>
                  </div>

                  <h2 className="text-2xl font-bold mb-4">Benefits of Using FakerBox Fake Music Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Instant Results: Quickly generate fake music data for any project</li>
                    <li>Safe &amp; Copyright-Free: No risk of licensing issues</li>
                    <li>Realistic Mockups: Make demos look like real playlists</li>
                    <li>Scalable: Export small or large datasets of dummy music data</li>
                    <li>Developer-Friendly: JSON and CSV outputs for integration</li>
                    <li>Versatile: Works for testing, design, training, or research</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">
                    Fake Music Data for Projects
                  </h2>

                  <h3 className="text-xl font-semibold mb-2">Developers &amp; QA Engineers</h3>
                  <p className="mb-4">
                    Use random music data to test playback queues, sorting, and metadata fields.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Music App Designers</h3>
                  <p className="mb-4">
                    Create mock playlists and interfaces with dummy audio metadata that feels real.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Researchers &amp; Analysts</h3>
                  <p className="mb-4">
                    Simulate datasets with fake music data for training AI models or conducting studies.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Educators &amp; Trainers</h3>
                  <p className="mb-4">
                    Teach music app workflows using fake audio metadata instead of copyrighted data.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Game Developers</h3>
                  <p className="mb-8">
                    Fill in-game soundtracks with random music data for placeholders before adding licensed tracks.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">
                    FAQs: Fake Music Data Generator
                  </h2>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What is a fake music data generator?</h3>
                    <p>
                      It’s a tool that creates fake music data like song names and genres for safe testing.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I generate new random music data?</h3>
                    <p>
                      Yes, <span className="font-bold">FakerBox</span> provides random music data generator with new results each click.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What fields can I generate?</h3>
                    <p>
                      Currently, you can generate Genre and Song Name, with realistic random audio metadata.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Does it create actual songs?</h3>
                    <p>
                      No. This tool only generates fake audio metadata — not playable audio files.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I export dummy music data?</h3>
                    <p>
                      Yes. You can export dummy music data in CSV or JSON formats.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Is this tool free?</h3>
                    <p>
                      Yes. The FakerBox fake music data generator is free to use, forever.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Who uses random audio metadata?</h3>
                    <p>
                      Developers, QA testers, designers, researchers, and educators all use random audio metadata for safe, efficient testing.
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
