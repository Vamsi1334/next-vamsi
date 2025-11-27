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
  vehicle: {
    'Vehicle': () => faker.vehicle.vehicle(),
    'Manufacturer': () => faker.vehicle.manufacturer(),
    'Model': () => faker.vehicle.model(),
    'Type': () => faker.vehicle.type(),
    'Fuel': () => faker.vehicle.fuel(),
    'Color': () => faker.vehicle.color(),
    'VIN': () => faker.vehicle.vin(),
    'VRM': () => faker.vehicle.vrm(),
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
    Object.keys(categoryFields['vehicle']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('vehicle');
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
                  Fake Vehicle Data Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Fake vehicle data generator helps you quickly create random car details and vehicle info for testing, demos, or data analysis, no sign-up required.              </p>
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
                        {Object.keys(categoryFields['vehicle']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Fake Vehicle Data Generator?</h2>
                  <p className="mb-4">
                    A fake vehicle data generator is a tool that creates fictional but realistic vehicle details such as:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Vehicle Type (SUV, Sedan, Hatchback)</li>
                    <li>Manufacturer (e.g., Toyota, Ford, BMW)</li>
                    <li>Model (e.g., Accord, Model X, Fiesta)</li>
                    <li>Fuel (Petrol, Diesel, Electric)</li>
                    <li>Color (Blue, Red, Black)</li>
                    <li>VIN (Vehicle Identification Number format)</li>
                    <li>VRM (Vehicle Registration Mark)</li>
                  </ul>
                  <p className="mb-8">
                    Rather than sourcing risky or sensitive real-world data, <span className="font-bold">FakerBox</span> enables you to generate random vehicle information that appears professional and consistent.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use Fake Vehicle Data?</h2>
                  <h3 className="text-xl font-semibold mb-2">Safe Testing Without Real Records</h3>
                  <p className="mb-4">
                    Avoid using actual vehicle records by generating fake vehicle data for QA and demos.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Speed Up Development</h3>
                  <p className="mb-4">
                    Developers can instantly fill forms, databases, and UIs with dummy vehicle data.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Useful for Data Analysis &amp; Training</h3>
                  <p className="mb-4">
                    Analysts and educators can use random vehicle database outputs for simulations and exercises.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Simulate Registrations &amp; Titles</h3>
                  <p className="mb-8">
                    The tool also works like a fake vehicle registration generator and fake vehicle title generator, giving you complete placeholder datasets.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">
                    How to Use the FakerBox Vehicle Data Generator?
                  </h2>
                  <h3 className="text-xl font-semibold mb-2">Step 1: Select Fields</h3>
                  <p className="mb-2">Pick the details you need:</p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Vehicle</li>
                    <li>Manufacturer</li>
                    <li>Model</li>
                    <li>Type</li>
                    <li>Fuel</li>
                    <li>Color</li>
                    <li>VIN</li>
                    <li>VRM</li>
                  </ul>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Generate Random Vehicle Data</h3>
                  <p className="mb-4">
                    Click Generate and instantly receive a structured dataset. Example:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Vehicle: Sedan</li>
                    <li>Manufacturer: Honda</li>
                    <li>Model: Accord LX</li>
                    <li>Type: Passenger Car</li>
                    <li>Fuel: Petrol</li>
                    <li>Color: Silver</li>
                    <li>VIN: 1HGCM82633A123456</li>
                    <li>VRM: AB12 CDE</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Step 3: Export or Copy</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Copy single entries for quick use</li>
                    <li>Download CSV for bulk vehicle datasets</li>
                    <li>Export JSON for developers and APIs</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">
                    Features of the FakerBox Fake Vehicle Data Generator
                  </h2>

                  <h3 className="text-xl font-semibold mb-2">
                    Generate Random Vehicle Data Instantly
                  </h3>
                  <p className="mb-4">
                    Get complete vehicle details — from make and model to VINs and VRMs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">
                    Bulk Dummy Vehicle Data
                  </h3>
                  <p className="mb-4">
                    Create thousands of rows of dummy vehicle data for testing or analysis.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">
                    Fake Vehicle Registration Generator
                  </h3>
                  <p className="mb-4">
                    Simulate realistic vehicle registration marks (VRM) for systems that require plate-like inputs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">
                    Fake Vehicle Title Generator
                  </h3>
                  <p className="mb-4">
                    Produce placeholder vehicle title information for mock DMV or dealership projects.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">
                    Random Vehicle Database Outputs
                  </h3>
                  <p className="mb-4">
                    Export results as a random vehicle database in CSV or JSON formats.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">
                    Free Forever
                  </h3>
                  <p className="mb-8">
                    The FakerBox fake vehicle data generator is always free, with no sign-up.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">
                    Examples of Random Vehicle Data
                  </h2>
                  <p className="mb-4">
                    Here are a few sample dummy vehicle data outputs:
                  </p>
                  <div className="mb-8">
                    <p className="font-semibold">Example 1:</p>
                    <ul className="list-disc list-inside mb-4">
                      <li>Vehicle: SUV</li>
                      <li>Manufacturer: Toyota</li>
                      <li>Model: RAV4 Hybrid</li>
                      <li>Type: Crossover SUV</li>
                      <li>Fuel: Hybrid</li>
                      <li>Color: Blue</li>
                      <li>VIN: JTMBK31V986042731</li>
                      <li>VRM: XY45 PQR</li>
                    </ul>
                    <p className="font-semibold mb-2">Example 2:</p>
                    <ul className="list-disc list-inside mb-4">
                      <li>Vehicle: Hatchback</li>
                      <li>Manufacturer: Ford</li>
                      <li>Model: Fiesta Titanium</li>
                      <li>Type: Passenger Car</li>
                      <li>Fuel: Petrol</li>
                      <li>Color: Red</li>
                      <li>VIN: WF0AXXWPMA MD23456</li>
                      <li>VRM: AB67 DEF</li>
                    </ul>

                    <p className="font-semibold mb-2">Example 3:</p>
                    <ul className="list-disc list-inside">
                      <li>Vehicle: Sedan</li>
                      <li>Manufacturer: Tesla</li>
                      <li>Model: Model 3</li>
                      <li>Type: Electric Car</li>
                      <li>Fuel: Electric</li>
                      <li>Color: White</li>
                      <li>VIN: 5YJ3E1EA7JF012345</li>
                      <li>VRM: EV21 TES</li>
                    </ul>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    Benefits of Using FakerBox Vehicle Generator
                  </h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Instant Results: Generate fake vehicle data in seconds</li>
                    <li>Variety: Covers multiple manufacturers, models, fuel types, and colors</li>
                    <li>Safe &amp; Secure: Avoids using real registration or VIN details</li>
                    <li>Professional Outputs: Structured like real-world vehicle data</li>
                    <li>Scalable: Export a complete random vehicle database for large projects</li>
                    <li>Free Forever: No subscription, no paywalls</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">
                    Fake Vehicle Data Generator for Projects
                  </h2>
                  <h3 className="text-xl font-semibold mb-2">Developers &amp; QA Engineers</h3>
                  <p className="mb-4">
                    Use dummy vehicle data to test registration systems, APIs, and insurance apps.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Data Analysts</h3>
                  <p className="mb-4">
                    Run analytics, reporting, and simulations with random vehicle database exports.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Game Designers</h3>
                  <p className="mb-4">
                    Add random vehicles, models, and colors into simulation or racing games.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Automotive Training Institutes</h3>
                  <p className="mb-4">
                    Teach students using fake vehicle registration generator data instead of sensitive real-world records.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Dealership &amp; Insurance Demos</h3>
                  <p className="mb-8">
                    Use fake vehicle title generator outputs to demonstrate platforms safely.
                  </p>
                  <h2 className="text-2xl font-bold my-4">
                    FAQs: Fake Vehicle Data Generator
                  </h2>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">
                      What is a fake vehicle data generator?
                    </h3>
                    <p>
                      It’s a tool that lets you generate random vehicle data like make, model, VIN, and VRM for safe testing.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">
                      Can I use this as a fake vehicle registration generator?
                    </h3>
                    <p>
                      Yes. The FakerBox tool generates realistic registration marks (VRM).
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">
                      Does it include VINs and titles?
                    </h3>
                    <p>
                      Yes. It works as a fake vehicle title generator, producing structured VIN-like outputs.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">
                      Can I generate dummy vehicle data in bulk?
                    </h3>
                    <p>
                      Yes. You can export large random vehicle databases in CSV or JSON.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Is this tool free?</h3>
                    <p>
                      Yes. The FakerBox fake vehicle data generator is free and unlimited.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Who uses fake vehicle data?</h3>
                    <p>
                      Developers, testers, data analysts, game designers, and trainers use dummy vehicle data for safe testing.
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
