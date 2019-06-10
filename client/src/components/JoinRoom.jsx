import React from "react";
import { socket } from "../containers/App.js";

const JoinRoom = props => {
  const roomRef = React.createRef();

  const handleJoinRoom = e => {
    e.preventDefault();
    if (roomRef.current.value) {
      socket.emit("join", roomRef.current.value);
      props.joinedRoom(roomRef.current.value);
    }
  };

  return (
    <>
      <div>
        <form action="" onSubmit={handleJoinRoom}>
          <input type="text" ref={roomRef} />
          <input type="submit" value="Join een room" />
        </form>
      </div>
    </>
  );
};

export default JoinRoom;
