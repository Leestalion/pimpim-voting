import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "../App";
import {
  TripCreation,
  VotingPage,
  ResultsPage,
  UserManagement,
  Countdown,
} from "../components";

// Put in the routes in the router
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/trip-creation",
        element: <TripCreation />,
      },
      {
        path: "/vote/:tripId",
        element: <VotingPage tripId="trip123" />,
      },
      {
        path: "/results",
        element: <ResultsPage />,
      },
      {
        path: "/users",
        element: <UserManagement />,
      },
      {
        path: "/countdown",
        element: <Countdown />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  }
];

const router = createBrowserRouter(routes);

// Create the router for the application
export const Router = () => {
  return <RouterProvider router={router} />;
};
