import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const [username, setUsername] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !username || !caption) {
      setErrorMessage('Please fill in all the fields');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('username', username);
    formData.append('caption', caption);

    fetch('https://project-pictopia-2.onrender.com/api/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error uploading data');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data uploaded successfully:', data);
        // Redirect to home page
        navigate('/');
      })
      .catch(error => {
        console.error('Error uploading data:', error);
        // Handle error if needed
      });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">Create Post</h1>
      <div className="flex flex-col space-y-4 max-w-md mx-auto">
        <div className="flex flex-col">
          <label htmlFor="username" className="text-gray-600 font-semibold mb-2">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="border border-gray-400 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="caption" className="text-gray-600 font-semibold mb-2">Caption:</label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={handleCaptionChange}
            className="border border-gray-400 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="file" className="text-gray-600 font-semibold mb-2">Select Image:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="border border-gray-400 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 w-full h-auto" />
          )}
        </div>
        {errorMessage && (
          <p className="text-red-500">{errorMessage}</p>
        )}
        <button onClick={handleUpload} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">
          Upload
        </button>
      </div>
    </div>
  );
};

export default Create;
