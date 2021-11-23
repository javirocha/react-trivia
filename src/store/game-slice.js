import { createSlice } from '@reduxjs/toolkit'

const initialGameState = {
  isGameOn: false,
  isGameOver: false,
  score: 0
}

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    addScore: (state, action) => {
      state.score += action.payload
    },
    setGame: state => {
      state.isGameOn = !state.isGameOn
    },
    endGame: state => {
      state.isGameOver = !state.isGameOver
      state.isGameOn = false
    },
    resetGame: state => initialGameState
  }
})

export const { addScore, setGame, endGame, resetGame } = gameSlice.actions

export default gameSlice.reducer