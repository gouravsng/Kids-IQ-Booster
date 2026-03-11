import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, CheckCircle, MessageCircle } from 'lucide-react';

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            📧 Contact Us
          </h1>
          <p className="text-xl text-gray-600">
            We'd love to hear from you! Send us a message.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-3xl shadow-2xl"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#87CEEB] focus:outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#87CEEB] focus:outline-none transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-lg font-semibold text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#87CEEB] focus:outline-none transition-all resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#87CEEB] to-[#DDA0DD] text-white rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-[#90EE90]/20 border-2 border-[#90EE90] rounded-xl text-center"
                >
                  <p className="text-[#2d7a2d] font-semibold">
                    ✓ Thank you! We'll get back to you soon.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Email Info */}
              <div className="bg-gradient-to-br from-[#87CEEB]/20 to-[#DDA0DD]/20 p-8 rounded-3xl shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#87CEEB] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">Email Us</h3>
                    <p className="text-gray-700 mb-1">General Inquiries:</p>
                    <a
                      href="mailto:info@kidsiq.com"
                      className="text-[#87CEEB] font-semibold hover:underline"
                    >
                      info@kidsiq.com
                    </a>
                    <p className="text-gray-700 mt-3 mb-1">Support:</p>
                    <a
                      href="mailto:support@kidsiq.com"
                      className="text-[#87CEEB] font-semibold hover:underline"
                    >
                      support@kidsiq.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 p-8 rounded-3xl shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#FFD700] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">Follow Us</h3>
                    <p className="text-gray-700 mb-4">
                      Stay connected on social media for updates and tips!
                    </p>
                    <div className="flex gap-3">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#87CEEB] hover:text-[#6bb6d6] transition-colors font-semibold"
                      >
                        Facebook
                      </a>
                      <span className="text-gray-400">•</span>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#87CEEB] hover:text-[#6bb6d6] transition-colors font-semibold"
                      >
                        Instagram
                      </a>
                      <span className="text-gray-400">•</span>
                      <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#87CEEB] hover:text-[#6bb6d6] transition-colors font-semibold"
                      >
                        YouTube
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Prompt */}
              <div className="bg-gradient-to-br from-[#90EE90]/20 to-[#87CEEB]/20 p-8 rounded-3xl shadow-xl">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Quick Questions?</h3>
                <p className="text-gray-700 mb-4">
                  Before reaching out, check if your question is answered in our FAQ section.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-[#90EE90] to-[#87CEEB] text-white rounded-full font-bold shadow-lg"
                >
                  View FAQ
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16 text-center bg-gradient-to-r from-[#FFB6C1]/20 to-[#DDA0DD]/20 p-8 rounded-3xl"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            We're Here to Help! 🤝
          </h3>
          <p className="text-lg text-gray-600">
            Your feedback helps us create better learning experiences for kids everywhere.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
