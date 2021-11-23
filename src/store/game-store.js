import { configureStore } from '@reduxjs/toolkit'
import gameSlice from './game-slice'

const GameStore = configureStore({
  reducer: {
    game: gameSlice
  }
})

export default GameStore
