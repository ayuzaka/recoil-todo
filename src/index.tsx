import ReactDOM from 'react-dom'
import { App } from './App'

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require('./mocks/browser')// eslint-disable-line global-require
  worker.start()
}

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById('app')
)
