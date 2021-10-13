import { Component } from 'react';
import logo from '../logo.svg';
import Web3 from 'web3'
import './App.css';
import Picasso from '../abis/Picasso.json'

class Mint extends Component {
  
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Picasso.networks[networkId]
    if(networkData) {
      const abi = Picasso.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalMinted = await contract.methods.totalMinted().call()
      this.setState({ totalMinted })

      console.log(totalMinted)

      // Load images
      for (var i = 1; i <= totalMinted; i++) {
        const tokenURI = await contract.methods.tokenURI(i).call()
        console.log('tokenUri=')
        console.log(tokenURI)
        this.setState({
          tokenURIs: [...this.state.tokenURIs, tokenURI]
        })
      }

      console.log(this.state.tokenURIs)
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  mint = (account, tokenURI) => {
    console.log('account=')
    console.log(account)
    console.log('tokenUri=')
    console.log(tokenURI)
    this.state.contract.methods.mintNFT(account, tokenURI).send({ from: account })
    .once('receipt', (receipt) => {
      console.log(receipt)
      this.setState({
        tokenURIs: [...this.state.tokenURIs, tokenURI]
      })
    })
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalMinted: 0,
      tokenURIs: []
    }
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://azurepicasso.azurewebsites.net/"
            rel="noopener noreferrer"
          >
            Picasso Tokens
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Issue Token</h1>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const tokenURI = this.nftImage.value
                  this.mint(this.state.account, tokenURI)
                }}>
                  <input
                    type='text'
                    className='form-control mb-1'
                    placeholder='e.g. imageUri'
                    ref={(input) => { this.nftImage = input }}
                  />
                  <input
                    type='submit'
                    className='btn btn-block btn-primary'
                    value='MINT'
                  />
                </form>
              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
            { this.state.tokenURIs.map((tokenURI, key) => {
              return(
                <div key={key} className="col-md-3 mb-3">
                  <img src={tokenURI} className="token" style={{ backgroundColor: 'yellow' }} />
                  <div>{key}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }


}



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//          <img src={logo} className="App-logo" alt="logo" />
//       </header>
//     </div>
//   );
// }

export default Mint;
