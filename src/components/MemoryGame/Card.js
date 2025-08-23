import React from 'react';

const Card = ({ card, onClick, isFlipped, isMatched }) => {
  return (
    <div
      className={`card ${isFlipped || isMatched ? 'flipped' : ''}`}
      onClick={() => !isFlipped && !isMatched && onClick(card)}
      style={{
        width: '120px',
        height: '160px',
        margin: '10px',
        cursor: 'pointer',
        perspective: '600px',
      }}
    >
      <div
        className="card-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: isFlipped || isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front side (face-down) */}
        <div
          className="card-front"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            backgroundColor: '#2d3748', // dark slate blue-gray
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
          }}
        ></div>

        {/* Back side (flipped) */}
        <div
          className="card-back"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            backgroundColor: '#f5f1e9', // soft cream/beige (warmer than plain white)
            borderRadius: '8px',
            transform: 'rotateY(180deg)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#4a3c31', // dark brown text for comfortable contrast
            padding: '10px',
            boxSizing: 'border-box',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          {card.type === 'word' ? (
            <span style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>{card.content}</span>
          ) : (
            <img src={card.content} alt="Sanskrit related" style={{ maxWidth: '80%', maxHeight: '80%' }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
