import React, { useState, useEffect } from 'react';
import CurrentState from "./Labinfo/CurrentState";
import CRUD from "./Labinfo/CRUD"
import Modal from "./Labinfo/Modal"
import Management from './Labinfo/Management';
import axios from 'axios';



function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/items');
        console.log(response.data);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="App">
      <div>
        <h1>Item List</h1>
        <ul>
          {items.map(item => (
            <li key={item._id.$oid || item._id}>
              {item.name} - {item.price}원 ({item.category})
            </li>
          ))}
        </ul>
      </div>
      <CurrentState/>
      <CRUD></CRUD>
      <Modal></Modal>
      <Management/>
    </div>
  );
}

export default App;
