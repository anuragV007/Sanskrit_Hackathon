import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WelcomePage from './components/WelcomePage'; // adjust path if needed

function App() {
  return (
    <div className="App">
      <div className="bg-overlay" />
      <WelcomePage />
    </div>
  );
}

export default App;
