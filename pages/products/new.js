import Layout from '@/components/Layout';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function NewProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };
  //to create a product we need to send a request to api, it is eay with axios or fetch, npm add axios
  async function createProduct(event) {
    event.preventDefault();
    // Post requset to send data to server
    const data = { title, description, price, image };
    console.log(image);
    // const data = {
    //   title: title,
    //   description: description,
    //   image: image,
    //   price: price
    // }; both are the same things, first one is in its short form
    await axios.post('/api/products', data);
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push('/products/');
  }
  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1>New Product</h1>
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
        <label htmlFor="image">Upload an image</label>
        <input
          value={image}
          id="image"
          type="file"
          onChange={(e) => setImage(e.target.value)}
        ></input>
        <button type="submit" className="btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
}
