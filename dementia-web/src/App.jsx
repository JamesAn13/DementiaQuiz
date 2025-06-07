import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Diagnosis from './pages/Diagnosis';
import Game from './pages/Games/Game';
import MyPage from './pages/MyPage';
import GameCardIntro from './pages/Games/GameCardIntro';
import GameCard from './pages/Games/GameCard';
import GameMemory from './pages/Games/GameMemory';
import GameMemoryIntro from './pages/Games/GameMemoryIntro';
import GameWord from './pages/Games/GameWord';
import GameOX from './pages/Games/GameOX';
import GameRPS from './pages/Games/GameRPS';
import GameBeep from './pages/Games/GameBeep';
import GameColor from './pages/Games/GameColor';
import GameFindDifference from './pages/Games/GameFindDifference';
import Info from './pages/Info';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path='/information' element={<Info />} />
        <Route path="/game" element={<Game />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/game/card" element={<GameCard />} />
        <Route path="/game/memory" element={<GameMemory />} />
        <Route path="/game/word" element={<GameWord />} />
        <Route path="/game/ox" element={<GameOX />} />
        <Route path="/game/rps" element={<GameRPS />} />
        <Route path="/game/cardIntro" element={<GameCardIntro />} />
        <Route path="/game/memoryIntro" element={<GameMemoryIntro />} />
        <Route path="/game/beep" element={<GameBeep />} />
        <Route path="/game/color" element={<GameColor />} />
        <Route path="/game/finddiff" element={<GameFindDifference />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
