import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Game from './components/Game'
import Scores from './components/Scores'

function App() {
  const gameStarted = useSelector(state => state.game.isGameOn)
  return (
    <>
      <h1 className={ gameStarted ? 'game-on' : '' }>React Trivia</h1>
      <Routes>
        <Route index element={ <Game /> } />
        <Route path="scores" element={ <Scores /> } />
      </Routes>
    </>
  );
}

export default App;
