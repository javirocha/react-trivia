import { useSelector, useDispatch } from 'react-redux'
import { setGame } from '../store/game-slice'
import { useNavigate } from 'react-router-dom'
import GameOver from './GameOver'
import Trivia from './Trivia'

const Game = () => {

  const isGameOn = useSelector(state => state.game.isGameOn)
  const gameOver = useSelector(state => state.game.isGameOver)

  const dispatch = useDispatch()

  const navigate = useNavigate()


  const showHighScores = () => navigate('/scores')

  return (
    <div id="trivia">
      { !isGameOn && !gameOver && 
        <div>
          <button type="button" className="btn-info" onClick={ () => dispatch(setGame()) }>Play</button>
          <button type="button" className="btn-accent" onClick={ showHighScores }>High Scores</button>
        </div>
      }
      
      { isGameOn && <Trivia /> }
      { gameOver && <GameOver /> }
    </div>
  )
}

export default Game
