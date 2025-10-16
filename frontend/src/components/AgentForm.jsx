import React, { useState } from "react";
import axios from "axios";
import "./AgentForm.css";

const AgentForm = ({ onAgentAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/agents",
        { name, email, phone, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Agent added successfully!");
      setError("");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      if (onAgentAdded) onAgentAdded(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error adding agent");
      setSuccess("");
    }
  };

  return (
    <div className="agent-form-wrapper">
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "20px 0" }}>
      <h2>Add New Agent</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone with country code"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Add Agent</button>
    </form>
    </div>
  );
};

export default AgentForm;