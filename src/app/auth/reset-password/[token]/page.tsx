'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface ResetPasswordProps {
  params: { token: string };
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ params }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [localToken, setLocalToken] = useState<string | null>(null); // Local token state

  // Fetch localStorage token after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {

    const storedTokenData = localStorage.getItem('emailVerificationToken');
    const localtoken = storedTokenData ? JSON.parse(storedTokenData).token : null;
    setLocalToken(localtoken); 
    } // Set the token in state after it's fetched
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (params.token !== localToken) {
      console.log(params.token);
      console.log(localToken);
      setErrorMessage("Invalid token! Token mismatch.");
      return;
    }

    try {
      if (typeof window !== 'undefined') {

      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        setErrorMessage('No user data found in localStorage.');
        return;
      }

     

      const userData = JSON.parse(storedUser);
      const myUserName = userData.username;
    
      // Fetch user data if username exists
      const res = await axios.get("https://urlpt.technians.in/login/");
      const foundUser = res.data.find((user: { username: string }) => user.username === myUserName);
    

      if (foundUser) {
        // Make the POST request to reset the password
        const response = await axios.post('https://urlpt.technians.in/reset-password-api/', {
          user_id: foundUser.id,
          password: newPassword,
        });

        console.log('Password reset successful:', response.data);
        alert('Password reset successfully');

        // Redirect to localhost:3000 after success
        window.location.href = 'http://localhost:3000';
      } else {
        console.error("User not found.");
        setErrorMessage('User not found.');
      }
    }
    } catch (error) {
      console.error('Error resetting password:', error);
      setErrorMessage('Failed to reset password.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-center mb-6">Reset Your Password</h2>

        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter new password"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Confirm new password"
            required
          />
        </div>

        {errorMessage && <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
