import React from "react";
import Comment from "./Comment";

function CommentList(props) {
  return (
    <ul>
      {props.restaurants.map((restaurant) => (
        <Comment
          key={restaurant.id}
          title={restaurant.title}
          visitDate={restaurant.visitDate}
          comment={restaurant.comment}
        />
      ))}
    </ul>
  );
}

export default CommentList;
