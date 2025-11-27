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
  lorem: {
    'Word': () => faker.lorem.word(),
    'Words': () => faker.lorem.words(),
    'Sentence': () => faker.lorem.sentence(),
    'Sentences': () => faker.lorem.sentences(),
    'Paragraph': () => faker.lorem.paragraph(),
    'Paragraphs': () => faker.lorem.paragraphs(),
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
    Object.keys(categoryFields['lorem']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('lorem');
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
                  Generate Lorem Ipsum Text Instantly
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Lorem Ipsum Generator makes it easy to create placeholder content and dummy text for design, web layouts, and content testing. Instantly generate paragraphs, words, or characters of lorem ipsum, perfect for speeding up UI prototyping or filling empty spaces.              </p>
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
                        {Object.keys(categoryFields['lorem']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Lorem Ipsum Generator?</h2>
                  <p className="mb-4">
                    A lorem ipsum generator is a tool that creates lorem ipsum dummy text, also known as placeholder or filler text. Designers and developers use this when they need content to visualize layouts, typography, or UI elements before final text is ready.
                  </p>
                  <p className="mb-4">
                    The <span className="font-bold">FakerBox</span> tool lets you:
                  </p>
                  <ul className="list-disc list-inside mb-8">
                    <li>Generate lorem ipsum by word, sentence, or paragraph</li>
                    <li>Copy easily with the one-click Lorem Ipsum text button.</li>
                    <li>Create scalable blocks of lorem ipsum paragraphs for web pages and apps</li>
                    <li>Produce controlled lengths with the lorem ipsum character generator</li>
                    <li>This saves time and ensures your designs never look empty or incomplete.</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Why Use Lorem Ipsum Dummy Text?</h2>
                  <h3 className="text-xl font-semibold mb-2">Speeds Up Design & Development</h3>
                  <p className="mb-4">
                    When the content isn’t ready, the lorem ipsum sample text fills the gap so you can keep projects moving.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Creates Realistic Layouts</h3>
                  <p className="mb-4">
                    Using fake text generator lorem ipsum makes wireframes and templates look polished during presentations.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Standardized & Familiar</h3>
                  <p className="mb-4">
                    The lorem ipsum paragraph style is globally recognized, so stakeholders understand it's placeholder content.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Flexible for Any Project</h3>
                  <p className="mb-8">
                    Generate just a few words, a block of text, or multiple pages of lorem ipsum dummy text depending on your needs.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">How to Use the FakerBox Lorem Ipsum Generator?</h2>
                  <h3 className="text-xl font-semibold mb-2">Step 1: Select Your Content Type</h3>
                  <p className="mb-4">Choose whether you want:</p>
                  <ul className="list-disc list-inside">
                    <li>Word / Words – generate a single or multiple words of lorem ipsum</li>
                    <li>Sentence / Sentences – create natural-looking placeholder lines</li>
                    <li>Paragraph / Paragraphs – produce blocks of lorem ipsum paragraphs</li>
                  </ul>
                  <h3 className="text-xl font-semibold my-2 mt-2">Step 2: Generate Lorem Ipsum Instantly</h3>
                  <p className="mb-4">
                    Click Generate, and the tool will instantly create your desired lorem ipsum dummy text.<br />
                    Examples:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Word: Lorem</li>
                    <li>Sentence: “Lorem ipsum dolor sit amet, consectetur adipiscing elit.”</li>
                    <li>Paragraph: “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at magna ac nisl mattis fermentum.”</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Step 3: Copy &amp; Paste</h3>
                  <p className="mb-8">
                    Copy the Lorem Ipsum text option to paste the output directly into your project quickly.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">
                    Features of the FakerBox Lorem Ipsum Generator
                  </h2>
                  <h3 className="text-xl font-semibold mb-2">Generate Lorem Ipsum by Word</h3>
                  <p className="mb-4">
                    Need a quick lorem ipsum sample word? Get it in one click.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Generate Lorem Ipsum Sentences</h3>
                  <p className="mb-4">
                    Use the fake text generator lorem ipsum to create sentences for captions, form labels, or input testing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Generate Lorem Ipsum Paragraphs</h3>
                  <p className="mb-4">
                    Produce lorem ipsum paragraphs to fill website templates, app mockups, or blog prototypes.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Lorem Ipsum Character Generator</h3>
                  <p className="mb-4">
                    Control outputs by character count. Ideal for testing UI limits or truncation rules.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Copy with One Click</h3>
                  <p className="mb-4">
                    Use lorem ipsum text copy to paste results instantly into your design or code.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Unlimited, Free, Forever</h3>
                  <p className="mb-4">
                    No restrictions. Our Lorem Ipsum generator is always accessible for free forever.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Examples of Lorem Ipsum Samples</h2>
                  <p className="mb-4">
                    Here are a few lorem ipsum sample outputs you can generate with FakerBox:
                  </p>
                  <div className="mb-8">
                    <p className="font-semibold">Word Example:</p>
                    <p className="mb-4">Lorem</p>

                    <p className="font-semibold">Sentence Example:</p>
                    <p className="mb-4">
                      “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
                    </p>

                    <p className="font-semibold">Paragraph Example:</p>
                    <p className="mb-8">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis, nunc sed feugiat elementum, neque lorem vulputate turpis, eget fermentum lectus magna nec turpis. Integer commodo ligula sit amet felis tincidunt, eget hendrerit arcu blandit.
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold mb-4">Benefits of Using Lorem Ipsum Text Copy</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Instant Results: Generate lorem ipsum instantly for any project</li>
                    <li>Precise Control: Words, sentences, or paragraphs at your command</li>
                    <li>Time-Saving: No need to search for text manually</li>
                    <li>Professional Output: Keep wireframes and designs polished</li>
                    <li>Reusable: Create unlimited samples anytime you need</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Fake Text Generator Lorem Ipsum for Projects</h2>

                  <h3 className="text-xl font-semibold mb-2">Designers</h3>
                  <p className="mb-4">
                    Fill empty spaces in UI mockups with lorem ipsum text copy for realistic previews.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Developers</h3>
                  <p className="mb-4">
                    Test layouts, input fields, and APIs with lorem ipsum character generator outputs.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Writers &amp; Editors</h3>
                  <p className="mb-4">
                    Simulate article formatting with lorem ipsum paragraphs while drafts are being prepared.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Trainers &amp; Educators</h3>
                  <p className="mb-8">
                    Teach HTML, CSS, or design with real-world examples of lorem ipsum dummy text.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">FAQs: Lorem Ipsum Generator</h2>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What is a lorem ipsum generator?</h3>
                    <p>
                      It’s a fake text generator lorem ipsum tool that produces placeholder content for layouts and testing.
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I generate lorem ipsum by paragraph?</h3>
                    <p>
                      Yes. The lorem ipsum paragraph generator creates multiple paragraphs instantly.
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I generate lorem ipsum by characters?</h3>
                    <p>
                      Yes. The lorem ipsum character generator allows precise character-length text.
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">How do I copy lorem ipsum text quickly?</h3>
                    <p>
                      Use the lorem ipsum text copy option to paste results directly into your project.
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What is lorem ipsum dummy text used for?</h3>
                    <p>
                      It is utilized as placeholder content in websites, apps, designs, and content layouts.
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Is this tool free to use?</h3>
                    <p>
                      Yes. The FakerBox lorem ipsum generator free edition is available forever.

                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Can I use lorem ipsum in professional work?</h3>
                    <p>
                      Yes — but only as a placeholder. Replace it with final content before publishing.
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
