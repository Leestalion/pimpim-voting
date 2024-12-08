import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "src/App";
import {
  TripCreation,
  Results,
  UserManagement,
  Home,
  Vote,
  Trip
} from "src/components";
import { TripProvider } from "src/contexts";

// Put in the routes in the router
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/trip-creation",
        element: <TripCreation />,
      },
      {
        path: "/trip/:tripId",
        element: (
          <TripProvider>
            <Trip />
          </TripProvider>
        ),
        children: [
          {
            path: "results",
            element: <Results />,
          },
          {
            path: "users",
            element: <UserManagement />,
          },
          {
            path: "vote",
            element: <Vote />,
          },
          {
            index: true,
            element: <Results />,
          }
        ]
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
