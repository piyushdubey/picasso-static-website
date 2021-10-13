// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Picasso is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenCounter;

    mapping(string => bool) _imageExists;

    constructor() ERC721("Picasso", "PICASSO") {

    }

    function mintNFT(address recipient, string memory tokenURI)
    public
    returns (uint256)
    {
        // Make sure the tokenURI has not been minted
        require(!_imageExists[tokenURI]);
        
        // Increament id
        _tokenCounter.increment();
        uint256 newItemId = _tokenCounter.current();

        // Mint
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // Track minted tokenURI
        _imageExists[tokenURI] = true;

        return newItemId;
    }
}