import { configureStore, createSlice } from "@reduxjs/toolkit";

const trackedJobss =
  localStorage.getItem("Tracked-Jobs") !== null
    ? JSON.parse(localStorage.getItem("Tracked-Jobs"))
    : [];

const initialState = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  jobName: "",
  startTracking: false,
  id: "",
  jobStatus: "",
  beginDate: "",
  trackedJobs: trackedJobss,
};

const timeTrackingSlice = createSlice({
  name: "timeTracking",
  initialState,
  reducers: {
    incramentHours(state) {
      state.hours++;
    },
    incramentMinutes(state) {
      if (state.minutes < 59) {
        state.minutes++;
      } else {
        state.minutes = 0;
      }
    },
    incramentSeconds(state) {
      if (state.seconds < 59) {
        state.seconds++;
      } else {
        state.seconds = 0;
      }
    },
    controlTrackTime(state) {
      state.startTracking = !state.startTracking;
    },
    restartCounting(state) {
      state.hours = 0;
      state.minutes = 0;
      state.seconds = 0;
    },
    createNewTrackedJob(state, action) {
      state.jobName = action.payload.name;
      state.id = action.payload.id;
      state.hours = action.payload.hours;
      state.minutes = action.payload.minutes;
      state.seconds = action.payload.seconds;
      state.jobStatus = action.payload.jobStatus;
      state.beginDate = action.payload.beginDate;

      state.trackedJobs.push(action.payload);
      localStorage.setItem("Tracked-Jobs", JSON.stringify(state.trackedJobs));
    },
    updateTrackedJobList(state, action) {
      const newArr = state.trackedJobs.filter(
        (job) => +job.id !== +action.payload.id
      );

      newArr.push(action.payload);

      state.trackedJobs = newArr;
      localStorage.setItem("Tracked-Jobs", JSON.stringify(state.trackedJobs));
    },
    deletTrackedJobFromTheList(state, action) {
      const newArr = state.trackedJobs.filter(
        (job) => +job.id !== +action.payload
      );
      state.trackedJobs = newArr;
      localStorage.setItem("Tracked-Jobs", JSON.stringify(state.trackedJobs));
    },
    loadTrackedJobData(state, action) {
      const currentTrackedJob = state.trackedJobs.filter(
        (job) => +job.id === +action.payload
      );

      state.jobName = currentTrackedJob[0].name;
      state.id = currentTrackedJob[0].id;
      state.hours = currentTrackedJob[0].hours;
      state.minutes = currentTrackedJob[0].minutes;
      state.seconds = currentTrackedJob[0].seconds;
      state.jobStatus = currentTrackedJob[0].jobStatus;
      state.beginDate = currentTrackedJob[0].beginDate;
    },
  },
});

const store = configureStore({
  // reducer: {
  //   testing: timeTrackingSlice.reducer,
  // },

  reducer: timeTrackingSlice.reducer,
});

export const timeTrackingActions = timeTrackingSlice.actions;
export default store;
