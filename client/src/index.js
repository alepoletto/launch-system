import React from 'react'
import ReactDOM from 'react-dom'
import App from './features/App'
import { AppContainer } from 'react-hot-loader'
import * as serviceWorker from './serviceWorker'
import Homepage from './components/Homepage'
import 'semantic-ui-css/semantic.min.css'
import './index.scss'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Homepage />
    </AppContainer>,
    document.getElementById('root')
  )
}

// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Homepage', () => {
    render(App)
  })
}
