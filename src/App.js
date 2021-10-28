import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
var NumberFormat = require('react-number-format');

class App extends Component { 


 
  constructor(props){
    super(props);

    this.state = {
      cryptos1: [],
      cryptos2: []
    };

  }

  

  componentDidMount(){
  //USING PROMISE.all() from https://gomakethings.com/waiting-for-multiple-all-api-responses-to-complete-with-the-vanilla-js-promise.all-method/
  Promise.all([
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD')
    .then(res=>{
      const cryptos1 = res.data;
      console.log(cryptos1);
      this.setState({cryptos1: cryptos1});
    }),
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=USD')
    .then(res=>{
      const cryptos2 = res.data;
      console.log(cryptos2);
      this.setState({cryptos2: cryptos2});
    })
  ]).then(function(responses){
    return Promise.all(responses.map(function(response){
      return response.json();
    }));
  }).then(function(data){
    console.log(data);
  }).catch(function(error){
    console.log(error);
  });

  }


  render(){
    
    Object.keys(this.state.cryptos1).map((key)=>(this.state.cryptos1['ETH'].USD)); //=>(this.state.cryptos1['BTC'].USD))); //bitcoin on Cryptocompare
    
    var btc1 = (Object.keys(this.state.cryptos1).map((key)=>(this.state.cryptos1['BTC'].USD)));
    
    
    
    var ETH1 = (Object.keys(this.state.cryptos1).map((key)=>(this.state.cryptos1['ETH'].USD)));
    var btc2 = (Object.keys(this.state.cryptos2).map((key)=>(this.state.cryptos2['bitcoin'].usd)));//bitcoin on coingecko
    var ETH2 = (Object.keys(this.state.cryptos2).map((key)=>(this.state.cryptos2['ethereum'].usd)));

    var cheapestbtc, cheapesteth;
    var text;

    if(btc1<btc2)
    {
      cheapestbtc = "You should buy Bitcoin from CryptoCompare";
    }
    else if(btc2<btc1)
    {
      cheapestbtc = "You should buy Bitcoin from Coingecko";
    }
    
    if(ETH1<ETH2)
    {
      cheapesteth = "You should buy Ethereum from CryptoCompare";

    }
    else if(ETH2<ETH1)
    {
      cheapesteth = "You should buy Ethereum from Coingecko";
      
    }


    return ( 
      <div className="App">

        <div className="MyTitle">


        </div>
        <div className = "ExchangeHeader">
            <h1>
              <center>
              <a href= "https://www.cryptocompare.com/" target="_blank">CRYPTOCOMPARE</a>
              </center>  
            </h1>
        </div>
        {Object.keys(this.state.cryptos1).map((key)=>(
          <div id="crypto-container">
            <span className="left">{key}</span>
            <span className="right">${this.state.cryptos1[key].USD} </span>
          </div>
        ))}
        <p></p>
        <break></break>
        <div className = "ExchangeHeader">
            <h1>
              <center>
              <a href= "https://www.coingecko.com/" target="_blank">COINGECKO</a>
              </center>
            </h1>
        </div>
        {Object.keys(this.state.cryptos2).map((key)=>(
          <div id="crypto-container">
            <span className="left">{key}</span>
            <span className="right">${this.state.cryptos2[key].usd}</span>
          </div>
        ))}
        <p></p>

        <div className = "WhichExchange"> 
        <center>
        <text><b>{cheapestbtc}</b></text>
        <p>
        </p>
        
        <text>{cheapesteth}</text>
        </center>
        
        <h2>
          
          
        </h2>

        </div>

    </div>
    );
  }  
}
export default App;