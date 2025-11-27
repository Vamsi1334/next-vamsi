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
  word: {
    'Adjective': () => faker.word.adjective(),
    'Adverb': () => faker.word.adverb(),
    'Conjunction': () => faker.word.conjunction(),
    'Interjection': () => faker.word.interjection(),
    'Noun': () => faker.word.noun(),
    'Preposition': () => faker.word.preposition(),
    'Verb': () => faker.word.verb(),
    'Words': () => faker.word.words(),
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
    Object.keys(categoryFields['word']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('word');
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
                  Fake Word Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Quickly generate random words and simplify your creative process with fast, easy fake word generator. Designed for writers, educators, developers and more.              </p>
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
                        {Object.keys(categoryFields['word']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Fake Word Generator?</h2>
                  <p className="mb-4">
                    A fake word generator is a tool that produces random words from different parts of speech. Instead of manually brainstorming, you can use this random generator of words to instantly access:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Nouns – person, place, or thing</li>
                    <li>Adjectives – descriptive words</li>
                    <li>Verbs – action words</li>
                    <li>Adverbs – how actions are performed</li>
                    <li>Prepositions, Conjunctions, Interjections – connectors and fillers</li>
                  </ul>
                  <p className="mb-8">
                    The <span className="font-bold">FakerBox</span> tool is more than just a random word generator. It can also act as a fake English word generator for experimental or creative purposes and an AI word generator that makes word creation smarter and contextual.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use a Random Fake Word Generator?</h2>
                  <h3 className="text-xl font-semibold mb-2">Inspire Creativity</h3>
                  <p className="mb-4">
                    Writers, poets, and songwriters can use the random fake word generator to break creative blocks.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Support Education</h3>
                  <p className="mb-4">
                    Teachers and trainers can create random words for quizzes, language games, and practice sessions.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Aid Developers &amp; Testers</h3>
                  <p className="mb-4">
                    Use fake words generator outputs to test word-based apps, search engines, or input fields.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Build Vocabulary</h3>
                  <p className="mb-8">
                    The word generator helps learners discover new terms across parts of speech.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">How to Use the FakerBox Word Generator?</h2>
                  <h3 className="text-xl font-semibold mb-2">Step 1: Select Fields</h3>
                  <p className="mb-4">Choose the type of word you need:</p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Adjective</li>
                    <li>Adverb</li>
                    <li>Conjunction</li>
                    <li>Interjection</li>
                    <li>Noun</li>
                    <li>Preposition</li>
                    <li>Verb</li>
                    <li>Words (mixed list)</li>
                  </ul>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Generate Random Words Instantly</h3>
                  <p className="mb-4">Click Generate and instantly get results like:</p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Noun: “Mountain”</li>
                    <li>Verb: “Climb”</li>
                    <li>Adjective: “Majestic”</li>
                    <li>Adverb: “Swiftly”</li>
                    <li>Conjunction: “Although”</li>
                    <li>Interjection: “Wow!”</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Step 3: Export or Copy</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Copy words instantly for quick use</li>
                    <li>Download CSV for large datasets</li>
                    <li>Export JSON for developers and AI-driven applications</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Features of the FakerBox Fake Words Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">Random Word Generator</h3>
                  <p className="mb-4">
                    Generate single words or word lists instantly with the random word generator feature.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Fake English Word Generator</h3>
                  <p className="mb-4">
                    Produce words that resemble English but are completely fictional — perfect for branding or games.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">AI Word Generator</h3>
                  <p className="mb-4">
                    The FakerBox fake word generator AI creates smarter, diverse results based on context.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Random Generator of Words by Category</h3>
                  <p className="mb-4">
                    Select specific parts of speech (such as adjectives, verbs, or nouns) for more targeted results.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Bulk Word Lists</h3>
                  <p className="mb-4">
                    Generate hundreds of words at once for testing, writing, or training.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Free &amp; Unlimited</h3>
                  <p className="mb-8">
                    The FakerBox fake words generator is free, with no sign-up required.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">
                    Examples of Random Word Outputs
                  </h2>
                  <p className="mb-4">
                    Here are some sample words can be generated by FakerBox:
                  </p>
                  <div className="mb-4">
                    <p className="font-semibold mb-2">Example 1 (by category):</p>
                    <ul className="list-disc list-inside mb-4">
                      <li>Noun: “River”</li>
                      <li>Verb: “Run”</li>
                      <li>Adjective: “Silent”</li>
                      <li>Adverb: “Quickly”</li>
                      <li>Conjunction: “But”</li>
                      <li>Interjection: “Hey!”</li>
                    </ul>
                  </div>
                  <div className="mb-4">
                    <p className="font-semibold mb-2">Example 2 (word list):</p>
                    <ul className="list-disc list-inside mb-4">
                      <li>Words: Harmony, Leap, Gentle, Always, Dream</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Example 3 (fake English word generator):</p>
                    <ul className="list-disc list-inside mb-8">
                      <li>Blenora</li>
                      <li>Strivex</li>
                      <li>Quilora</li>
                    </ul>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    Benefits of Using FakerBox Random Word Generator
                  </h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Instant Results: Generate words in seconds</li>
                    <li>Diverse Options: Choose from multiple parts of speech</li>
                    <li>Creativity Boost: Use the random fake word generator for inspiration</li>
                    <li>Safe for All Uses: Fictional or placeholder words for projects</li>
                    <li>Scalable: Export large datasets with one click</li>
                    <li>AI-Powered: Smarter suggestions with AI word generator logic</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">
                    Fake Word Generator for Projects
                  </h2>
                  <h3 className="text-xl font-semibold mb-2">Writers &amp; Creatives</h3>
                  <p className="mb-4">
                    Utilize the random word generator to brainstorm story ideas, poetry, or song lyrics.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Educators</h3>
                  <p className="mb-4">
                    The word generator helps create vocabulary tests, spelling bees, and practice sheets.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Developers &amp; Testers</h3>
                  <p className="mb-4">
                    Use dummy word datasets to validate form fields, search bars, or AI language tools.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Game Designers</h3>
                  <p className="mb-4">
                    Use the fake English word generator to build fictional names, places, or objects.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Marketers & Brand Creators</h3>
                  <p className="mb-8">
                    Find unique ideas with the fake word generator AI to develop product names or slogans.
                  </p>
                  <h2 className="text-2xl font-bold my-4">
                    Responsible Use of Fake Words Generator
                  </h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Generated fake words are fictional and should not be mistaken for real dictionary entries.</li>
                    <li>Always check outputs before using them in professional or academic contexts.</li>
                    <li>Perfect for safe testing, creativity, and education.</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">FAQs: Fake Word Generator</h2>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What is a fake word generator?</h3>
                    <p>
                      It’s a tool that lets you generate random words across categories or create fictional English-like words.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I use this as a random word generator?</h3>
                    <p>
                      Yes. The FakerBox random word generator produces single or bulk outputs instantly.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Does it create fake English words?</h3>
                    <p>
                      Yes. The fake English word generator option produces words that resemble English but are invented.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What is a fake word generator AI?</h3>
                    <p>
                      It’s an AI word generator feature that produces smarter, contextual outputs.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I export word lists?</h3>
                    <p>
                      Yes. Use CSV or JSON exports to build random word datasets.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Is this free to use?</h3>
                    <p>
                      Yes. The FakerBox fake word generator free edition is always available.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Who uses fake word generator tools?</h3>
                    <p>
                      Writers, educators, developers, testers, and marketers all use random generators of words for their projects..
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
