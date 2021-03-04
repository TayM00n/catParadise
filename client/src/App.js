import Header from './components/container/HomePage/Header'
import React from 'react'
import store from './components/store/index'
import {Provider} from "react-redux";

function App() {
  return(
    <Provider store={store}>
      <div className="App">
        <Header />
      </div>
    </Provider>

  )
}

export default App;