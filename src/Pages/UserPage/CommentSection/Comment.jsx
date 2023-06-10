import React from "react";
import styles from "../../../styles/pages/UserPage/Comments/Comment.module.scss";

const Comment = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.visitDate}>{props.visitDate}</div>
      <div className={styles.comment}>{props.comment}</div>
    </div>
  );
};

export default Comment;
