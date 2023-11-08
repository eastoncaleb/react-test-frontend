import React, { useState, useEffect } from 'react';
import GenericForm from './GenericForm';

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the server
    fetch('http://localhost:3000/items')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []); // The empty dependency array ensures this effect runs only once

  const updateItemList = () => {
  // Fetch items from the server
    fetch('http://localhost:3000/items')
      .then((response) => response.json())
      .then((data) => setItems(data));
  };

  return (
    <div className="">
      <div className="mx-8 my-4 p-4 rounded-lg bg-gray-100 border">
        <h1 className="text-xl mb-2 font-bold">Item List</h1>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name}: {item.description}
            </li>
          ))}
        </ul>
      </div>
      <GenericForm action="create" onCreateSuccess={updateItemList} />
    </div>
  );
}

export default ItemList;
