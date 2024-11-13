"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatISO } from 'date-fns';


type Campaign = {
  id: number; // Updated to number
  property_id: string;
  action: string;
  action_trigger: string;
  action_delay: string;
  created_at: string;
  updated_at: string;
  status: string;
};

const UpdateProperties = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null); // Changed to number
  const [editData, setEditData] = useState<Partial<Campaign>>({});

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("https://urlpt.technians.in/campaign/");
        const data = response.data;
        const userId = localStorage.getItem('userId');
        const user = Number(userId);
        const filteredData = data.filter((item: { user: number }) => item.user === user);

        setCampaigns(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleEdit = (campaign: Campaign) => {
    setEditId(campaign.id); // Use the campaign's id as the unique identifier for editing
    setEditData(campaign); // Prepopulate editData with the selected campaign details
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value })); // Update the editData when a field changes
  };

  const handleUpdate = async (id: number) => { // Changed to number
    try {

      const updatedData = {
        ...editData,
        updated_at: formatISO(new Date()), // Use current date/time in ISO format
      };

      await axios.put(`https://urlpt.technians.in/campaign/${id}/`, updatedData); // Send PUT request to update the campaign
      setCampaigns((prev) =>
        prev.map((campaign) =>
          campaign.id === id ? { ...campaign, ...updatedData } : campaign
        )
      );
      setEditId(null); // Exit edit mode
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Error updating campaign:", error);
      alert("Failed to update campaign.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-900 sm:p-6">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="min-w-[140px] px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300">Campaign ID</th>
              <th className="min-w-[140px] px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300">Property ID</th>
              <th className="min-w-[140px] px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300">Action</th>
              <th className="min-w-[160px] px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300">Action Trigger</th>
              <th className="min-w-[140px] px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300">Action Delay</th>
              <th className="min-w-[180px] px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300">Created At</th>
              <th className="min-w-[140px] px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300">Updated At</th>
              <th className="px-3 py-3 text-right sm:text-left whitespace-nowrap text-base font-semibold text-gray-700 dark:text-gray-300">Status</th>
              <th className="px-3 py-3 text-right sm:text-left whitespace-nowrap text-base font-semibold text-gray-700 dark:text-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                {editId === campaign.id ? (
                  <>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">
                      <input type="text" name="id" value={editData.id || ''} onChange={handleChange} disabled />
                    </td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">
                      <input type="text" name="property_id" value={editData.property_id || ''} onChange={handleChange} />
                    </td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">
                      <input type="text" name="action" value={editData.action || ''} onChange={handleChange} />
                    </td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">
                      <input type="text" name="action_trigger" value={editData.action_trigger || ''} onChange={handleChange} />
                    </td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">
                      <input type="text" name="action_delay" value={editData.action_delay || ''} onChange={handleChange} />
                    </td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">
                      <input type="text" name="created_at" value={editData.created_at || ''} onChange={handleChange} />
                    </td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">
                      <input type="text" name="updated_at" value={editData.updated_at || ''} onChange={handleChange} />
                    </td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">
                      <input type="text" name="status" value={editData.status || ''} onChange={handleChange} />
                    </td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">
                      <button onClick={() => handleUpdate(campaign.id)} className="text-green-600 hover:underline">Save</button>
                      <button onClick={() => setEditId(null)} className="text-red-600 hover:underline ml-2">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">{campaign.id}</td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">{campaign.property_id}</td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">{campaign.action}</td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">{campaign.action_trigger}</td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">{campaign.action_delay}</td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">{campaign.created_at}</td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">{campaign.updated_at}</td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">{campaign.status}</td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">
                      <button onClick={() => handleEdit(campaign)} className="text-blue-600 hover:underline">Edit</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateProperties;
