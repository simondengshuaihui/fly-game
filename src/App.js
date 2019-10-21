import React,{useEffect} from 'react';
import './App.css';
import startGame from './game'

function App() {
  useEffect(()=>{
    startGame()
  },[])
  return (
    <div className="App">
      <div id="game"></div>
    </div>
  );
}

export default App;
