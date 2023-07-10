import classes from "./index.module.css";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className={classes.container}>
      <p className={classes.error}>
        Sory, but it seems that you were trying to reach a tracked job that does
        not exist. Please, go back to main page{" "}
        <Link to={"/"} className={classes.error__link}>
          Here
        </Link>
      </p>
    </div>
  );
}

export default ErrorPage;
