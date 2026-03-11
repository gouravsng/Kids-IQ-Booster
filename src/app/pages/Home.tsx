import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Brain, Gamepad2, BookOpen, Baby, Sparkles, Lightbulb, Trophy } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Home() {
  const features = [
    {
      icon: Brain,
      title: 'Brain Development',
      description: 'Improve logical thinking and IQ.',
      color: '#87CEEB',
    },
    {
      icon: Gamepad2,
      title: 'Fun Learning Games',
      description: 'Play games while learning.',
      color: '#90EE90',
    },
    {
      icon: BookOpen,
      title: 'Letter and Number Skills',
      description: 'Learn alphabets and numbers interactively.',
      color: '#FFD700',
    },
    {
      icon: Baby,
      title: 'Designed for Kids Under 6',
      description: 'Simple and safe interface.',
      color: '#FFB6C1',
    },
  ];

  const steps = [
    { icon: Sparkles, title: 'Choose a Game', color: '#87CEEB' },
    { icon: Gamepad2, title: 'Play and Learn', color: '#DDA0DD' },
    { icon: Trophy, title: 'Improve Your IQ', color: '#FFD700' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#87CEEB]/30 via-[#DDA0DD]/20 to-[#FFB6C1]/30 py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 w-20 h-20 bg-[#FFD700] rounded-full opacity-20"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-32 h-32 bg-[#90EE90] rounded-full opacity-20"
            animate={{ y: [0, -20, 0], x: [0, -30, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#FFB6C1] rounded-full opacity-20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#87CEEB] via-[#DDA0DD] to-[#FFB6C1] bg-clip-text text-transparent">
                Make Learning Fun and Boost Your Child's IQ!
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Interactive games and brain activities specially designed for kids under 6 years old.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/games">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-[#87CEEB] to-[#DDA0DD] text-white rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    🎮 Play Games
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    📧 Contact Us
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1605627079912-97c3810a11a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkcmVuJTIwbGVhcm5pbmclMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzMxMTk2MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Happy children learning"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#87CEEB] to-[#DDA0DD] bg-clip-text text-transparent">
              Why Choose Kids IQ?
            </h2>
            <p className="text-xl text-gray-600">The best platform for early brain development</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}30` }}
                >
                  <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-[#90EE90]/20 via-[#FFD700]/10 to-[#FFB6C1]/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#90EE90] to-[#FFD700] bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Get started in 3 simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-1 bg-gradient-to-r from-gray-300 to-transparent" />
                )}
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl"
                  style={{ backgroundColor: step.color }}
                >
                  <step.icon className="w-12 h-12 text-white" />
                </div>
                <div className="inline-block bg-white px-6 py-2 rounded-full shadow-lg mb-2">
                  <span className="text-2xl font-bold text-gray-800">Step {index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{step.title}</h3>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/games">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-[#90EE90] to-[#87CEEB] text-white rounded-full text-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
              >
                <Lightbulb className="inline-block w-8 h-8 mr-2" />
                Start Learning Now!
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
