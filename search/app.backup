import React, { useState } from 'react';
import './App.css';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState([]); // Initial empty array
  const [status, setStatus] = useState('');

  const performSearch = () => {
    fetch('http://localhost:3001/api/search', { // Ensure this URL matches the server endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: inputValue }) // Send the search query
    })
      .then(response => {
        // Log the response to check if it's HTML
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
      })
      .then(data => {
        console.log('Data:', data); // For debugging
        if (Array.isArray(data.result)) {
          setResult(data.result); // Update state with the result
        } else {
          setResult([]); // Reset result if the data is not an array
        }
        setStatus('Data fetched successfully');
      })
      .catch(error => {
        console.error('Error:', error);
        setStatus('Failed to fetch data');
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <div className="Search">
      <h1>Search</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search..."
      />
      <button onClick={performSearch}>Search</button>
      
      <ul>
        {result.length > 0 ? (
          result.map((item, index) => <li key={index}>{item.col1}</li>)
        ) : (
          <li>No match found</li>
        )}
      </ul>
      <pre>Status: {status}</pre>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Search />
    </div>
  );
}

export default App;
