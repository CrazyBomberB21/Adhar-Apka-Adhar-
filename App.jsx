import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import './index.css';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center">
      <img
        src="https://uidai.gov.in/images/logo.png"
        alt="Aadhaar Logo"
        className="w-32 mb-4"
      />
      <h1 className="text-3xl font-semibold text-gray-700 mb-2">Welcome to UIDAI</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Unique Identification Authority of India | Government of India
      </p>
      <Link
        to="/login"
        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
      >
        Login with Aadhaar
      </Link>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);

  const handleGenerateOtp = () => {
    if (aadhaar.length !== 12 || !/^\d{12}$/.test(aadhaar)) {
      alert("Enter a valid 12-digit Aadhaar number.");
      return;
    }
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    alert(`Your OTP is: ${newOtp}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      alert("Login successful!");
      navigate("/");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold text-center mb-6">Aadhaar Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Aadhaar Number</label>
            <input
              type="text"
              required
              maxLength={12}
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={handleGenerateOtp}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Generate OTP
          </button>
          {generatedOtp && (
            <div className="text-sm text-center text-gray-500">OTP sent (check alert)</div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Enter OTP</label>
            <input
              type="text"
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-600 hover:underline text-sm">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
