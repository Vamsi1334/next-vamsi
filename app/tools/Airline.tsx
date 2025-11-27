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
  airline: {
    'Aircraft Type': () => faker.airline.aircraftType(),
    'Airline': () => faker.airline.airline(),
    'Airplane': () => faker.airline.airplane(),
    'Airport': () => faker.airline.airport(),
    'Flight Number': () => faker.airline.flightNumber(),
    'Record Locator': () => faker.airline.recordLocator(),
    'Seat': () => faker.airline.seat(),
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
    Object.keys(categoryFields['airline']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('airline');
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
                  Generate Fake Flight & Airline Data Instantly                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Save time and streamline travel app or site testing by instantly generating fake flight and airline data for your projects and demos.               </p>
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
                        {Object.keys(categoryFields['airline']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Fake Flight Data Generator?</h2>
                  <p className="mb-4">
                    A fake flight data generator is a tool that produces random flight data like aircraft types, airline names, and record locators. Instead of pulling real airline schedules or exposing sensitive data, you can:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate fake flight data instantly</li>
                    <li>Create dummy airline data for system testing</li>
                    <li>Use random flight data for prototyping travel booking apps</li>
                  </ul>
                  <p className="mb-8">
                    The <span className="font-bold">FakerBox</span> tool also works as a fake airline name generator, giving you fictional airline names that look professional without using real-world carriers.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use Fake Flight Data?</h2>
                  <h3 className="text-xl font-semibold mb-2">Safe for Testing</h3>
                  <p className="mb-4">
                    Using fake flight data avoids exposing real customer or airline records.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Saves Development Time</h3>
                  <p className="mb-4">
                    Instead of creating mock records manually, simply generate flight data automatically.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Looks Realistic</h3>
                  <p className="mb-4">
                    The generated dummy flight data includes fields like seat numbers, flight numbers, and airline names.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Versatile Across Travel Platforms</h3>
                  <p className="mb-8">
                    Whether you’re building booking apps, dashboards, or reporting tools, FakerBox helps you create fake flight data quickly.
                  </p>
                  <h2 className="text-2xl font-bold my-4">
                    How to Use the FakerBox Flight Data Generator?
                  </h2>
                  <h3 className="text-xl font-semibold mb-2">Step 1: Select Fields</h3>
                  <p className="mb-2">Choose what you want to generate:</p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Aircraft Type</li>
                    <li>Airline</li>
                    <li>Airplane</li>
                    <li>Airport</li>
                    <li>Flight Number</li>
                    <li>Record Locator</li>
                    <li>Seat</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Step 2: Generate Fake Flight Data</h3>
                  <p className="mb-2">
                    Click Generate and get structured random flight data such as:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Aircraft Type: Airbus A320</li>
                    <li>Airline: SkyJet Airways</li>
                    <li>Airplane: SJ203</li>
                    <li>Airport: JFK International</li>
                    <li>Flight Number: SJ4592</li>
                    <li>Record Locator: X9TQ7L</li>
                    <li>Seat: 14A</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Step 3: Export or Copy</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Copy individual entries for small tasks</li>
                    <li>Export CSV for bulk dummy flight data</li>
                    <li>Export JSON for developer integration</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">
                    Features of the FakerBox Fake Flight Data Generator
                  </h2>

                  <h3 className="text-xl font-semibold mb-2">Generate Fake Flight Data Instantly</h3>
                  <p className="mb-4">
                    Get structured datasets in seconds.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Fake Airline Name Generator</h3>
                  <p className="mb-4">
                    Produce fictional yet professional airline names for mock booking systems.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Random Flight Data</h3>
                  <p className="mb-4">
                    Each result is unique, giving you realistic variation.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Dummy Airline Data &amp; Flight Details</h3>
                  <p className="mb-4">
                    Simulate seat assignments, record locators, and flight numbers.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Create Fake Flight Data in Bulk</h3>
                  <p className="mb-4">
                    Generate thousands of rows of dummy flight data for QA and automation.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Free Forever</h3>
                  <p className="mb-8">
                    The FakerBox fake flight data generator is free to use, with no sign-up required.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Examples of Random Flight Data</h2>
                  <p className="mb-4">
                    Here are sample outputs from the FakerBox generator:
                  </p>

                  <div className="mb-8">
                    <p className="font-semibold mb-2">Example 1</p>
                    <ul className="list-disc list-inside mb-4">
                      <li>Aircraft Type: Boeing 737</li>
                      <li>Airline: AirVista Airlines</li>
                      <li>Airplane: AV431</li>
                      <li>Airport: Heathrow (LHR)</li>
                      <li>Flight Number: AV6721</li>
                      <li>Record Locator: J8M2PZ</li>
                      <li>Seat: 22C</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Example 2</p>
                    <ul className="list-disc list-inside mb-8">
                      <li>Aircraft Type: Airbus A320</li>
                      <li>Airline: SkyJet Express</li>
                      <li>Airplane: SJ901</li>
                      <li>Airport: Los Angeles (LAX)</li>
                      <li>Flight Number: SJ1284</li>
                      <li>Record Locator: T4K7QX</li>
                      <li>Seat: 17B</li>
                    </ul>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    Benefits of Using FakerBox Flight Generator
                  </h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Instant Results: Generate flight details quickly</li>
                    <li>Realistic Outputs: Looks like authentic airline records</li>
                    <li>Safe &amp; Fictional: Avoids using actual airline data</li>
                    <li>Scalable: Export bulk random flight data for projects</li>
                    <li>Versatile: Use across travel apps, booking engines, and airline dashboards</li>
                    <li>Free Forever: No subscription or sign-up needed</li>
                  </ul>

                  <h2 className="text-2xl font-bold my-4">Fake Flight Data for Projects</h2>
                  <h3 className="text-xl font-semibold mb-2">Developers &amp; QA Teams</h3>
                  <p className="mb-4">
                    Use dummy flight data to test booking flows, seat assignments, and airport fields.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Travel App Designers</h3>
                  <p className="mb-4">
                    Make prototypes look realistic with random flight data.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Researchers &amp; Analysts</h3>
                  <p className="mb-4">
                    Simulate datasets with dummy airline data for academic or operational studies.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Educators &amp; Trainers</h3>
                  <p className="mb-4">
                    Teach aviation system workflows safely with create fake flight data outputs.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Game Designers</h3>
                  <p className="mb-8">
                    Use fake airline name generator outputs and flight numbers for simulation or roleplay games.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">
                    FAQs: Fake Flight Data Generator
                  </h2>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What is a fake flight data generator?</h3>
                    <p>
                      It’s a tool that lets you generate fake flight data like airlines, flight numbers, and seats for safe testing.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I generate random flight data?</h3>
                    <p>
                      Yes. The FakerBox tool produces unique random flight data every time.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Does this tool generate real tickets?</h3>
                    <p>
                      No. It only generates fake airline data and flight metadata — not valid tickets or boarding passes.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I use it as a fake airline name generator?</h3>
                    <p>
                      Yes. The tool creates fictional airline names that resemble real carriers.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What fields can I generate?</h3>
                    <p>
                      You can generate aircraft type, airline, airplane, airport, flight number, record locator, and seat.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I export dummy flight data?</h3>
                    <p>
                      Yes. Export as CSV or JSON to create a random flight database.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Is the tool free to use?</h3>
                    <p>
                      Yes. The FakerBox fake flight data generator is completely free.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Who uses fake flight data?</h3>
                    <p>
                      Developers, QA testers, designers, trainers, and analysts all use dummy airline data for safe testing.
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
