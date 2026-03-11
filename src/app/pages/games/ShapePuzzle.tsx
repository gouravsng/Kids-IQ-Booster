import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowLeft, RotateCcw, Star } from 'lucide-react';

interface Shape {
  id: string;
  shape: 'circle' | 'square' | 'triangle' | 'star';
  color: string;
  placed: boolean;
}

export function ShapePuzzle() {
  const [shapes, setShapes] = useState<Shape[]>([
    { id: '1', shape: 'circle', color: '#87CEEB', placed: false },
    { id: '2', shape: 'square', color: '#90EE90', placed: false },
    { id: '3', shape: 'triangle', color: '#FFD700', placed: false },
    { id: '4', shape: 'star', color: '#FFB6C1', placed: false },
  ]);
  const [gameWon, setGameWon] = useState(false);

  const handleShapePlace = (shapeId: string) => {
    const newShapes = shapes.map((s) =>
      s.id === shapeId ? { ...s, placed: true } : s
    );
    setShapes(newShapes);

    if (newShapes.every((s) => s.placed)) {
      setTimeout(() => setGameWon(true), 500);
    }
  };

  const resetGame = () => {
    setShapes((prev) => prev.map((s) => ({ ...s, placed: false })));
    setGameWon(false);
  };

  const renderShape = (shape: Shape['shape'], color: string, size: number) => {
    switch (shape) {
      case 'circle':
        return (
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
            }}
          />
        );
      case 'square':
        return (
          <div
            className="rounded-lg"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
            }}
          />
        );
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
            }}
          />
        );
      case 'star':
        return (
          <div className="text-6xl" style={{ color }}>
            ⭐
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFB6C1]/30 via-[#FFD700]/20 to-[#90EE90]/30 py-12">
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
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#FFB6C1] to-[#90EE90] bg-clip-text text-transparent">
            🔷 Shape Puzzle Game
          </h1>
          <p className="text-xl text-gray-600">
            Drag and drop each shape to its matching outline!
          </p>
        </motion.div>

        {/* Game Area */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Shapes to drag */}
          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Shapes</h3>
            <div className="grid grid-cols-2 gap-6">
              {shapes.map((shape) => (
                <motion.div
                  key={shape.id}
                  drag={!shape.placed}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  whileHover={{ scale: shape.placed ? 1 : 1.1 }}
                  className={`flex items-center justify-center h-32 rounded-2xl ${
                    shape.placed ? 'opacity-30' : 'cursor-move'
                  }`}
                >
                  {!shape.placed && renderShape(shape.shape, shape.color, 80)}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Drop zones */}
          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Match Here</h3>
            <div className="grid grid-cols-2 gap-6">
              {shapes.map((shape) => (
                <motion.div
                  key={`zone-${shape.id}`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleShapePlace(shape.id)}
                  className="flex items-center justify-center h-32 rounded-2xl border-4 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer transition-all"
                >
                  {shape.placed ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring' }}
                    >
                      {renderShape(shape.shape, shape.color, 80)}
                    </motion.div>
                  ) : (
                    <div className="opacity-20">
                      {renderShape(shape.shape, '#666', 60)}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#87CEEB]/20 to-[#DDA0DD]/20 p-6 rounded-3xl text-center"
        >
          <p className="text-lg text-gray-700">
            💡 <strong>Tip:</strong> Click on each shape on the left, then click on its matching spot on the right!
          </p>
        </motion.div>

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
                🎉 Fantastic! 🎉
              </h2>
              <p className="text-2xl text-gray-700 mb-8">You matched all the shapes!</p>
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
