import React from "react"

const Wallet = () => {
    return (
        <div>
            <p>
                To start using Rosetta on Chain, you need to log into a Blockchain network with a 
                        Blockchain wallet app. At the moment, the app only works on Ropsten testnet. For 
                        wallet applications, we recommend using Metamask for stable performance as it is 
                        used in our development processes.
            </p>
            <div class="card my-4">
                <div class="card-header text-left">
                    <h2>Metamask</h2>
                </div>
                <div class="card-body text-justify">
                    <div class="card-text">
                        <p>
                            Metamask is a blockchain wallet app that stores and manages your blockchain accounts, 
                            and secures your accounts by passing your account details to blockchain apps without 
                            giving out your credentials. For more information about Metamask, please visit 
                            their <a href="https://metamask.io/">official site</a>.
                        </p>
                    </div>
                </div>
            </div>
            <div class="card my-4">
                <div class="card-header text-left">
                    <h2>Setting up Metamask</h2>
                </div>
                <div class="card-body text-justify">
                    <div class="card-text">
                        <p>
                            To use Metamask you need to install it on your browser. Installation instructions are 
                            accessible <a href="https://metamask.io/download.html">here</a>. If you don't have an 
                            account yet, create a blockchain account 
                            following <a href="https://metamask.zendesk.com/hc/en-us/articles/360015289452-How-to-Create-Additional-MetaMask-Wallets">
                            these instructions</a>. If you have one, read <a href="https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account">
                            this</a> to import your account.
                        </p>
                    </div>
                </div>
            </div>
            <div class="card my-4">
                <div class="card-header text-left">
                    <h2>Ropsten testnet</h2>
                </div>
                <div class="card-body text-justify">
                    <div class="card-text">
                        <p>
                            At present, Rosetta on Chain only supports Ropsten testnet, a blockchain network for 
                            testing blockchain applications. For detail about the network, 
                            visit <a href="https://karl.tech/intro-guide-to-ethereum-testnets/">here</a>. Make sure you 
                            have switched to the testnet on your wallet before using Rosetta on Chain.
                        </p>
                    </div>
                </div>
            </div>
            <div class="card my-4">
                <div class="card-header text-left">
                    <h2>Getting Token</h2>
                </div>
                <div class="card-body text-justify">
                    <div class="card-text">
                        <p>
                            Before you can make a post on Rosetta on Chain, you must have some tokens to make 
                            transactions. To obtain tokens on Ropsten testnet, 
                            follow <a href="https://support.mycrypto.com/how-to/getting-started/where-to-get-testnet-ether">
                            these instructions</a> to get some from faucets. 
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wallet;