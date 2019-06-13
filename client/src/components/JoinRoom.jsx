import React, { useState } from "react";
import { socket } from "../containers/App.js";
import buttonStyles from "../styles/buttons.module.css";
import kamerStyles from "./Kamer.module.css";

const JoinRoom = props => {
  const roomRef = React.createRef();

  const [room, setRoom] = useState("");

  const handleJoinRoom = e => {
    e.preventDefault();
    if (roomRef.current.value) {
      socket.emit("join", {
        room: roomRef.current.value.toLowerCase(),
        user: "player"
      });
      props.joinedRoom(roomRef.current.value);
    }
  };

  const handleChangeInput = e => {
    setRoom(e.currentTarget.value);
  };

  return (
    <>
      <div className={kamerStyles.room_wrapper}>
        <div className={kamerStyles.title_wrapper}>
          <h1 className={kamerStyles.title}>Vul hier de kamernaam in</h1>
          <div className={kamerStyles.role}>
            <p className={kamerStyles.role_name}>speler</p>
          </div>
        </div>

        <form
          action=""
          onSubmit={handleJoinRoom}
          className={kamerStyles.form_wrapper}
        >
          <input
            type="text"
            ref={roomRef}
            className={room === "" ? kamerStyles.input : kamerStyles.input_true}
            onChange={handleChangeInput}
            placeholder="Kamernaam"
          />
          <input
            type="submit"
            value="Deelnemen aan voorstelling"
            className={
              room === ""
                ? buttonStyles.submit_form_empty
                : buttonStyles.submit_form
            }
            disabled={room === "" ? true : false}
          />
        </form>
      </div>
    </>
  );
};

export default JoinRoom;
