import React, { useState } from "react";
import axios from "axios";
import "./UploadList.css";

const UploadList = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message || "Upload successful");
      setError("");
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error uploading file");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-list-wrapper">
      <h2>Upload CSV File</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={handleFileChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default UploadList;