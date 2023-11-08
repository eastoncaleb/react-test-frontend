import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/items') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div>
      <ItemList />
    </div>
  );
}

export default App;