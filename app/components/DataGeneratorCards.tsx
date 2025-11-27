'use client';

import React, { useState } from 'react';
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

const DataGeneratorCards = () => {
  const [generatedData, setGeneratedData] = useState<any>(null);
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: boolean | string }>({});
  const [rowCount, setRowCount] = useState(10);
const [activeCategory, setActiveCategory] = useState<Category | ''>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
const [selectedFields, setSelectedFields] = useState<Record<string, boolean>>({});
  const [downloadFormat, setDownloadFormat] = useState<'csv' | 'json'>('csv');
  const [regexPattern, setRegexPattern] = useState('');
  const { toast } = useToast();

  const generatorCategories = [
    'person',
    'address',
    'phone',
    'internet',
    'company',
    'lorem',
    'commerce',
    'finance',
    'date',
    'vehicle',
    'word',
    'music',
    'airline',
    'animal',
    'book',
    'food',
    'hacker',
    'science',
    'system',
    'git',
    'datatype',
    'location',
    'random',
    'string',
    'image',
    'database',
    'helpers',
  ] as const;
type Category = (typeof generatorCategories)[number];

  const categoryIcons = {
    person: '👤',
    address: '🏠',
    phone: '📞',
    internet: '🌐',
    company: '🏢',
    lorem: '📝',
    commerce: '🛍️',
    finance: '💰',
    date: '📅',
    vehicle: '🚗',
    word: '📚',
    music: '🎵',
    airline: '✈️',
    animal: '🐾',
    book: '📖',
    food: '🍔',
    hacker: '💻',
    science: '🔬',
    system: '⚙️',
    git: '🔧',
    datatype: '📊',
    location: '📍',
    random: '🎲',
    string: '🔤',
    image: '🖼️',
    database: '🗄️',
    helpers: '🛠️',
  };

  const categoryDescriptions = {
    person: 'Generate fake names, realistic user profiles, and mock personal data for testing applications and databases',
    address: 'Create fake addresses, mock location data, and sample postal information for development and testing purposes',
    phone: 'Generate dummy phone numbers, fake contact data, and mock telephone information for app testing',
    internet: 'Create fake emails, mock usernames, sample URLs, and dummy internet data for web development testing',
    company: 'Generate fake company names, mock business data, and sample corporate information for testing platforms',
    lorem: 'Create lorem ipsum text, placeholder content, and dummy text data for UI design and content testing',
    commerce: 'Generate fake product data, mock e-commerce information, and sample retail data for online store testing',
    finance: 'Create fake financial data, mock banking information, and sample transaction data for fintech testing',
    date: 'Generate random dates, mock timestamp data, and sample time information for calendar and scheduling apps',
    vehicle: 'Create fake car data, mock vehicle information, and sample automotive data for transportation apps',
    word: 'Generate random words, fake vocabulary data, and sample text content for language and writing applications',
    music: 'Create fake music data, mock song information, and sample audio metadata for music platform testing',
    airline: 'Generate fake flight data, mock airline information, and sample aviation data for travel app testing',
    animal: 'Create fake animal data, mock pet information, and sample wildlife data for nature and pet applications',
    book: 'Generate fake book data, mock library information, and sample literary data for reading platform testing',
    food: 'Create fake recipe data, mock restaurant information, and sample culinary data for food app testing',
    hacker: 'Generate tech-themed phrases, mock developer data, and sample programming-related content for tech platforms',
    science: 'Create fake scientific data, mock research information, and sample academic data for educational platforms',
    system: 'Generate fake file data, mock system information, and sample technical data for software development testing',
    git: 'Create fake repository data, mock version control information, and sample development data for coding platforms',
    datatype: 'Generate various data types, mock primitive values, and sample structured data for database testing',
    location: 'Create fake geographic data, mock coordinates, and sample location information for mapping applications',
    random: 'Generate random strings, mock identifiers, and sample unique data for general development testing purposes',
    string: 'Create fake text strings, mock character data, and sample alphanumeric content for string manipulation testing',
    image: 'Generate fake image URLs, mock photo data, and sample visual content for media and design applications',
    database: 'Create fake database schemas, mock table data, and sample SQL information for database development testing',
    helpers: 'Generate utility data, mock helper functions, and sample array/object data for development and testing tools',
  };

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
    address: {
      'Full Address': () => faker.location.streetAddress(true),
      'Street Address': () => faker.location.streetAddress(),
      'Building Number': () => faker.location.buildingNumber(),
      'City': () => faker.location.city(),
      'County': () => faker.location.county(),
      'Country': () => faker.location.country(),
      'Country Code': () => faker.location.countryCode(),
      'State': () => faker.location.state(),
      'State Abbreviation': () => faker.location.state({ abbreviated: true }),
      'Zip Code': () => faker.location.zipCode(),
      'Latitude': () => faker.location.latitude(),
      'Longitude': () => faker.location.longitude(),
    },
    phone: {
      'Phone Number': () => faker.phone.number(),
    },
    internet: {
      'Email': () => faker.internet.email(),
      'Example Email': () => faker.internet.exampleEmail(),
'User Name': () => faker.internet.username(),
      'Protocol': () => faker.internet.protocol(),
      'URL': () => faker.internet.url(),
      'Domain Name': () => faker.internet.domainName(),
      'Domain Suffix': () => faker.internet.domainSuffix(),
      'Domain Word': () => faker.internet.domainWord(),
      'IP': () => faker.internet.ip(),
      'IPv6': () => faker.internet.ipv6(),
      'Mac': () => faker.internet.mac(),
      'Password': () => faker.internet.password(),
    },
    company: {
      'Name': () => faker.company.name(),
      'Catch Phrase': () => faker.company.catchPhrase(),
      'Buzz Phrase': () => faker.company.buzzPhrase(),
    },
    lorem: {
      'Word': () => faker.lorem.word(),
      'Words': () => faker.lorem.words(),
      'Sentence': () => faker.lorem.sentence(),
      'Sentences': () => faker.lorem.sentences(),
      'Paragraph': () => faker.lorem.paragraph(),
      'Paragraphs': () => faker.lorem.paragraphs(),
    },
    commerce: {
      'Department': () => faker.commerce.department(),
      'ProductName': () => faker.commerce.productName(),
      'Price': () => faker.commerce.price(),
      'ProductAdjective': () => faker.commerce.productAdjective(),
      'ProductMaterial': () => faker.commerce.productMaterial(),
      'Product': () => faker.commerce.product(),
    },
    finance: {
      'Account Number': () => faker.finance.accountNumber(),
      'Account Name': () => faker.finance.accountName(),
      'Amount': () => faker.finance.amount(),
      'Transaction Type': () => faker.finance.transactionType(),
      'Currency Code': () => faker.finance.currencyCode(),
      'Currency Name': () => faker.finance.currencyName(),
      'Currency Symbol': () => faker.finance.currencySymbol(),
      'Bitcoin Address': () => faker.finance.bitcoinAddress(),
      'Credit Card Number': () => faker.finance.creditCardNumber(),
      'IBAN': () => faker.finance.iban(),
    },
    date: {
      'Past': () => faker.date.past().toString(),
      'Future': () => faker.date.future().toString(),
      'Soon': () => faker.date.soon().toString(),
      'Recent': () => faker.date.recent().toString(),
      'Month': () => faker.date.month(),
      'Weekday': () => faker.date.weekday(),
    },
    vehicle: {
      'Vehicle': () => faker.vehicle.vehicle(),
      'Manufacturer': () => faker.vehicle.manufacturer(),
      'Model': () => faker.vehicle.model(),
      'Type': () => faker.vehicle.type(),
      'Fuel': () => faker.vehicle.fuel(),
      'Color': () => faker.vehicle.color(),
      'VIN': () => faker.vehicle.vin(),
      'VRM': () => faker.vehicle.vrm(),
    },
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
    music: {
      'Genre': () => faker.music.genre(),
      'Song Name': () => faker.music.songName(),
    },
    airline: {
      'Aircraft Type': () => faker.airline.aircraftType(),
      'Airline': () => faker.airline.airline(),
      'Airplane': () => faker.airline.airplane(),
      'Airport': () => faker.airline.airport(),
      'Flight Number': () => faker.airline.flightNumber(),
      'Record Locator': () => faker.airline.recordLocator(),
      'Seat': () => faker.airline.seat(),
    },
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
    book: {
      'Author': () => faker.book.author(),
      'Format': () => faker.book.format(),
      'Genre': () => faker.book.genre(),
      'Publisher': () => faker.book.publisher(),
      'Series': () => faker.book.series(),
      'Title': () => faker.book.title(),
    },
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
    hacker: {
      'Abbreviation': () => faker.hacker.abbreviation(),
      'Adjective': () => faker.hacker.adjective(),
      'Ingverb': () => faker.hacker.ingverb(),
      'Noun': () => faker.hacker.noun(),
      'Phrase': () => faker.hacker.phrase(),
      'Verb': () => faker.hacker.verb(),
    },
    science: {
      'Chemical Element': () => faker.science.chemicalElement().name,
      'Chemical Symbol': () => faker.science.chemicalElement().symbol,
      'Unit': () => faker.science.unit().name,
    },
    system: {
      'File Name': () => faker.system.fileName(),
      'File Path': () => faker.system.filePath(),
      'MIME Type': () => faker.system.mimeType(),
      'File Extension': () => faker.system.fileExt(),
    },
    git: {
      'Commit Message': () => faker.git.commitMessage(),
      'Branch': () => faker.git.branch(),
      'Commit SHA': () => faker.git.commitSha(),
    },
    datatype: {
      'Boolean': () => faker.datatype.boolean().toString(),
      'Number': () => faker.number.int().toString(),
      'Float': () => faker.number.float().toString(),
      'Big Int': () => faker.number.bigInt().toString(),
      'UUID': () => faker.string.uuid(),
    },
    location: {
      'City': () => faker.location.city(),
      'Country': () => faker.location.country(),
      'Country Code': () => faker.location.countryCode(),
      'State': () => faker.location.state(),
      'Street Address': () => faker.location.streetAddress(),
      'Zip Code': () => faker.location.zipCode(),
      'Latitude': () => faker.location.latitude(),
      'Longitude': () => faker.location.longitude(),
      'Direction': () => faker.location.direction(),
      'Time Zone': () => faker.location.timeZone(),
    },
    random: {
      'Alpha': () => faker.string.alpha(10),
      'Alphanumeric': () => faker.string.alphanumeric(10),
      'Numeric': () => faker.string.numeric(10),
      'UUID': () => faker.string.uuid(),
      'Nano ID': () => faker.string.nanoid(),
      'Symbol': () => faker.string.symbol(10),
    },
    string: {
      'Alpha': () => faker.string.alpha(10),
      'Alphanumeric': () => faker.string.alphanumeric(10),
      'Numeric': () => faker.string.numeric(10),
      'UUID': () => faker.string.uuid(),
      'Nano ID': () => faker.string.nanoid(),
    },
    image: {
      'URL': () => faker.image.url(),
      'Avatar URL': () => faker.image.avatar(),
      'Data URI': () => faker.image.dataUri(),
    },
    database: {
      'Column': () => faker.database.column(),
      'Type': () => faker.database.type(),
      'Collation': () => faker.database.collation(),
      'Engine': () => faker.database.engine(),
      'MongoDB Object ID': () => faker.database.mongodbObjectId(),
    },
    helpers: {
      'Array Element': () => faker.helpers.arrayElement(['red', 'blue', 'green', 'yellow']),
      'Object Key': () => faker.helpers.objectKey({ name: 'John', age: 30, city: 'New York' }),
      'Object Value': () => faker.helpers.objectValue({ name: 'John', age: 30, city: 'New York' }),
      'Shuffle Array': () => faker.helpers.shuffle(['apple', 'banana', 'cherry']).join(', '),
    },
  };

  const generateRegexData = (pattern: string) => {
    try {
      return faker.helpers.fromRegExp(pattern);
    } catch (error) {
      console.error('Invalid regex pattern:', error);
      return 'Invalid Pattern';
    }
  };

const generateData = (category: keyof typeof categoryFields, count: number = 10) => {
  if (count < 1 || count > 5000) {
    toast({
      title: "Invalid Row Count",
      description: "Please enter a number between 1 and 5,000 rows.",
      variant: "destructive"
    });
    return;
  }

  // Narrow fields type
  const fields = categoryFields[category] as Record<string, () => string>;

  // Only selected fields that exist in fields
  const selectedFieldNames = Object.keys(selectedFields)
    .filter(key => selectedFields[key] && key in fields);

  if (regexPattern.trim() && selectedFieldNames.length === 0) {
    const dataArray = Array.from({ length: count }, () => ({
      'Regex Pattern': generateRegexData(regexPattern.trim())
    }));
    setGeneratedData(dataArray);
    setCopyStatus({});
    return;
  }

  if (selectedFieldNames.length === 0 && !regexPattern.trim()) {
    toast({
      title: "No Fields or Pattern Selected",
      description: "Please select at least one field or provide a regex pattern to generate data.",
      variant: "destructive"
    });
    return;
  }

  const dataArray: Record<string, string>[] = [];

  for (let i = 0; i < count; i++) {
    const newData: Record<string, string> = {};

    selectedFieldNames.forEach((fieldName) => {
      // Cast fieldName to string to make TS happy
      newData[fieldName] = (fields[fieldName] as () => string)();
    });

    if (regexPattern.trim()) {
      newData['Regex Pattern'] = generateRegexData(regexPattern.trim());
    }

    dataArray.push(newData);
  }

  setGeneratedData(dataArray);
  setCopyStatus({});
};



  const handleCopyToClipboard = (key: string, value: string) => {
    navigator.clipboard.writeText(value)
      .then(() => {
        setCopyStatus(prev => ({ ...prev, [key]: true }));
        setTimeout(() => {
          setCopyStatus(prev => ({ ...prev, [key]: false }));
        }, 2000);
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
        setCopyStatus(prev => ({ ...prev, [key]: 'error' }));
        setTimeout(() => {
          setCopyStatus(prev => ({ ...prev, [key]: false }));
        }, 2000);
      });
  };

  const copyAllData = () => {
    if (!generatedData) return;
    
    const allDataText = generatedData.map((record: any, index: number) => {
      const recordText = Object.entries(record).map(([key, value]) => `${key}: ${value}`).join('\n');
      return `Record ${index + 1}:\n${recordText}`;
    }).join('\n\n');
    
    navigator.clipboard.writeText(allDataText);
  };

const openCategoryDialog = (category: Category) => {
  setActiveCategory(category);
  setRowCount(10);
  setGeneratedData(null);
  setIsDialogOpen(true);
  setDownloadFormat('csv');

  const fields = categoryFields[category];
  const initialSelection: Record<string, boolean> = {};
  Object.keys(fields).forEach((field, index) => {
    initialSelection[field] = index < 3; // first 3 fields selected
  });
  setSelectedFields(initialSelection);
};


const handleGenerate = () => {
  if (activeCategory) {
    generateData(activeCategory, rowCount);
  }
};


  const handleRowCountChange = (value: string) => {
    const numValue = parseInt(value) || 1;
    // Clamp the value between 1 and 5000
    const clampedValue = Math.min(Math.max(numValue, 1), 5000);
    setRowCount(clampedValue);
    
    // Show warning if user tried to enter more than 5000
    if (numValue > 5000) {
      toast({
        title: "Maximum Limit Reached",
        description: "Maximum of 5,000 rows allowed to prevent performance issues.",
        variant: "destructive"
      });
    }
  };

  const getDataAsStringArray = () => {
    if (!generatedData) return [];
    
    return generatedData.map((record: any, index: number) => {
      const recordText = Object.entries(record).map(([key, value]) => `${key}: ${value}`).join(', ');
      return `Record ${index + 1}: ${recordText}`;
    });
  };

  const handleFieldToggle = (fieldName: string, checked: boolean) => {
    setSelectedFields(prev => ({
      ...prev,
      [fieldName]: checked
    }));
  };

  const downloadData = () => {
    if (!generatedData || generatedData.length === 0) return;

    let fileContent: string;
    let mimeType: string;
    let fileExtension: string;

    if (downloadFormat === 'csv') {
      const headers = Object.keys(generatedData[0]);
      const csvContent = [
        headers.join(','),
        ...generatedData.map((record: any) =>
          headers.map(header => `"${String(record[header]).replace(/"/g, '""')}"`).join(',')
        )
      ].join('\n');
      
      fileContent = csvContent;
      mimeType = 'text/csv';
      fileExtension = 'csv';
    } else {
      fileContent = JSON.stringify(generatedData, null, 2);
      mimeType = 'application/json';
      fileExtension = 'json';
    }

    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeCategory}-data.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Legacy CSV download function for backward compatibility
  const downloadCSV = () => {
    setDownloadFormat('csv');
    downloadData();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {generatorCategories.map((category) => (
        <Card key={category} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="text-4xl mb-2">{categoryIcons[category as keyof typeof categoryIcons]}</div>
            <CardTitle className="text-xl font-semibold capitalize">{category}</CardTitle>
            <CardDescription className="text-gray-500 text-sm leading-relaxed">
              {categoryDescriptions[category as keyof typeof categoryDescriptions]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={isDialogOpen && activeCategory === category} onOpenChange={(open) => {
              if (!open) {
                setIsDialogOpen(false);
                setActiveCategory('');
                setGeneratedData(null);
              }
            }}>
              <DialogTrigger asChild>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200" 
                  onClick={() => openCategoryDialog(category)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Generate {category} Data
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-900 capitalize">
                    {category} Data
                  </DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
                  {/* Left Side - Configuration */}
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Select Fields to Generate</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 max-h-64 overflow-y-auto">
                        {Object.keys(categoryFields[activeCategory as keyof typeof categoryFields] || {}).map((fieldName) => (
                          <div key={fieldName} className="flex items-center space-x-2">
                            <Checkbox
                              id={fieldName}
                              checked={selectedFields[fieldName] || false}
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
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DataGeneratorCards;
