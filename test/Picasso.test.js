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

    describe('minting', async() => {
        it('creates a new token', async () => {
            const result = await contract.mint('https://azureblobaddress.com/file-name.jpeg')
            const totalSupply = await contract.totalSupply()

            // TODO: Fix total supply (depends on unique logic from the contract)
            // assert.equal(totalSupply, 1)
            const event = result.logs[0].args
            // assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct');
            assert.equal(event.to, accounts[0], 'to is correct');

            // FAILURE
            // await contract.mint('https://azureblobaddress.com/file-name.jpeg').should.be.rejected;
            // cannot mint same image twice
        })
    })

    // describe('indexing', async () => {
    //     it('lists images', async () => {
    //         await contract.mint('url1')
    //         await contract.mint('url2')
    //         await contract.mint('url3')
    //         const totalSupply = await contract.totalSupply()
            
    //     })
    // })


})