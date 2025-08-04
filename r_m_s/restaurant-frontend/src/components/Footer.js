// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} MyRestaurant. All rights reserved.</p>
      <p>Made with ❤️ by Vasavi</p>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#222',
    color: 'white',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
};

export default Footer;
