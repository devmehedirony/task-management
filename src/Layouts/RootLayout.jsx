import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";

const RootLayout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default RootLayout;