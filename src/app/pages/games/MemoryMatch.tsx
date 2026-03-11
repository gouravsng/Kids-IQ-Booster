import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowLeft, RotateCcw, Star } from 'lucide-react';

const emojis = ['🐶', '🐱', '🐼', '🦊', '🐸', '🦋', '🌸', '⭐'];

interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

export function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameEmojis = emojis.slice(0, 6);
    const duplicatedEmojis = [...gameEmojis, ...gameEmojis];
    const shuffled = duplicatedEmojis.sort(() => Math.random() - 0.5);
    const initialCards = shuffled.map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    }));
    setCards(initialCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (cards[id].flipped || cards[id].matched) return;
    if (flippedCards.includes(id)) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    const newCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(newCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlippedCards;
      if (cards[first].emoji === cards[second].emoji) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, matched: true }
                : card
            )
          );
          setFlippedCards([]);
          setMatches(matches + 1);
          if (matches + 1 === 6) {
            setGameWon(true);
          }
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFB6C1]/30 via-[#DDA0DD]/20 to-[#87CEEB]/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/games">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg text-gray-700 hover:shadow-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Games
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={initializeGame}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            New Game
          </motion.button>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#FFB6C1] to-[#DDA0DD] bg-clip-text text-transparent">
            🎴 Memory Match Game
          </h1>
          <div className="flex gap-8 justify-center text-xl">
            <div className="bg-white px-6 py-3 rounded-full shadow-lg">
              <span className="font-bold text-[#87CEEB]">Moves:</span> {moves}
            </div>
            <div className="bg-white px-6 py-3 rounded-full shadow-lg">
              <span className="font-bold text-[#90EE90]">Matches:</span> {matches}/6
            </div>
          </div>
        </motion.div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: card.matched ? 1 : 1.05 }}
              whileTap={{ scale: card.matched ? 1 : 0.95 }}
              onClick={() => handleCardClick(card.id)}
              className="aspect-square cursor-pointer"
            >
              <motion.div
                className="w-full h-full relative"
                animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Back */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#87CEEB] to-[#DDA0DD] rounded-2xl shadow-lg flex items-center justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div className="text-white text-4xl">?</div>
                </div>

                {/* Card Front */}
                <div
                  className="absolute inset-0 bg-white rounded-2xl shadow-lg flex items-center justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="text-6xl">{card.emoji}</div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Win Modal */}
        {gameWon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              className="bg-white rounded-3xl p-12 text-center shadow-2xl max-w-md"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-6"
              >
                <Star className="w-24 h-24 text-[#FFD700] fill-[#FFD700]" />
              </motion.div>
              <h2 className="text-4xl font-bold mb-4 text-[#87CEEB]">
                🎉 Congratulations! 🎉
              </h2>
              <p className="text-2xl text-gray-700 mb-2">You Won!</p>
              <p className="text-xl text-gray-600 mb-8">Moves: {moves}</p>
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={initializeGame}
                  className="px-8 py-4 bg-gradient-to-r from-[#90EE90] to-[#87CEEB] text-white rounded-full font-bold shadow-lg"
                >
                  Play Again
                </motion.button>
                <Link to="/games">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-[#FFB6C1] to-[#DDA0DD] text-white rounded-full font-bold shadow-lg"
                  >
                    All Games
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
