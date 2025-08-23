import React, { useState } from 'react';
import MemoryGameBoard from './MemoryGame/MemoryGameBoard';
import WordCatcherGame from './WordCatcher/WordCatcherGame';
import PlayRiddles from './SanskritRiddles/PlayRiddle';

const games = [
  {
    name: 'शब्द ग्रहणकर्ता (Word Catcher)',
    icon: '/word-catcher.png',
    component: WordCatcherGame,
  },
  {
    name: 'स्मृति क्रीडा (Memory Game)',
    icon: "/memory-game.png",
    component: MemoryGameBoard,
  },
  {
    name: 'प्रहेलिका क्रीडा (Riddle Game)',
    icon: '/riddle-game.png',
    component: PlayRiddles,
  }
];

const WelcomePage = () => {
  const [selectedGame, setSelectedGame] = useState(null);

    if (selectedGame) {
  const GameComponent = selectedGame.component;
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <button onClick={() => setSelectedGame(null)} style={{ marginBottom: '20px' }}>
        ←  पुनः क्रीडासूचौ
      </button>
      <GameComponent goBack={() => setSelectedGame(null)} />
    </div>
  );
}


  return (
    <div className="container py-4 position-relative text-white" style={{ zIndex: 1, fontFamily: 'Arial, sans-serif' }}>
      {/* Logo top-right */}
      <div className="d-flex justify-content-end mb-3">
        <img 
          src="/iitr-logo.jpg"
          alt="IITR Logo"
          style={{ height: '100px', width: 'auto' }}
        />
      </div>

      {/* Sanskrit Welcome Text */}
      <div className="text-center mb-4" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>
        <h1>।। संस्कृतभाषायाः नमस्कारः, मातृभूमिभारतस्य नमस्कारः ।।</h1> 
        <h2>नमो नमः संस्कृतक्रीडासु स्वागतम् ।।</h2>
        <p className="fs-4">
          अहं भवतां सर्वेषां अस्मिन् परियोजनायां स्वागतं करोमि।  
          अत्र अहं संस्कृतभाषायाः उथानस्य कृते मम विचारान् आनयिष्यामि।  
          अधोलिखितानां सूचीतः क्रीडितुं क्रीडां चिनुत।  
        </p>
      </div>

      {/* Game Cards */}
      <div className="row g-4">
        {games.map((game) => (
          <div className="col-12 col-md-4 d-flex" key={game.name}>
            <div className="card flex-fill shadow bg-light">
              <div className="card-body d-flex flex-column align-items-center">
                <img
            src={game.icon}
            alt={game.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              marginBottom: '8px'
            }}
          />
                <h5 className="card-title mt-3 text-dark">{game.name}</h5>
                <button 
                  className="btn btn-primary mt-auto"
                  onClick={() => setSelectedGame(game)}
                >
                  क्रीडामः →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomePage;
