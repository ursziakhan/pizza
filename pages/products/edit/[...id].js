import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ProductForm from '@/components/ProductForm';

export default function EditProductPage() {
  const router = useRouter();
  const { query } = router;
  const { id } = query;



  const [product, setProduct] = useState(null);
  const [images, setImages] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/products?id=${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const updateProduct = async () => {
    try {
      await axios.put(`/api/products?id=${id}`, product);
      router.push('/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProduct();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProduct((prevState) => ({
      ...prevState,
      images: file,
    }));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative z-10">
        <h1 className="text-xl font-bold mb-4">Edit Product</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
          
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleInputChange}
            className="w-full mb-4"
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="w-full mb-4 resize-none h-24"
          ></textarea>

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-full mb-4"
          />

          <label htmlFor="image">Image:</label>
          <div>{!images?.length && <div>No image is found </div>}</div>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
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
