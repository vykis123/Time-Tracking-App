import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import { HomePage } from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import TrackedJobDetail from "./pages/TrackedJobDetails";

export const router = createBrowserRouter([
  {
    paht: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: ":jobId",
        id: "job-detail",
        element: <TrackedJobDetail />,
      },
    ],
  },
]);
