import classes from "./index.module.css";

function Button({ btnFunction, name }) {
  return (
    <button className={classes.btn} onClick={btnFunction}>
      {name}
    </button>
  );
}

export default Button;
