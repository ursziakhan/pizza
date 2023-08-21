import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ProductForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [price, setPrice] = useState('');
    const [goToProducts, setGoToProducts] = useState(false);
    const [categories, setCategories] = useState([]);
    const router = useRouter();

    
    // fixing categories
    useEffect(() => {
      axios.get('/api/categories').then(result =>{ 
        setCategories(result.data);
      });
    }, []);


    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles(files);
    };

    async function createProduct(event) {
        event.preventDefault();

        const formData = new FormData();
        for (const file of selectedFiles) {
            formData.append('files', file);
        }

        try {
            const imageResponse = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!imageResponse.ok) {
                console.error('Failed to upload images');
                return;
            }

            const { filenames } = await imageResponse.json();

            const productData = {
                title,
                description,
                price,
                images: filenames,
            };

            await axios.post('/api/products', productData);
            setGoToProducts(true);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    }

    if (goToProducts) {
        router.push('/products/');
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
  {categories.length > 0 && categories.map(cat => (
    <option value={cat._id}>{cat.name}</option>
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
                    onChange={handleFileChange}
                />
            </div>
            <button type="submit" className="btn-primary">
                Submit
            </button>
        </form>
    );
}
