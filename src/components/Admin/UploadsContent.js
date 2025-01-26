import React, { useState } from 'react';
import API from '../../api/api';

const UploadsContent = () => {
  const [contentType, setContentType] = useState('video'); // video or pdf
  const [file, setFile] = useState(null);
  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUpload = async () => {
    if (!file || !courseId || !title) {
      alert('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('contentType', contentType);
    formData.append('file', file);
    formData.append('title', title);
    formData.append('courseId', courseId);

    try {
      const { data } = await API.post('/courses/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccessMessage('Content uploaded successfully!',data);
      setFile(null);
      setTitle('');
      setCourseId('');
    } catch (error) {
      console.error('Error uploading content:', error.message);
    }
  };

  return (
    <div className="uploads-content">
      <h2>Upload Course Content</h2>

      <div>
        <select value={contentType} onChange={(e) => setContentType(e.target.value)}>
          <option value="video">Video</option>
          <option value="pdf">PDF</option>
        </select>

        <input
          type="text"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button onClick={handleUpload}>Upload</button>

        {successMessage && <p>{successMessage}</p>}
      </div>
    </div>
  );
};

export default UploadsContent;
