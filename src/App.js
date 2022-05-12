import logo from './logo.svg';
import './App.css';
import React from 'react';

// class Square extends React.Component{
//   constructor(props){
    
//   }
//   render(){
//     return(
//       <button className="square">
//         poo
//       </button>
//     )
//   }
// }

function Square(props){
  return(
      <button className="square" >
          foo
      </button>
  );
}

class App extends React.Component() {
  render(){
    return (
      <div>
        <div className="board-row">
          <Square/>
        </div>
        <div className="board-row">
          <Square/>
        </div>
        <div className="board-row">
          <Square/>
        </div>
      </div>

      
    );
  }
  
}

export default App;
