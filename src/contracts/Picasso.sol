pragma solidity ^0.5.16;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract Picasso is ERC721Full {

    string[] public imageUrls;
    mapping(string => bool) _imageExists;

    constructor() ERC721Full("Picasso", "PICASSO") public {

    }

    function mint(string memory _imageUrl) public {
        // Require unique image
        uint _id = 0;//generate unique guid
        
        // Image - add it
        // Call the mint function
        _mint(msg.sender, _id);
        _imageExists[_imageUrl] = true;
        // Image - track it
    }
}