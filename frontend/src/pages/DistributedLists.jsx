import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DistributedLists.css";

const DistributedLists = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/upload", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        const grouped = data.reduce((acc, assignment) => {
          const agentId = assignment.agent?._id || "unknown";
          if (!acc[agentId]) {
            acc[agentId] = {
              agent: assignment.agent || { name: "Unknown", email: "N/A" },
              records: [],
            };
          }
          acc[agentId].records.push({
            firstName: assignment.firstName,
            phone: assignment.phone,
            notes: assignment.notes,
          });
          return acc;
        }, {});

        setLists(Object.values(grouped));
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching lists");
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  if (loading) return <p className="loading">Loading lists...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="distributed-container">
      <h2>Distributed Lists by Agent</h2>

      {lists.length === 0 ? (
        <p>No distributed data found.</p>
      ) : (
        lists.map((item, index) => (
          <div key={index} className="agent-card">
            <h3>{item.agent?.name || "Unknown Agent"}</h3>
            <p>Email: {item.agent?.email || "N/A"}</p>
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Phone</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {item.records.map((rec, idx) => (
                  <tr key={idx}>
                    <td>{rec.firstName}</td>
                    <td>{rec.phone}</td>
                    <td>{rec.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default DistributedLists;