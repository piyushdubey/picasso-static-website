const { assert } = require('chai');
const { unstable_concurrentAct } = require('react-dom/test-utils');

const Picasso = artifacts.require('./Picasso.sol');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('Picasso', (accounts) => {
    let contract

    before(async () => {
        contract = await Picasso.deployed()
    })

    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = contract.address
            console.log(address);
            assert.notEqual(address, '')
            assert.notEqual(address, 0x0)
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async() => {
            const name = await contract.name()
            assert.equal(name, 'Picasso')
        })

        it('has a symbol', async() => {
            const symbol = await contract.symbol()
            assert.equal(symbol, 'PICASSO')
        })
    })
})