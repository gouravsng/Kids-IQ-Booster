import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowLeft, RotateCcw, Star } from 'lucide-react';

type Cell = number | null;
type Board = Cell[][];

export function MiniSudoku() {
  const [board, setBoard] = useState<Board>([]);
  const [initialBoard, setInitialBoard] = useState<Board>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    generateNewGame();
  }, []);

  const generateNewGame = () => {
    // Simple 6x6 Sudoku puzzle (2x3 boxes)
    const puzzle: Board = [
      [1, 2, null, null, 5, 6],
      [null, null, 5, 6, null, null],
      [null, 6, null, null, 3, null],
      [null, 3, null, null, 6, null],
      [null, null, 6, 3, null, null],
      [6, 5, null, null, 2, 1],
    ];

    setBoard(JSON.parse(JSON.stringify(puzzle)));
    setInitialBoard(JSON.parse(JSON.stringify(puzzle)));
    setGameWon(false);
    setSelectedCell(null);
  };

  const handleCellClick = (row: number, col: number) => {
    if (initialBoard[row][col] !== null) return;
    setSelectedCell({ row, col });
  };

  const handleNumberClick = (num: number) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    if (initialBoard[row][col] !== null) return;

    const newBoard = board.map((r, i) =>
      i === row ? r.map((c, j) => (j === col ? num : c)) : r
    );
    setBoard(newBoard);

    // Check if game is won
    if (isBoardComplete(newBoard) && isValidBoard(newBoard)) {
      setTimeout(() => setGameWon(true), 500);
    }
  };

  const isBoardComplete = (b: Board): boolean => {
    return b.every((row) => row.every((cell) => cell !== null));
  };

  const isValidBoard = (b: Board): boolean => {
    // Check rows
    for (let row of b) {
      const filtered = row.filter((c) => c !== null);
      if (new Set(filtered).size !== filtered.length) return false;
    }

    // Check columns
    for (let col = 0; col < 6; col++) {
      const column = b.map((row) => row[col]).filter((c) => c !== null);
      if (new Set(column).size !== column.length) return false;
    }

    return true;
  };

  const clearCell = () => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    if (initialBoard[row][col] !== null) return;

    const newBoard = board.map((r, i) =>
      i === row ? r.map((c, j) => (j === col ? null : c)) : r
    );
    setBoard(newBoard);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#87CEEB]/30 via-[#90EE90]/20 to-[#FFD700]/30 py-12">
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
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#87CEEB] to-[#90EE90] bg-clip-text text-transparent">
            🧩 Mini Sudoku 6×6
          </h1>
          <p className="text-xl text-gray-600">Fill each row and column with numbers 1-6!</p>
        </motion.div>

        {/* Game Board */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="bg-white p-4 rounded-3xl shadow-2xl">
            <div className="grid grid-cols-6 gap-1">
              {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                  const isInitial = initialBoard[rowIndex][colIndex] !== null;
                  const isSelected =
                    selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                  const boxRow = Math.floor(rowIndex / 2);
                  const boxCol = Math.floor(colIndex / 3);
                  const boxColor = (boxRow + boxCol) % 2 === 0 ? '#f0f9ff' : '#fef3c7';

                  return (
                    <motion.button
                      key={`${rowIndex}-${colIndex}`}
                      whileHover={{ scale: isInitial ? 1 : 1.1 }}
                      whileTap={{ scale: isInitial ? 1 : 0.95 }}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      className={`aspect-square rounded-lg flex items-center justify-center text-2xl font-bold transition-all ${
                        isInitial
                          ? 'bg-gray-100 text-gray-800 cursor-not-allowed'
                          : isSelected
                          ? 'bg-[#87CEEB] text-white shadow-lg'
                          : 'bg-white hover:bg-gray-50 text-[#87CEEB]'
                      }`}
                      style={{
                        backgroundColor: isInitial
                          ? '#e5e7eb'
                          : isSelected
                          ? '#87CEEB'
                          : boxColor,
                      }}
                    >
                      {cell || ''}
                    </motion.button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Number Pad */}
        <div className="max-w-xl mx-auto">
          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNumberClick(num)}
                  className="aspect-square bg-gradient-to-br from-[#90EE90] to-[#87CEEB] text-white rounded-2xl text-3xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  {num}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearCell}
                className="aspect-square bg-gradient-to-br from-[#FFB6C1] to-[#DDA0DD] text-white rounded-2xl text-2xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Clear
              </motion.button>
            </div>
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
                🎉 Amazing! 🎉
              </h2>
              <p className="text-2xl text-gray-700 mb-8">You solved the puzzle!</p>
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
