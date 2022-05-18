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
        <div className="boxy"></div>
      );
    }
    else if (this.props.val == 1){
      return (
        <div className="boxy">
          <div className="circle" style={{backgroundColor: "#f00"}}></div>
        </div>
      );
    }
    else{
      return (
        <div className="boxy">
          <div className="circle" style={{backgroundColor: "#00f"}}></div>
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
    this.enabled = true;
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
    if (this.enabled === false){
      return;
    }
    for (let i = this.state.placements[columnNum].length-1; i >= 0 ; i--){
      if (this.state.placements[columnNum][i] === 0){
        this.state.placements[columnNum][i] = this.state.nextVal;
        this.setState({
          placements: this.state.placements,
          nextVal: this.state.lastVal,
          lastVal: this.state.nextVal,
        });
        let status = document.getElementById("turnStatus");
        let statusString = ", it is your turn!";
        let playername = document.getElementById("p2").value;
        if (this.state.nextVal === 1){
          console.log('should say p1"s name');
          playername = document.getElementById("p1").value;
        }
        status.textContent= playername + statusString;
        let winner = this.checkWin();
        if (winner > 0){ // game is over
          if (winner === 1){
            playername = document.getElementById("p1").value;
          }
          if (winner === 2){
            playername = document.getElementById("p2").value;
          }
          status.textContent = "Congrats, " + playername + "! You won! Refresh the page to restart the game.";
          this.enabled = false;
        }
        break;

      }
    }
    
  }

  checkWin(){
    // remember, a row in this.state.placements is visually a column in the game

    // check for vertical wins first
    let twos = [2, 2, 2, 2].join(',');
    let ones = [1, 1, 1, 1].join(',');
    for (let c=0; c < this.state.placements.length; c++){
      for (let r=0; r <= this.state.placements[0].length - 4; r++){
        // let is1 = true;
        // let is2 = true;
        // for (let i=0; i<4; i++){
        //   if 
        // }
        if (this.state.placements[c].slice(r, r+4).join(',') === twos){
          console.log("player 2 wins");
          return 2;
        }
        if (this.state.placements[c].slice(r, r+4).join(',') === ones){
          console.log("player 1 wins");
          return 1;
        }
      }
    }

    // check for horizontal wins
    for (let r=0; r < this.state.placements[0].length; r++){
      let row = this.state.placements.map(function(value, index) {return value[r]});
      console.log(row);
      for (let c=0; c <= this.state.placements.length - 4; c++){
        if (row.slice(c, c+4).join(',') === twos){
          console.log("player 2 wins");
          return 2;
        }
        if (row.slice(c, c+4).join(',') === ones){
          console.log("player 1 wins");
          return 1;
        }
      }
    }

    // check for descending diagonal wins
    for (let i=0; i<this.state.placements.length-3; i++){
      for (let j=0; j<this.state.placements[0].length-3; j++){
        let slice = []
        for (let k=0; k<4; k++){
          slice.push(this.state.placements[i+k][j+k]);
        }
        if (slice.join(',') === twos){
          console.log("player 2 wins");
          return 2;
        }
        if (slice.join(',') === ones){
          console.log("player 1 wins");
          return 1;
        }
      }
    }

    // check for ascending diagonal wins
    for (let i=3; i<this.state.placements.length; i++){
      for (let j=0; j<this.state.placements[0].length-3; j++){
        let slice = []
        for (let k=0; k<4; k++){
          slice.push(this.state.placements[i-k][j+k]);
        }
        if (slice.join(',') === twos){
          console.log("player 2 wins");
          return 2;
        }
        if (slice.join(',') === ones){
          console.log("player 1 wins");
          return 1;
        }
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
