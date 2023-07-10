import classes from "./index.module.css";

function UserCard({ newProject }) {
  return (
    <div className={classes.user}>
      <h2 className={classes.user__text}>Your Time Report </h2>

      <button className={classes.user__btn} onClick={() => newProject(true)}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Start tracking New Project
      </button>
    </div>
  );
}

export default UserCard;
