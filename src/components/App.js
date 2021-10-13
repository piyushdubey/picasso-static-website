import { Component } from 'react';
import logo from '../logo.svg';
import Web3 from 'web3'
import './App.css';
import Picasso from '../abis/Picasso.json'

class App extends Component {
  
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
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })
      // Load images
      for (var i = 1; i <= totalSupply; i++) {
        const imageUrl = await contract.methods.imageUrls(i - 1).call()
        this.setState({
          imageUrls: [...this.state.imageUrl, imageUrl]
        })
      }
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  mint = (imageUrl) => {
    this.state.contract.methods.mint(imageUrl).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({
        imageUrls: [...this.state.imageUrl, imageUrl]
      })
    })
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      imageUrls: []
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
                  const nftImage = this.image.value
                  this.mint(nftImage)
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
            { this.state.imageUrls.map((image, key) => {
              return(
                <div key={key} className="col-md-3 mb-3">
                  <div className="token" style={{ backgroundColor: 'yellow' }}></div>
                  <div>TEST</div>
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

export default App;
