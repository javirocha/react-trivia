import { useSelector, useDispatch } from 'react-redux'
import { resetGame } from '../store/game-slice'

import { useState, useLayoutEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const GameOver = () => {

  const score = useSelector(state => state.game.score)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [scoreList, setScoreList] = useState([])
  const [isHighScore, setIsHighScore] = useState(false)
  const [name, setName] = useState('')

  const changeInputHandler = ({ target }) => {
    setName(target.value)
  }
  
  const submitScore = event => {
    event.preventDefault()
    const newScore = { name, score }
    localStorage.setItem('highScores', JSON.stringify([newScore, ...scoreList]))
    navigate('/scores')
  }
  
  const getScores = useCallback(() => {
    const scores = JSON.parse(localStorage.getItem('highScores')) || []
    const highscore = (score && scores.length < 5) || score > Math.min(...scores.map(record => record.score))
    setScoreList(scores)
    setIsHighScore(highscore)
  }, [score])
  
  useLayoutEffect(() => {
    getScores()
  }, [getScores])

  const onGoHome = () => {
    dispatch(resetGame())
    navigate('/')
  }

  return (
    <>
      <h3>Game Over</h3>
      <h4>Final score: <span>{ score }</span></h4>
      { !isHighScore && <button className="btn-info" onClick={ onGoHome }>Home</button> }
      {
        isHighScore && 
        <form onSubmit={ submitScore }>
          <input type="text" id="name" placeholder="Enter your name" onChange={ changeInputHandler } />
          <button disabled={ name.length < 3 } className="btn-accent">Submit</button>
        </form>
      }
    </>
  )
}

export default GameOver
