# Picasso AI + NFT Generator

## Available Scripts

In the project directory, you can run:

### `npm start`
### `npm test`
### `npm run build`


## Test migration (Install Truffle locally to test this)

### `truffle migration`


This will give an output like this:

```
Compiling your contracts...
===========================
> Compiling @openzeppelin\contracts\GSN\Context.sol
> Compiling @openzeppelin\contracts\drafts\Counters.sol
> Compiling @openzeppelin\contracts\introspection\ERC165.sol
> Compiling @openzeppelin\contracts\introspection\IERC165.sol
> Compiling @openzeppelin\contracts\math\SafeMath.sol
> Compiling @openzeppelin\contracts\token\ERC721\ERC721.sol
> Compiling @openzeppelin\contracts\token\ERC721\ERC721Enumerable.sol
> Compiling @openzeppelin\contracts\token\ERC721\ERC721Full.sol
> Compiling @openzeppelin\contracts\token\ERC721\ERC721Metadata.sol
> Compiling @openzeppelin\contracts\token\ERC721\IERC721.sol
> Compiling @openzeppelin\contracts\token\ERC721\IERC721Enumerable.sol
> Compiling @openzeppelin\contracts\token\ERC721\IERC721Metadata.sol
> Compiling @openzeppelin\contracts\token\ERC721\IERC721Receiver.sol
> Compiling @openzeppelin\contracts\utils\Address.sol
> Compiling .\src\contracts\Picasso.sol
> Artifacts written to C:\Users\piyushdubey\projects\picasso\src\abis
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang



Starting migrations...
======================
> Network name:    'development'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)


1_initial_migration.js
======================

   Deploying 'Picasso'
   -------------------
   > transaction hash:    0x4859645263ec8a8c501c62c640d9be6ba6daa1f241b31f6ed076ef6fefec5850
   > Blocks: 0            Seconds: 0
   > contract address:    0x537497F19281837091A130bc9d550F51ab9Def21
   > block number:        1
   > block timestamp:     1634108737
   > account:             0x061e8Ff22325534db446f7a54B5c0a8a43Eec393
   > balance:             99.95566884
   > gas used:            2216558 (0x21d26e)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.04433116 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:          0.04433116 ETH


2_deploy_contract.js
====================

   Replacing 'Picasso'
   -------------------
   > transaction hash:    0xc85bdd5ccd12d118d0865073357d866a6ec1525822ee6928ef64307d6de3eaf3
   > Blocks: 0            Seconds: 0
   > contract address:    0x11A35Fc253D045a3717c77bde2774840cC8A2692
   > block number:        2
   > block timestamp:     1634108739
   > account:             0x061e8Ff22325534db446f7a54B5c0a8a43Eec393
   > balance:             99.91133768
   > gas used:            2216558 (0x21d26e)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.04433116 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:          0.04433116 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.08866232 ETH
```