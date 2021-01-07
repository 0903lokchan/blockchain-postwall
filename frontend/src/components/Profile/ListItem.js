import React from "react";
import PropTypes from "prop-types";
import {unix, fromNow} from "moment"

const ListItem = (props) => {
  if (props){
    return (
      <div className="col-12 mb-3 border">
        <div className="row">
          <div className="col-11">
            <a id="postUsername" href={"/Profile/"+props.author}>{props.author}</a>
            <p id="postTimestamp">said {unix(props.timestamp).fromNow()} ago:</p>
            <br></br>
            <p className="mt-3">{props.content}</p>
          </div>
          <div className="col-1">
          </div>
        </div>
      </div>
    );
  }
  return null;
}

ListItem.propTypes = {
  props: PropTypes.any,
}

export default ListItem;