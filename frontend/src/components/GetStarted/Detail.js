import React, { createElement } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

const Detail = ({ section }) => {
  const {
    id,
    title,
    content
  } = section;

  return (
    <div className="col">
      <div className={classnames("row", styles.heading)}>
        <h3 className="ml-3 mb-4">{title}</h3>
      </div>
      <div className="row">
        <div className="col-md-10 col-12 ml-3 mb-5 mt-3">
          {createElement(content)}
        </div>
      </div>
    </div>
  );
}

Detail.propTypes = {
  section: PropTypes.any
}

export default Detail;