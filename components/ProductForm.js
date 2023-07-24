import Layout from '@/components/Layout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ProductForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  async function createProduct(event) {
    event.preventDefault();
    // Post requset to send data to server
    const data = { title, description, price, images };

    await axios.post('/api/products', data);
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push('/products/');
  }

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append('files', file);
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('Images uploaded successfully');
        // Handle the response if needed
      } else {
        console.error('Failed to upload images');
        // Handle the failure case
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      // Handle the error case
    }
  };

  return (
    <form onSubmit={createProduct}>
      <label>Product name</label>
      <input
        required
        value={title}
        type="text"
        placeholder="Product name"
        onChange={handleChange}
      />
      <label>Price in Sek</label>
      <input
        required
        value={price}
        placeholder="price"
        type="number"
        onChange={(e) => setPrice(e.target.value)}
      ></input>
      <label>Product description</label>
      <textarea
        required
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label htmlFor="images">Upload an image</label>
      <div className="mb-2">
        <input
          value={images}
          id="image"
          type="file"
          onChange={handleFileChange}
        ></input>
      </div>
      <button onSubmit={handleSubmit} type="submit" className="btn-primary">
        Submit
      </button>
    </form>
  );
}
