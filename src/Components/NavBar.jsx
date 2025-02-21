import { NavLink } from "react-router-dom";

const NavBar = () => {
  const {user} useAuth()
  const links = <>
    <NavLink
      to="/"
      className={({ isActive}) => isActive ? "bg-black text-white rounded-xl font-bold px-8 py-4" : ""
      }
    >
      Home
    </NavLink>
    <NavLink
      to="/addTask"
      className={({ isActive }) => isActive ? "bg-black text-white rounded-xl font-bold px-8 py-4" : ""
      }
    >
      Add Task
    </NavLink>

    <NavLink
      to="/manageTask"
      className={({ isActive }) => isActive ? "bg-black text-white rounded-xl font-bold px-8 py-4" : ""
      }
    >
      Manage Task
    </NavLink>

   
  </>
  return (
    <div className=" flex items-center justify-between py-6 w-11/12 mx-auto">
      <div>
        <h2 className="font-semibold text-3xl text-black font-primary">My <span className="text-blue-500 ">Task</span></h2>
      </div>
      <div>
        <ul>
          {links}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;