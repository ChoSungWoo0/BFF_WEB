import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const dummyData = [
  { id: 1, name: 'Plastic Beakers', category: 'Plastic Consumables', quantity: 50 },
  { id: 2, name: 'Chemical X', category: 'Chemical Reagents', quantity: 35 },
  // More dummy data...
];

export default function CRUD() {
  const [data, setData] = useState(dummyData); // Manage table data
  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: 0 });
  const [editItem, setEditItem] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false); // Create Modal state
  const [showEditModal, setShowEditModal] = useState(false); // Edit Modal state

  // Handle new item form submission
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newId = data.length ? Math.max(...data.map(item => item.id)) + 1 : 1;
    setData([...data, { id: newId, ...newItem }]);
    setNewItem({ name: '', category: '', quantity: 0 });
    setShowCreateModal(false);
  };

  // Handle edit form submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setData(data.map(item => (item.id === editItem.id ? editItem : item)));
    setEditItem(null);
    setShowEditModal(false);
  };

  // Handle delete
  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <>
      {/* Create New Item Modal */}
      <Button variant="outline-primary" onClick={() => setShowCreateModal(true)}>
        Create New Item
      </Button>
      {/* onHide는 사실상 동작을 안하고 있음 추가적인 동작이 필요할 때 수정하여 사용 가능 */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Item Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editItem && (
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
              <Button variant="primary" type="submit">
                Update
              </Button>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* Table */}
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
                <Button
                  onClick={() => {
                    setEditItem(item);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
