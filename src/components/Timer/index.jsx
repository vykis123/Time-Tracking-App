import classes from "./index.module.css";

function Timer({ seconds, minutes, hours }) {
  return (
    <span className={classes.timer}>
      {hours < 10 ? `0${hours}` : hours} :{" "}
      {minutes < 10 ? `0${minutes}` : minutes} :{" "}
      {seconds < 10 ? `0${seconds}` : seconds}
    </span>
  );
}

export default Timer;
