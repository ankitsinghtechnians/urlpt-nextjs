"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  user: string;
  login_time: string;
  ip_address: string;
  user_agent: string;
  logout_time: string;
  login_type: string;
};

const TableThree = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://urlpt.technians.in/login-history/",
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-900 sm:p-6">
  <div className="max-w-full overflow-x-auto">
    <table className="w-full table-auto text-left">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="min-w-[140px]  px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300">
            User
          </th>
          <th className="min-w-[160px] px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300">
            Login Time
          </th>
          <th className="min-w-[140px] px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300">
            IP Address
          </th>
          <th className="min-w-[180px] px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300">
            User Agent
          </th>
          <th className="min-w-[140px]  px-3 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
            Login Type
          </th>
          <th className="px-3 py-3 text-right sm:text-left whitespace-nowrap text-base font-semibold text-gray-700 dark:text-gray-300">
            Logout Time
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td
              className={`border-[#eee] px-3 py-4 text-sm  dark:border-dark-3 ${
                index === products.length - 1 ? "border-b-0" : "border-b"
              }`}
            >
              <h5 className="text-dark text-left dark:text-white">{product.user}</h5>
            </td>
            <td
              className={`border-[#eee] px-3 py-4 text-sm dark:border-dark-3 ${
                index === products.length - 1 ? "border-b-0" : "border-b"
              }`}
            >
              <p className="text-dark dark:text-white">{product.login_time}</p>
            </td>
            <td
              className={`border-[#eee] px-3 py-4 text-sm dark:border-dark-3 ${
                index === products.length - 1 ? "border-b-0" : "border-b"
              }`}
            >
              <p className="text-dark dark:text-white">{product.ip_address}</p>
            </td>
            <td
              className={`border-[#eee] px-3 py-4 text-sm dark:border-dark-3 ${
                index === products.length - 1 ? "border-b-0" : "border-b"
              }`}
            >
              <p className="text-dark dark:text-white">{product.user_agent}</p>
            </td>
            <td
              className={`border-[#eee] px-3 py-4 text-sm dark:border-dark-3 ${
                index === products.length - 1 ? "border-b-0" : "border-b"
              }`}
            >
              <p className="text-dark dark:text-white">{product.login_type}</p>
              <p className="text-right text-dark dark:text-white">
                {product.logout_time}
              </p>
            </td>
            <td
              className={`border-[#eee] px-3 py-4 dark:border-dark-3 xl:pr-7.5 ${
                index === products.length - 1 ? "border-b-0" : "border-b"
              }`}
            >
              <div className="flex items-center justify-end space-x-3.5">
                <button className="hover:text-primary">
                  <svg
                    className="fill-current"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG icons here */}
                  </svg>
                </button>
                <button className="hover:text-primary">
                  <svg
                    className="fill-current"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG icons here */}
                  </svg>
                </button>
                <button className="hover:text-primary">
                  <svg
                    className="fill-current"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG icons here */}
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default TableThree;
