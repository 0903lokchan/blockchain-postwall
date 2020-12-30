// SPDX-License-Identifier: MIT
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

    struct User {
        bytes username;
        address[] followings;
        address[] followers;
    }

    mapping(address => User) public users;
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
    function createUser(string calldata username) public {
        users[msg.sender].username = bytes(username);
    }

    function checkUserRegistered(address userAddress) public view returns (bool) {
        return (users[userAddress].username.length != 0);
    }

    // Get username, if user is unregistered return null
    function getUser(address userAddress) public view returns (string memory username, address[] memory followings, address[] memory followers) {

        // returns
        username = string(users[userAddress].username);
        followings = users[userAddress].followings;
        followers = users[userAddress].followers;
    }
    
    function getFollowings(address userAddress) public view returns (address[] memory followings) {
        return users[userAddress].followings;
    }
    
    function getFollowers(address userAddress) public view returns (address[] memory followers) {
        return users[userAddress].followers;
    }
    
    // Update the sender's followings array and the target's followers array
    function updateFollowings(address[] calldata followingsArray, address followingAddress, address[] calldata followersArray) public {
        users[msg.sender].followings = followingsArray;
        users[followingAddress].followers = followersArray;
    }
    
}