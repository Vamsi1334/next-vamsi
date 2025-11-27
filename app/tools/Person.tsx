"use client"

import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { CheckCircle, Copy, Settings, Download, Eye } from 'lucide-react';
import { Button } from "../components/ui/button"
import ToolsNav from "../tools/ToolsNav";

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

import Navigation from '../components/Navigation';

const categoryFields = {
  person: {
    'Full Name': () => faker.person.fullName(),
    'First Name': () => faker.person.firstName(),
    'Last Name': () => faker.person.lastName(),
    'Middle Name': () => faker.person.middleName(),
    'Job Title': () => faker.person.jobTitle(),
    'Job Area': () => faker.person.jobArea(),
    'Job Type': () => faker.person.jobType(),
    'Sex': () => faker.person.sex(),
    'Sex Type': () => faker.person.sexType(),
    'Prefix': () => faker.person.prefix(),
    'Suffix': () => faker.person.suffix(),
    'Bio': () => faker.person.bio(),
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
    Object.keys(categoryFields['person']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('person');
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
                  Fake Name Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Fake Name Generator helps you instantly create realistic names, surnames, and full identities. This fast, free, and simple-to-use tool generates random names and details in seconds.
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
                        {Object.keys(categoryFields['person']).map((fieldName) => (
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
                  <h2 className="text-2xl font-bold my-6">Similar Tools</h2>

                  {/* Navigation buttons */}
                  <ToolsNav />
                </div>
                <div className="bg-gradient-to-r rounded-xl border-2 border-slate-200 p-10 shadow-md mx-auto my-8">
                  <h2 className="text-2xl font-bold mb-4">What Is a Fake Name Generator?</h2>
                  <p className="mb-4">
                    You need a fast, reliable way to generate realistic identities, whether you're a developer testing an app, a writer creating characters, a designer filling the gaps or a marketer building user personas. That’s where FakerBox’s Fake Name Generator comes in. This powerful, free tool instantly creates authentic-looking full names, surnames, middle names, job titles, bios, and complete identity profiles with a single click.
                  </p>
                  <p className="mb-4">
                    Unlike placeholder text like Lorem Ipsum, our generator delivers real-world data that mirrors actual human identities across genders, cultures, and professions. Whether you need first name, last name, prefix, suffix, sex type, job area, or bio, FakerBox generates it all in seconds.
                  </p>
                  <p className="mb-4">
                    No more manual entry. No more repetitive patterns. Just high-quality, diverse, and realistic fake identities — ready to use.
                  </p>
                  <p className="mb-8">
                    And yes, every name and detail is 100% unique and free to use.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">
                    How to Use the Fake Name Generator? (In 3 Simple Steps)
                  </h2>
                  <p className="mb-4 text-gray-900">
                    Using <a
                      href="https://fakerbox.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline cursor-pointer"
                    >
                      FakerBox
                    </a> is designed for speed and simplicity. You don’t need to sign up, install software, or wait for processing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Step 1: Click “Generate” for Instant Results</h3>
                  <p className="mb-3">
                    One click is all it takes. The moment you hit “Generate,” FakerBox produces a full identity:
                  </p>
                  <ul className="list-disc list-inside mb-5">
                    <li>Full Name (First, Middle, Last)</li>
                    <li>Prefix &amp; Suffix (Mr., Mrs., Dr., Jr., etc.)</li>
                    <li>Gender and Sex Type</li>
                    <li>Job Title, Job Area, Job Type</li>
                    <li>Personal Bio</li>
                  </ul>
                  <p className="mb-6">
                    No input needed. Perfect for quick testing or brainstorming.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Step 2: Customize Your Identity (Optional but Powerful)</h3>
                  <p className="mb-3">
                    Want more control? Use the advanced options:
                  </p>
                  <ul className="list-disc list-inside mb-5">
                    <li>Select gender (Male, Female, Non-binary)</li>
                    <li>Choose job type (Tech, Healthcare, Education, etc.)</li>
                    <li>Filter by prefix/suffix</li>
                    <li>Use regex patterns to format names (e.g., names starting with “S”, 5-letter first names, etc.)</li>
                  </ul>
                  <p className='mb-5'>
                    This level of customization ensures you get exactly the kind of data you need — not just random noise.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Step 3: Export or Copy in Seconds</h3>
                  <p className="mb-3">
                    Need more than one identity? Generate unlimited fake names and:

                  </p>
                  <ul className="list-disc list-inside mb-5">
                    <li>Copy to clipboard instantly
                    </li>
                    <li>Download in CSV for spreadsheets
                    </li>
                    <li>Export as JSON for developers and APIs
                    </li>
                  </ul>
                  <p className="mb-8">
                    Perfect for populating databases, testing forms, or building sample user lists.

                  </p>
                  <h2 className="text-2xl font-bold mb-4">Generate Unlimited Fake Names</h2>
                  <p className="mb-8">
                    Create as many identities as your workflow demands. Batch runs give you hundreds or thousands of rows for QA, seeding, or prototyping.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Features of Random Name Generator</h2>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Realistic Naming Patterns</h3>
                    <p className="mb-4">
                      We balance variety and readability to produce believable Full Name, Prefix (e.g., Mr., Dr.), Suffix (e.g., Jr., III), and Middle Name combinations.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Gender Options: Sex and Sex Type</h3>
                    <p className="mb-4">
                      Select Sex and Sex Type where relevant to your dataset. Keep inclusive testing in mind while avoiding real PII.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Structured Fields Developers Love</h3>
                    <p className="mb-4">
                      Every profile includes consistent keys for First Name, Last Name, Job Title, Job Area, Job Type, Prefix, Suffix, Sex, Sex Type, and Bio. No cleanup needed.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Bio Generator for Context</h3>
                    <p className="mb-4">
                      Add a short Bio to make placeholders feel real. Great for UI previews, onboarding flows, and narrative demos.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Bulk Mode with Quick Controls</h3>
                    <p className="mb-8">
                      Set a count, lock your options, and generate a whole dataset in seconds. Export, reload, repeat.
                    </p>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    Benefits of Random Fake Name Generator (Why You’ll Love It)
                  </h2>
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-1">Accelerate Project Progress</h3>
                    <p className="mb-4">Skip manual brainstorming. Move straight to building, testing, and presenting.</p>
                    <h3 className="text-xl font-semibold mb-1">One-Click Identity Creation</h3>
                    <p className="mb-4">Reduce setup time. Create an identity, copy it, and continue working. It’s that simple.</p>
                    <h3 className="text-xl font-semibold mb-1">Consistent, Clean Data</h3>
                    <p className="mb-4">Uniform fields mean fewer edge cases. Your forms and APIs behave predictably.</p>
                    <h3 className="text-xl font-semibold mb-1">Safer Than Using Real PII</h3>
                    <p className="mb-4">Use fictional identities to protect privacy while keeping scenarios realistic.</p>
                    <h3 className="text-xl font-semibold mb-1">Scale Without Friction</h3>
                    <p>From one name to ten thousand, your workflow stays smooth and repeatable.</p>
                  </section>
                  <h2 className="text-2xl font-bold mb-4">
                    Generate Random Identity for Any Scenario
                  </h2>
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-1">Fictional Character Name Generator</h3>
                    <p className="mb-4">
                      Create unique characters complete with a First Name, Middle Name, Last Name, and a Bio.
                      Establish a realistic setting for your character.
                    </p>
                    <h3 className="text-xl font-semibold mb-1">Random Nickname & Random Username</h3>
                    <p className="mb-4">
                      Generate casual random nicknames for informal interactions and a tailored Random Username
                      suitable for gaming, social platforms, or internal testing purposes.
                    </p>
                    <h3 className="text-xl font-semibold mb-1">Job Title, Job Area, and Job Type</h3>
                    <p className="mb-4">
                      Populate realistic roles for HR mockups, job boards, or enterprise demos with Job Title, Job Area, and Job Type fields.
                    </p>
                    <h3 className="text-xl font-semibold mb-1">Online Activity & Handle Testing</h3>
                    <p>
                      Stress-test forms, feeds, and moderation flows using plausible online activity names, handles, and display patterns.
                    </p>
                  </section>
                  <h2 className="text-2xl font-bold mb-4">
                    What Can I Use the Fake Name Generator Identities For?
                  </h2>
                  <h3 className="text-xl font-semibold mb-2">
                    Books, Websites, Movies, Video Games
                  </h3>
                  <p className="mb-4">
                    Yes, you can use these identities in creative works. They’re fictional and designed for broad, legitimate use.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">UI, QA, and Automation Testing</h3>
                  <p className="mb-4">
                    Populate your databases effortlessly with thousands of generated identities. Use these realistic names to conduct thorough validations on fields such as Full Name, First Name, Last Name, Prefix, Suffix, and Bio, ensuring everything runs smoothly in your applications or projects.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Classroom Demos &amp; Training</h3>
                  <p className="mb-4">
                    Enhance your teaching sessions on forms, databases, or data science by utilizing safe and coherent examples. These fictional identities allow for practical demonstrations, making complex concepts easier to understand and apply in a real-world context.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Research Prototypes &amp; Hackathons</h3>
                  <p className="mb-4">
                    Move from idea to demo quickly with ready-to-use identities.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Content Placeholders &amp; Mockups</h3>
                  <p className="mb-8">
                    Pitch concepts with polished profiles instead of lorem ipsum.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">
                    Why the Fakerbox Fake Name Generator Is Free Forever
                  </h2>
                  <p className="mb-8">
                    Our mission is simple: help you move faster, save time &amp; energy for professionals
                  </p>
                  <h2 className="text-2xl font-bold mb-4">FAQs: Fake Name Generator</h2>
                  <h3 className="text-xl font-semibold mb-2">Can I create Random Nickname and random user name?</h3>
                  <p className="mb-4">Yes. Toggle Random Nickname and username options to generate handles for online activity and testing.</p>

                  <h3 className="text-xl font-semibold mb-2">Is there a limit to how many I can create?</h3>
                  <p className="mb-4">No practical limit for typical use. Generate single identities or large datasets as needed.</p>

                  <h3 className="text-xl font-semibold mb-2">Can I export to CSV and JSON?</h3>
                  <p className="mb-4">Yes. Use the export buttons to download structured CSV or JSON.</p>

                  <h3 className="text-xl font-semibold mb-2">Do you store any generated data?</h3>
                  <p className="mb-4">No. You generate it; you download it. We don’t keep your datasets.</p>

                  <h3 className="text-xl font-semibold mb-2">Is FakerBox really free?</h3>
                  <p className="mb-2">Yes. Forever. No registration, no premium tiers, no hidden costs.</p>

                </div>



              </div>
            </div>
          </div>
        </div>



        <Footer />
      </div >
    </>
  );
};

export default Person;
