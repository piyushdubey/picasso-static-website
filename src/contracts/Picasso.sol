pragma solidity ^0.5.16;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract Picasso is ERC721Full {
    constructor() ERC721Full("Picasso", "PICASSO") public {

    }
}