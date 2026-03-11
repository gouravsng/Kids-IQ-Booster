import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowLeft, RotateCcw, Star } from 'lucide-react';

export function PeakBrainTraining() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highlightedButton, setHighlightedButton] = useState<number | null>(null);

  const colors = [
    { id: 0, color: '#87CEEB', name: 'Blue' },
    { id: 1, color: '#90EE90', name: 'Green' },
    { id: 2, color: '#FFD700', name: 'Yellow' },
    { id: 3, color: '#FFB6C1', name: 'Pink' },
  ];

  const startNewGame = () => {
    setSequence([]);
    setUserSequence([]);
    setCurrentLevel(1);
    setScore(0);
    setGameOver(false);
    nextLevel([]);
  };

  const nextLevel = (currentSeq: number[]) => {
    const newNumber = Math.floor(Math.random() * 4);
    const newSequence = [...currentSeq, newNumber];
    setSequence(newSequence);
    setUserSequence([]);
    playSequence(newSequence);
  };

  const playSequence = async (seq: number[]) => {
    setIsPlaying(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    for (let i = 0; i < seq.length; i++) {
      setHighlightedButton(seq[i]);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setHighlightedButton(null);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    setIsPlaying(false);
  };

  const handleButtonClick = (buttonId: number) => {
    if (isPlaying || gameOver) return;

    const newUserSequence = [...userSequence, buttonId];
    setUserSequence(newUserSequence);

    // Check if correct
    if (buttonId !== sequence[newUserSequence.length - 1]) {
      setGameOver(true);
      return;
    }

    // Check if sequence complete
    if (newUserSequence.length === sequence.length) {
      setScore(score + currentLevel * 10);
      setCurrentLevel(currentLevel + 1);
      setTimeout(() => nextLevel(sequence), 1000);
    }
  };

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#87CEEB]/30 via-[#DDA0DD]/20 to-[#FFD700]/30 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
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
            onClick={startNewGame}
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
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#87CEEB] to-[#FFD700] bg-clip-text text-transparent">
            ⚡ Peak Brain Training
          </h1>
          <p className="text-xl text-gray-600">Watch the pattern and repeat it!</p>
          <div className="flex gap-4 justify-center mt-4">
            <div className="bg-white px-6 py-3 rounded-full shadow-lg">
              <span className="font-bold text-[#87CEEB]">Level:</span> {currentLevel}
            </div>
            <div className="bg-white px-6 py-3 rounded-full shadow-lg">
              <span className="font-bold text-[#90EE90]">Score:</span> {score}
            </div>
          </div>
        </motion.div>

        {/* Game Board */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl shadow-2xl mb-8"
        >
          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
            {colors.map((color) => (
              <motion.button
                key={color.id}
                whileHover={{ scale: isPlaying ? 1 : 1.05 }}
                whileTap={{ scale: isPlaying ? 1 : 0.95 }}
                onClick={() => handleButtonClick(color.id)}
                className={`aspect-square rounded-3xl shadow-xl transition-all ${
                  isPlaying ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                style={{
                  backgroundColor: color.color,
                  opacity: highlightedButton === color.id ? 1 : 0.6,
                  transform: highlightedButton === color.id ? 'scale(1.1)' : 'scale(1)',
                }}
                disabled={isPlaying}
              >
                <div className="text-white text-2xl font-bold">{color.name}</div>
              </motion.button>
            ))}
          </div>

          {isPlaying && (
            <div className="text-center mt-6 text-xl text-gray-600 font-bold">
              Watch carefully! 👀
            </div>
          )}
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#90EE90]/20 to-[#87CEEB]/20 p-6 rounded-3xl text-center"
        >
          <p className="text-lg text-gray-700">
            💡 <strong>How to Play:</strong> Watch the sequence light up, then click the buttons in the same order!
          </p>
        </motion.div>

        {/* Game Over Modal */}
        {gameOver && (
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
              <h2 className="text-4xl font-bold mb-4 text-[#87CEEB]">Game Over!</h2>
              <p className="text-2xl text-gray-700 mb-2">Level Reached: {currentLevel}</p>
              <p className="text-2xl text-gray-700 mb-8">Final Score: {score}</p>
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startNewGame}
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
