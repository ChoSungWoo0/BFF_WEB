import React, { useState, useEffect } from 'react';
import styles from './CurrentState.module.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';

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

export default function CurrentState() {

  const [mode, setMode] = useState('Researcher');
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = dummyData.filter(item => 
    (category === 'All' || item.category === category) && 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

    // Handle page change
  const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    }

  const handleSelectMode = (eventKey) => {
    console.log(eventKey);
    setMode(eventKey);
  };

  const handleSelectCategory = (eventKey) => {
    console.log(eventKey);
    setCategory(eventKey);
  };

  const handleItemsPerPage = (eventKey) => {
    setItemsPerPage(Number(eventKey));
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Generate pagination items
  let paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    setCurrentPage(1); // 검색어나 카테고리가 바뀔 때마다 페이지를 1로 리셋
  }, [searchTerm, category]);



  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <label className={styles.DropdownMode} htmlFor="dropdown-Mode">Mode</label>
          <Dropdown onSelect={handleSelectMode} className={styles.dropdown}>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-Mode">
              {mode} Mode
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="Researcher">Researcher Mode</Dropdown.Item>
              <Dropdown.Item eventKey="Admin">Admin Mode</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <br></br>
          <label className={styles.DropdownCategory} htmlFor="dropdown-category">Category</label>
          <Dropdown onSelect={handleSelectCategory} className={styles.CategoryDropdown}>
          <Dropdown.Toggle variant="outline-primary" id="dropdown-category">
              {category}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="Plastic Consumables">Plastic Consumables</Dropdown.Item>
              <Dropdown.Item eventKey="Chemical Reagents">Chemical Reagents</Dropdown.Item>
              <Dropdown.Item eventKey="Organic Reagents">Organic Reagents</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.tableControls}>
            {/* Search bar */}
            <Form className={styles.Searchbox}>
            <Form.Label className={styles.SearchboxLabel}htmlFor="searchInput">Search</Form.Label>
              <Form.Control
                type="text"
                id="searchInput"
                placeholder="Search Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-describedby="searchHelpBlock"
              />
              <Form.Text id="searchHelpBlock" muted>
                Enter the name of the item you want to search for.
              </Form.Text>

            </Form>
            {/* Items per page dropdown */}
            <label className={styles.PageDropdownLabel} htmlFor="dropdown-perpage">
            <Dropdown onSelect={handleItemsPerPage} className={styles.PageDropdown}>
              <Dropdown.Toggle variant="outline-primary" id="dropdown-perpage">
                {itemsPerPage}
              </Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item eventKey="5">5</Dropdown.Item>
              <Dropdown.Item eventKey="10">10</Dropdown.Item>
              <Dropdown.Item eventKey="15">15</Dropdown.Item>
              <Dropdown.Item eventKey="20">20</Dropdown.Item>
              </Dropdown.Menu> 
            </Dropdown>
            Items per page
            </label>
          </div>

          <div className={styles.tableContainer}>
            <Table striped bordered hover className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pagination Controls */}
          <div className={styles.pagination}>
            <Button variant="outline-primary" className={styles.Button}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className={styles.PageIndex}>      
            <Pagination>{paginationItems}</Pagination></span>
            <Button variant="outline-primary" className={styles.Button}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
