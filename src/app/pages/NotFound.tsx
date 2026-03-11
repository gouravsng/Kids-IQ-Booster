import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Home, Frown } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#87CEEB]/30 via-[#DDA0DD]/20 to-[#FFB6C1]/30 py-12">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            className="inline-block mb-8"
          >
            <Frown className="w-32 h-32 text-[#87CEEB]" />
          </motion.div>

          <h1 className="text-9xl font-bold mb-4 bg-gradient-to-r from-[#87CEEB] via-[#DDA0DD] to-[#FFB6C1] bg-clip-text text-transparent">
            404
          </h1>

          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Oops! Page Not Found
          </h2>

          <p className="text-xl text-gray-600 mb-12">
            The page you're looking for seems to have wandered off. Let's get you back to the fun!
          </p>

          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#87CEEB] to-[#DDA0DD] text-white rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              <Home className="w-6 h-6" />
              Go Back Home
            </motion.button>
          </Link>

          <div className="mt-12 flex justify-center gap-4 flex-wrap">
            <Link to="/games">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-[#87CEEB] rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                🎮 Play Games
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-[#DDA0DD] rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                ℹ️ About Us
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
