import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function EditProductPage() {
  const { query } = useRouter();
  const { slug } = query;
  console.log(slug);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function getProduct(id) {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchData() {
      try {
        const data = await getProduct(slug);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

    // axios
    //   .get(`/api/products/${slug}`)
    //   .then((response) => {
    //     setProduct(response.data);
    //   })
    //   .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // code to update the product
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={product.title}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={product.description}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
