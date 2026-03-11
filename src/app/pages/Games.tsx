import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Grid3x3, Zap, ArrowUpDown, Circle, Type, Layers, Shapes } from 'lucide-react';

export function Games() {
  const games = [
    {
      id: 'mini-sudoku',
      name: 'Mini Sudoku',
      description: 'A simplified 6×6 Sudoku puzzle designed for kids',
      icon: Grid3x3,
      color: '#87CEEB',
      path: '/games/mini-sudoku',
    },
    {
      id: 'peak-brain',
      name: 'Peak Brain Training',
      description: 'Memory and reaction games to train brain speed',
      icon: Zap,
      color: '#FFD700',
      path: '/games/peak-brain',
    },
    {
      id: 'connect-numbers',
      name: 'Connect the Numbers',
      description: 'Connect numbers in sequence to form shapes',
      icon: ArrowUpDown,
      color: '#90EE90',
      path: '/games/connect-numbers',
    },
    {
      id: 'connect-dots',
      name: 'Connect the Dots',
      description: 'Connect dots to reveal animals or objects',
      icon: Circle,
      color: '#DDA0DD',
      path: '/games/connect-dots',
    },
    {
      id: 'connect-letters',
      name: 'Connect Letters to Make Words',
      description: 'Drag letters together to form simple words',
      icon: Type,
      color: '#FFB6C1',
      path: '/games/connect-letters',
    },
    {
      id: 'memory-match',
      name: 'Memory Match Game',
      description: 'Flip cards and match pairs',
      icon: Layers,
      color: '#FFA500',
      path: '/games/memory-match',
    },
    {
      id: 'shape-puzzle',
      name: 'Shape Puzzle Game',
      description: 'Match shapes with outlines',
      icon: Shapes,
      color: '#87CEEB',
      path: '/games/shape-puzzle',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#87CEEB] via-[#DDA0DD] to-[#FFB6C1] bg-clip-text text-transparent">
            🎮 Fun Learning Games
          </h1>
          <p className="text-xl text-gray-600">
            Choose a game and start your brain training adventure!
          </p>
        </motion.div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative"
            >
              <Link to={game.path}>
                <div
                  className="p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden h-full"
                  style={{
                    background: `linear-gradient(135deg, ${game.color}20, ${game.color}40)`,
                  }}
                >
                  {/* Decorative circles */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 -mr-8 -mt-8"
                    style={{ backgroundColor: game.color }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-16 h-16 rounded-full opacity-20 -ml-4 -mb-4"
                    style={{ backgroundColor: game.color }}
                  />

                  {/* Icon */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                    style={{ backgroundColor: game.color }}
                  >
                    <game.icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{game.name}</h3>
                  <p className="text-gray-600 mb-4">{game.description}</p>

                  {/* Play Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="mt-4 px-6 py-3 bg-white rounded-full font-bold shadow-md hover:shadow-lg transition-all"
                    style={{ color: game.color }}
                  >
                    Play Now! 🎯
                  </motion.button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-[#87CEEB]/20 to-[#DDA0DD]/20 rounded-3xl"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to boost your brain power? 🧠
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Start with any game and improve your skills every day!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
