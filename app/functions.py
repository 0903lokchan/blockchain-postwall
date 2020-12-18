import json
import datetime
from web3 import Web3, HTTPProvider

postwall_artifact = json.load(open('./app/static/Postwall.json'))
postwall_address = postwall_artifact["networks"]["3"]["address"]
postwall_abi = postwall_artifact['abi']

# check connection and get enode
w3 = Web3(HTTPProvider('https://ropsten.infura.io/v3/c9402e213aa94b979dc80abc164c109d'))
print(f"web3 provider is connected: {w3.isConnected()}")

# instantiate postwall contract
contract = w3.eth.contract(abi=postwall_abi, address=postwall_address)

def get_posts (user = None):
    
    # get post data from contract Postwall
    posts_raw = contract.functions.getPosts().call()

    # tranform post data into json format
    posts_json = []
    posts_display = []
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
        posts_display = posts_json
    else:
        user = user.lower()
        for post in posts_json:
            if post["author"].lower() == user:
                posts_display.append(post)
    
    return posts_display

if __name__ == "__main__":
    get_posts()