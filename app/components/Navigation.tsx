'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import Logo from './Logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const tools = [
    { name: 'JSON Beautifier', emoji: '🪄', path: 'json-beautifier' },
    { name: 'XML Beautifier', emoji: '🌟', path: 'xml-beautifier' },
    { name: 'Fake Name Generator', emoji: '👤', path: 'name' },
    { name: 'Fake Address Generator', emoji: '🏠', path: 'address' },
    { name: 'Fake Phone Number Generator', emoji: '📞', path: 'phone' },
    { name: 'Fake Company Name Generator', emoji: '🏢', path: 'company' },
    { name: 'Fake Email Generator', emoji: '🌐', path: 'internet' },
    { name: 'Lorem Ipsum Generator', emoji: '📝', path: 'loremIpsum' },
    { name: 'Fake Product Data Generator', emoji: '🛍️', path: 'commerce' },
    { name: 'Fake Finance & Banking Data Generator', emoji: '💰', path: 'finance' },
    { name: 'Fake Date Generator', emoji: '📅', path: 'date' },
    { name: 'Fake Vehicle Data Generator', emoji: '🚗', path: 'vehicle' },
    { name: 'Fake Word Generator', emoji: '📚', path: 'word' },
    { name: 'Fake Music Data Generator', emoji: '🎵', path: 'music' },
    { name: 'Fake Flight Data Generator', emoji: '✈️', path: 'flight' },
    { name: 'Fake Animal Data Generator', emoji: '🐾', path: 'animal' },
    { name: 'Fake Book Data Generator', emoji: '📖', path: 'book' },
    { name: 'Fake Recipe Generator', emoji: '🍔', path: 'recipe' },
    { name: 'Fake Science Data Generator', emoji: '🔬', path: 'science' },
    { name: 'Fake Developer Data Generator', emoji: '💻', path: 'developer' },
    { name: 'Fake File Data Generator', emoji: '⚙️', path: 'file' },
    { name: 'Fake Git Repository Generator', emoji: '🔧', path: 'git-repository' },
    { name: 'Fake Datatype Generator', emoji: '📊', path: 'data-type' },
    { name: 'Fake Location Generator', emoji: '📍', path: 'location' },
    { name: 'Fake String Generator', emoji: '🎲', path: 'string' },
    { name: 'Fake Text String Generator', emoji: '🔤', path: 'text-and-char-string' },
    { name: 'Fake Image URL Generator', emoji: '🖼️', path: 'image' },
    { name: 'Fake Database Generator', emoji: '🗄️', path: 'database' },
    { name: 'Fake Array & Object Data Generator', emoji: '🛠️', path: 'helpers' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo size="small" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              href="/"
              className={`transition-colors font-medium ${isActive('/')
                ? 'text-blue-600 font-semibold'
                : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Generators
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-gray-200 transition-colors font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 data-[state=open]:bg-transparent">
                    Tools
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white overflow-y-auto max-h-[500px] p-4 min-w-[300px] sm:min-w-[500px] md:min-w-[750px] lg:min-w-[850px] xl:min-w-[1050px] 2xl:min-w-[1200px]" >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {tools.map((tool) => (
                        <NavigationMenuLink asChild key={tool.path}>
                          <Link
                            href={`/tools/${tool.path}`}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                          >
                            <span className="flex-none">{tool.emoji}</span>
                            <span className="flex-grow">{tool.name}</span>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              href="/blog"
              className={`transition-colors font-medium ${isActive('/blog')
                ? 'text-blue-600 font-semibold'
                : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Blog
            </Link>

            <Link
              href="/glossary"
              className={`transition-colors font-medium ${isActive('/glossary')
                ? 'text-blue-600 font-semibold'
                : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Glossary
            </Link>

            <a
              href="mailto:contact@fakerbox.com"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t max-h-[400px] overflow-y-auto">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`transition-colors font-medium ${isActive('/')
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Generators
              </Link>

              <Link
                href="/blog"
                className={`transition-colors font-medium ${isActive('/blog')
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>

              <div className="pl-4">
                <div className="text-gray-600 font-medium mb-2">Tools</div>
                {tools.map((tool) => (
                  <Link
                    key={tool.path}
                    href={`/tools/${tool.path}`}
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-sm mb-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>

              <a
                href="mailto:contact@fakerbox.com"
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;
