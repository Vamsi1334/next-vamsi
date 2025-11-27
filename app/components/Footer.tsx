import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-8 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 text-sm mb-10">
          {/* Left Section */}
          <div>
            <h3 className="font-bold mb-3">Best Test Data Generators</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/top-mock-data-generators" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Top Mock Data Generators
                </Link>
              </li>
              <li>
                <Link href="/fakenamegenerator-vs-fakerbox" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Top Fake Name Generators
                </Link>
              </li>
              <li>
                <Link href="/top-json-beautifiers-and-formatters" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Best JSON Beautifier & Formatters
                </Link>
              </li>
              <li>
                <Link href="/top-xml-beautifiers-and-formatters" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Top XML Beautifiers & Formatters
                </Link>
              </li>
              <li>
                <Link href="/top-fake-address-generators" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Top Fake Address Generators
                </Link>
              </li>
              <li>
                <Link href="/top-lorem-ipsum-generators" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Top Lorem Ipsum Generators
                </Link>
              </li>
            </ul>
          </div>

          {/* Middle Section */}
          <div>
            <h3 className="font-bold mb-3">Popular Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/name" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Fake Name Generator 
                </Link>
              </li>
              <li>
                <Link href="/tools/loremIpsum" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Lorem Ipsum Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/address" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Fake Address Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/company" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Fake Company Name 
                </Link>
              </li>
              <li>
                <Link href="/tools/json-beautifier" className="text-gray-600 hover:text-blue-600 transition-colors">
                  JSON Beautifier
                </Link>
              </li>
              <li>
                <Link href="/tools/xml-beautifier" className="text-gray-600 hover:text-blue-600 transition-colors">
                  XML Beautifier
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <h3 className="font-bold mb-3">Latest Blogs</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/mockaroo-vs-fakerbox" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Fakerbox Vs Mockaroo
                </Link>
              </li>
              <li>
                <Link href="/blog/fakenamegenerator-vs-fakerbox" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Fakerbox Vs Fake Name Generator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 text-sm">
            © 2025 FakerBox. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-600 hover:text-blue-600 transition-colors">
              Terms of Service
            </Link>
            <a href="mailto:contact@fakerbox.com" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
