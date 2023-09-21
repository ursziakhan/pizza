
           
import React, { useState, FormEvent } from 'react';

export default function Test() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Submitted:', name, age, sex);
    handleFormClose(); // Close the form after submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        className="ml-8 border-2 bg-[#1a1a64] text-primary rounded-full px-6 py-2 inline-block font-semibold hover:bg-primary hover:text-optional"
        onClick={handleFormOpen}
      >
        Add Your Docking
      </button>

      {isFormOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Add Docking Information</h2>
            <form onSubmit={handleSubmit}>
  <div className="mb-4">
    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
      Name
    </label>
    <input
      type="text"
      id="name"
      className="mt-1 p-2 border rounded-md w-full"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>
  <div className="mb-4">
    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
      Age
    </label>
    <input
      type="text"
      id="age"
      className="mt-1 p-2 border rounded-md w-full"
      value={age}
      onChange={(e) => setAge(e.target.value)}
    />
  </div>
  <div className="mb-4">
    <label htmlFor="sex" className="block text-sm font-medium text-gray-700">
      Sex
    </label>
    <input
      type="text"
      id="sex"
      className="mt-1 p-2 border rounded-md w-full"
      value={sex}
      onChange={(e) => setSex(e.target.value)}
    />
  </div>
  <div className="flex justify-end">
    <button
      type="button"
      className="mr-2 px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
      onClick={handleFormClose}
    >
      Cancel
    </button>
    <button
      type="submit"
      className="px-4 py-2 bg-[#1a1a64] text-primary rounded-md font-semibold hover:bg-primary hover:text-optional"
    >
      Submit
    </button>
  </div>
</form>

          </div>
        </div>
      )}
    </div>
  );
}
