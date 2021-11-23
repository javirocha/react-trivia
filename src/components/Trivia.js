import { useSelector, useDispatch } from 'react-redux' 
import { endGame, addScore } from '../store/game-slice'

import { useLayoutEffect, useState } from 'react'
import Spinner from './Spinner'
import useHttp from '../hooks/use-http'

const Trivia = () => {

  const { 
    isLoading, 
    questions, 
    getQuestions, 
    isEnabled, 
    setIsEnabled, 
    MAX_QUESTIONS     
  } = useHttp()

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const currentScore = useSelector(state => state.game.score)
  const dispatch = useDispatch()

  const checkAnswer = (e, i) => {
    setIsEnabled(false)
    const isCorrect = i === questions[currentQuestion].correct
    isCorrect && dispatch(addScore(100))
    e.target.className = isCorrect ? 'correct' : 'incorrect'
    
    setTimeout(() => {
      (currentQuestion + 1) < MAX_QUESTIONS ? setCurrentQuestion(count => count + 1) : dispatch(endGame())
    }, 500)
  }

  useLayoutEffect(() => {
    getQuestions()
    setCurrentQuestion(0)
  }, [getQuestions])

  useLayoutEffect(() => {
    setIsEnabled(true)
    document.querySelectorAll('#answers button').forEach(button => button.className = '')
  }, [currentQuestion, setIsEnabled])

  return (
    <div className="card">
      { isLoading && <Spinner /> }
      { !isLoading && questions.length && (
        <>
          <h2>{ questions[currentQuestion]?.question }</h2>
          <div id="answers">
            {
              questions[currentQuestion]?.answers.map((answer, i) => {
                return <button disabled={ !isEnabled } key={ i } onClick={ e => checkAnswer(e, i) }>{ answer }</button>
            })
            }
          </div>
          <div id="hud">
            <h4>Question: <span id="questionCounter">{ currentQuestion + 1 }/{ MAX_QUESTIONS }</span></h4>
            <h4>Score: <span id="score">{ currentScore }</span></h4>
          </div>
        </>
        )
      }
    </div>
  )
}

export default Trivia
