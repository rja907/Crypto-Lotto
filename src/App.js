import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: []
  };
  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    this.setState({ manager, players });
  }
  render() {
    //console.log(web3.version); // to make sure correct version of web3 has been installed.
    return (
      <div>
        <h2>
          Lottery Contract
        </h2>
        <p>
          This Contract is managed by {this.state.manager}.
          There are currently {this.state.players.length} players in the game.
        </p>
      </div>
    );
  }
}

export default App;
