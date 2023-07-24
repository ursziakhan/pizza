import Layout from '@/components/Layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Categories() {
  // to create categories for post function
  const [name, setName] = useState('');

  //to fetch categories
  const [categories, setCategories] = useState([]);

  //
  const [loading, setLoading] = useState(false);
  const [parentCategory, setParentCategory] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState('');
  const [editCategory, setEditcategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get('/api/categories').then((result) => {
      setCategories(result.data);
    });
  }

  const createCategory = async (e) => {
    e.preventDefault();
    const data = { name, parentCategory };

    if (editCategory) {
      data._id = editCategory._id;
      await axios.put('/api/categories', { ...data }); //update
    } else {
      await axios.post('/api/categories', data); //create
    }

    setName('');
    fetchCategories(); // Refresh the categories list
  };

  const handleDelete = async (id) => {
    setShowConfirmation(true);
    setDeleteCategoryId(id);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/categories?id=${deleteCategoryId}`);
      fetchCategories(); // Refresh the categories list
    } catch (error) {
      console.error(error);
      // Handle error state or display error message
    }
    setShowConfirmation(false);
    setDeleteCategoryId('');
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setDeleteCategoryId('');
  };

  function handleEditCategory(item) {
    setEditcategory(item);
    setName(item.name);
    setParentCategory(item.parent?._id);
  }

  return (
    <Layout>
      <div className="items-center">
        <h1>Categories</h1>
        <label>
          {editCategory
            ? `Edit the Category ${editCategory.name}`
            : 'Create a new category'}
        </label>
        <form onSubmit={createCategory} className="flex gap-1">
          <div className="flex">
            <input
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="mb-0 h-10 px-4 border border-gray-300 rounded"
              type="text"
              placeholder="Category name"
            />
            <select
              value={parentCategory}
              onChange={(ev) => setParentCategory(ev.target.value)}
            >
              <option value="0">No parent Category</option>
              {categories.map((items) => (
                <option value={items._id} key={items._id}>
                  {items.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit" className="btn-primary bg-blue-900 h-10">
              Create
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="font-medium bg-blue-300">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Category Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Parent Category
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Edit
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  ) : (
                    categories.map((item, index) => (
                      <tr
                        key={item._id}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item?.parent?.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {/* <Link
                            className="flex"
                            // href={`/categories/${item._id}`}
                          > */}
                          <button onClick={() => handleEditCategory(item)}>
                            Edit
                          </button>
                          {/* </Link> */}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <button onClick={() => handleDelete(item._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Delete Confirmation</h2>
            <p>Are you sure you want to delete this category?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={cancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
