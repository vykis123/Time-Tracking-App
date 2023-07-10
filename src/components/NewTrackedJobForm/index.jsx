import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { timeTrackingActions } from "../../store";
import classes from "./index.module.css";

function NewTrackedJobForm() {
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false);
  const projectName = useRef("");
  const navigate = useNavigate();

  const handleNewSubmitedProject = (e) => {
    e.preventDefault();

    if (projectName.current.value === "") return setShowError(true);

    setShowError(false);

    const projectId = generateUniqueId();

    dispatch(
      timeTrackingActions.createNewTrackedJob({
        name: projectName.current.value,
        id: projectId,
        hours: 0,
        minutes: 0,
        seconds: 0,
        jobStatus: "new",
        beginDate: getTimeStamp(),
      })
    );

    navigate(`/${projectId}`);
  };
  return (
    <form className={classes.form} onSubmit={handleNewSubmitedProject}>
      <div className={classes.form__group}>
        <input
          type="text"
          name="newJob"
          ref={projectName}
          required
          tabIndex={1}
          placeholder="1"
        />
        <label htmlFor="newJob">Enter Your Project Name</label>

        {showError && (
          <span className={classes.form__group_error}>
            Please Enter Project Name
          </span>
        )}
      </div>
      <button type="submit" tabIndex={1} className={classes.form__btn}>
        <span> Start Tracking New Project</span>
      </button>
    </form>
  );
}

export default NewTrackedJobForm;

function generateUniqueId() {
  return Date.now().toString();
}

function getTimeStamp() {
  const MONTHS_ARR = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${year}, ${MONTHS_ARR[month]}, ${day}`;
}
