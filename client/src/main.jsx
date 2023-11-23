import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Browse from "./pages/Browse.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navtab.jsx";
import Interval from "./pages/Interval.jsx";
import Signup from "./pages/Signup.jsx";
import DashLite from "./pages/DashLite.jsx";
import Intlite from "./pages/IntLite.jsx";

// messing around browse2practice
import Paramlite from "./pages/Paramlite.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dash",
        element: <DashLite />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/interval",
        element: <Interval />,
      },
      {
        path: "/intLite/:workoutId",
        element: <Intlite />,
      },
      {
        // messin
        path: "workout/:workoutId",
        element: <Paramlite />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
