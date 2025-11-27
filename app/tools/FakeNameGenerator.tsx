"use client"

import React, { JSX, useEffect, useRef, useState } from "react";

type Gender = "random" | "male" | "female";

type Person = {
  firstName: string;
  lastName: string;
  fullName: string;
  gender: "Male" | "Female";
  age: number;
};

export default function FakeNameGenerator(): JSX.Element {
  // --- name lists (kept identical to your original) ---
  const maleNames = [
    'James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher',
    'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua',
    'Kenneth', 'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Jason', 'Edward', 'Jeffrey', 'Ryan',
    'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon',
    'Benjamin', 'Samuel', 'Gregory', 'Alexander', 'Patrick', 'Frank', 'Raymond', 'Jack', 'Dennis', 'Jerry'
  ];

  const femaleNames = [
    'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
    'Lisa', 'Nancy', 'Betty', 'Dorothy', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Margaret',
    'Carol', 'Michelle', 'Laura', 'Sarah', 'Kimberly', 'Deborah', 'Dorothy', 'Lisa', 'Nancy', 'Karen',
    'Helen', 'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon', 'Michelle', 'Laura', 'Emily', 'Kimberly',
    'Deborah', 'Amy', 'Angela', 'Ashley', 'Brenda', 'Emma', 'Olivia', 'Cynthia', 'Marie', 'Janet'
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
    'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
  ];

  // --- state ---
  const [selectedGender, setSelectedGender] = useState<Gender>('random');
  const [rowCount, setRowCount] = useState<number>(1);
  const [currentName, setCurrentName] = useState<Person | null>(null);
  const [generatedData, setGeneratedData] = useState<Person[]>([]);
  const [bulkSummary, setBulkSummary] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    // Generate initial name (same behaviour as original bottom generateNames())
    generateNames();
    return () => { mountedRef.current = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- helpers ---
  const getRandomElement = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

  function generateSingleName(): Person {
    let firstName: string;
    let gender: 'Male' | 'Female';

    if (selectedGender === 'random') {
      gender = Math.random() < 0.5 ? 'Male' : 'Female';
      firstName = gender === 'Male' ? getRandomElement(maleNames) : getRandomElement(femaleNames);
    } else if (selectedGender === 'male') {
      gender = 'Male';
      firstName = getRandomElement(maleNames);
    } else {
      gender = 'Female';
      firstName = getRandomElement(femaleNames);
    }

    const lastName = getRandomElement(lastNames);
    const age = Math.floor(Math.random() * 70) + 18; // Age between 18-87

    return {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      gender,
      age
    };
  }

  // --- generation functions (sync and async for large sets) ---
  function generateNames() {
    const count = rowCount;

    if (count === 1) {
      const person = generateSingleName();
      setCurrentName(person);
      setGeneratedData([]);
      setBulkSummary('');
      setIsGenerating(false);
      return;
    }

    // Bulk generation
    setGeneratedData([]);
    setCurrentName(null);

    if (count > 1000) {
      setBulkSummary('Generating names... Please wait.');
      setIsGenerating(true);
      // async batch generation to avoid blocking
      generateBulkAsync(count);
    } else {
      const arr: Person[] = [];
      for (let i = 0; i < count; i++) arr.push(generateSingleName());
      setGeneratedData(arr);
      setBulkSummary(`Generated ${arr.length} names successfully!`);
      setIsGenerating(false);
    }
  }

  function generateBulkAsync(total: number) {
    const batchSize = 500;
    let processed = 0;

    function processBatch() {
      if (!mountedRef.current) return;
      const remaining = total - processed;
      const currentBatch = Math.min(batchSize, remaining);
      const batchArr: Person[] = [];

      for (let i = 0; i < currentBatch; i++) {
        batchArr.push(generateSingleName());
      }

      processed += currentBatch;

      // append to state in an immutable way
      setGeneratedData(prev => prev.concat(batchArr));
      setBulkSummary(`Generating names... ${processed}/${total}`);

      if (processed < total) {
        setTimeout(processBatch, 10);
      } else {
        setBulkSummary(`Generated ${total} names successfully!`);
        setIsGenerating(false);
      }
    }

    processBatch();
  }

  // --- download helpers ---
  function escapeCSV(value: string | number) {
    const str = String(value).replace(/"/g, '""');
    return `"${str}"`;
  }

  function downloadCSV() {
    if (generatedData.length === 0) return;
    let csv = 'First Name,Last Name,Full Name,Gender,Age';
    generatedData.forEach(person => {
      csv += `${escapeCSV(person.firstName)},${escapeCSV(person.lastName)},${escapeCSV(person.fullName)},${escapeCSV(person.gender)},${person.age}
`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fake_names_${generatedData.length}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  function downloadJSON() {
    if (generatedData.length === 0) return;
    const jsonData = {
      metadata: {
        generated_at: new Date().toISOString(),
        total_records: generatedData.length,
        gender_filter: selectedGender
      },
      data: generatedData
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fake_names_${generatedData.length}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // --- clipboard ---
  async function copyToClipboard() {
    if (!currentName) return;
    try {
      await navigator.clipboard.writeText(currentName.fullName);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentName.fullName;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  // --- render ---
  return (
    <div>
      {/* Inject original CSS exactly to preserve identical styling/animations */}
      <style>{`* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 10px;
  font-size: 2.5em;
  font-weight: 700;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
  font-size: 1.1em;
}

.gender-options {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.gender-btn {
  padding: 12px 24px;
  border: 2px solid #667eea;
  background: transparent;
  color: #667eea;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  min-width: 100px;
}

.gender-btn:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.gender-btn.active {
  background: #667eea;
  color: white;
}

.generate-btn {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
}

.generate-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.generate-btn:active {
  transform: translateY(-1px);
}

.result {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  padding: 25px;
  margin-top: 20px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.1);
  display: none;
}

.result.show {
  display: block;
  animation: fadeInUp 0.5s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.name-display {
  font-size: 2em;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  text-align: left;
}

.detail-item {
  background: rgba(255, 255, 255, 0.7);
  padding: 10px 15px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.detail-label {
  font-weight: 600;
  color: #555;
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  color: #333;
  font-size: 1.1em;
  margin-top: 2px;
}

.copy-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 15px;
  transition: all 0.3s ease;
}

.generation-options {
  margin-bottom: 30px;
}

.bulk-options {
  margin-bottom: 20px;
}

.bulk-options label {
  display: block;
  color: #555;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: left;
}

.bulk-options select {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  background: white;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.bulk-options select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.download-options {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
}

.download-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  min-width: 140px;
}

.download-btn.csv {
  background: #28a745;
  color: white;
}

.download-btn.json {
  background: #007bff;
  color: white;
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.bulk-result {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  padding: 25px;
  margin-top: 20px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.1);
  display: none;
  max-height: 400px;
  overflow-y: auto;
}

.bulk-result.show {
  display: block;
  animation: fadeInUp 0.5s ease;
}

.bulk-summary {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.2em;
  font-weight: 600;
  color: #333;
}

.names-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.names-table th {
  background: #667eea;
  color: white;
  padding: 12px;
  text-align: left;
  font-weight: 600;
}

.names-table td {
  padding: 10px 12px;
  border-bottom: 1px solid #e1e5e9;
}

.names-table tr:nth-child(even) {
  background: #f8f9fa;
}

.names-table tr:hover {
  background: #e3f2fd;
}

@media (max-width: 600px) {
  .container {
    padding: 30px 20px;
  }
      
  h1 {
    font-size: 2em;
  }
      
  .gender-options {
    gap: 10px;
  }
      
  .gender-btn {
    padding: 10px 20px;
    font-size: 14px;
    min-width: 80px;
  }
      
  .details {
    grid-template-columns: 1fr;
  }
}
`}</style>

      <div className="container">
        <h1>🇺🇸 Fake Name Generator</h1>
        <p className="subtitle">Generate realistic American names for testing purposes</p>

        <div className="gender-options">
          <button
            type="button"
            className={`gender-btn ${selectedGender === 'random' ? 'active' : ''}`}
            data-gender="random"
            onClick={() => setSelectedGender('random')}
          >
            Random
          </button>

          <button
            type="button"
            className={`gender-btn ${selectedGender === 'male' ? 'active' : ''}`}
            data-gender="male"
            onClick={() => setSelectedGender('male')}
          >
            Male
          </button>

          <button
            type="button"
            className={`gender-btn ${selectedGender === 'female' ? 'active' : ''}`}
            data-gender="female"
            onClick={() => setSelectedGender('female')}
          >
            Female
          </button>
        </div>

        <div className="generation-options">
          <div className="bulk-options">
            <label htmlFor="rowCount">Number of names:</label>
            <select id="rowCount" value={rowCount} onChange={e => setRowCount(Number(e.target.value))}>
              <option value={1}>1 (Single)</option>
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={500}>500</option>
              <option value={1000}>1000</option>
              <option value={5000}>5000</option>
            </select>
          </div>

          <button className="generate-btn" onClick={generateNames}>Generate Names</button>

          <div id="downloadOptions" style={{ display: generatedData.length > 0 ? 'flex' : 'none' }} className="download-options">
            <button className="download-btn csv" onClick={downloadCSV}>📊 Download CSV</button>
            <button className="download-btn json" onClick={downloadJSON}>📄 Download JSON</button>
          </div>
        </div>

        <div className={`result ${currentName ? 'show' : ''}`} id="result">
          <div className="name-display" id="nameDisplay">{currentName?.fullName ?? ''}</div>
          <div className="details">
            <div className="detail-item">
              <div className="detail-label">First Name</div>
              <div className="detail-value" id="firstName">{currentName?.firstName ?? ''}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Last Name</div>
              <div className="detail-value" id="lastName">{currentName?.lastName ?? ''}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Gender</div>
              <div className="detail-value" id="gender">{currentName?.gender ?? ''}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Age</div>
              <div className="detail-value" id="age">{currentName?.age ?? ''}</div>
            </div>
          </div>
          <button className="copy-btn" onClick={copyToClipboard}>{copied ? 'Copied!' : 'Copy Full Name'}</button>
        </div>

        <div className={`bulk-result ${generatedData.length > 0 ? 'show' : ''}`} id="bulkResult">
          <div className="bulk-summary" id="bulkSummary">{bulkSummary}</div>
          <div style={{ overflowX: 'auto' }}>
            <table className="names-table" id="namesTable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody id="namesTableBody">
                {generatedData.slice(0, 100).map((person, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{person.firstName}</td>
                    <td>{person.lastName}</td>
                    <td>{person.gender}</td>
                    <td>{person.age}</td>
                  </tr>
                ))}

                {generatedData.length > 100 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>
                      Showing first 100 rows. Download file to view all {generatedData.length} names.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
