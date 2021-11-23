import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import GameStore from './store/game-store'

import './index.css'
import App from './App'

ReactDOM.render(
  <Provider store={ GameStore }>
    <App />
  </Provider>,
  document.getElementById('root')
)