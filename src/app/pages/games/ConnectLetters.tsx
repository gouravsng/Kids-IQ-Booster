import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowLeft, RotateCcw, Star } from 'lucide-react';

interface Word {
  word: string;
  image: string;
}

const words: Word[] = [
  { word: 'CAT', image: '🐱' },
  { word: 'DOG', image: '🐶' },
  { word: 'SUN', image: '☀️' },
  { word: 'CAR', image: '🚗' },
];

export function ConnectLetters() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);

  useState(() => {
    initializeGame();
  });

  const initializeGame = () => {
    const word = words[currentWordIndex].word;
    const letters = word.split('');
    const extraLetters = ['A', 'B', 'E', 'F', 'I', 'O', 'U'];
    const randomExtras = extraLetters
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const allLetters = [...letters, ...randomExtras].sort(() => Math.random() - 0.5);
    setAvailableLetters(allLetters);
    setSelectedLetters([]);
    setShowCorrect(false);
  };

  const handleLetterClick = (letter: string, index: number) => {
    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);
    setAvailableLetters(availableLetters.filter((_, i) => i !== index));

    // Check if word is complete
    if (newSelected.length === words[currentWordIndex].word.length) {
      setTimeout(() => {
        if (newSelected.join('') === words[currentWordIndex].word) {
          setShowCorrect(true);
          setTimeout(() => {
            if (currentWordIndex < words.length - 1) {
              setCurrentWordIndex(currentWordIndex + 1);
              initializeGame();
            } else {
              setGameWon(true);
            }
          }, 1500);
        } else {
          // Wrong word - reset
          setAvailableLetters([...availableLetters.filter((_, i) => i !== index), ...newSelected]);
          setSelectedLetters([]);
        }
      }, 300);
    }
  };

  const removeLetter = (index: number) => {
    const letter = selectedLetters[index];
    setSelectedLetters(selectedLetters.filter((_, i) => i !== index));
    setAvailableLetters([...availableLetters, letter]);
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setGameWon(false);
    initializeGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD700]/30 via-[#90EE90]/20 to-[#87CEEB]/30 py-12">
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
            onClick={resetGame}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </motion.button>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#FFD700] to-[#90EE90] bg-clip-text text-transparent">
            🔤 Connect Letters to Make Words
          </h1>
          <p className="text-xl text-gray-600">Spell the word for the picture!</p>
          <div className="mt-4 bg-white px-6 py-3 rounded-full shadow-lg inline-block">
            <span className="font-bold text-[#87CEEB]">Word:</span> {currentWordIndex + 1}/
            {words.length}
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: showCorrect ? 1.2 : 1 }}
          className="text-center mb-8"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 inline-block">
            <div className="text-9xl mb-4">{words[currentWordIndex].image}</div>
            {showCorrect && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-[#90EE90]"
              >
                ✓ Correct!
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Selected Letters */}
        <div className="bg-white p-6 rounded-3xl shadow-xl mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Your Word:</h3>
          <div className="flex gap-3 justify-center min-h-[80px] items-center flex-wrap">
            {selectedLetters.map((letter, index) => (
              <motion.button
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeLetter(index)}
                className="w-16 h-16 bg-gradient-to-br from-[#90EE90] to-[#87CEEB] text-white text-3xl font-bold rounded-2xl shadow-lg"
              >
                {letter}
              </motion.button>
            ))}
            {Array.from({ length: words[currentWordIndex].word.length - selectedLetters.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="w-16 h-16 border-4 border-dashed border-gray-300 rounded-2xl"
              />
            ))}
          </div>
        </div>

        {/* Available Letters */}
        <div className="bg-white p-6 rounded-3xl shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Choose Letters:</h3>
          <div className="flex gap-3 justify-center flex-wrap">
            {availableLetters.map((letter, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleLetterClick(letter, index)}
                className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-white text-3xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                {letter}
              </motion.button>
            ))}
          </div>
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
                🎉 Excellent! 🎉
              </h2>
              <p className="text-2xl text-gray-700 mb-8">You spelled all the words correctly!</p>
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetGame}
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
