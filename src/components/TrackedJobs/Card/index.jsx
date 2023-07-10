import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { timeTrackingActions } from "../../../store";
import classes from "./index.module.css";

export function Card({ name, hours, minutes, begin, status, id }) {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  const onClickShowMenu = (e) => setShowMenu((value) => !value);

  const onEneterShowMenu = (e) => {
    if (e.key === "Enter") setShowMenu((value) => !value);
    if (e.key === "Escape") setShowMenu(false);
  };

  const deleteTrackedJob = (e) => {
    dispatch(timeTrackingActions.deletTrackedJobFromTheList(e.target.id));
    setShowMenu(false);
  };

  return (
    <div
      className={classes.card}
      style={{ "--clr": cardStatusColor(status) }}
      id={id}
    >
      <div className={classes.card__head}>
        <h3 className={classes.card__head_name}>{name}</h3>
        <div
          className={classes.card__head_btn}
          tabIndex={0}
          onClick={onClickShowMenu}
          onKeyDown={onEneterShowMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`${classes.menu} ${showMenu ? classes.show_menu : ""}`}>
          <li className={classes.menu__item}>
            <Link to={id}>Resume Work</Link>
          </li>
          <li className={classes.menu__item}>
            <a onClick={deleteTrackedJob} id={id}>
              Delete Job
            </a>
          </li>
        </ul>
      </div>

      <div className={classes.card__time}>{`${hours} hrs ${minutes} min`}</div>

      <div className={classes.card__startdate}>{`Started at: ${begin}`}</div>
    </div>
  );
}

function cardStatusColor(status) {
  if (status === "new") return "#ff5e7d";
  if (status === "started") return "#f1c75b";
  if (status === "submited") return " #4bcf83";
}
