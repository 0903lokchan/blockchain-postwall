import React from "react"

const MainFunc = () => {
    return (
        <div>
            <p>
                Rosetta looks like a typical social network and is easy to use. Below are some brief 
                descriptions of the main functions available at the moment.
            </p>
            <div class="card my-4">
                <div class="card-header text-left">
                    <h2>Homepage</h2>
                </div>
                <div class="card-body text justify">
                    <div class="card-text"></div>
                    <div class="card">
                        <div class="card-header text-left">
                            <h3>Viewing posts</h3>
                        </div>
                        <div class="card-body text-justify">
                            <div class="card-text">
                                <p>
                                    By default, Rosetta on Chain shows all the posts made by every user. It is to 
                                    maximize the opportunity of all messages to reach the public. In a later 
                                    version, a focus mode will be introduced to only view followed users' content.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header text-left">
                            <h3>Writing posts</h3>
                        </div>
                        <div class="card-body text-justify">
                            <div class="card-text">
                                <p>
                                    Because of the high storage cost of blockchains, the app only supports textual 
                                    content at the moment. Whenever you create a post, you must confirm transaction 
                                    from your blockchain wallet as uploading content counts as transactions to the 
                                    blockchain. No additional cost will be incurred except the transaction fee paid 
                                    to the miners.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card my-4">
                <div class="card-header text-left">
                    <h2>Profile</h2>
                </div>
                <div class="card-body text justify">
                    <div class="card-text">
                        <p>
                            The app provides personal profile view where you may read all the content a user has uploaded.
                        </p>
                    </div>
                    <div class="card">
                        <div class="card-header text-left">
                            <h3>Viewing your profile</h3>
                        </div>
                        <div class="card-body text-justify">
                            <div class="card-text">
                                <p>
                                    To access your profile, click on the "profile" button on the navigation bar. 
                                    The app will show you the profile of the selected account on your wallet.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header text-left">
                            <h3>Viewing others profile</h3>
                        </div>
                        <div class="card-body text-justify">
                            <div class="card-text">
                                <p>
                                    To view others' profile, click on the username on the posts on your homepage.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainFunc;