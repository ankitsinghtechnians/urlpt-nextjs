'use client';
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { formatISO } from 'date-fns';

const CampaignBox = () => {
  const [campaignData, setCampaignData] = useState({
    user: '', // User ID will be set after fetching from localStorage
    campaign_id: '',
    action: '',
    action_trigger: '',
    action_delay: '',
    created_at: '',
    updated_at: '',
    status: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setCampaignData((prevData) => ({ ...prevData, user: userId }));
      setLoading(false); // Load complete once the userId is set
    } else {
      setError('User not logged in');
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignData.user) {
      setError('User not logged in');
      return;
    }

    // Set created_at and updated_at timestamps
    const timestamp = formatISO(new Date());
    const dataToSubmit = {
      ...campaignData,
      created_at: campaignData.created_at || timestamp, // Only set if empty
      updated_at: timestamp,
    };

    try {
      const response = await axios.post('https://urlpt.technians.in/campaign/', dataToSubmit);
      console.log('Post request data:', response.data);
      alert("Successfully Created")
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error saving campaign:', err.response ? err.response.data : err.message);
        setError(err.response?.data?.message || 'Error saving campaign');
      } else {
        console.error('Unexpected error:', err);
        setError('Unexpected error occurred');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCampaignData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Campaigns</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-md font-medium text-gray-700">
            Campaign ID
            <input
              type="text"
              name="campaign_id"
              value={campaignData.campaign_id}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-200 bg-slate-100 rounded-lg shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
            />
          </label>
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">
            Action
            <input
              type="text"
              name="action"
              value={campaignData.action}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-200 bg-slate-100 rounded-lg shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
            />
          </label>
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">
            Action Trigger
            <input
              type="text"
              name="action_trigger"
              value={campaignData.action_trigger}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-200 bg-slate-100 rounded-lg shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
            />
          </label>
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">
            Action Delay
            <input
              type="text"
              name="action_delay"
              value={campaignData.action_delay}
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
              value={campaignData.status}
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

export default CampaignBox;
