import {createStore} from 'redux'
import rootReducer from "./reducer";

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// store.subscribe( () => {
//   console.log('state\n', store.getState());
// });

export default store;