import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [shortlist, setShortlist] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/candidates')
    .then(res => setCandidates(res.data))
    .catch(err => console.error(err));  
  }, []);
  

  const addToShortlist = (candidate) => {
    if (shortlist.includes(candidate)) {
      return alert('Already shortlisted!');
    }
    if (shortlist.length >= 5) {
      return alert('Only 5 can be Shortlisted!');
    }
    setShortlist([...shortlist, candidate]);
  };

  const smartShortlist = () => {
    const filtered = candidates.filter(c =>
      c.annual_salary_expectation?.["full-time"] &&
     parseInt(c.annual_salary_expectation["full-time"].replace(/\D/g, '')) <= 100000 &&
     c.skills?.length >= 0 &&
     c.work_experiences?.some(exp => 
      exp.roleName.toLowerCase().includes("developer") ||
      exp.roleName.toLowerCase().includes("engineer")
     )
    );
    setShortlist(filtered.slice(0, 5));
  };

 


  return (
    <div style={{
      padding: "40px",
      backgroundColor: "#f4f6f8", 
      minHeight: "100vh",
      fontFamily: "Segoe UI, sans-serif" 
      }}>
      <h1>Mercor Hiring Dashboard</h1>
      <h2>Shortlisted Candidates ({shortlist.length}/5)</h2>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        background: "#ffffff",
        borderRadius: "6px",
        overflow: "hidden"}}>
          <thead>
        <tr style={{backgroundColor: "#0d6efd", color: "white"}}>
          <th style={{padding: "10px", border: "1px solid #ddd"}}>Name</th>
          <th style={{padding: "10px", border: "1px solid #ddd"}}>Email</th>
          <th style={{padding: "10px", border: "1px solid #ddd"}}>Location</th>
          <th style={{padding: "10px", border: "1px solid #ddd"}}>Skills</th>
          <th style={{padding: "10px", border: "1px solid #ddd"}}>Roles</th>
          <th style={{padding: "10px", border: "1px solid #ddd"}}>Salary</th>
          <th style={{padding: "10px", border: "1px solid #ddd"}}>Experience</th>
        </tr>
        {shortlist.map((c, i) => (
          <tr key={i}>
            <td style={{padding: "10px", border: "1px solid #ddd"}}>{c.name}</td>
            <td style={{padding: "10px", border: "1px solid #ddd"}}>{c.email}</td>
            <td style={{padding: "10px", border: "1px solid #ddd"}}>{c.location}</td>
            <td style={{padding: "10px", border: "1px solid #ddd"}}>
              {c.skills?.length ? c.skills.join(', ') : "N/A"}
            </td>
            <td style={{padding: "10px", border: "1px solid #ddd"}}>
              {c.work_experiences?.map(exp => exp.roleName).join(', ') || "N/A"}
            </td>
            <td style={{padding: "10px", border: "1px solid #ddd"}}>
              {c.annual_salary_expectation?.["full-time"] || "N/A"}
            </td>
            <td style={{padding: "10px", border: "1px solid #ddd"}}>
              {c.work_experiences?.length || 0} roles
            </td>
          </tr>
        ))}
        </thead>
      </table>
    
          

      <button onClick={smartShortlist} style={{
        backgroundColor: "#0d6efd",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "30px",
        cursor: "pointer"
      }}>
        Smart Shortlist Top 5 Candidates
      </button>

      <h2>All Candidates</h2>
      {candidates.map((c, index) => (
        <div key={index} style={{
          border: "1px solid gray",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
        }}>
          <h3>{c.name}</h3>
          <p><strong>Email:</strong> {c.email}</p>
          <p><strong>Location:</strong> {c.location}</p>
          <p><strong>Expected_salary:</strong> {c.annual_salary_expectation?.["full-time"] || "N/A"}</p>
          <p><strong>Skills:</strong> {c.skills?.length ? c.skills.join(', ') : "N/A"}</p>
          <p><strong>Roles:</strong> {c.work_experiences?.map(exp => exp.roleName).join(', ') || "N/A"}</p>
          <button onClick={() => addToShortlist(c)}>Shortlist</button>
        </div>
      ))}
      </div>
    );
  }

export default App;