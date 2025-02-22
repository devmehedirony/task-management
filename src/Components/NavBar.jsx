import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from './../Hooks/useAuth';

const NavBar = () => {
  const { user, logOut } = useAuth()
  const navigate = useNavigate()

  const handleLogOut = () => {
    logOut()
      .then(res => {
        navigate('/login')
      })
  }

  
  
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
   
    {
      user ? <button onClick={handleLogOut} className="bg-blue-400 text-white font-bold px-8 py-4 cursor-pointer">LogOut</button> : <>
        <Link to={`/login`} className="bg-blue-600 text-white  font-bold px-8 py-4 ">Login</Link>
        <Link to={`/register`} className="bg-blue-600 text-white  font-bold px-8 py-4">Register</Link>
        
      </>
    }
  </>
  return (
    <div className=" flex items-center justify-between py-6 w-11/12 mx-auto">
      <div>
        <h2 className="font-semibold text-3xl text-black font-primary">My<span className="text-blue-500 ">Task</span></h2>
      </div>
      <div>
        <ul className="space-x-6">
          {links}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;