import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { Games } from "./pages/Games";
import { IQBooster } from "./pages/IQBooster";
import { AboutUs } from "./pages/AboutUs";
import { ContactUs } from "./pages/ContactUs";
import { NotFound } from "./pages/NotFound";

// Game pages
import { MiniSudoku } from "./pages/games/MiniSudoku";
import { PeakBrainTraining } from "./pages/games/PeakBrainTraining";
import { ConnectNumbers } from "./pages/games/ConnectNumbers";
import { ConnectDots } from "./pages/games/ConnectDots";
import { ConnectLetters } from "./pages/games/ConnectLetters";
import { MemoryMatch } from "./pages/games/MemoryMatch";
import { ShapePuzzle } from "./pages/games/ShapePuzzle";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "games", Component: Games },
      { path: "games/mini-sudoku", Component: MiniSudoku },
      { path: "games/peak-brain", Component: PeakBrainTraining },
      { path: "games/connect-numbers", Component: ConnectNumbers },
      { path: "games/connect-dots", Component: ConnectDots },
      { path: "games/connect-letters", Component: ConnectLetters },
      { path: "games/memory-match", Component: MemoryMatch },
      { path: "games/shape-puzzle", Component: ShapePuzzle },
      { path: "iq-booster", Component: IQBooster },
      { path: "about", Component: AboutUs },
      { path: "contact", Component: ContactUs },
      { path: "*", Component: NotFound },
    ],
  },
]);
