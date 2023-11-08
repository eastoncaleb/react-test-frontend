import React, { useState } from 'react';

function GenericForm({ action, item, onCreateSuccess }) {
  const [name, setName] = useState(item ? item.name : '');
  const [description, setDescription] = useState(item ? item.description : '');
  const [validationErrors, setValidationErrors] = useState({});

  // Define handleDelete outside of handleSubmit
  const handleDelete = async () => {
    // Add logic to send a DELETE request to delete the item
    const response = await fetch(`http://localhost:3000/items/${item.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Item deleted successfully');
      // Handle successful deletion, e.g., by redirecting to a list view
    } else {
      console.error('Failed to delete item');
      // Handle deletion failure, e.g., by displaying an error message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({}); // Clear existing validation errors

    const data = {
      name,
      description,
    };

    let response;

    if (action === 'create') {
      // Send a POST request to create a new item
      response = await fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } else if (action === 'update') {
      // Send a PUT request to update the item
      // ...
    }

    if (response.ok) {
      // Item created or updated successfully
      console.log('Item created or updated successfully');
      // Call the provided callback function to update the item list
      onCreateSuccess();

      // Reset form fields
      setName('');
      setDescription('');
    } else if (response.status === 422) {
      // Handle validation errors
      const validationErrors = await response.json();
      setValidationErrors(validationErrors);
    } else {
      // Handle other errors
      console.error('Failed to create or update item');
    }
  };

  return (
    <div className="p-8 flex flex-wrap justify-center">
      <h2 className="text-2xl font-bold w-full text-center mb-4">
        {action === 'create'
          ? 'Create'
          : action === 'update'
          ? 'Update'
          : 'Delete'}{' '}
        an Item
      </h2>
      {action === 'delete' ? (
        <div>
          {/* Display item details */}
          <button className="bg-red-500 rounded-lg cursor-pointer px-2 py-1 text-white font-bold" onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-wrap items-center">
          <div className="flex flex-wrap w-full items-center">
            <label className="font-bold w-full text-sm">
              Name
            </label>
            <input
              type="text"
              value={name}
              className="w-full mt-1 mb-4 bg-gray-100 p-2 rounded-lg border"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap w-full items-center">
            <label className="font-bold w-full text-sm">
              Description
            </label>
            <textarea
              className="w-full mt-1 mb-4 bg-gray-100 p-2 rounded-lg border"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex w-full items-center">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/40 rounded cursor-pointer px-4 py-2 text-white font-bold">
              {action === 'create' ? 'Create' : 'Update'}
            </button>
          </div>
        </form>
      )}

      {/* Display validation errors */}
      {Object.keys(validationErrors).length > 0 && (
        <div className="absolute backdrop-blur-sm bg-red-200/40 top-4 m-8 text-red-800 p-4 w-full text-center">
          <h2 className="font-bold mb-2">Uh Oh!</h2>
          <ul>
            {Object.entries(validationErrors).map(([field, messages]) => (
              <li key={field}>
                {field}: {messages.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GenericForm;
