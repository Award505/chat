import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import RoomService from "../services/RoomService";

import styles from "../styles/Main.module.css";

const FIELDS = {
  NAME: "name",
  ROOM: "room",
};

const Main = () => {
  const { NAME, ROOM } = FIELDS;

  const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    RoomService.fetchRooms().then((data) => setRooms(data));
  }, []);

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((v) => !v);

    if (isDisabled) e.preventDefault();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Join</h1>

        <form className={styles.form}>
          <div className={styles.group}>
            <input
              type="text"
              name="name"
              value={values[NAME]}
              placeholder="Любое имя"
              className={styles.input}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.group}>
            <select
              name="room"
              id="room"
              className={styles.select}
              value={values[ROOM]}
              onChange={handleChange}
            >
              {rooms.data &&
                rooms.data.map((room) => (
                  <option key={room.id}>{room.name}</option>
                ))}
            </select>
          </div>

          <Link
            className={styles.group}
            onClick={handleClick}
            to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
          >
            <button type="submit" className={styles.button}>
              Заходим, не стесняемся
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Main;
