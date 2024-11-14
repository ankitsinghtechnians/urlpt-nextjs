"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatISO } from 'date-fns';

type Product = {
  id: number;  // Changed from string to number
  name: string;
  url: string;
  owner_id: number;  // Changed from string to number
  created_at: string;
  updated_at: string;
  status: string;
};

const UpdateProperties = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);  // Changed to number
  const [editData, setEditData] = useState<Partial<Product>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://urlpt.technians.in/property/");
        const data = response.data;
        if (typeof window !== 'undefined') {

        const userId = localStorage.getItem('userId');
        const user = Number(userId);  // Ensure userId is a number
        const filteredData = data.filter((item: { user: number }) => item.user === user);

        setProducts(filteredData);
        setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setEditId(product.id);  // id is now a number
    setEditData(product);  // Prepopulate editData with selected product details
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // If the name is 'id' or 'owner_id', ensure they are parsed as numbers
    const updatedValue = (name === 'id' || name === 'owner_id') ? Number(value) : value;

    setEditData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleUpdate = async (id: number) => {
      // id is now a number
    try {

      const updatedData = {
        ...editData,
        updated_at: formatISO(new Date()), // Use current date/time in ISO format
      };

      await axios.put(`https://urlpt.technians.in/property/${id}/`, updatedData);
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, ...updatedData } : product
        )
      );
      setEditId(null);  // Exit edit mode
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-900 sm:p-6">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="min-w-[140px] px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300">ID</th>
              <th className="min-w-[140px] px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300">Name</th>
              <th className="min-w-[160px] px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300">URL</th>
              <th className="min-w-[140px] px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300">Owner ID</th>
              <th className="min-w-[180px] px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300">Created At</th>
              <th className="min-w-[140px] px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300">Updated At</th>
              <th className="px-3 py-3 text-right sm:text-left whitespace-nowrap text-base font-semibold text-gray-700 dark:text-gray-300">Status</th>
              <th className="px-3 py-3 text-right sm:text-left whitespace-nowrap text-base font-semibold text-gray-700 dark:text-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                {editId === product.id ? (
                  <>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">
                      <input type="text" name="id" value={editData.id || ''} onChange={handleChange} disabled />
                    </td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">
                      <input type="text" name="name" value={editData.name || ''} onChange={handleChange} />
                    </td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">
                      <input type="text" name="url" value={editData.url || ''} onChange={handleChange} />
                    </td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">
                      <input type="text" name="owner_id" value={editData.owner_id || ''} onChange={handleChange} />
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
                      <button onClick={() => handleUpdate(product.id)} className="text-green-600 hover:underline">Save</button>
                      <button onClick={() => setEditId(null)} className="text-red-600 hover:underline ml-2">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">{product.id}</td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">{product.name}</td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">{product.url}</td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">{product.owner_id}</td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">{product.created_at}</td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">{product.updated_at}</td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">{product.status}</td>
                    <td className="border-[#eee] px-3 py-4 text-sm dark:border-dark-3">
                      <button onClick={() => handleEdit(product)} className="text-blue-600 hover:underline">Edit</button>
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
