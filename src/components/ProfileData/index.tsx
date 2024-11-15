"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const ProfileData = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {

      // Store user email in localStorage
      if (typeof window !== 'undefined') {

      localStorage.setItem('user', JSON.stringify(session.user?.email));
      }
    }
  }, [session]);

  const [formData, setFormData] = useState({
    email: '',  // Default email
    full_name: '',
    street: '', 
    city: '',
    state: '',
    country: '',
    pincode: '',
    tax_id: '',
    profile_image: ''
  });
  const [userId, setUserId] = useState(null);  // To store the user's id

  useEffect(() => {
    if (typeof window !== 'undefined') {

    const storedUser = localStorage.getItem('user');
    let userData;

    if (storedUser) {
      userData = JSON.parse(storedUser);
      const myUserName = userData.username;

  //     // Fetch all users from API
      axios.get('https://urlpt.technians.in/login/')
        .then((res) => {
          // Find the user based on the username
          const user = res.data.find((user: { username: string }) => user.username === myUserName);
          if (user) {
            setUserId(user.id);
            // localStorage.setItem('userId',user.id)  // Store the user id
            // Pre-fill form data with the found user's data
            setFormData({
              email: user.email,
              full_name: user.full_name,
              street: user.street,
              city: user.city,
              state: user.state,
              country: user.country,
              pincode: user.pincode,
              tax_id: user.tax_id,
              profile_image: user.profile_image
            });
          } else {
            console.log('User not found.');
          }
        })
      
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      }
    } else {
      console.log('No user data found in localStorage.');
    }
  }, []);

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!userId) {
      console.error('User ID not found.');
      return;
    }

    try {
      // Include the user id in the URL for the PUT request
      const response = await axios.put(
        `https://urlpt.technians.in/login/${userId}/`,  // Update the URL with the user id
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Data updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6" >
        <div>
          <label className="block text-md font-medium text-gray-700" >
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              
              className="mt-2 block w-full p-3 border border-gray-200 bg-slate-100 rounded-lg shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
            />
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name:
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-200 bg-slate-100 rounded-lg shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Street:
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-200 bg-slate-100 rounded-lg shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-200 bg-slate-100 rounded-lg shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State:
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-200 bg-slate-100 rounded-lg shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country:
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-200 bg-slate-100 rounded-lg shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pincode:
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-200 bg-slate-100 rounded-lg shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tax ID:
              <input
                type="text"
                name="tax_id"
                value={formData.tax_id}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-200 bg-slate-100 rounded-lg shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Image URL:
            <input
              type="text"
              name="profile_image"
              value={formData.profile_image}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-200 bg-slate-100 rounded-lg shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
            />
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileData;
