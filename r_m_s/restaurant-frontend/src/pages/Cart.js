import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();

  const handleOrder = async () => {
    if (!user || !user.email) {
      alert("🔐 Please login to place an order");
      return;
    }

    if (!cartItems.length) {
      alert('🛒 Your cart is empty!');
      return;
    }

    const orderData = {
      userEmail: user.email, // ✅ Matches your backend model
      items: JSON.stringify(cartItems.map(item => item.name)) // ✅ Send item names as string
    };

    try {
      await axios.post('http://localhost:8080/api/orders', orderData);
      clearCart();
      alert('✅ Order placed successfully!');
    } catch (error) {
      console.error('Order failed:', error);
      alert('❌ Failed to place order. Please try again.');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: '60px 20px', minHeight: '100vh', backgroundColor: '#fff9f1' }}>
      <div style={{ maxWidth: '700px', margin: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <h2 className="text-center fw-bold mb-4" style={{ color: '#ff6f61' }}>
            🛒 Your Cart
          </h2>

          {cartItems.length > 0 ? (
            <>
              <ul className="list-group mb-4">
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {item.name}
                    <span className="fw-bold text-success">₹{item.price}</span>
                  </li>
                ))}
              </ul>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0 fw-semibold">Total:</h5>
                <h4 className="text-success mb-0">₹{total}</h4>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-warning w-100 py-2 fw-bold"
                onClick={handleOrder}
                disabled={!user}
              >
                Place Order
              </motion.button>
            </>
          ) : (
            <div className="text-center text-muted fs-5">🛍️ Your cart is empty.</div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
