import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {
  const [files, setFiles] = useState([]);
  const [titles, setTitles] = useState([]);
  const [descriptions, setDescriptions] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleTitleChange = (e, index) => {
    const updatedTitles = [...titles];
    updatedTitles[index] = e.target.value;
    setTitles(updatedTitles);
  };

  const handleDescriptionChange = (e, index) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index] = e.target.value;
    setDescriptions(updatedDescriptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append('file', file);
      formData.append('title', titles[index]);
      formData.append('body', descriptions[index]);
      formData.append('slug', '1234');
    });

    try {
      await axios
        .post('http://127.0.0.1:8000/api/posts/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          console.log(res.data);
        });
      // Form submission successful, do something
    } catch (error) {
      // Error handling
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {files.map((file, index) => (
        <div key={index}>
          <label>Title:</label>
          <input
            type="text"
            value={titles[index] || ''}
            onChange={(e) => handleTitleChange(e, index)}
          />
          <br />
          <label>Description:</label>
          <input
            type="text"
            value={descriptions[index] || ''}
            onChange={(e) => handleDescriptionChange(e, index)}
          />
          <br />
          <label>CSV File:</label>
          <input type="file" onChange={handleFileChange} />
          <br />
        </div>
      ))}
      <button type="button" onClick={() => setFiles([...files, null])}>
        Add Another File
      </button>
      <br />
      <button type="submit">Upload</button>
    </form>
  );
}

export default TodoList;
