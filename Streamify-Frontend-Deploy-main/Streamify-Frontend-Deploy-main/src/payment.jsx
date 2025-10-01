import React, { useState } from 'react';

const PaymentPage = () => {
  const [payerName, setPayerName] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [message, setMessage] = useState('');

  const receiverUpi = '8639694489@ybl';
  const amount = 147;

  const generateQrUrl = (name) => {
    const payeeName = 'Streamify';
    const note = name
      ? `Payment by ${name} for subscription`
      : 'Video Streaming Subscription';
    const upiLink = `upi://pay?pa=${receiverUpi}&pn=${payeeName}&am=${amount}&cu=INR&tn=${note}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    const url = generateQrUrl(payerName.trim());
    setQrCodeUrl(url);
    setMessage('Scan the QR below using any UPI app to pay ₹147.');
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #4e54c8, #8f94fb)',
      padding: '1rem'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '2rem',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
      }}>
        <h2 style={{ marginBottom: '1rem', color: '#333' }}>Pay ₹147 to StreamFlix</h2>
        <form onSubmit={handleGenerate} style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Your Name (optional)"
            value={payerName}
            onChange={(e) => setPayerName(e.target.value)}
            style={{
              padding: '0.6rem',
              width: '100%',
              marginBottom: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
          <button type="submit" style={{
            width: '100%',
            padding: '0.75rem',
            background: '#6c63ff',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Generate QR
          </button>
        </form>
        {message && <p style={{ color: '#444', marginBottom: '1rem' }}>{message}</p>}
        {qrCodeUrl && (
          <img
            src={qrCodeUrl}
            alt="UPI QR Code"
            style={{
              borderRadius: '10px',
              background: '#fff',
              padding: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
