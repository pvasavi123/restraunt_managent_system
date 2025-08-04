// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';
import heroImage from '../images/img.png';

const Home = () => {
  return (
    <>
      <div className="home-container">
        <motion.div
          className="home-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Welcome to Our Restaurant</h1>
          <p>Delicious food delivered to your doorstep!</p>
          <div className="home-buttons">
            <Link to="/menu">
              <button>View Menu</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="home-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={heroImage} alt="Delicious food" />
        </motion.div>
      </div>

      {/* Food Quality & Highlights Section */}
      <div className="quality-section">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Why Choose Us?
        </motion.h2>
        <motion.div
          className="quality-cards"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="quality-card">
            <span>🍽️</span>
            <h3>Premium Quality</h3>
            <p>We use fresh, organic, and locally sourced ingredients.</p>
          </div>
          <div className="quality-card">
            <span>👨‍🍳</span>
            <h3>Expert Chefs</h3>
            <p>Our chefs are trained to deliver mouth-watering dishes every time.</p>
          </div>
          <div className="quality-card">
            <span>🕒</span>
            <h3>Quick Delivery</h3>
            <p>Your favorite meals delivered hot and fast right to your door.</p>
          </div>
          <div className="quality-card">
            <span>🌿</span>
            <h3>Hygienic & Healthy</h3>
            <p>Prepared with utmost care in sanitized kitchens.</p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
