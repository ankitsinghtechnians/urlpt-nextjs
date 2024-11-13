'use client';
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { formatISO } from 'date-fns';

const PropertyBox = () => {
  const [propertyData, setPropertyData] = useState({
    user: '', // User ID will be set after fetching from localStorage
    name: '',
    url: '',
    owner_id: '',
    created_at: '',
    updated_at: '',
    status: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setPropertyData((prevData) => ({ ...prevData, user: userId }));
      setLoading(false); // Load complete once the userId is set
    } else {
      setError('User not logged in');
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyData.user) {
      setError('User not logged in');
      return;
    }

    // Set created_at and updated_at to the current date in ISO format
    const timestamp = formatISO(new Date());
    const dataToSubmit = {
      ...propertyData,
      created_at: propertyData.created_at || timestamp, // Set if empty
      updated_at: timestamp,
    };

    try {
      const response = await axios.post('https://urlpt.technians.in/property/', dataToSubmit);
      console.log('Post request data:', response.data);
      alert("Successfully Created")
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error saving property:', err.response ? err.response.data : err.message);
        setError(err.response?.data?.message || 'Error saving property');
      } else {
        console.error('Unexpected error:', err);
        setError('Unexpected error occurred');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Properties</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-md font-medium text-gray-700">
            Name
            <input
              type="text"
              name="name"
              value={propertyData.name}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-200 bg-slate-100 rounded-lg shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
            />
          </label>
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">
            URL
            <input
              type="text"
              name="url"
              value={propertyData.url}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-200 bg-slate-100 rounded-lg shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
            />
          </label>
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">
            Owner ID
            <input
              type="number"
              name="owner_id"
              value={propertyData.owner_id}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-200 bg-slate-100 rounded-lg shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
            />
          </label>
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">
            Status
            <input
              type="text"
              name="status"
              value={propertyData.status}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-200 bg-slate-100 rounded-lg shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
            />
          </label>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyBox;
