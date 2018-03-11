import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };
  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }
  onSubmit = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Transaction in progress...'});
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });
    this.setState({ message: 'You have been entered! Good luck!'});
  };
  onClick = async event => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Almost there...' });
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    this.setState({ message: 'A winner had been picked!'});
  };
  render() {
    //console.log(web3.version); // to make sure correct version of web3 has been installed.
    return (
      <div style={{color:'white'}}>
        <h2>
          Lottery Contract
        </h2>
        <p><hr /><hr /><br />
          This Contract is managed by <strong>{this.state.manager}</strong>.<hr />
          There are currently <strong>{this.state.players.length}</strong> players in the game.<hr />
          The total amount of the lottery is <strong>{web3.utils.fromWei(this.state.balance, 'ether')}</strong> ether!<hr />
        </p>
        <form onSubmit={this.onSubmit}>
          <h4>Feeling lucky?</h4>
          <label>
            Amount of Ether you want to enter with
          </label>
          <br /><br />
          <input
            style={{marginLeft:" 30px"}}
            value = {this.state.value}
            onChange={event => this.setState({value: event.target.value })}
           />
           <button style={{marginLeft:" 20px"}}>
            Enter!
           </button>
        </form>
        <hr />
        <h4>
          Want to pick a winner?
        </h4>
        <button onClick={this.onClick}>Pick a winner!</button>
        <hr />
        <h1>
          {this.state.message}
        </h1>
      </div>
    );
  }
}

export default App;
