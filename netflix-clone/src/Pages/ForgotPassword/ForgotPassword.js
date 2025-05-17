import React, { useState } from "react";
import axios from "../../utils/api"; // Ensure axios baseURL is set to your server domain
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for better UX

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading state
    const cleanedEmail = email.trim().toLowerCase();

    try {
      const response = await axios.post(
        "/api/auth/forgot-password",
        { email: cleanedEmail },
        { withCredentials: true } // Ensure credentials are sent with the request
      );

      setSecretQuestion(response.data.question);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || "User not found.");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading state
    const cleanedEmail = email.trim().toLowerCase();

    try {
      const response = await axios.post(
        "/api/auth/reset-password",
        { email: cleanedEmail, secretAnswer, newPassword },
        { withCredentials: true } // Ensure credentials are sent with the request
      );

      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password.");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>

      {message ? (
        <p className="success-message">{message}</p>
      ) : step === 1 ? (
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>Next</button>
        </form>
      ) : (
        <form onSubmit={handleResetSubmit}>
          <p><strong>Security Question:</strong> {secretQuestion}</p>
          <input
            type="text"
            placeholder="Your Answer"
            value={secretAnswer}
            onChange={(e) => setSecretAnswer(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>Reset Password</button>
        </form>
      )}

      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-message">Processing...</p>} {/* Loading state */}
    </div>
  );
};

export default ForgotPassword;
