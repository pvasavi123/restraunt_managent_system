import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useLocation } from 'react-router-dom';

const Menu = () => {
  const [items, setItems] = useState([]); // Fetched paginated items
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // backend starts from 0
  const [sortOrder, setSortOrder] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const itemsPerPage = 6;

  const { addToCart } = useCart();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get('search')?.toLowerCase() || '';

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/menu/pagination?page=${currentPage}&size=${itemsPerPage}`)
      .then((res) => {
        setItems(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error('Error fetching menu:', err));
  }, [currentPage]);

  // 🔍 Filter & Sort logic on current paginated items
  const filteredItems = items
    .filter(
      (item) =>
        item.name.toLowerCase().includes(search) &&
        (categoryFilter === 'All' || item.category === categoryFilter)
    )
    .sort((a, b) => {
      if (sortOrder === 'lowToHigh') return a.price - b.price;
      if (sortOrder === 'highToLow') return b.price - a.price;
      return 0;
    });

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🍽️ Menu</h2>

      {/* 🔽 Filters */}
      <div style={styles.filterContainer}>
        <label style={styles.label}>Sort:</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={styles.select}>
          <option value="">Price</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>

        <label style={styles.label}>Category:</label>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={styles.select}>
          <option value="All">All</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Drinks">Drinks</option>
        </select>
      </div>

      {search && (
        <p style={styles.searchText}>
          Showing results for "<strong>{search}</strong>"
        </p>
      )}

      {/* 🧾 Menu Items */}
      <div style={styles.grid}>
        {filteredItems.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.imageUrl} alt={item.name} style={styles.image} />
            <h4>{item.name}</h4>
            <p>Category: {item.category}</p>
            <p>₹{item.price}</p>
            <button onClick={() => addToCart(item)} style={styles.button}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* 📄 Pagination */}
      <div style={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          style={styles.pageButton}
        >
          ◀ Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            style={{
              ...styles.pageButton,
              backgroundColor: currentPage === index ? '#4CAF50' : '#fff',
              color: currentPage === index ? '#fff' : '#333',
            }}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
          style={styles.pageButton}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

// 💅 Styles
const styles = {
  container: {
    padding: '2rem',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '2rem',
    color: '#333',
    backgroundColor: '#f5f5f5',
    padding: '1rem',
    borderRadius: '8px',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },
  label: {
    fontWeight: 'bold',
  },
  select: {
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    minWidth: '140px',
  },
  searchText: {
    textAlign: 'center',
    marginBottom: '1rem',
    fontStyle: 'italic',
    color: '#666',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
    borderRadius: '4px',
  },
  pagination: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  pageButton: {
    padding: '0.5rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    color: '#333',
    fontWeight: 'bold',
  },
};

export default Menu;
