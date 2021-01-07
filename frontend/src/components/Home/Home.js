import React, { useState } from "react";

import ListItem from "./ListItem";
import Form from "./Form";
import WarningMessage from "../WarningMessage/WarningMessage";
import { ERROR_MESSAGE, ENDPOINT } from "../../constants";

const Home = (props) => {

  // create posts
  const createPost = (content) => {
    const { drizzle, drizzleState } = props;
    const contract = drizzle.contracts.Postwall;

    // Warning Pop Up if the user submits an empty message
    if (!content) {
      setWarningMessage({
        warningMessageOpen: true,
        warningMessageText: ERROR_MESSAGE.LIST_EMPTY_MESSAGE
      });
      return;
    }

    contract.methods.createPost.cacheSend(content)
  }

  // get and display posts
  const [datakey, setDatakey] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    const PostwallStore = props.drizzleState.contracts.Postwall;
    const data = PostwallStore.getPosts[datakey];
    if (!data) {
      return
    }
    const rawPosts = data.value;

    // comprehend raw posts data from contract
    let posts = [];
    for (let i = 0; i < rawPosts[0].length; i++) {
      posts.unshift(
        {"id": rawPosts[0][i],
        "timestamp": rawPosts[1][i],
        "author": rawPosts[2][i],
        "content": rawPosts[3][i]
        }
      );
      }

    setPosts(posts);
    return
  };

  React.useEffect(() => {
    const { drizzle, drizzleState } = props;
    const contract = drizzle.contracts.Postwall;
    const datakey = contract.methods.getPosts.cacheCall();
    setDatakey(datakey);
    return
  },[props]);

  React.useEffect(() => {
    fetchPosts()
    console.log(posts);
    return
  }, [props]);

  // warning messages
  const [warningMessage, setWarningMessage] = useState({warningMessageOpen: false, warningMessageText: ""});
  const closeWarningMessage = () => {
    setWarningMessage({
      warningMessageOpen: false,
      warningMessageText: ""
    });
  };

  return (
    <main id="mainContent" className="container">
      <div className="row justify-content-center py-5">
        <h3>Homepage</h3>
      </div>
      <div className="row">
        <div className="col-12 p-0">
          <Form createPost={createPost}/>
        </div>
          {posts.map(listItem => (
            <ListItem
              key={"post" + listItem.id}
              timestamp={listItem.timestamp}
              author={listItem.author}
              content={listItem.content}
            />
          ))}
          <WarningMessage
          open={warningMessage.warningMessageOpen}
          text={warningMessage.warningMessageText}
          onWarningClose={closeWarningMessage}
        />
      </div>
    </main>
  );
}

export default Home;