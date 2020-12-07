const postwallAddress = '0x63b3f36cCe39d147a640f385c096B60dE2F068Ac';

function Post(id, timestamp, author, content) {
    this.id = id;
    this.timestamp = timestamp;
    this.author = author;
    this.content = content;
}

App = {
    web3Provider: null,
    contracts: {},
    posts: [],

    init: async function() {
        // Initialize buttons
        document.querySelector('.btn-air').onclick = function(event) {
            App.createPost();
        };

        return App.initWeb3();
    },

    initWeb3: async function() {
        // Browser support ethereum
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access
                console.error('User denied account access');
            }
        }

        // Else fall back to Ganache
        else {
            App.web3Provider = new web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function() {
        $.getJSON("static/Postwall.json", function(data) {
            // Instantiate contract
            let PostwallArtifact = data;
            App.contracts.Postwall = TruffleContract(PostwallArtifact);
            App.contracts.Postwall.setProvider(App.web3Provider);
      
            // Retrieve posts from contract
            return App.retrievePosts();
          });
      
          return App.bindEvents();
    },

    bindEvents: function() {1
    },

    clearPost: function () {
      let postRow = $('#postsRow');
      postRow.empty();  
    },

    reloadPosts: function () {
        let postRow = $('#postsRow');
        let postTemplate = $('#postTemplate');

        App.clearPost();

        for (i = 0; i < App.posts.length; i++){
            postTemplate.find('#postUsername').text(App.posts[i].author);
            postTemplate.find('#postTimestamp').text(moment.unix(App.posts[i].timestamp).fromNow());
            postTemplate.find('#postContent').text(App.posts[i].content);

            postRow.append(postTemplate.html());
        }
    },

    retrievePosts: function() {
        let postRow = $('#postsRow');
        let postTemplate = $('#postTemplate');
        let postwallInstance;
        let followedUser;

        // retrieve the deployed instance of contract Postwall
        App.contracts.Postwall.deployed().then(instance => {
            postwallInstance = instance;
            App.contracts.postwallinst = postwallInstance;

            return postwallInstance.getPosts.call();
        }).then((posts) => {
                let raw_posts = posts;
                App.posts = [];
                for (let i = 0; i < raw_posts[0].length; i++) {
                    App.posts.unshift(new Post(
                        id=raw_posts[0][i],
                        timestamp=raw_posts[1][i],
                        author=raw_posts[2][i],
                        content=raw_posts[3][i]));
                }
                
                // Filter out posts made by followed users

                // Show filtered posts
                App.reloadPosts()
            }).catch((err) => {
                console.log(err.message);
            });
    },

    createPost: function() {

        let postContent = document.querySelector("#newPostText").value;

        let postwallInstance;

        // Get current account
        web3.eth.getAccounts((err, res) =>{
            if (err) {console.log(err.message);}
            let user = res[0];
            // Call createPost method on Postwall contract
            App.contracts.Postwall.deployed().then(instance => {
                postwallInstance = instance;

                return postwallInstance.createPost(postContent, {from: user});
            }).then(result => {
                console.log("A post is successfully created.");
                return App.retrievePosts();
            })
            .catch(err => console.log(err.message));
        })
    }
};

$(function() {
    $(window).load(() => App.init());
});