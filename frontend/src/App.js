import React from 'react';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <h1>CineRedux Customer Portal</h1>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h2>Welcome to CineRedux</h2>
            <p>Experience seamless and secure international payments through our modern and easy-to-use platform.</p>
            <button className="cta-button">Get Started</button>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} CineRedux. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
