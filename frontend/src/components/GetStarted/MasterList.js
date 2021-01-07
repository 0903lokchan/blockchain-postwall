import React from "react";
import classnames from "classnames";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

const MasterList = ({ section, selectSection, isActive }) => {
  return (
    <button
      onClick={() => selectSection(section)}
      type="button"
      className={classnames(
        "list-group-item",
        "list-group-item-action",
        styles.sidebarText,
        { "active": isActive }
      )}
    >
      {section.title}
    </button>
  );
}

MasterList.propTypes = {
  section: PropTypes.any,
  selectSection: PropTypes.func,
  isActive: PropTypes.bool
}

export default MasterList;