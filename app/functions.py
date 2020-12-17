import json
import datetime
from eth_account import account
from web3 import Web3, HTTPProvider

from app import app

postwall_artifact = json.load(open('./app/static/Postwall.json'))
postwall_address = postwall_artifact["networks"]["5777"]["address"]
postwall_abi = postwall_artifact['abi']

# check connection and get enode
w3 = Web3(HTTPProvider('HTTP://127.0.0.1:7545'))
print(f"web3 provider is connected: {w3.isConnected()}")

# instantiate postwall contract
contract = w3.eth.contract(abi=postwall_abi, address=postwall_address)

def get_posts (user = None):
    # get post data from contract Postwall
    posts_raw = contract.functions.getPosts().call()

    # tranform post data into json format
    posts_json = []
    post_ids = posts_raw[0]
    post_timestamp = posts_raw[1]
    post_author = posts_raw[2]
    post_content = posts_raw[3]
    for i, id in enumerate(post_ids):
        posts_json.append({
            "id": id,
            "timestamp": datetime.datetime.utcfromtimestamp(post_timestamp[i]),
            "author": post_author[i],
            "content": post_content[i]})
    posts_json.reverse()

    if user == None:
        post_display = posts_json
    else:
        post_display = []
        for post in posts_json:
            if post["author"] == user:
                post_display.append(post)
    
    return post_display