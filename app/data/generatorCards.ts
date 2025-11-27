
interface FieldOption {
  value: string;
  label: string;
}

interface Field {
  key: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: FieldOption[];
  min?: number;
  max?: number;
}

interface GeneratorCard {
  id: string;
  title: string;
  description: string;
  fields: Field[];
}

export const getDataGeneratorCards = (): GeneratorCard[] => [
  {
    id: 'words',
    title: 'Words',
    description: 'Generate random words or use regex patterns',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { key: 'regex', label: 'Regex Pattern (optional)', type: 'text', placeholder: '[A-Z]{3}[0-9]{3}' }
    ]
  },
  {
    id: 'numbers',
    title: 'Numbers',
    description: 'Generate random numbers within a range or from regex',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { key: 'min', label: 'Minimum', type: 'number', placeholder: '1' },
      { key: 'max', label: 'Maximum', type: 'number', placeholder: '1000' },
      { key: 'regex', label: 'Regex Pattern (optional)', type: 'text', placeholder: '[0-9]{4}' }
    ]
  },
  {
    id: 'phones',
    title: 'Phone Numbers',
    description: 'Generate phone numbers with custom formats',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { key: 'format', label: 'Format', type: 'text', placeholder: '###-###-####' }
    ]
  },
  {
    id: 'emails',
    title: 'Email Addresses',
    description: 'Generate realistic email addresses',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { key: 'provider', label: 'Provider (optional)', type: 'text', placeholder: 'gmail.com' }
    ]
  },
  {
    id: 'addresses',
    title: 'Addresses',
    description: 'Generate full street addresses',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 }
    ]
  },
  {
    id: 'names',
    title: 'Names',
    description: 'Generate first names, last names, or full names',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Name Type', 
        type: 'select',
        options: [
          { value: 'full', label: 'Full Name' },
          { value: 'first', label: 'First Name' },
          { value: 'last', label: 'Last Name' }
        ]
      }
    ]
  },
  {
    id: 'dates',
    title: 'Dates',
    description: 'Generate dates within a specified range',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { key: 'from', label: 'From Date', type: 'date' },
      { key: 'to', label: 'To Date', type: 'date' }
    ]
  },
  {
    id: 'companies',
    title: 'Companies',
    description: 'Generate company names and business phrases',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'name', label: 'Company Name' },
          { value: 'catchPhrase', label: 'Catch Phrase' },
          { value: 'buzzPhrase', label: 'Buzz Phrase' }
        ]
      }
    ]
  },
  {
    id: 'lorem',
    title: 'Lorem Ipsum',
    description: 'Generate lorem ipsum text',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 1000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'words', label: 'Words' },
          { value: 'sentences', label: 'Sentences' },
          { value: 'paragraphs', label: 'Paragraphs' }
        ]
      },
      { key: 'count', label: 'Count per Item', type: 'number', placeholder: '3', min: 1, max: 50 }
    ]
  },
  {
    id: 'internet',
    title: 'Internet',
    description: 'Generate URLs, domains, usernames, and passwords',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'url', label: 'URL' },
          { value: 'domainName', label: 'Domain Name' },
          { value: 'username', label: 'Username' },
          { value: 'password', label: 'Password' }
        ]
      }
    ]
  },
  {
    id: 'finance',
    title: 'Finance',
    description: 'Generate financial data like account numbers and credit cards',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'accountNumber', label: 'Account Number' },
          { value: 'routingNumber', label: 'Routing Number' },
          { value: 'creditCardNumber', label: 'Credit Card Number' },
          { value: 'iban', label: 'IBAN' }
        ]
      }
    ]
  },
  {
    id: 'vehicles',
    title: 'Vehicles',
    description: 'Generate vehicle information',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'vehicle', label: 'Vehicle' },
          { value: 'manufacturer', label: 'Manufacturer' },
          { value: 'model', label: 'Model' },
          { value: 'vin', label: 'VIN' }
        ]
      }
    ]
  },
  {
    id: 'colors',
    title: 'Colors',
    description: 'Generate color values in different formats',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'format', 
        label: 'Format', 
        type: 'select',
        options: [
          { value: 'rgb', label: 'RGB' },
          { value: 'hsl', label: 'HSL' }
        ]
      }
    ]
  },
  {
    id: 'commerce',
    title: 'Commerce',
    description: 'Generate e-commerce related data',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'productName', label: 'Product Name' },
          { value: 'department', label: 'Department' },
          { value: 'price', label: 'Price' },
          { value: 'productDescription', label: 'Product Description' }
        ]
      }
    ]
  },
  {
    id: 'science',
    title: 'Science',
    description: 'Generate scientific data',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'chemicalElement', label: 'Chemical Element' },
          { value: 'unit', label: 'Unit' }
        ]
      }
    ]
  },
  {
    id: 'music',
    title: 'Music',
    description: 'Generate music-related data',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'genre', label: 'Genre' },
          { value: 'songName', label: 'Song Name' }
        ]
      }
    ]
  },
  {
    id: 'food',
    title: 'Food',
    description: 'Generate food-related data',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'dish', label: 'Dish' },
          { value: 'ingredient', label: 'Ingredient' },
          { value: 'fruit', label: 'Fruit' },
          { value: 'vegetable', label: 'Vegetable' }
        ]
      }
    ]
  },
  {
    id: 'sports',
    title: 'Sports',
    description: 'Generate sports-related data',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'sport', label: 'Sport' },
          { value: 'team', label: 'Team' }
        ]
      }
    ]
  },
  {
    id: 'system',
    title: 'System',
    description: 'Generate system-related data',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'fileName', label: 'File Name' },
          { value: 'filePath', label: 'File Path' },
          { value: 'mimeType', label: 'MIME Type' },
          { value: 'fileExt', label: 'File Extension' }
        ]
      }
    ]
  },
  {
    id: 'git',
    title: 'Git',
    description: 'Generate Git-related data',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'commitMessage', label: 'Commit Message' },
          { value: 'branch', label: 'Branch' },
          { value: 'commitSha', label: 'Commit SHA' }
        ]
      }
    ]
  },
  {
    id: 'books',
    title: 'Books',
    description: 'Generate book-related data',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'title', label: 'Title' },
          { value: 'author', label: 'Author' },
          { value: 'genre', label: 'Genre' },
          { value: 'publisher', label: 'Publisher' }
        ]
      }
    ]
  },
  {
    id: 'animals',
    title: 'Animals',
    description: 'Generate animal-related data',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'type', label: 'Animal Type' },
          { value: 'bear', label: 'Bear' },
          { value: 'bird', label: 'Bird' },
          { value: 'cat', label: 'Cat' },
          { value: 'cetacean', label: 'Cetacean' },
          { value: 'cow', label: 'Cow' },
          { value: 'crocodilia', label: 'Crocodilia' },
          { value: 'dog', label: 'Dog' },
          { value: 'fish', label: 'Fish' },
          { value: 'horse', label: 'Horse' },
          { value: 'insect', label: 'Insect' },
          { value: 'lion', label: 'Lion' },
          { value: 'rabbit', label: 'Rabbit' },
          { value: 'rodent', label: 'Rodent' },
          { value: 'snake', label: 'Snake' }
        ]
      }
    ]
  },
  {
    id: 'airline',
    title: 'Airline',
    description: 'Generate airline-related data',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'airline', label: 'Airline' },
          { value: 'airplane', label: 'Airplane' },
          { value: 'airport', label: 'Airport' },
          { value: 'aircraftType', label: 'Aircraft Type' },
          { value: 'flightNumber', label: 'Flight Number' },
          { value: 'recordLocator', label: 'Record Locator' },
          { value: 'seat', label: 'Seat' }
        ]
      }
    ]
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Generate database-related data',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'column', label: 'Column' },
          { value: 'type', label: 'Type' },
          { value: 'collation', label: 'Collation' },
          { value: 'engine', label: 'Engine' },
          { value: 'mongodbObjectId', label: 'MongoDB Object ID' }
        ]
      }
    ]
  },
  {
    id: 'datatype',
    title: 'Datatype',
    description: 'Generate various data types',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'boolean', label: 'Boolean' },
          { value: 'number', label: 'Number' },
          { value: 'float', label: 'Float' },
          { value: 'bigInt', label: 'Big Int' },
          { value: 'hex', label: 'Hex' },
          { value: 'octal', label: 'Octal' },
          { value: 'binary', label: 'Binary' }
        ]
      }
    ]
  },
  {
    id: 'hacker',
    title: 'Hacker',
    description: 'Generate hacker-related phrases and terms',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'phrase', label: 'Phrase' },
          { value: 'noun', label: 'Noun' },
          { value: 'verb', label: 'Verb' },
          { value: 'adjective', label: 'Adjective' },
          { value: 'ingverb', label: 'Ing Verb' },
          { value: 'abbreviation', label: 'Abbreviation' }
        ]
      }
    ]
  },
  {
    id: 'helpers',
    title: 'Helpers',
    description: 'Generate data using helper functions',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'arrayElement', label: 'Array Element' },
          { value: 'arrayElements', label: 'Array Elements' },
          { value: 'objectKey', label: 'Object Key' },
          { value: 'objectValue', label: 'Object Value' },
          { value: 'shuffle', label: 'Shuffle' }
        ]
      },
      { key: 'elements', label: 'Elements (comma-separated)', type: 'text', placeholder: 'red,blue,green,yellow' }
    ]
  },
  {
    id: 'image',
    title: 'Image',
    description: 'Generate image URLs and data',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 1000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'url', label: 'URL' },
          { value: 'urlLoremFlickr', label: 'Lorem Flickr URL' },
          { value: 'urlPicsumPhotos', label: 'Picsum Photos URL' },
          { value: 'dataUri', label: 'Data URI' }
        ]
      },
      { key: 'width', label: 'Width', type: 'number', placeholder: '640', min: 100, max: 2000 },
      { key: 'height', label: 'Height', type: 'number', placeholder: '480', min: 100, max: 2000 }
    ]
  },
  {
    id: 'location',
    title: 'Location',
    description: 'Generate location-related data',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'city', label: 'City' },
          { value: 'country', label: 'Country' },
          { value: 'countryCode', label: 'Country Code' },
          { value: 'state', label: 'State' },
          { value: 'streetAddress', label: 'Street Address' },
          { value: 'zipCode', label: 'Zip Code' },
          { value: 'latitude', label: 'Latitude' },
          { value: 'longitude', label: 'Longitude' },
          { value: 'direction', label: 'Direction' },
          { value: 'timeZone', label: 'Time Zone' }
        ]
      }
    ]
  },
  {
    id: 'person',
    title: 'Person',
    description: 'Generate detailed person information',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'firstName', label: 'First Name' },
          { value: 'lastName', label: 'Last Name' },
          { value: 'middleName', label: 'Middle Name' },
          { value: 'fullName', label: 'Full Name' },
          { value: 'prefix', label: 'Prefix' },
          { value: 'suffix', label: 'Suffix' },
          { value: 'sex', label: 'Sex' },
          { value: 'gender', label: 'Gender' },
          { value: 'jobTitle', label: 'Job Title' },
          { value: 'jobDescriptor', label: 'Job Descriptor' },
          { value: 'jobType', label: 'Job Type' },
          { value: 'bio', label: 'Bio' }
        ]
      }
    ]
  },
  {
    id: 'random',
    title: 'Random',
    description: 'Generate random strings and identifiers',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'alpha', label: 'Alpha' },
          { value: 'alphanumeric', label: 'Alphanumeric' },
          { value: 'numeric', label: 'Numeric' },
          { value: 'uuid', label: 'UUID' },
          { value: 'nanoid', label: 'Nano ID' },
          { value: 'symbol', label: 'Symbol' }
        ]
      },
      { key: 'length', label: 'Length', type: 'number', placeholder: '10', min: 1, max: 100 }
    ]
  },
  {
    id: 'string',
    title: 'String',
    description: 'Generate various string types',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'alpha', label: 'Alpha' },
          { value: 'alphanumeric', label: 'Alphanumeric' },
          { value: 'binary', label: 'Binary' },
          { value: 'hexadecimal', label: 'Hexadecimal' },
          { value: 'numeric', label: 'Numeric' },
          { value: 'octal', label: 'Octal' },
          { value: 'sample', label: 'Sample' },
          { value: 'symbol', label: 'Symbol' },
          { value: 'uuid', label: 'UUID' },
          { value: 'nanoid', label: 'Nano ID' }
        ]
      },
      { key: 'length', label: 'Length', type: 'number', placeholder: '10', min: 1, max: 100 }
    ]
  },
  {
    id: 'word',
    title: 'Word',
    description: 'Generate different types of words',
    fields: [
      { key: 'quantity', label: 'Quantity', type: 'number', placeholder: '1', min: 1, max: 10000 },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'adjective', label: 'Adjective' },
          { value: 'adverb', label: 'Adverb' },
          { value: 'conjunction', label: 'Conjunction' },
          { value: 'interjection', label: 'Interjection' },
          { value: 'noun', label: 'Noun' },
          { value: 'preposition', label: 'Preposition' },
          { value: 'verb', label: 'Verb' },
          { value: 'words', label: 'Words' }
        ]
      }
    ]
  }
];
