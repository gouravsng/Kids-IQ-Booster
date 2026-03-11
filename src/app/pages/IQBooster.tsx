import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Brain, Sparkles, Zap, Target, Lightbulb, Puzzle } from 'lucide-react';

export function IQBooster() {
  const challenges = [
    {
      title: "Pattern Recognition",
      description: "Identify the missing pattern",
      icon: Puzzle,
      color: '#87CEEB',
      pattern: ['🔵', '🟢', '🔵', '🟢', '🔵', '?'],
      answer: '🟢',
    },
    {
      title: "Color Sequence",
      description: "Complete the color sequence",
      icon: Sparkles,
      color: '#FFD700',
      pattern: ['🔴', '🔴', '🔵', '🔴', '🔴', '🔵', '🔴', '?'],
      answer: '🔴',
    },
    {
      title: "Shape Logic",
      description: "Find the next shape",
      icon: Target,
      color: '#90EE90',
      pattern: ['⭐', '⭐', '❤️', '⭐', '⭐', '❤️', '⭐', '?'],
      answer: '⭐',
    },
  ];

  const activities = [
    {
      title: 'Memory Exercises',
      description: 'Strengthen your memory with fun exercises',
      icon: Brain,
      color: '#87CEEB',
    },
    {
      title: 'Brain Challenges',
      description: 'Daily puzzles to boost thinking skills',
      icon: Zap,
      color: '#DDA0DD',
    },
    {
      title: 'Problem Solving',
      description: 'Learn to solve problems creatively',
      icon: Lightbulb,
      color: '#FFD700',
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#87CEEB] via-[#DDA0DD] to-[#FFD700] bg-clip-text text-transparent">
            🧠 IQ Booster Activities
          </h1>
          <p className="text-xl text-gray-600">
            Extra learning tools for brain development
          </p>
        </motion.div>

        {/* Daily Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 p-8 rounded-3xl shadow-xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              ⭐ Today's Brain Challenge
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-2xl shadow-lg"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${challenge.color}30` }}
                  >
                    <challenge.icon className="w-6 h-6" style={{ color: challenge.color }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{challenge.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{challenge.description}</p>
                  <div className="flex gap-2 justify-center flex-wrap mb-3">
                    {challenge.pattern.map((item, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg text-2xl"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-gradient-to-r from-[#90EE90] to-[#87CEEB] text-white rounded-full font-bold shadow-md text-sm"
                    >
                      Solve It!
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Activity Cards */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#87CEEB] to-[#DDA0DD] bg-clip-text text-transparent">
            Learning Activities
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all"
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                  style={{ backgroundColor: activity.color }}
                >
                  <activity.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
                  {activity.title}
                </h3>
                <p className="text-center text-gray-600 mb-6">{activity.description}</p>
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-[#90EE90] to-[#87CEEB] text-white rounded-full font-bold shadow-lg"
                  >
                    Start Activity
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-[#87CEEB]/30 via-[#DDA0DD]/20 to-[#FFB6C1]/30 p-12 rounded-3xl text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Ready to Train Your Brain? 🚀
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Try our fun games to boost your IQ and learning skills!
          </p>
          <Link to="/games">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              🎮 Play Games Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
