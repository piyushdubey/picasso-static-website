const { unstable_concurrentAct } = require('react-dom/test-utils');

const Picasso = artifacts.require('./Picasso.sol');

require('chai')
.use(require('chai-as-promised'))
.should()

unstable_concurrentAct('Picasso', (accounts) => {
    describe('deployment', async() => {
        it('deploys successfully', async() => {
            
        })
    })
})