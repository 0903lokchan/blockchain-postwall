import React from "react"

const CreatePosts = () => {
    return (
        <div>
            <div class="card my-4">
                <div class="card-header text-left">
                    <h2>Transaction confirmation</h2>
                </div>
                <div class="card-body text-justify">
                    <p>
                        To successfully upload a post, you must confirm a transaction from your wallet application. 
                        This is to make a request to the blockchain to process your content upload. A toll will be 
                        taken by the miners on the blockchain in order to handle your request.
                    </p>
                </div>
            </div>
            <div class="card my-4">
                <div class="card-header text-left">
                    <h2>Waiting for handling</h2>
                </div>
                <div class="card-body text-justify">
                    <p>
                        Unlike traditional social networks where making posts are almost instant, blockchain 
                        networks take a relatively long time to handle any request. It could take a few minutes 
                        before your message is broadcasted. With wallets like Metamask, you may check your 
                        transaction status or speed it up by paying an extra toll.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CreatePosts;