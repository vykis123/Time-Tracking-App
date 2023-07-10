import classes from "./index.module.css";
import { Card } from "./Card";
import { useSelector } from "react-redux";

function TrackedJobs() {
  const trackedJobList = useSelector((state) => state.trackedJobs);
  return (
    <div className={classes.jobs}>
      {trackedJobList.length < 1 && (
        <p className={classes.message}>No Jobs Tracked Yet. 😲</p>
      )}
      {trackedJobList.map((data, index) => {
        return (
          <Card
            name={data.name}
            time={data.time}
            hours={data.hours}
            minutes={data.minutes}
            begin={data.beginDate}
            status={data.jobStatus}
            key={index}
            id={data.id}
          />
        );
      })}
    </div>
  );
}

export default TrackedJobs;
