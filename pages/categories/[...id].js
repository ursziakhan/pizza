import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ProductForm from '@/components/ProductForm';

export default function EditProductPage() {
  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/categories?id=${id}`)
        .then((response) => {
          setCategory(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const updateCategory = async () => {
    try {
      await axios.put(`/api/categories?id=${id}`, category);
      router.push('/categories');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCategory();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative z-10">
        <h1 className="text-xl font-bold mb-4">Edit Category</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="price">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={category.name}
            onChange={handleInputChange}
            className="w-full mb-4"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <div className="fixed inset-0 bg-white bg-opacity-25 pointer-events-none"></div>
    </div>
  );
}
