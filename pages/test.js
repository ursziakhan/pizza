import React, { useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', description: 'Description A', price: 10.99 },
    { id: 2, name: 'Product B', description: 'Description B', price: 19.99 },
    { id: 3, name: 'Product C', description: 'Description C', price: 5.99 },
    { id: 4, name: 'Product D', description: 'Description D', price: 15.49 },
    { id: 5, name: 'Product E', description: 'Description E', price: 7.99 },
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const toggleProductSelection = (productId) => {
    if (selectedProductIds.includes(productId)) {
      // If the product is already selected, remove it
      setSelectedProductIds(selectedProductIds.filter((id) => id !== productId));
    } else {
      // If the product is not selected, add it
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      // If "Select All" is checked, clear the selected products
      setSelectedProductIds([]);
    } else {
      // If "Select All" is not checked, select all products
      setSelectedProductIds(products.map((product) => product.id));
    }
    setSelectAll(!selectAll);
  };

  const deleteSelectedProducts = () => {
    // Filter out the selected products and update the state
    const updatedProducts = products.filter((product) => !selectedProductIds.includes(product.id));
    setProducts(updatedProducts);
    // Clear the selection and uncheck "Select All"
    setSelectedProductIds([]);
    setSelectAll(false);
  };

  return (
    <div>
      <h1>Product List</h1>
      <label>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={toggleSelectAll}
        />
        Select All
      </label>
      <button onClick={deleteSelectedProducts}>Delete</button>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedProductIds.includes(product.id)}
                  onChange={() => toggleProductSelection(product.id)}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
