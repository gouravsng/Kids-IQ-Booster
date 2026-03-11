import { motion } from 'motion/react';
import { Heart, Target, Users, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function AboutUs() {
  const values = [
    {
      icon: Heart,
      title: 'Fun Learning',
      description: 'We make education enjoyable and engaging for young minds',
      color: '#FFB6C1',
    },
    {
      icon: Target,
      title: 'Brain Development',
      description: 'Focus on early cognitive development and IQ enhancement',
      color: '#87CEEB',
    },
    {
      icon: Users,
      title: 'Child-Centered',
      description: 'Designed specifically for children under 6 years old',
      color: '#90EE90',
    },
    {
      icon: Sparkles,
      title: 'Safe & Simple',
      description: 'Age-appropriate interface with parental guidance',
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#87CEEB] via-[#DDA0DD] to-[#FFB6C1] bg-clip-text text-transparent">
            About Kids IQ
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering young minds through interactive learning and play
          </p>
        </motion.div>

        {/* Mission Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758687126192-98f54f4b747f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHBsYXlpbmclMjBlZHVjYXRpb25hbCUyMGdhbWV8ZW58MXx8fHwxNzczMTE5NjEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Child playing educational game"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#87CEEB]/20 to-[#DDA0DD]/20 p-8 rounded-3xl"
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Kids IQ is an educational platform designed to help young children improve their
                thinking skills through interactive games. Our mission is to make learning fun and
                engaging for kids under the age of 6 by combining education with play.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe that early brain development is important, and games are one of the
                best ways to stimulate curiosity, creativity, and intelligence.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#90EE90] to-[#87CEEB] bg-clip-text text-transparent">
              What We Stand For
            </h2>
            <p className="text-xl text-gray-600">Our core values and principles</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: value.color }}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-gradient-to-r from-[#87CEEB] via-[#DDA0DD] to-[#FFB6C1] p-12 rounded-3xl shadow-2xl mb-16"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">7+</div>
              <div className="text-xl">Fun Games</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-xl">Child-Safe</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">0-6</div>
              <div className="text-xl">Years Old</div>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-[#90EE90]/20 to-[#FFD700]/20 p-12 rounded-3xl text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Created with ❤️</h2>
          <p className="text-xl text-gray-700 mb-4">
            Kids IQ was created by <span className="font-bold text-[#87CEEB]">Gaurav Singh</span>
          </p>
          <p className="text-lg text-gray-600">
            Dedicated to making education accessible, fun, and effective for every child
          </p>
        </motion.div>
      </div>
    </div>
  );
}
