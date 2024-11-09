import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h2>Welcome to CineRedux</h2>
        <p>Experience seamless and secure international payments through our modern and easy-to-use platform.</p>
        <button className="cta-button" onClick={() => navigate('/login')}>Get Started</button>
      </div>
    </section>
  );
}

export default Home;