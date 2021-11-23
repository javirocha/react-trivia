import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Game from './components/Game'
import Scores from './components/Scores'

function App() {
  const gameStarted = useSelector(state => state.game.isGameOn)
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
      <h1 className={ gameStarted ? 'game-on' : '' }>React Trivia</h1>
      <Routes>
        <Route path="/*" element={ <Game /> } />
        <Route path="scores" element={ <Scores /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App
