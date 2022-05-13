import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.val,
    };
  }

  render() {
    if (this.props.val == 0){
      return (
        <div
          className="boxy">
          {this.props.val}
        </div>
      );
    }
    else if (this.props.val == 1){
      return (
        <div
          className="boxy" style={{backgroundColor: "#f00"}}>
          {this.props.val}
        </div>
      );
    }
    else{
      return (
        <div
          className="boxy" style={{backgroundColor: "#00f"}}>
          {this.props.val}
        </div>
      );
    }
    
  }
}

class Column extends React.Component{
  constructor(props){
    super(props);
    this.state={
      values: props.values,
    };
  }

  render(){
    return(
      <div className="board-column">
          <Dropper col={this.props.col} onClick={(column, newVal) => this.props.onClick(column, newVal)}/>
          <Square val={this.state.values[0]}/>
          <Square val={this.state.values[1]}/>
          <Square val={this.state.values[2]}/>
          <Square val={this.state.values[3]}/>
          <Square val={this.state.values[4]}/>
          <Square val={this.state.values[5]}/>  
      </div>
    )
  }
}

class Grid extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <div className="board-column">
          <Square/>
          <Square/>
          <Square/>
          <Square/>
          <Square/>
          <Square/>          
        </div>
        <div className="board-column">
          <Square/>
          <Square/>
          <Square/>
          <Square/>
          <Square/>
          <Square/>          
        </div>
        <div className="board-column">
          <Square/>
          <Square/>
          <Square/>
          <Square/>
          <Square/>
          <Square/>          
        </div>
      </div>
    )
  }
}

class Dropper extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      col: props.col
    }

  }
  render(){
    return(
      <button className="dropper" onClick={() => this.props.onClick(this.state.col, 1)}>
        {this.state.col}
      </button>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      placements: [...Array(7)].map(e => Array(6).fill(0)),
      nextVal: 1,
      lastVal: 2,
    }
    let a = "a";
  }

  render(){
    return (
      <div className="game">
        <div className="button-row">
          <Column col={0} values={this.state.placements[0]} onClick={(column, newVal) => this.drop(column, newVal)}/>
          <Column col={1} values={this.state.placements[1]} onClick={(column, newVal) => this.drop(column, newVal)}/>
          <Column col={2} values={this.state.placements[2]} onClick={(column, newVal) => this.drop(column, newVal)}/>
          <Column col={3} values={this.state.placements[3]} onClick={(column, newVal) => this.drop(column, newVal)}/>
          <Column col={4} values={this.state.placements[4]} onClick={(column, newVal) => this.drop(column, newVal)}/>
          <Column col={5} values={this.state.placements[5]} onClick={(column, newVal) => this.drop(column, newVal)}/>
          <Column col={6} values={this.state.placements[6]} onClick={(column, newVal) => this.drop(column, newVal)}/>
        </div>
      </div>

      
    );
  }

  drop(columnNum, newVal){
    // oldColumn = this.state.placements[columnNum].splice()
    for (let i = this.state.placements[columnNum].length-1; i >= 0 ; i--){
      if (this.state.placements[columnNum][i] === 0){
        this.state.placements[columnNum][i] = this.state.nextVal;
        this.setState({
          placements: this.state.placements,
          nextVal: this.state.lastVal,
          lastVal: this.state.nextVal,
        });
        let status = document.getElementById("turnStatus");
        status.textContent="Poop";
        break;

      }
    }
    
  }
  
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
