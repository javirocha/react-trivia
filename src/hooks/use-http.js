import { useState, useCallback } from 'react'

const MAX_QUESTIONS = 10
const API_URL = `https://opentdb.com/api.php?amount=${MAX_QUESTIONS}&encode=url3986`

const useHttp = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [isEnabled, setIsEnabled] = useState(true)
  
  const getQuestions = useCallback(() => {
    setIsLoading(true)
    fetch(API_URL).then(res => res.json()).then(data => {
      
      let questions = data.results.map(loadedQuestion => {
        const newQuestion = {
          question: decodeURIComponent(loadedQuestion.question),
          correct: null,
          answers: []
        }
        
        const loadedAnswers = [...loadedQuestion.incorrect_answers]
        newQuestion.correct = loadedQuestion.type === 'boolean' ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 3)
        loadedAnswers.splice(newQuestion.correct, 0, loadedQuestion.correct_answer)
        
        newQuestion.answers = loadedAnswers.map(answer => decodeURIComponent(answer))
        
        return newQuestion
      })
      
      setQuestions(questions)
      setIsLoading(false)
    })
  }, [])


  return { 
    isLoading, 
    questions,
    getQuestions, 
    setQuestions, 
    isEnabled, 
    setIsEnabled, 
    MAX_QUESTIONS
  }

}

export default useHttp