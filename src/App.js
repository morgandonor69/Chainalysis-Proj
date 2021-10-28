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

  

  //https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=USD)
      //'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=2&page=1&sparkline=false')
    
  //componentDidMount(){

    //FIrst API Call to cryptocompare
    /*axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD')
    
    .then(res=>{
      const cryptos1 = res.data;
      console.log(cryptos1);
      this.setState({cryptos1: cryptos1});
    })*/


    //SECOND api call to coingecko
    /*axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=USD')
    
    .then(res=>{
      const cryptos2 = res.data;
      console.log(cryptos2);
      this.setState({cryptos2: cryptos2});
    })
  }*/

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
    
   
    var btc1 = (Object.keys(this.state.cryptos1).map((key)=>(this.state.cryptos1['BTC'].USD))); //bitcoin on Cryptocompare
    var ETH1 = (Object.keys(this.state.cryptos1).map((key)=>(this.state.cryptos1['ETH'].USD)));
    var btc2 = (Object.keys(this.state.cryptos2).map((key)=>(this.state.cryptos2['bitcoin'].usd)));//bitcoin on coingecko
    var ETH2 = (Object.keys(this.state.cryptos2).map((key)=>(this.state.cryptos2['ethereum'].usd)));



    return ( 
      <div className="App">

        <div className="MyTitle">

          
        </div>
        <div className = "ExchangeHeader">
            <h1>
              <text>CRYPTOCOMPARE</text>
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
              <text>COINGECKO</text>
            </h1>
        </div>
        {Object.keys(this.state.cryptos2).map((key)=>(
          <div id="crypto-container">
            <span className="left">{key}</span>
            <span className="right">${this.state.cryptos2[key].usd}</span>
          </div>
        ))}

        <div className = "WhichExchange"> 
        <h1>
        PUT OPTIMAL PRICES HERE:
        
        </h1>
        <h2>
          
        </h2>
        </div>

    </div>

      
      

    );

}  
  

}
export default App;

/*{Object.keys(this.state.cryptos).map((key)=>(
          <div id="crypto-container2">
            <span className="left">{key}</span>
            <span className="right">{this.state.cryptos[key].USD}</span>
        </div>
        ))}
        */