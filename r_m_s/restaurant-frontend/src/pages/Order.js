import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:8080/api/orders/${user.email}`)
        .then(res => setOrders(res.data))
        .catch(err => console.error('Failed to fetch orders:', err));
    }
  }, [user?.email]);

  return (
    <div style={{ padding: '60px 20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center mb-5 text-primary fw-bold">🧾 Your Orders</h2>

          {orders.length > 0 ? (
            orders.map((order) => (
              <motion.div
                key={order.id}
                whileHover={{ scale: 1.02 }}
                className="mb-4 p-4 bg-white shadow-sm rounded-4"
                style={{ borderLeft: '6px solid #0d6efd' }}
              >
                <h5 className="fw-bold mb-2">Order ID: {order.id}</h5>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Items:</strong>
                  <ul style={{ paddingLeft: '20px' }}>
                    {Array.isArray(order.items) ? (
                      order.items.map((item, idx) => (
                        <li key={idx}>{item.name} × {item.quantity}</li>
                      ))
                    ) : (
                      <li>{order.items}</li>
                    )}
                  </ul>
                </div>
                <p className="text-muted">
                  <strong>Ordered at:</strong> {new Date(order.orderTime).toLocaleString()}
                </p>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-muted fs-5">
              No orders found.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Order;
