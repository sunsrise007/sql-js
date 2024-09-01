import React, { useEffect, useState } from 'react';
import './App.css'; // CSS dosyasını import ettik

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newEntry, setNewEntry] = useState("");
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:3001/api/data')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      });
  };

  const handleEdit = (id, value) => {
    setEditing(id);
    setEditValue(value);
  };

  const handleSave = (id) => {
    if (id === undefined || id === null) {
      console.error('ID is undefined or null');
      return;
    }

    fetch(`http://localhost:3001/api/data/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ col1: editValue }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Network response was not ok: ${text}`);
          });
        }
        return response.json();
      })
      .then(() => {
        fetchData();
        setEditing(null);
        setEditValue("");
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        setError(`Error updating data: ${error.message}`);
      });
  };

  const handleInsert = () => {
    if (!newEntry) {
      console.error('No entry to insert');
      return;
    }

    fetch('http://localhost:3001/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ col1: newEntry }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Network response was not ok: ${text}`);
          });
        }
        return response.json();
      })
      .then(() => {
        fetchData();
        setNewEntry("");
      })
      .catch((error) => {
        console.error('Error inserting data:', error);
        setError(`Error inserting data: ${error.message}`);
      });
  };

  const handleDelete = (id) => {
    if (id === undefined || id === null) {
      console.error('ID is undefined or null');
      return;
    }

    fetch(`http://localhost:3001/api/data/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Network response was not ok: ${text}`);
          });
        }
        return response.json();
      })
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
        setError(`Error deleting data: ${error.message}`);
      });
  };

  const handleResetDatabase = () => {
    fetch('http://localhost:3001/api/reset', {
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Network response was not ok: ${text}`);
          });
        }
        return response.json();
      })
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error('Error resetting database:', error);
        setError(`Error resetting database: ${error.message}`);
      });
  };

  const handleFocus = (event) => {
    event.target.select(); // Input elemanını seç
  };

  const handleKeyDown = (event, id) => {
    if (event.key === 'Enter') {
      if (id === null) {
        handleInsert();
      } else {
        handleSave(id);
      }
    }
  };

  return (
    <div className="App">
      <h1>Database Data</h1>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  {editing === row.id ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, row.id)} // Enter tuşuna basıldığında save et
                      onFocus={handleFocus} // Input focus olunca seçili yap
                    />
                  ) : (
                    row.col1
                  )}
                </td>
                <td>
                  {editing === row.id ? (
                    <>
                      <button onClick={() => handleSave(row.id)}>Save</button>
                      <button onClick={() => setEditing(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(row.id, row.col1)}>Edit</button>
                      <button onClick={() => handleDelete(row.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <input
          type="text"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, null)} // Enter tuşuna basıldığında insert et
          placeholder="New entry"
        />
        <button onClick={handleInsert}>Insert</button>
      </div>
      <button onClick={handleResetDatabase}>Reset Database</button>
    </div>
  );
}

export default App;
