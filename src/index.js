import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import CounterReducer from "./store/reducers/counter";
import ResultReducer from "./store/reducers/result";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  ctr: CounterReducer,
  res: ResultReducer,
});

// Middleware
const logger = (store) => {
  return (next) => {
    return (action) => {
      // Execute the code you want to run between action and reduceer
      console.log("[Middleware] Dispatching", action);
      const result = next(action);
      console.log("[Middleware] Next State", store.getState());
      return result;
    };
  };
};

// const store = createStore(rootReducer, applyMiddleware(logger));
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
