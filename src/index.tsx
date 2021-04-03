import ReactDOM from 'react-dom'
import { Reset } from 'styled-reset'
import { App } from './components/App'

ReactDOM.render(
  <>
    <Reset />
    <App />
  </>,
  document.getElementById('app')
)
