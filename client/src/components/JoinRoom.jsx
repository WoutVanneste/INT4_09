import React, { useState } from "react";
import { socket } from "../containers/App.js";
import styles from "./JoinRoom.module.css";
import buttonStyles from "../styles/buttons.module.css";

const JoinRoom = props => {
  const roomRef = React.createRef();

  const [room, setRoom] = useState("");

  const handleJoinRoom = e => {
    e.preventDefault();
    if (roomRef.current.value) {
      socket.emit("join", { room: roomRef.current.value, user: "player" });
      props.joinedRoom(roomRef.current.value);
    }
  };

  const handleChangeInput = e => {
    setRoom(e.currentTarget.value);
  };

  return (
    <>
      <div className={styles.room_wrapper}>
        <div className={styles.title_wrapper}>
          <h1 className={styles.title}>Interactieve voorstelling</h1>
          <span className={styles.bijschrift}>
            Vul hieronder de voorstelling van de gamemaster in
          </span>
        </div>

        <form
          action=""
          onSubmit={handleJoinRoom}
          className={styles.form_wrapper}
        >
          <input
            type="text"
            ref={roomRef}
            className={styles.input}
            onChange={handleChangeInput}
            placeholder="voorstelling123"
          />
          <input
            type="submit"
            value="Deelnemen aan voorstelling"
            className={
              room === ""
                ? buttonStyles.submit_form_empty
                : buttonStyles.submit_form
            }
          />
        </form>
      </div>
    </>
  );
};

export default JoinRoom;
