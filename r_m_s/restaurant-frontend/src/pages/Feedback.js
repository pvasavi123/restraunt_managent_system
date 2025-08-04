import React, { useState } from 'react';

const Feedback = () => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [feedbacks, setFeedbacks] = useState([]);
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      name: 'Guest User',
      message,
      rating,
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    setMessage('');
    setRating(5);
    setSuccess('✅ Feedback submitted!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div style={styles.page}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>🧾 Share Your Feedback</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <textarea
            placeholder="Tell us your thoughts..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            style={styles.textarea}
          />

          <div style={styles.inputRow}>
            <label htmlFor="rating" style={styles.label}>Rating:</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              style={styles.select}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <button type="submit" style={styles.button}>Send Feedback</button>
          {success && <p style={styles.success}>{success}</p>}
        </form>
      </div>

      <div style={styles.feedbackList}>
        <h3 style={styles.subtitle}>🗂️ Feedback Received</h3>
        {feedbacks.length === 0 ? (
          <p style={styles.empty}>No feedback yet.</p>
        ) : (
          feedbacks.map((fb, index) => (
            <div key={index} style={styles.feedbackCard}>
              <p style={styles.fbMessage}><strong>💬</strong> {fb.message}</p>
              <p style={styles.fbRating}>⭐ {fb.rating} / 5</p>
              <p style={styles.fbUser}>👤 {fb.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Color palette
const lightOrange = '#FFF8E1'; // Light background
const orange = '#FFA726';      // Buttons / select
const redPink = '#FF6B6B';     // Title / border
const cardBg = '#FFEBEE';      // Feedback cards
const textAccent = '#D84315';  // Subtitles

const styles = {
  page: {
    backgroundColor: lightOrange,
    padding: '40px 20px',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  formContainer: {
    background: '#ffffffee',
    borderRadius: '12px',
    maxWidth: '600px',
    margin: '0 auto 40px',
    padding: '30px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: redPink,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '20px',
    marginBottom: '20px',
    color: textAccent,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  textarea: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: `1px solid ${orange}`,
    resize: 'vertical',
    backgroundColor: '#fffdf6',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: textAccent,
  },
  select: {
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '16px',
    border: `1px solid ${redPink}`,
    backgroundColor: '#fff1f0',
    color: '#333',
  },
  button: {
    background: orange,
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  success: {
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  feedbackList: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  feedbackCard: {
    background: cardBg,
    padding: '15px 20px',
    marginBottom: '15px',
    borderLeft: `5px solid ${redPink}`,
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },
  fbMessage: {
    fontSize: '16px',
    color: '#444',
    marginBottom: '8px',
  },
  fbRating: {
    fontSize: '14px',
    color: textAccent,
  },
  fbUser: {
    fontSize: '13px',
    color: '#777',
    marginTop: '5px',
    fontStyle: 'italic',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
  },
};

export default Feedback;
