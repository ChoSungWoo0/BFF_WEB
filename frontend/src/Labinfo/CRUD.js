import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';

// Dummy data
const dummyData = [
    { id: 1, name: 'Plastic Beakers', category: 'Plastic Consumables', quantity: 50 },
    { id: 2, name: 'Chemical X', category: 'Chemical Reagents', quantity: 35 },
    { id: 3, name: 'Organic Compound Y', category: 'Organic Reagents', quantity: 25 },
    { id: 4, name: 'Chemical X', category: 'Chemical Reagents', quantity: 30 },
    { id: 5, name: 'Organic Compound Y', category: 'Organic Reagents', quantity: 25 },
    { id: 6, name: 'Plastic Beakers', category: 'Plastic Consumables', quantity: 55 },
    { id: 7, name: 'Chemical X', category: 'Chemical Reagents', quantity: 31 },
    { id: 8, name: 'Plastic Beakers', category: 'Plastic Consumables', quantity: 55 },
    { id: 9, name: 'Organic Compound Y', category: 'Organic Reagents', quantity: 21 },
    { id: 10, name: 'Organic Compound Y', category: 'Organic Reagents', quantity: 25 },
    { id: 11, name: 'Chemical X', category: 'Chemical Reagents', quantity: 30 },
    { id: 12, name: 'Organic Compound Y', category: 'Organic Reagents', quantity: 25 },
    { id: 13, name: 'Chemical X', category: 'Chemical Reagents', quantity: 31 },
    { id: 14, name: 'Chemical X', category: 'Chemical Reagents', quantity: 31 },
    { id: 15, name: 'Chemical X', category: 'Chemical Reagents', quantity: 31 },
    { id: 16, name: 'Chemical X', category: 'Chemical Reagents', quantity: 31 },
    { id: 17, name: 'Organic Compound Y', category: 'Organic Reagents', quantity: 21 }
    // Add more data as needed
  ];
  

export default function CRUD() {
  const [data, setData] = useState(dummyData); // Manage table data
  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: 0 });
  const [editItem, setEditItem] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Handle new item form submission
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newId = data.length ? Math.max(...data.map(item => item.id)) + 1 : 1;
    setData([...data, { id: newId, ...newItem }]);
    setNewItem({ name: '', category: '', quantity: 0 });
    setShowCreateForm(false);
  };

  // Handle edit form submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setData(data.map(item => (item.id === editItem.id ? editItem : item)));
    setEditItem(null);
    setShowEditForm(false);
  };

  // Handle delete
  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <>
      {/* Create Form */}
      {showCreateForm && (
        <Form onSubmit={handleCreateSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter item name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter item category"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter item quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
          <Button variant="secondary" onClick={() => setShowCreateForm(false)}>Cancel</Button>
        </Form>
      )}

      {/* Edit Form */}
      {showEditForm && (
        <Form onSubmit={handleEditSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={editItem?.name || ''}
              onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={editItem?.category || ''}
              onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={editItem?.quantity || 0}
              onChange={(e) => setEditItem({ ...editItem, quantity: Number(e.target.value) })}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Update</Button>
          <Button variant="secondary" onClick={() => setShowEditForm(false)}>Cancel</Button>
        </Form>
      )}

      {/* Table and Buttons */}
      <Button variant="outline-primary" onClick={() => setShowCreateForm(true)}>Create New Item</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <Button onClick={() => { setEditItem(item); setShowEditForm(true); }}>Edit</Button>
                <Button onClick={() => handleDelete(item.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
