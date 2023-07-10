import { useDispatch, useSelector } from "react-redux";
import { timeTrackingActions } from "../../store/index";
import Button from "../../components/Button";
import Timer from "../../components/Timer";
import classes from "./index.module.css";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function TrackedJobDetail() {
  const params = useParams();
  const navigation = useNavigate();
  const seconds = useSelector((state) => state.seconds);
  const minutes = useSelector((state) => state.minutes);
  const hours = useSelector((state) => state.hours);
  const trackingStatus = useSelector((state) => state.startTracking);
  const jobName = useSelector((state) => state.jobName);
  const beginDate = useSelector((state) => state.beginDate);
  const dispatch = useDispatch();

  //Load Initial Data///////////////////
  useEffect(() => {
    const loadInitialDataForCurrentJob = () => {
      dispatch(timeTrackingActions.loadTrackedJobData(params.jobId));
    };

    loadInitialDataForCurrentJob();
  }, []);

  //Timer Functions/////////////////
  const updateHours = () => {
    dispatch(timeTrackingActions.incramentHours());
  };

  const updateMinutes = () => {
    dispatch(timeTrackingActions.incramentMinutes());
    if (minutes === 59) updateHours();
  };

  useEffect(() => {
    if (trackingStatus) {
      const interval = setInterval(() => {
        dispatch(timeTrackingActions.incramentSeconds());
        if (seconds === 59) updateMinutes();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [trackingStatus, updateMinutes]);
  //Timer Functions end////////////////

  //Button onClick functions////////////////////////////////////
  const startCounting = () => {
    dispatch(timeTrackingActions.controlTrackTime());

    if (trackingStatus) {
      dispatch(
        timeTrackingActions.updateTrackedJobList(
          dataAboutTrackedJob(
            jobName,
            params.jobId,
            hours,
            minutes,
            seconds,
            "started",
            beginDate
          )
        )
      );
    }
  };

  const submitTrackedJob = () => {
    dispatch(
      timeTrackingActions.updateTrackedJobList(
        dataAboutTrackedJob(
          jobName,
          params.jobId,
          hours,
          minutes,
          seconds,
          "submited",
          beginDate
        )
      )
    );
    navigation("/");
  };

  const deleteTrackedJob = () => {
    dispatch(timeTrackingActions.deletTrackedJobFromTheList(params.jobId));
    navigation("/");
  };

  return (
    <div style={backgroundContainerStyles(trackingStatus)}>
      <ul className={classes.navigator}>
        <Link to={"/"} className={classes.navigator__link}>
          Go To Main Page
        </Link>
      </ul>
      <h1 className={classes.name}>{jobName}</h1>

      <div className={classes.timer}>
        <Timer seconds={seconds} minutes={minutes} hours={hours} />
      </div>

      <div className={classes.actions}>
        <Button
          name={trackingStatus ? "Pause Tracking" : "Start Tracking"}
          btnFunction={startCounting}
        />
        {!trackingStatus && (
          <>
            <Button name={`Submit Project`} btnFunction={submitTrackedJob} />
            <Button name={`Delete Project`} btnFunction={deleteTrackedJob} />
          </>
        )}
      </div>

      <div className={classes.date}>
        <span className={classes.date__box}>Started: {beginDate}</span>
      </div>
    </div>
  );
}

export default TrackedJobDetail;

function backgroundContainerStyles(trackingStatus) {
  return {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem 1rem",
    backgroundColor: trackingStatus ? "#ff8b64" : "#5746ea",
  };
}

function dataAboutTrackedJob(
  jobName,
  id,
  hours,
  minutes,
  seconds,
  status,
  beginDate
) {
  return {
    name: jobName,
    id: id,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    jobStatus: status,
    beginDate: beginDate,
  };
}
