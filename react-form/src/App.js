// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/submit-form', {
        firstName,
        lastName,
      });
      setMessage('Form submitted successfully!');
      setFirstName('');
      setLastName('');
    } catch (error) {
      setMessage('Error submitting form: ' + error.message);
    }
  };

  return (
    <div className="App">
      <h1>React Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
