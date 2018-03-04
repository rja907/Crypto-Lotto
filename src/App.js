import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { manager: '' };
  }
  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    this.setState({ manager });
  }
  render() {
    //console.log(web3.version); // to make sure correct version of web3 has been installed.
    return (
      <div>
        <h2>
          Lottery Contract
        </h2>
        <p>
          This Contract is managed by {this.state.manager}
        </p>
      </div>
    );
  }
}

export default App;
