import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: ''
  };
  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }
  render() {
    //console.log(web3.version); // to make sure correct version of web3 has been installed.
    return (
      <div>
        <h2>
          Lottery Contract
        </h2>
        <p><hr /><hr /><br />
          This Contract is managed by <strong>{this.state.manager}</strong>.<hr />
          There are currently <strong>{this.state.players.length}</strong> players in the game.<hr />
          The total amount of the lottery is <strong>{web3.utils.fromWei(this.state.balance, 'ether')}</strong> ether!<hr />
        </p>
      </div>
    );
  }
}

export default App;
