/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";

function Test() {
  // Array of products with ids and names
  const products = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
  ];

  // State to manage selected product ids
  const [selected, setSelected] = useState([]);

  // Function to handle single checkbox selection
  const singleBoxSelections = (itemId) => {
    // Check if the item is already selected
    const isAlreadySelected = selected.includes(itemId);

    if (isAlreadySelected) {
      // If selected, remove it from the list
      setSelected(selected.filter((item) => item !== itemId));
    } else {
      // If not selected, add it to the list
      setSelected((prev) => [...prev, itemId]);
    }
  };

  // Function to handle select all checkbox
  const selectAll = () => {
    products.forEach((item) => {
      if (selected.includes(item.id)) {
        // If already selected, deselect all
        setSelected([]);
      } else {
        // If not selected, select all
        setSelected((prev) => [...prev, item.id]);
      }
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>
              Product Name
              {/* Checkbox to select/deselect all */}
              <input
                type="checkbox"
                checked={selected.length === 0 ? false : true}
                onChange={selectAll}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping through products to display in the table */}
          {products.map((product) => (
            <tr key={product.id}>
              {/* Checkbox for each product */}
              <td>
                <input
                  type="checkbox"
                  onChange={() => singleBoxSelections(product.id)}
                  checked={selected.includes(product.id)}
                />
              </td>
              <td>{product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Test;
