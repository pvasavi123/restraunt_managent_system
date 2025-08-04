import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/contact/submit', formData);
      setStatus('✅ Feedback sent successfully!');
      setSubmittedData(response.data);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setStatus('❌ Failed to send feedback. Please try again.');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <div style={{ padding: '60px 20px', backgroundColor: '#fffaf5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
            padding: '30px',
            border: '1px solid #f0e5dc'
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#b76335' }}>
            Contact Us
          </h2>

          {status && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                marginBottom: '20px',
                padding: '10px 15px',
                borderRadius: '10px',
                color: '#fff',
                backgroundColor: status.startsWith('✅') ? '#28a745' : '#dc3545'
              }}
            >
              {status}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            {['name', 'email', 'subject'].map((field) => (
              <div key={field} style={{ marginBottom: '20px' }}>
                <label htmlFor={field} style={{ fontWeight: '600', marginBottom: '5px', display: 'block', color: '#333' }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid #d6ccc2',
                    outline: 'none'
                  }}
                />
              </div>
            ))}

            <div style={{ marginBottom: '25px' }}>
              <label htmlFor="message" style={{ fontWeight: '600', marginBottom: '5px', display: 'block', color: '#333' }}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #d6ccc2',
                  outline: 'none'
                }}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#b76335',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(183, 99, 53, 0.2)',
                transition: 'background-color 0.3s'
              }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {submittedData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: '40px',
              backgroundColor: '#fff3ea',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid #f0e0d0'
            }}
          >
            <h3 style={{ color: '#b76335' }}>Submitted Feedback</h3>
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Subject:</strong> {submittedData.subject}</p>
            <p><strong>Message:</strong> {submittedData.message}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ContactUs;
