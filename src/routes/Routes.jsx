import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import AddTasks from "../Pages/AddTasks";
import ManageTask from "../Pages/ManageTask";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoutes from "./PrivateRoutes";



const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes><RootLayout></RootLayout></PrivateRoutes>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/addTask',
        element: <AddTasks></AddTasks>
      },
      {
        path: '/manageTask',
        element: <ManageTask></ManageTask>
      },

    ]
  },

  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register></Register>
  }
]);

export default router