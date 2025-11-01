import React, { useState, useEffect, useRef } from 'react';
import questionsData from './questions.json';

function getRandomQuestionIndex(total) {
  return Math.floor(Math.random() * total);
}

const EGG_FALL_SPEED = 2;    
const GAME_WIDTH = 600;      
const EGG_SIZE = 50;         
const BASKET_WIDTH = 100;    
const POSITIONS_PERCENT = [0.17, 0.5, 0.77];

const WordCatcherGame = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(() => getRandomQuestionIndex(questionsData.length));
  const [eggs, setEggs] = useState([]);
  const [basketX, setBasketX] = useState(GAME_WIDTH / 2 - BASKET_WIDTH / 2);
  const fallInterval = useRef(null);

  useEffect(() => {
    if (gameOver) return;
    
    const currentQ = questionsData[currentQIndex];

    const options = [
      { answer: currentQ.correctAnswer, isCorrect: true },
      { answer: currentQ.wrongAnswer1, isCorrect: false },
      { answer: currentQ.wrongAnswer2, isCorrect: false }
    ].sort(() => Math.random() - 0.5);

    const eggsWithPos = options.map((opt,index) => ({
      ...opt,
      x: POSITIONS_PERCENT[index] * (GAME_WIDTH - EGG_SIZE),
      y: 0
    }));

    setEggs(eggsWithPos);
  }, [currentQIndex, gameOver]);

  useEffect(() => {
    if (gameOver) {
      clearInterval(fallInterval.current);
      return;
    }

    fallInterval.current = setInterval(() => {
      setEggs((prevEggs) =>
        prevEggs.map((egg) => ({ ...egg, y: egg.y + EGG_FALL_SPEED }))
      );
    }, 50);

    return () => clearInterval(fallInterval.current);
  }, [gameOver]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      if (e.key === 'ArrowLeft') {
        setBasketX((x) => Math.max(0, x - 20));
      } else if (e.key === 'ArrowRight') {
        setBasketX((x) => Math.min(GAME_WIDTH - BASKET_WIDTH, x + 20));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  useEffect(() => {
  if (eggs.length === 0 || gameOver) return;

  let scoreChanged = false;

  eggs.forEach((egg) => {
    // Check if egg reaches basket level
    if (!scoreChanged && egg.y + EGG_SIZE >= 400) {
      const eggHitsBasket =
        egg.x + EGG_SIZE > basketX && egg.x < basketX + BASKET_WIDTH;

      if (eggHitsBasket) {
        setScore((s) => {
          const newScore = egg.isCorrect ? s + 1 : s - 1;
          if (newScore < 0) setGameOver(true);
          return newScore;
        });
        scoreChanged = true;
        setEggs([]); // Clear eggs for next question
        setCurrentQIndex(() => getRandomQuestionIndex(questionsData.length));
      }
    }
  });

  // If none hit basket but one or more fell out, minus one score once
  if (
    !scoreChanged &&
    eggs.some((egg) => egg.y > 420)
  ) {
    setScore((s) => {
      const newScore = s - 1;
      if (newScore < 0) setGameOver(true);
      return newScore;
    });
    setEggs([]);
    setCurrentQIndex(() => getRandomQuestionIndex(questionsData.length));
  }
}, [eggs, basketX, gameOver]);


  if (!questionsData.length) return <div>Loading questions...</div>;

  if (gameOver) {
    return (
      <div style={{
        padding: 30,
        textAlign: 'center',
        fontSize: 28,
        color: '#f1e9db',
        fontWeight: 'bold',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        minHeight: '100vh',
        backgroundImage: "url('/sanskrit-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textShadow: '2px 2px 6px #000000a0'
      }}>
        Game Over! Your score is: {score}
      </div>
    );
  }

  const currentQ = questionsData[currentQIndex];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: "url('/sanskrit-bg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#f1e9db',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '40px 20px',
      gap: '20px',
    }}>
      {/* dark overlay */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(25, 25, 25, 0.75)',
        zIndex: 0,
      }} />

      {/* Game area */}
      <div style={{
        position: 'relative',
        width: GAME_WIDTH,
        height: 450,
        border: '3px solid #82755a',
        borderRadius: 25,
        backgroundColor: 'rgba(253, 248, 231, 0.75)', // warm cream, translucent
        boxShadow: '0 8px 16px rgba(0,0,0,0.8)',
        overflow: 'hidden',
        zIndex: 1,
      }}>
        {eggs.map((egg, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: egg.x,
              top: egg.y,
              width: EGG_SIZE,
              height: EGG_SIZE,
              borderRadius: '50%',
              backgroundColor: '#f9d71c', // brighter yellow or orange
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              color: '#3a2f1c',
              fontSize: '18px',
              userSelect: 'none',
              boxShadow: '0 3px 8px rgba(0,0,0,0.35)',
              border: '1.5px solid #aa9220',
            }}
          >
            {egg.answer}
          </div>
        ))}

        {/* Basket */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: basketX,
          width: BASKET_WIDTH,
          height: 50,
          backgroundColor: '#5e3b1a', // rich brown
          borderRadius: '0 0 25px 25px',
          boxShadow: '0 3px 10px rgba(0,0,0,0.7)',
          border: '2px solid #3e270f',
          zIndex: 2,
        }} />
      </div>

      {/* Info panel */}
      <div style={{
        position: 'relative',
        width: 280,
        color: '#f1e9db',
        zIndex: 1,
        fontWeight: 'bold',
        lineHeight: 1.4,
        textShadow: '1px 1px 5px #000000cc',
        padding: '15px 20px',
        borderRadius: '12px',
        backgroundColor: 'rgba(35, 28, 17, 0.8)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.9)'
      }}>
        <h3 style={{ marginBottom: 8, fontWeight: '900', fontSize: '22px' }}>प्रश्न:</h3>
        <div style={{ marginBottom: 25, fontSize: 18 }}>{currentQ.question}</div>

        <h3 style={{ marginBottom: 8, fontWeight: '900', fontSize: '22px' }}>शब्द:</h3>
        <div style={{ marginBottom: 40, fontSize: 22, color: '#f9d71c' }}>{currentQ.word}</div>

        <h3 style={{ marginBottom: 8, fontWeight: '900', fontSize: '22px' }}>अंक:</h3>
        <div style={{ fontSize: 32, color: '#f9d71c' }}>{score}</div>
      </div>
    </div>
  );
};

export default WordCatcherGame;
