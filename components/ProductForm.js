import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const [price, setPrice] = useState("");
  const [goToProducts, setGoToProducts] = useState(false);
  const [categories, setCategories] = useState([]);

  const router=useRouter();
  
  // fixing categories
  useEffect(() => {

    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  async function createProduct(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("files", selectedFile);

    try {
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        console.error("Failed to upload images");
        return;
      }

      console.log(uploadResponse.body);

      // Assuming the API route returns file information in JSON format
      const { files } = await uploadResponse.json();
      const productData = {
        title,
        description,
        price,
        images: files, // Use the file information received from the API
      };

      // Create the product using the file information
      await axios.post("/api/products", productData);
      setGoToProducts(true);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  }

     if (goToProducts) {
     router.push("/products/");
     }
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
      <label>Category</label>
      <select>
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((cat, index) => (
            <option key={index} value={cat._id}>
              {cat.name}
            </option>
          ))}
      </select>

      <label>Price in Sek</label>
      <input
        required
        value={price}
        placeholder="price"
        type="number"
        onChange={(e) => setPrice(e.target.value)}
      />
      <label>Product description</label>
      <textarea
        required
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="images">Upload an image</label>
      <div className="mb-2">
        <input
          id="image"
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              // setSelectedImage(URL.createObjectURL(file));
              setSelectedFile(file);
            }
          }}
        />
      </div>
      <button type="submit" className="btn-primary">
        Submit
      </button>
    </form>
  );
}
