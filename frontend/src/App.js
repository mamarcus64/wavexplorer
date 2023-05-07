import React, { Component } from 'react';
import Game from './Game';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.game = React.createElement(Game);
    this.state = {
      hidden : true
    };
  }

  startGame = () => {
    this.setState({hidden : false});
  }

  render() {
    return (
      <div className="App">
        <header>
          <h5> wavexplorer </h5>
        </header>
          <h1>Can you find the path?</h1>
          {this.state.hidden && <button class="button" onClick={this.startGame}> Play </button>}
          {!this.state.hidden && this.game}
          
          <div style={{paddingBottom:"200px"}}>

          </div>
      </div>
    );
  }
}

export default App;
