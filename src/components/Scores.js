import { useDispatch } from 'react-redux'
import { resetGame } from '../store/game-slice'

import { useState, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Scores = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [scoreList, setScoreList] = useState([])

  useLayoutEffect(() => {
    const highScoreList = JSON.parse(localStorage.getItem('highScores')) || []
    const newScoreList = highScoreList.sort((a, b) => b.score - a.score).slice(0, 5)
    setScoreList(newScoreList)
  }, [])

  const onGoHome = () => {
    dispatch(resetGame())
    navigate('/')
  }

  const onClearScores = () => {
    localStorage.removeItem('highScores')
    setScoreList([])
  }
  return (
    <>
      <h3>High Scores</h3>
      
      <ul className="scores">
        { !scoreList.length && <li style={{textAlign: 'center', display: 'block'}}>No highscores recorded yet.</li> }
        {
          scoreList.map((record, i) => {
            return <li key={ i }>{ record.name }<span>{ record.score }</span></li>
          })
        }
      </ul>

      <div>
        <button onClick={ onGoHome } className="btn-info">Home</button>
        <button onClick={ onClearScores } className="btn-accent" disabled={!scoreList.length}>Clear High Scores</button>
      </div>
    </>
  )
}

export default Scores
