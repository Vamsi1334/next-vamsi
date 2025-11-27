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
  animal: {
    'Bird': () => faker.animal.bird(),
    'Cat': () => faker.animal.cat(),
    'Cetacean': () => faker.animal.cetacean(),
    'Cow': () => faker.animal.cow(),
    'Crocodilia': () => faker.animal.crocodilia(),
    'Dog': () => faker.animal.dog(),
    'Fish': () => faker.animal.fish(),
    'Horse': () => faker.animal.horse(),
    'Insect': () => faker.animal.insect(),
    'Lion': () => faker.animal.lion(),
    'Rabbit': () => faker.animal.rabbit(),
    'Rodent': () => faker.animal.rodent(),
    'Snake': () => faker.animal.snake(),
    'Type': () => faker.animal.type(),
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
    Object.keys(categoryFields['animal']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('animal');
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
                  Random Animal Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Random Animal Generator instantly creates fake animal names, pet profiles, and sample data for education, app development, games, or creative storytelling. With over 500 species to explore, this tool delivers diverse animal data fr your project.
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
                        {Object.keys(categoryFields['animal']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Random Animal Generator?</h2>
                  <p className="mb-4">
                    A random animal generator is a tool that creates random animal data, including categories like birds, cats, dogs, reptiles, insects, and more. Instead of searching or compiling lists manually, you can:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate random animals in one click</li>
                    <li>Use the fake animal name generator for creative projects</li>
                    <li>Create fake animal data for app testing and prototypes</li>
                    <li>Build dummy animal data for education, games, or datasets</li>
                  </ul>
                  <p className="mb-8">
                    The <span className="font-bold">FakerBox</span> tool doubles as both a random pet generator and a fake animal name generator, making it versatile for multiple use cases.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use Fake Animal Data?</h2>
                  <h3 className="text-xl font-semibold mb-2">Safe for Projects</h3>
                  <p className="mb-4">
                    Using fake animal data means you can safely test and design apps without depending on real species records.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Speeds Up Development</h3>
                  <p className="mb-4">
                    Developers can generate random animal data instantly instead of building datasets from scratch.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Creative Flexibility</h3>
                  <p className="mb-4">
                    Writers, educators, and game designers can generate fake animal data to create unique characters and storylines.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Scalable and Diverse</h3>
                  <p className="mb-8">
                    With hundreds of options, you can generate random animals across multiple categories for wide coverage.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">
                    How to Use the FakerBox Random Animal Generator?
                  </h2>
                  <h3 className="text-xl font-semibold mb-2">Step 1: Select Fields</h3>
                  <p className="mb-4">Choose categories such as:</p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Bird</li>
                    <li>Cat</li>
                    <li>Cetacean</li>
                    <li>Cow</li>
                    <li>Crocodilia</li>
                    <li>Dog</li>
                    <li>Fish</li>
                    <li>Horse</li>
                    <li>Insect</li>
                    <li>Lion</li>
                    <li>Rabbit</li>
                    <li>Rodent</li>
                    <li>Snake</li>
                    <li>Type</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Step 2: Generate Random Animal Data</h3>
                  <p className="mb-4">
                    Click Generate and instantly receive fake animal data such as:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Type: Mammal</li>
                    <li>Animal: Golden Retriever Dog</li>
                    <li>Animal: Bald Eagle Bird</li>
                    <li>Animal: King Cobra Snake</li>
                  </ul>
                  <h3 className="text-xl font-semibold mb-2">Step 3: Export or Copy</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Copy single animal names for small projects</li>
                    <li>Export CSV to build a random animal database</li>
                    <li>Export JSON for developers and automation</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">
                    Features of the FakerBox Fake Animal Generator
                  </h2>

                  <h3 className="text-xl font-semibold mb-2">Generate Fake Animal Data Instantly</h3>
                  <p className="mb-4">
                    Quickly create structured datasets of random animals for any project.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Random Animal Data Across Categories</h3>
                  <p className="mb-4">
                    Select from multiple animal groups including pets, reptiles, mammals, and more.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Fake Animal Name Generator</h3>
                  <p className="mb-4">
                    Create fictional but realistic animal names for games and creative writing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Dummy Animal Data in Bulk</h3>
                  <p className="mb-4">
                    Generate hundreds of entries of dummy animal data for testing or research.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Random Pet Generator</h3>
                  <p className="mb-4">
                    Perfect for generating fake pet profiles for apps or user personas.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Free and Unlimited</h3>
                  <p className="mb-8">
                    The FakerBox random animal generator is completely free with no restrictions.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">
                    Examples of Random Animal Data
                  </h2>

                  <div className="mb-6">
                    <p className="font-semibold mb-2">Example 1</p>
                    <ul className="list-disc list-inside mb-4">
                      <li>Type: Mammal</li>
                      <li>Animal: Labrador Retriever (Dog)</li>
                    </ul>

                    <p className="font-semibold mb-2">Example 2</p>
                    <ul className="list-disc list-inside mb-4">
                      <li>Type: Bird</li>
                      <li>Animal: Scarlet Macaw</li>
                    </ul>

                    <p className="font-semibold mb-2">Example 3</p>
                    <ul className="list-disc list-inside mb-4">
                      <li>Type: Reptile</li>
                      <li>Animal: Nile Crocodile</li>
                    </ul>

                    <p className="font-semibold mb-2">Example 4</p>
                    <ul className="list-disc list-inside mb-4">
                      <li>Type: Insect</li>
                      <li>Animal: Monarch Butterfly</li>
                    </ul>

                    <p className="font-semibold mb-2">Example 5</p>
                    <ul className="list-disc list-inside mb-8">
                      <li>Type: Fish</li>
                      <li>Animal: Clownfish</li>
                    </ul>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    Benefits of Using FakerBox Random Animal Generator
                  </h2>

                  <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
                  <p className="mb-4">
                    Quickly generate random animals for projects.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Versatile Data</h3>
                  <p className="mb-4">
                    Covers everything from pets to exotic species.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Safe to Use</h3>
                  <p className="mb-4">
                    All outputs are fictional and safe for creative or testing work.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Scalable</h3>
                  <p className="mb-4">
                    Generate one or thousands of records with ease.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Creative Support</h3>
                  <p className="mb-8">
                    Useful for writers, game designers, educators, and developers alike.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">
                    Random Animal Generator for Projects
                  </h2>
                  <h3 className="text-xl font-semibold mb-2">Developers and QA Engineers</h3>
                  <p className="mb-4">
                    Use fake animal data to test apps, pet adoption platforms, or biology databases.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Game Designers</h3>
                  <p className="mb-4">
                    Generate random animals to fill worlds with diverse species or pet options.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Writers and Storytellers</h3>
                  <p className="mb-4">
                    Use the fake animal name generator to invent creatures for fantasy or fiction.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Educators and Trainers</h3>
                  <p className="mb-4">
                    Teach biology, zoology, or environmental science with dummy animal data.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Researchers and Analysts</h3>
                  <p className="mb-8">
                    Simulate species datasets without using sensitive or protected animal records.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">
                    Responsible Use of Fake Animal Data
                  </h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>
                      Generated random animal data is fictional and should not be confused with verified biological records.
                    </li>
                    <li>
                      The FakerBox tool is intended for testing, learning, and creativity only.
                    </li>
                    <li>
                      Do not replace real scientific data with generated dummy animal data.
                    </li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">
                    FAQs: Random Animal Generator
                  </h2>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What is a random animal generator?</h3>
                    <p>
                      It’s a tool that lets you generate random animals across multiple categories like dogs, cats, birds, or reptiles.
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I use it as a fake animal name generator?</h3>
                    <p>
                      Yes. The FakerBox tool works as a fake animal name generator for games and writing.
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Does it include pets?</h3>
                    <p>
                      Yes. You can use it as a random pet generator to create pet names and profiles.
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I generate dummy animal data in bulk?</h3>
                    <p>
                      Yes. You can create large datasets of dummy animal data in CSV or JSON formats.
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Is this tool free to use?</h3>
                    <p>
                      Yes. The FakerBox random animal generator is free and unlimited.
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Who uses fake animal data?</h3>
                    <p>
                      Developers, educators, writers, researchers, and game designers use fake animal data for testing and creativity.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">What categories are available?</h3>
                    <p>
                      You can generate animals from categories like birds, cats, dogs, snakes, insects, rodents, fish, and more.
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
