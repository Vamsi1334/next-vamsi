'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useToast } from '../hooks/use-toast';
import { Copy, Download, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import ToolsNav from "../tools/ToolsNav";

const XmlBeautifier = () => {
  const [inputXml, setInputXml] = useState('');
  const [outputXml, setOutputXml] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const { toast } = useToast();

  const formatXml = (xml: string): string => {
    const PADDING = ' '.repeat(2);
    const reg = /(>)(<)(\/*)/g;
    let formatted = xml.replace(reg, '$1\r\n$2$3');

    let pad = 0;
    return formatted.split('\r\n').map(line => {
      let indent = 0;
      if (line.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (line.match(/^<\/\w/) && pad > 0) {
        pad -= 1;
      } else if (line.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }

      const padding = PADDING.repeat(pad);
      pad += indent;
      return padding + line;
    }).join('\r\n');
  };

  const isValidXml = (xmlString: string): boolean => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
      const errorNode = xmlDoc.querySelector('parsererror');
      return !errorNode;
    } catch (err) {
      return false;
    }
  };

  const highlightXmlSyntax = (xml: string): string => {
    // First escape HTML entities to prevent interference
    let highlighted = xml
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    // Apply syntax highlighting
    highlighted = highlighted
      // XML declarations <?xml ... ?>
      .replace(/(&lt;\?xml[^?]*\?&gt;)/g, '<span style="color: #9333ea;">$1</span>')
      // Comments <!-- ... -->
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span style="color: #6b7280; font-style: italic;">$1</span>')
      // CDATA sections
      .replace(/(&lt;!\[CDATA\[[\s\S]*?\]\]&gt;)/g, '<span style="color: #ea580c;">$1</span>')
      // Opening tags with attributes <tag attr="value">
      .replace(/(&lt;)([a-zA-Z0-9\-_:]+)([^&gt;]*?)(&gt;)/g, (match, openBracket, tagName, attributes, closeBracket) => {
        // Highlight attributes within the tag
        const highlightedAttributes = attributes.replace(
          /([a-zA-Z0-9\-_:]+)(=)(&quot;[^&quot;]*&quot;|&#039;[^&#039;]*&#039;)/g,
          '<span style="color: #16a34a;">$1</span><span style="color: #374151;">$2</span><span style="color: #ca8a04;">$3</span>'
        );

        return `<span style="color: #2563eb;">${openBracket}</span><span style="color: #dc2626; font-weight: 600;">${tagName}</span>${highlightedAttributes}<span style="color: #2563eb;">${closeBracket}</span>`;
      })
      // Closing tags </tag>
      .replace(/(&lt;\/)([a-zA-Z0-9\-_:]+)(&gt;)/g,
        '<span style="color: #2563eb;">$1</span><span style="color: #dc2626; font-weight: 600;">$2</span><span style="color: #2563eb;">$3</span>')
      // Self-closing tags
      .replace(/(\s)(\/&gt;)/g, '$1<span style="color: #2563eb;">$2</span>');

    return highlighted;
  };

  const beautifyXml = () => {
    setError('');
    setIsProcessing(true);

    try {
      if (!inputXml.trim()) {
        setError('Please enter some XML data to beautify.');
        setOutputXml('');
        setIsProcessing(false);
        return;
      }

      if (!isValidXml(inputXml)) {
        setError('Invalid XML format. Please check your input and try again.');
        setOutputXml('');
        setIsProcessing(false);
        return;
      }

      const beautified = formatXml(inputXml.trim());
      setOutputXml(beautified);

      toast({
        title: "Success!",
        description: "XML has been beautified successfully."
      });
    } catch (err) {
      setError('Invalid XML format. Please check your input and try again.');
      setOutputXml('');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async () => {
    if (!outputXml) return;

    try {
      await navigator.clipboard.writeText(outputXml);
      setCopySuccess(true);
      toast({
        title: "Copied!",
        description: "Beautified XML copied to clipboard."
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

  const downloadXml = () => {
    if (!outputXml) return;

    const blob = new Blob([outputXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'beautified.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "XML file saved successfully."
    });
  };

  const clearAll = () => {
    setInputXml('');
    setOutputXml('');
    setError('');
    setCopySuccess(false);
  };

  return (
    <>
    
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">XML Beautifier & Formatter</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Format, validate, and prettify your XML data with our easy-to-use online tool.
              Perfect for developers who need clean, readable XML code instantly.
            </p>
          </div>

          {/* Features Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-center mb-8">Why Use Our XML Beautifier?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-card border shadow-sm">
                <Sparkles className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Format & Prettify</h3>
                <p className="text-sm text-muted-foreground">
                  Transform minified XML into readable, properly indented format with 2-space indentation
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-card border shadow-sm">
                <AlertCircle className="w-8 h-8 mx-auto mb-3 text-secondary" />
                <h3 className="font-semibold mb-2">Validate XML Syntax</h3>
                <p className="text-sm text-muted-foreground">
                  Instantly detect and highlight XML syntax errors with detailed error messages
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-card border shadow-sm">
                <Copy className="w-8 h-8 mx-auto mb-3 text-accent" />
                <h3 className="font-semibold mb-2">Copy & Download</h3>
                <p className="text-sm text-muted-foreground">
                  Easily copy formatted XML to clipboard or download as a .xml file
                </p>
              </div>
            </div>
          </section>

          <section className="grid lg:grid-cols-2 gap-6 mb-16">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Input XML Data</h2>
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
                  value={inputXml}
                  onChange={(e) => setInputXml(e.target.value)}
                  placeholder="Paste your XML here, e.g., <?xml version=&quot;1.0&quot;?><root><item>value</item></root>"
                  className="min-h-[400px] font-mono text-sm resize-none"
                />
              </div>

              <Button
                onClick={beautifyXml}
                disabled={isProcessing || !inputXml.trim()}
                className="w-full"
                size="lg"
                variant="default"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isProcessing ? 'Processing...' : 'Beautify XML'}
              </Button>
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Formatted XML Output</h2>
                {outputXml && (
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
                      onClick={downloadXml}
                      className="text-sm border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                )}
              </div>

              <div className="relative">
                {outputXml ? (
                  <div className="min-h-[400px] w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm font-mono overflow-auto whitespace-pre-wrap leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: highlightXmlSyntax(outputXml)
                    }}
                  />
                ) : (
                  <div className="min-h-[400px] w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm font-mono flex items-center justify-center text-muted-foreground">
                    Beautified XML will appear here...
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
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-center my-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <h3 className="font-semibold mb-2">What is XML beautification?</h3>
                <p className="text-sm text-muted-foreground">
                  XML beautification is the process of formatting minified or compressed XML data into a readable,
                  properly indented structure. This makes it easier for developers to read, debug, and understand XML data.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <h3 className="font-semibold mb-2">How do I use this XML formatter?</h3>
                <p className="text-sm text-muted-foreground">
                  Simply paste your XML data into the input area and click the &quot;Beautify XML&quot; button.
                  The tool will automatically format and validate your XML, displaying the result in the output area.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <h3 className="font-semibold mb-2">What happens if my XML is invalid?</h3>
                <p className="text-sm text-muted-foreground">
                  If your XML contains syntax errors, the tool will display a clear error message explaining what went wrong.
                  This helps you quickly identify and fix XML formatting issues.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <h3 className="font-semibold mb-2">Can I download the formatted XML?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes! Once your XML is beautified, you can either copy it to your clipboard or download it as a .xml file
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
                <h3 className="font-semibold mb-2">JSON Beautifier</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Need to format JSON data? Try our JSON Beautifier tool for clean, readable JSON formatting.
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/tools/json-beautifier'}
                  className="text-sm"
                >
                  Try JSON Beautifier
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

export default XmlBeautifier;