import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import html2canvas from 'html2canvas'; // html2canvas 라이브러리 추가

// Dummy data
const dummyData = [
    { id: 1, name: 'Plastic Beakers', category: 'Plastic Consumables', quantity: 50 },
    { id: 2, name: 'Chemical X', category: 'Chemical Reagents', quantity: 35 },
    { id: 3, name: 'Organic Compound Y', category: 'Organic Reagents', quantity: 25 },
    { id: 4, name: 'Chemical X', category: 'Chemical Reagents', quantity: 30 },
    { id: 5, name: 'Organic Compound Y', category: 'Organic Reagents', quantity: 25 }
];

// Dummy details data
const dummyDetails = {
  1: [
    { task_id: 1, researcher: 'A', genDate: '2023-10-13', endDate: '2023-10-23' },
    { task_id: 2, researcher: 'B', genDate: '2023-10-15', endDate: '2023-10-23' }
  ],
  2: [
    { task_id: 1, researcher: 'C', genDate: '2023-10-16', endDate: '2023-10-23' },
    { task_id: 2, researcher: 'D', genDate: '2023-10-17', endDate: '2023-10-23' }
  ],
  3: [
    { task_id: 1, researcher: 'E', genDate: '2023-10-18', endDate: '2023-10-23' },
    { task_id: 2, researcher: 'F', genDate: '2023-10-18', endDate: '2023-10-23' }
  ],
  4: [
    { task_id: 1, researcher: 'G', genDate: '2023-10-19', endDate: '2023-10-23' },
    { task_id: 2, researcher: 'H', genDate: '2023-10-18', endDate: '2023-10-23' }
  ],
  5: [
    { task_id: 1, researcher: 'I', genDate: '2023-10-19', endDate: '2023-10-23' },
    { task_id: 2, researcher: 'J', genDate: '2023-10-19', endDate: '2023-10-23' }
  ]
};

export default function Management() {
  const [data, setData] = useState(dummyData); // Manage table data
  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: 0 });
  const [editItem, setEditItem] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [details, setDetails] = useState([]); // To hold details of selected item
  const [showDetailsModal, setShowDetailsModal] = useState(false); // To control modal visibility
  const detailsTableRef = useRef(null); // Reference to the table for capturing image

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

  // Handle showing details in a modal
  const handleShowDetails = (id) => {
    setDetails(dummyDetails[id] || []); // Fetch the details by id
    setShowDetailsModal(true); // Open modal
  };

  // Handle downloading the table as an image
  const handleDownload = () => {
    if (detailsTableRef.current) {
      html2canvas(detailsTableRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'details-table.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
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
                <Button variant="info" onClick={() => handleShowDetails(item.id)}>Info</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {details.length > 0 ? (
            <div>
              <Table striped bordered hover ref={detailsTableRef}>
                <thead>
                  <tr>
                    <th>Task ID</th>
                    <th>Researcher</th>
                    <th>Generation Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map(detail => (
                    <tr key={detail.task_id}>
                      <td>{detail.task_id}</td>
                      <td>{detail.researcher}</td>
                      <td>{detail.genDate}</td>
                      <td>{detail.endDate}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="primary" onClick={handleDownload}>Download</Button>
            </div>
          ) : (
            <p>No details available for this item.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
