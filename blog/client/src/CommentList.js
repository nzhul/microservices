import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((c) => {
    return <li key={c.id}>{c.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
