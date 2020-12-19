class Post {
    constructor(id, timestamp, author, content) {
        this.id = id;
        this.timestamp = timestamp;
        this.author = author;
        this.content = content;
    }
}

const examplePost = new Post(id=0, timestamp=123456, author="example author", content="example post");



App = {
    web3Provider: null,
    contracts: {},
    posts: [],

    init: async function() {

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

        

        return App.initDOM();
    },

    initDOM: function(){
        // Initialize buttons
        document.querySelector('.btn-air').onclick = function(event) {
            App.createPost();
        };

        //set href of profile button on navbar
        const linkProfile = document.querySelector('#link-profile');
        linkProfile.href = linkProfile.href.slice(0, -42) + App.web3Provider.selectedAddress;

        return App.initContract();
    },

    initContract: async function() {
        $.getJSON("static/Postwall.json", 
        async function(data) {
            console.log("Successfully loaded contract artifact");
            console.log("Instantiating contract...");
            // Instantiate contract
            let PostwallArtifact = data;
            App.contracts.Postwall = TruffleContract(PostwallArtifact);

            App.contracts.Postwall.setProvider(App.web3Provider);
            try {
                App.contracts.postwall = await App.contracts.Postwall.deployed();
                console.log("Successfully instantiated contract");
            } catch (error) {
                console.error("Unable to fetch deployed contract");
                console.error(error);

                // Try to instantiate contract with constant address
                App.contracts.postwall = await App.contracts.Postwall.at(postwallAddress);
            } finally {
                // Retrieve posts from contract
                return App.retrievePosts();
            }
        });
    },

    reloadPosts: function () {
        let postRow = $('#postsRow');
        let postTemplate = $('#postTemplate');
        let postUser;

        postRow.empty();

        for (i = 0; i < App.posts.length; i++){
            postUser = postTemplate.find('#postUsername').text(App.posts[i].author);
            postUser.attr('href', postUser.attr('href').slice(0, -42) + App.web3Provider.selectedAddress);
            postTemplate.find('#postTimestamp').text(moment.unix(App.posts[i].timestamp).fromNow());
            postTemplate.find('#postContent').text(App.posts[i].content);

            postRow.append(postTemplate.html());
        }
    },

    retrievePosts: async function() {
        let followedUser;
        let raw_posts;

        // clear posts cache
        App.posts = [];

        // Retieve posts data from contract
        try {
            raw_posts = await App.contracts.postwall.getPosts();

            // comprehend raw posts data from contract
            for (let i = 0; i < raw_posts[0].length; i++) {
                App.posts.unshift(new Post(
                    id=raw_posts[0][i],
                    timestamp=raw_posts[1][i],
                    author=raw_posts[2][i],
                    content=raw_posts[3][i]));
            }
            
            // Filter out posts made by followed users

        } catch (error) {
            console.error("Unable to retrieve posts data from contract");
            console.error(error);

            // Put example posts data instead
            App.posts.unshift(examplePost);

        } finally {
            
            // Show filtered posts
            App.reloadPosts()
        }        
    },

    createPost: function() {

        let postContent = document.querySelector("#newPostText").value;

        let postwallInstance;

        // Get current account
        web3.eth.getAccounts((err, res) =>{
            if (err) {console.log(err.message);}
            let user = res[0];
            // Call createPost method on Postwall contract
            App.contracts.postwall.createPost(postContent, {from: user})
            .then(result => {
                console.log("A post is successfully created.");
                return App.retrievePosts();
            })
            .catch(err => console.log(err.message));
        })
    }
};

$(window).on("load", () => App.init());