import * as ActionTypes from "../actions";

const intialState = {
  counter: 0,
};

// reducer accepts two parameters.
// previous state and action
// returns updated state
// executes synchronous code only
// calls store and updated the central state and should update the state immutably

// if we call array.push it return the original array. using concat returns a new array

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      const newState = Object.assign({}, state);
      newState.counter = state.counter + 1;
      return newState;
    case ActionTypes.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case ActionTypes.ADD:
      return {
        ...state,
        counter: state.counter + action.value,
      };
    case ActionTypes.SUBSTRACT:
      return {
        ...state,
        counter: state.counter - action.value,
      };
    default:
      return state;
  }
};

export default reducer;
