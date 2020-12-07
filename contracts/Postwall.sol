pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

// Creating a post and store it in contract
contract Postwall {
    struct Post {
        uint id;
        uint timestamp;
        address author;
        string content;
    }

    mapping (address => bytes32) public users;
    Post[] public posts;
    uint postCount;

    constructor() {
        postCount = 0;
    }

    // Creates a post
    function createPost(string calldata content) public {
        posts.push(Post(postCount, block.timestamp, msg.sender, content));
        postCount++;
    }

    // Retrieves the list of posts
    function getPosts() public view returns (uint[] memory, uint[] memory, address[] memory, string[] memory) {
        uint[] memory ids = new uint[](postCount);
        uint[] memory timestamps = new uint[](postCount);
        address[] memory authors = new address[](postCount);
        string[] memory contents = new string[](postCount);
        for (uint i = 0; i < postCount; i++) {
            ids[i] = posts[i].id;
            timestamps[i] = posts[i].timestamp;
            authors[i] = posts[i].author;
            contents[i] = posts[i].content;
        }
        return (ids, timestamps, authors, contents);
    }

    // Register user by username and address
    function registerUser(bytes32 username) public {
        users[msg.sender] = username;
    }

    // Get username, if user is unregistered return null
    function getUsername(address userAddress) public view returns (bytes32 username) {
        return users[userAddress];
    }
}