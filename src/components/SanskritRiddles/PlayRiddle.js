import React, { useState } from 'react';
import riddles from './riddles.json'; // adjust the path as needed

const SanskritRiddleGame = () => {
  const [currentRiddle, setCurrentRiddle] = useState(getRandomRiddle());
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  function getRandomRiddle() {
    const randomIndex = Math.floor(Math.random() * riddles.length);
    return riddles[randomIndex];
  }

  const newRiddle = () => {
    setCurrentRiddle(getRandomRiddle());
    setShowHint(false);
    setShowAnswer(false);
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '30px 40px',
        backgroundColor: 'rgba(35, 28, 17, 0.85)', // dark translucent warm brown
        borderRadius: '15px',
        color: '#f1e9db', // cream/light for good contrast
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.9)',
        textAlign: 'center',
        userSelect: 'none',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <h2
        style={{
          marginBottom: '30px',
          fontWeight: '800',
          fontSize: '2.25rem',
          color: '#ffd700', // golden-yellow accent
          textShadow: '2px 2px 8px #000000bb',
        }}
      >
      संस्कृतं प्रहेलिकाक्रीडा
      </h2>

      <div style={{ marginBottom: '30px' }}>
        <strong style={{ fontSize: '1.25rem', letterSpacing: '0.06em' }}>प्रहेलिका:</strong>
        <p
          style={{
            fontSize: '1.3rem',
            fontFamily: "'Noto Serif Devanagari', serif",
            margin: '12px 0 6px',
            lineHeight: '1.5',
            textShadow: '1px 1px 3px #000000cc',
          }}
        >
          {currentRiddle.riddle}
        </p>
        <em
          style={{
            fontSize: '1rem',
            color: '#d3c8a5',
            letterSpacing: '0.04em',
            textShadow: 'none',
            userSelect: 'text',
          }}
        >
          ({currentRiddle.translation})
        </em>
      </div>

      {showHint && (
        <div
          style={{
            marginBottom: '25px',
            color: '#e0d9bb',
            fontStyle: 'italic',
            fontSize: '1.1rem',
            textShadow: '1px 1px 5px #000000bb',
            borderLeft: '4px solid #f9d71c',
            paddingLeft: '15px',
          }}
        >
          <strong>संकेत:</strong>
          <p style={{ marginTop: '6px' }}>{currentRiddle.hint}</p>
        </div>
      )}

      {showAnswer && (
        <div
          style={{
            marginBottom: '30px',
            color: '#a8d5a2',
            fontWeight: '700',
            fontSize: '1.2rem',
            textShadow: '1px 1px 5px #000000bb',
            borderLeft: '4px solid #70b36b',
            paddingLeft: '15px',
          }}
        >
          <strong>उत्तरम्‌:</strong>
          <p style={{ marginTop: '6px' }}>{currentRiddle.answer}</p>
        </div>
      )}

      <div style={{ marginTop: '10px' }}>
        <button
          onClick={() => setShowHint(true)}
          disabled={showHint}
          style={buttonStyle}
        >
          संकेतं दर्शयतु
        </button>
        <button
          onClick={() => setShowAnswer(true)}
          disabled={showAnswer}
          style={buttonStyle}
        >
          उत्तरं दर्शयतु
        </button>
        <button onClick={newRiddle} style={{ ...buttonStyle, backgroundColor: '#ffd700', color: '#3e2f11' }}>
          नवीन प्रहेलिका
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: '#704c11',
  color: '#f1e9db',
  border: 'none',
  padding: '10px 18px',
  marginRight: '12px',
  borderRadius: '6px',
  fontWeight: '600',
  cursor: 'pointer',
  boxShadow: '0 3px 7px rgba(0,0,0,0.6)',
  transition: 'background-color 0.3s ease',
  userSelect: 'none',
};

export default SanskritRiddleGame;
