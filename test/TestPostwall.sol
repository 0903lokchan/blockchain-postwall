pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

import "remix_tests.sol"; // this import is automatically injected by Remix.
import "remix_accounts.sol";
import "../Postwall.sol";

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract testSuite {
    Postwall postwall;

    /// 'beforeAll' runs before all other tests
    /// More special functions are: 'beforeEach', 'beforeAll', 'afterEach' & 'afterAll'
    function beforeAll() public {
        // Here should instantiate tested contract
        postwall = new Postwall();
    }
    
    function checkCreatePost() public {
        postwall.createPost("Hello World!");
        (, , , string[] memory content) = postwall.getPosts();
        Assert.equal(content[0], "Hello World!", "The post content should be \"Hello World!\"");
    }
}
