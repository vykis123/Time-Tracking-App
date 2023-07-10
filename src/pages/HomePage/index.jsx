import { useState } from "react";
import NewTrackedJobForm from "../../components/NewTrackedJobForm";
import TrackedJobs from "../../components/TrackedJobs";
import UserCard from "../../components/UserCard";
import classes from "./index.module.css";

export function HomePage() {
  const [startNewProject, setStartNewProject] = useState(false);
  return (
    <div className={classes.container}>
      {!startNewProject && <UserCard newProject={setStartNewProject} />}
      <TrackedJobs />
      {startNewProject && <NewTrackedJobForm />}
    </div>
  );
}
