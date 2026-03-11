import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowLeft, RotateCcw, Star } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  number: number;
}

export function ConnectNumbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [connectedPoints, setConnectedPoints] = useState<number[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });

  useEffect(() => {
    generateNewGame();
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  useEffect(() => {
    drawCanvas();
  }, [connectedPoints, points]);

  const updateCanvasSize = () => {
    const size = Math.min(window.innerWidth - 40, 500);
    setCanvasSize({ width: size, height: size });
  };

  const generateNewGame = () => {
    // Generate points in a star shape
    const newPoints: Point[] = [
      { x: 250, y: 50, number: 1 },
      { x: 350, y: 200, number: 2 },
      { x: 450, y: 200, number: 3 },
      { x: 300, y: 300, number: 4 },
      { x: 350, y: 450, number: 5 },
      { x: 250, y: 350, number: 6 },
      { x: 150, y: 450, number: 7 },
      { x: 200, y: 300, number: 8 },
      { x: 50, y: 200, number: 9 },
      { x: 150, y: 200, number: 10 },
    ];

    setPoints(newPoints);
    setConnectedPoints([]);
    setGameWon(false);
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw lines between connected points
    if (connectedPoints.length > 1) {
      ctx.strokeStyle = '#87CEEB';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();

      for (let i = 0; i < connectedPoints.length; i++) {
        const pointIndex = points.findIndex((p) => p.number === connectedPoints[i]);
        const point = points[pointIndex];
        if (i === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      }
      ctx.stroke();
    }

    // Draw points
    points.forEach((point) => {
      const isConnected = connectedPoints.includes(point.number);
      const isNext = connectedPoints.length === 0
        ? point.number === 1
        : point.number === connectedPoints[connectedPoints.length - 1] + 1;

      ctx.beginPath();
      ctx.arc(point.x, point.y, 25, 0, 2 * Math.PI);
      ctx.fillStyle = isConnected ? '#90EE90' : isNext ? '#FFD700' : '#DDA0DD';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw number
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 20px Poppins';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(point.number.toString(), point.x, point.y);
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked point
    const clickedPoint = points.find((p) => {
      const distance = Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2);
      return distance <= 25;
    });

    if (!clickedPoint) return;

    // Check if it's the next number in sequence
    const expectedNumber = connectedPoints.length + 1;
    if (clickedPoint.number === expectedNumber) {
      const newConnected = [...connectedPoints, clickedPoint.number];
      setConnectedPoints(newConnected);

      if (newConnected.length === points.length) {
        setTimeout(() => setGameWon(true), 500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DDA0DD]/30 via-[#87CEEB]/20 to-[#90EE90]/30 py-12">
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
            onClick={generateNewGame}
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
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#DDA0DD] to-[#87CEEB] bg-clip-text text-transparent">
            🔢 Connect the Numbers
          </h1>
          <p className="text-xl text-gray-600">
            Click the numbers in order from 1 to 10!
          </p>
          <div className="mt-4 bg-white px-6 py-3 rounded-full shadow-lg inline-block">
            <span className="font-bold text-[#87CEEB]">Progress:</span> {connectedPoints.length}/
            {points.length}
          </div>
        </motion.div>

        {/* Game Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-3xl shadow-2xl"
        >
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            onClick={handleCanvasClick}
            className="w-full cursor-pointer"
          />
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gradient-to-r from-[#FFD700]/20 to-[#90EE90]/20 p-6 rounded-3xl text-center"
        >
          <p className="text-lg text-gray-700">
            💡 <strong>Tip:</strong> The next number to click will be highlighted in gold!
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
                🎉 Perfect! 🎉
              </h2>
              <p className="text-2xl text-gray-700 mb-8">You connected all the numbers!</p>
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateNewGame}
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
