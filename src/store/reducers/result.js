import * as ActionTypes from "../actions";

const intialState = {
  results: [],
};

// reducer accepts two parameters.
// previous state and action
// returns updated state
// executes synchronous code only
// calls store and updated the central state and should update the state immutably

// if we call array.push it return the original array. using concat returns a new array

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case ActionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({ id: new Date(), value: action.result }),
      };
    case ActionTypes.DELETE_RESULT:
      // const id = action.id;
      // const newArray = [...state.results];
      // newArray.splice(id, 1);
      const updatedArray = state.results.filter(
        (result) => result.id !== action.id
      );
      return {
        ...state,
        results: updatedArray,
      };
    default:
      return state;
  }
};

export default reducer;
