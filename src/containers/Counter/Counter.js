import React, { Component } from "react";
import { connect } from "react-redux";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";
import * as ActionTypes from "../../store/actions";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  counterChangedHandler = (action, value) => {
    switch (action) {
      case "inc":
        this.setState((prevState) => {
          return { counter: prevState.counter + 1 };
        });
        break;
      case "dec":
        this.setState((prevState) => {
          return { counter: prevState.counter - 1 };
        });
        break;
      case "add":
        this.setState((prevState) => {
          return { counter: prevState.counter + value };
        });
        break;
      case "sub":
        this.setState((prevState) => {
          return { counter: prevState.counter - value };
        });
        break;
      default:
        break;
    }
  };

  render() {
    var orderList = this.props.storedResults.map((result) => (
      <li key={result.id} onClick={() => this.props.onDeleteResult(result.id)}>
        {result.value}
      </li>
    ));

    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl
          label="Add 5"
          clicked={() => this.props.onAddition(5)}
        />
        <CounterControl
          label="Subtract 5"
          clicked={() => this.props.onSubstract(5)}
        />
        <hr />
        <button onClick={() => this.props.onStoreResult(this.props.ctr)}>
          Store Result
        </button>
        <ul>{orderList}</ul>
      </div>
    );
  }
}

// connect
// its a function or a higher order function actually
// connect accepts a function and returns a higher order component, which then takes the component as an input

// Two parameters
// 1. which parts of the state
// 2. which actions

// State managed by redux mapped to props used by the component
// receives updated state from subscription model
const mapStateToProps = (state) => {
  return {
    ctr: state.ctr.counter,
    storedResults: state.res.results,
  };
};

// Map Dispatch to Props
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch({ type: ActionTypes.INCREMENT }),
    onDecrementCounter: () => dispatch({ type: ActionTypes.DECREMENT }),
    onAddition: (value) => dispatch({ type: ActionTypes.ADD, value: value }),
    onSubstract: (value) =>
      dispatch({ type: ActionTypes.SUBSTRACT, value: value }),
    onStoreResult: (result) =>
      dispatch({ type: ActionTypes.STORE_RESULT, result: result }),
    onDeleteResult: (id) =>
      dispatch({ type: ActionTypes.DELETE_RESULT, id: id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
