"use client"

import React, { useState } from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useToast } from '../hooks/use-toast';
import { Copy, Download, Sparkles, AlertCircle } from 'lucide-react';
import ToolsNav from "../tools/ToolsNav";

const JsonBeautifier = () => {
  const [inputJson, setInputJson] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const { toast } = useToast();


  const beautifyJson = () => {
    setError('');
    setIsProcessing(true);

    try {
      if (!inputJson.trim()) {
        setError('Please enter some JSON data to beautify.');
        setOutputJson('');
        setIsProcessing(false);
        return;
      }

      const parsed = JSON.parse(inputJson);
      const beautified = JSON.stringify(parsed, null, 2);
      setOutputJson(beautified);

      toast({
        title: "Success!",
        description: "JSON has been beautified successfully."
      });
    } catch (err) {
      setError('Invalid JSON format. Please check your input and try again.');
      setOutputJson('');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async () => {
    if (!outputJson) return;

    try {
      await navigator.clipboard.writeText(outputJson);
      setCopySuccess(true);
      toast({
        title: "Copied!",
        description: "Beautified JSON copied to clipboard."
      });

      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  const downloadJson = () => {
    if (!outputJson) return;

    const blob = new Blob([outputJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'beautified.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "JSON file saved successfully."
    });
  };

  const clearAll = () => {
    setInputJson('');
    setOutputJson('');
    setError('');
    setCopySuccess(false);
  };

  return (
    <>
      
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">JSON Beautifier & Formatter</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Format, validate, and prettify your JSON data with our easy-to-use online tool.
              Perfect for developers who need clean, readable JSON code instantly.
            </p>
          </div>

          {/* Features Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-center mb-8">Why Use Our JSON Beautifier?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-card border shadow-sm">
                <Sparkles className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Format & Prettify</h3>
                <p className="text-sm text-muted-foreground">
                  Transform minified JSON into readable, properly indented format with 2-space indentation
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-card border shadow-sm">
                <AlertCircle className="w-8 h-8 mx-auto mb-3 text-secondary" />
                <h3 className="font-semibold mb-2">Validate JSON Syntax</h3>
                <p className="text-sm text-muted-foreground">
                  Instantly detect and highlight JSON syntax errors with detailed error messages
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-card border shadow-sm">
                <Copy className="w-8 h-8 mx-auto mb-3 text-accent" />
                <h3 className="font-semibold mb-2">Copy & Download</h3>
                <p className="text-sm text-muted-foreground">
                  Easily copy formatted JSON to clipboard or download as a .json file
                </p>
              </div>
            </div>
          </section>

          <section className="grid lg:grid-cols-2 gap-6 mb-16">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Input JSON Data</h2>
                <Button
                  variant="default"
                  size="sm"
                  onClick={clearAll}
                  className="text-sm"
                >
                  Clear All
                </Button>
              </div>

              <div className="relative">
                <Textarea
                  value={inputJson}
                  onChange={(e) => setInputJson(e.target.value)}
                  placeholder="Paste your JSON here, e.g., {&quot;name&quot;: &quot;John&quot;, &quot;age&quot;: 30}"
                  className="min-h-[400px] font-mono text-sm resize-none"
                />
              </div>

              <Button
                onClick={beautifyJson}
                disabled={isProcessing || !inputJson.trim()}
                className="w-full"
                size="lg"
                variant="default"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isProcessing ? 'Processing...' : 'Beautify JSON'}
              </Button>
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Formatted JSON Output</h2>
                {outputJson && (
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={copyToClipboard}
                      className="text-sm"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      {copySuccess ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadJson}
                      className="text-sm border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                )}
              </div>

              <div className="relative">
                {outputJson ? (
                  <Textarea
                    value={outputJson}
                    readOnly
                    className="min-h-[400px] font-mono text-sm resize-none"
                  />
                ) : (
                  <div className="min-h-[400px] w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm font-mono flex items-center justify-center text-muted-foreground">
                    Beautified JSON will appear here...
                  </div>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>


          </section>

          <section>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Similar Tools</h2>

              {/* Navigation buttons */}
              <ToolsNav />
            </div>
          </section>

          {/* FAQ Section */}
          <section className="my-16">
            <h2 className="text-2xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <h3 className="font-semibold mb-2">What is JSON beautification?</h3>
                <p className="text-sm text-muted-foreground">
                  JSON beautification is the process of formatting minified or compressed JSON data into a readable,
                  properly indented structure. This makes it easier for developers to read, debug, and understand JSON data.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <h3 className="font-semibold mb-2">How do I use this JSON formatter?</h3>
                <p className="text-sm text-muted-foreground">
                  Simply paste your JSON data into the input area and click the &quot;Beautify JSON&quot; button.
                  The tool will automatically format and validate your JSON, displaying the result in the output area.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <h3 className="font-semibold mb-2">What happens if my JSON is invalid?</h3>
                <p className="text-sm text-muted-foreground">
                  If your JSON contains syntax errors, the tool will display a clear error message explaining what went wrong.
                  This helps you quickly identify and fix JSON formatting issues.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <h3 className="font-semibold mb-2">Can I download the formatted JSON?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes! Once your JSON is beautified, you can either copy it to your clipboard or download it as a .json file
                  using the buttons provided in the output section.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-center mb-8">Related Developer Tools</h2>
            <div className="flex justify-center">
              <div className="bg-card rounded-lg p-6 border shadow-sm max-w-md text-center">
                <h3 className="font-semibold mb-2">XML Beautifier</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Need to format XML data? Try our XML Beautifier tool for clean, readable XML formatting.
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/tools/xml-beautifier'}
                  className="text-sm"
                >
                  Try XML Beautifier
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default JsonBeautifier;
