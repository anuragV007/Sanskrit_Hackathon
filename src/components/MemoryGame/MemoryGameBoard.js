import React, { useState, useEffect } from 'react';
import Card from './Card';
import wordsData from './words.json';

const prepareCards = (pairs) => {
  let cards = [];
  pairs.forEach((pair, index) => {
    cards.push({ id: index * 2, type: 'word', content: pair.word, pairId: index });
    cards.push({ id: index * 2 + 1, type: 'image', content: pair.image, pairId: index });
  });

  return cards.sort(() => Math.random() - 0.5);
};

const MemoryGameBoard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });

  useEffect(() => {
    const allCards = prepareCards(wordsData);
    setCards(allCards);
  }, []);

  const handleCardClick = (card) => {
    if (
      isChecking ||
      flippedCards.length === 2 ||
      flippedCards.find((c) => c.id === card.id) ||
      matchedPairs.includes(card.pairId)
    ) {
      return;
    }

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setTimeout(() => {
        checkForMatch(newFlipped);
      }, 1000);
    }
  };

  const checkForMatch = ([card1, card2]) => {
    if (card1.pairId === card2.pairId && card1.type !== card2.type) {
      setMatchedPairs((prev) => [...prev, card1.pairId]);
      setScores((prevScores) => ({
        ...prevScores,
        [playerTurn]: prevScores[playerTurn] + 1,
      }));
    } else {
      setPlayerTurn(playerTurn === 1 ? 2 : 1);
    }
    setFlippedCards([]);
    setIsChecking(false);
  };

  return (
  <div
    style={{
      minHeight: '100vh',
      backgroundImage: "url('/sanskrit-bg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#f0e6d2',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
    }}
  >
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(30, 30, 30, 0.75)',
        zIndex: 0,
      }}
    />

    <div
      style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '1200px',
        textAlign: 'center',
      }}
    >
      <h2 style={{ marginBottom: '24px', fontWeight: '700', fontSize: '2.5rem', textShadow: '2px 2px 6px #000' }}>
        संस्कृत Memory Match
      </h2>

      <div
        style={{
          marginBottom: '24px',
          fontSize: '1.25rem',
          fontWeight: '600',
          backgroundColor: 'rgba(0,0,0,0.4)',
          borderRadius: '10px',
          padding: '12px 20px',
          boxShadow: '0 0 10px rgba(0,0,0,0.8)',
          textShadow: '1px 1px 3px #333',
        }}
      >
        Player 1 Score: {scores[1]} | Player 2 Score: {scores[2]} | Current Turn: Player {playerTurn}
      </div>

      {/* Cards grid with 8 columns, 4 rows */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gridTemplateRows: 'repeat(4, auto)',
          gap: '18px',
          justifyItems: 'center',
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={handleCardClick}
            isFlipped={!!flippedCards.find((c) => c.id === card.id)}
            isMatched={matchedPairs.includes(card.pairId)}
          />
        ))}
      </div>

      {matchedPairs.length === wordsData.length && (
        <div
          style={{
            marginTop: '32px',
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#ffd700',
            textShadow: '2px 2px 8px #000',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 0 15px #ffd700',
          }}
        >
          Game Over! Winner:{' '}
          {scores[1] > scores[2]
            ? 'Player 1'
            : scores[2] > scores[1]
            ? 'Player 2'
            : 'It is a Tie!'}
        </div>
      )}
    </div>
  </div>
);

};

export default MemoryGameBoard;
