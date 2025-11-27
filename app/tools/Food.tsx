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
  food: {
    'Adjective': () => faker.food.adjective(),
    'Description': () => faker.food.description(),
    'Dish': () => faker.food.dish(),
    'Ethnic Category': () => faker.food.ethnicCategory(),
    'Fruit': () => faker.food.fruit(),
    'Ingredient': () => faker.food.ingredient(),
    'Meat': () => faker.food.meat(),
    'Spice': () => faker.food.spice(),
    'Vegetable': () => faker.food.vegetable(),
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
    Object.keys(categoryFields['food']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('food');
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
                  Random Recipe Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Quickly generate fake recipe data and mock restaurant info for faster food app testing and development workflows.
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
                        {Object.keys(categoryFields['food']).map((fieldName) => (
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

                  <h2 className="text-2xl font-bold mb-4">What Is a Random Recipe Generator?</h2>
                  <p className="mb-4">
                    A random recipe generator is an online tool that produces made-up food recipe data such as dish titles, descriptions, ingredients, and cuisine categories. Instead of pulling data from real cookbooks, you can:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate fake recipe data in seconds</li>
                    <li>Use the random dish generator for restaurant mockups</li>
                    <li>Generate random grocery list with vegetables, fruits, spices and more</li>
                    <li>Produce random ingredient generator outputs for testing cooking apps</li>
                  </ul>
                  <p className="mb-8">
                    This tool works as both a recipe randomizer and a random food recipe generator, giving you flexibility for projects.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use Fake Recipe Data?</h2>

                  <h3 className="text-xl font-semibold mb-2">Speeds Up Food App Testing</h3>
                  <p className="mb-4">
                    With fake recipe data, developers can populate apps and menus instantly.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Safe and Copyright-Free</h3>
                  <p className="mb-4">
                    Generated random recipes are fictional, so you don’t risk copying real cookbooks.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Diverse and Realistic Outputs</h3>
                  <p className="mb-4">
                    From random dishes to random grocery lists, results look authentic enough for any demo.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Supports Multiple Use Cases</h3>
                  <p className="mb-8">
                    Perfect for apps, catalogs, creative projects, and educational resources.
                  </p>
                  <h2 className="text-2xl font-bold my-4">How to Use the FakerBox Recipe Randomizer?</h2>

                  <h3 className="text-xl font-semibold mb-2">Step 1: Select Fields</h3>
                  <p className="mb-4">
                    Choose from categories like:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Adjective</li>
                    <li>Description</li>
                    <li>Dish</li>
                    <li>Ethnic Category</li>
                    <li>Fruit</li>
                    <li>Ingredient</li>
                    <li>Meat</li>
                    <li>Spice</li>
                    <li>Vegetable</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Step 2: Generate Random Recipes</h3>
                  <p className="mb-4">
                    Click Generate and instantly get sample data such as:
                  </p>
                  <ul className="list-disc list-inside">
                    <li>Dish: Spicy Mango Curry</li>
                    <li>Ingredient: Garlic</li>
                    <li>Meat: Chicken</li>
                    <li>Spice: Cumin</li>
                    <li>Vegetable: Zucchini</li>
                    <li>Ethnic Category: Indian</li>
                  </ul>
                  <h3 className="text-xl font-semibold mb-2">Step 3: Export or Copy</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Copy single records for small needs</li>
                    <li>Export CSV for bulk random food recipe datasets</li>
                    <li>Export JSON for developer projects</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Features of the FakerBox Random Food Recipe Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">Generate Fake Recipe Data Instantly</h3>
                  <p className="mb-4">
                    Create complete sample recipes and dish names in one click.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Random Recipe Generator</h3>
                  <p className="mb-4">
                    Produce new random recipes every time you click Generate.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Random Ingredient Generator</h3>
                  <p className="mb-4">
                    Quickly generate ingredients like vegetables, meats, fruits, and spices.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Random Dish Generator</h3>
                  <p className="mb-4">
                    Simulate full dish names for restaurant and food app mockups.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Recipe Randomizer for Custom Outputs</h3>
                  <p className="mb-4">
                    Combine adjectives, cuisine types, and ingredients to generate unique recipe ideas.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Bulk Sample Recipes</h3>
                  <p className="mb-8">
                    Generate hundreds of random recipes or random grocery lists for projects.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Examples of Random Recipe Data</h2>

                  <h3 className="text-xl font-semibold mb-2">Example 1</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Dish: Creamy Garlic Pasta</li>
                    <li>Ingredient: Parmesan Cheese</li>
                    <li>Vegetable: Spinach</li>
                    <li>Meat: Chicken</li>
                    <li>Ethnic Category: Italian</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 2</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Dish: Spicy Mango Curry</li>
                    <li>Ingredient: Chili Powder</li>
                    <li>Fruit: Mango</li>
                    <li>Spice: Turmeric</li>
                    <li>Ethnic Category: Indian</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 3</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Dish: Roasted Herb Lamb</li>
                    <li>Ingredient: Olive Oil</li>
                    <li>Meat: Lamb</li>
                    <li>Spice: Rosemary</li>
                    <li>Ethnic Category: Mediterranean</li>
                  </ul>
                  <h3 className="text-xl font-semibold mb-2">Example 4</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>Dish: Sweet Chili Tofu Stir-Fry</li>
                    <li>Ingredient: Soy Sauce</li>
                    <li>Vegetable: Broccoli</li>
                    <li>Meat: Tofu</li>
                    <li>Spice: Red Chili Flakes</li>
                    <li>Ethnic Category: Asian</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Benefits of Using FakerBox Recipe Generator Random</h2>

                  <h3 className="text-xl font-semibold mb-2">Instant Data Generation</h3>
                  <p className="mb-4">
                    Save time by producing fake recipe data in seconds.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Realistic Outputs</h3>
                  <p className="mb-4">
                    Random dishes and random grocery lists look professional and authentic.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Creative Inspiration</h3>
                  <p className="mb-4">
                    Use the recipe randomizer for writing, game design, or content creation.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Flexible for Any Industry</h3>
                  <p className="mb-4">
                    Perfect for developers, educators, marketers, and designers.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Free Forever</h3>
                  <p className="mb-8">
                    <span className="font-bold">FakerBox</span> is free and generate unlimited data.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Random Recipe Generator for Projects</h2>

                  <h3 className="text-xl font-semibold mb-2">Developers and QA Teams</h3>
                  <p className="mb-4">
                    Use random recipes to test food delivery apps, grocery systems, or recipe websites.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Restaurant App Designers</h3>
                  <p className="mb-4">
                    Populate restaurant menus with fake recipe data to showcase layouts.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Writers and Game Creators</h3>
                  <p className="mb-4">
                    Invent unique dishes for novels, games, or fantasy worlds using the random dish generator.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Educators and Trainers</h3>
                  <p className="mb-4">
                    Teach food categories, nutrition, or global cuisines with dummy recipe data.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Researchers and Analysts</h3>
                  <p className="mb-8">
                    Simulate cooking datasets with random ingredient generator outputs.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">FAQs: Random Recipe Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">What is a random recipe generator?</h3>
                  <p className="mb-4">
                    It’s a tool that creates fake recipe data such as dishes, ingredients, and ethnic categories for testing and creativity.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I generate random dishes?</h3>
                  <p className="mb-4">
                    Yes. The random dish generator creates unique dish names instantly.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Does it generate grocery lists?</h3>
                  <p className="mb-4">
                    Yes. You can use it as a random grocery list tool to create lists of vegetables, fruits, meats, and spices.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I export random recipe data?</h3>
                  <p className="mb-4">
                    Yes. Export your data in CSV or JSON formats for bulk use.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Is this tool free to use?</h3>
                  <p className="mb-4">
                    Yes. The FakerBox recipe randomizer is free and unlimited.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I use this as a random ingredient generator?</h3>
                  <p className="mb-4">
                    Yes. The tool produces random ingredients like vegetables, fruits, meats, and spices.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Who uses random food recipe generators?</h3>
                  <p>
                    Developers, designers, educators, writers, and analysts all use random recipes for testing and creative projects.
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
