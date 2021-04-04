import ReactDOM from 'react-dom'
import { Reset } from 'styled-reset'
import { App } from './App'

ReactDOM.render(
  <>
    <Reset />
    <App />
  </>,
  document.getElementById('app')
)
