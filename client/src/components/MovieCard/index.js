import React from "react";
import "./style.css";

function FriendCard(props) {
  return (
    <div className="card remix" onClick={() => props.remixFriends(props.id)}>
      <div className="img-container scoreBoard">
        <img alt={props.name} src={props.image} />
      </div>
    </div>
  );
}

export default FriendCard;
