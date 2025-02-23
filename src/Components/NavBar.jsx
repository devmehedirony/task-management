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
      className={({ isActive }) => isActive ? "bg-black text-center text-white rounded-xl font-bold px-4 py-2 lg:px-8 lg:py-4" : "text-center"
      }
    >
      Home
    </NavLink>
    <NavLink
      to="/addTask"
      className={({ isActive }) => isActive ? "bg-black text-center text-white rounded-xl font-bold px-4 py-2 lg:px-8 lg:py-4" : "text-center"
      }
    >
      Add Task
    </NavLink>
   
    {
      user ? <button onClick={handleLogOut} className="bg-blue-400 text-white font-bold px-4 py-2 lg:px-8 lg:py-4 cursor-pointer">LogOut</button> : <>
        <Link to={`/login`} className="bg-blue-600 text-white  font-bold px-4 py-2 lg:px-8 lg:py-4 ">Login</Link>
        <Link to={`/register`} className="bg-blue-600 text-white  font-bold px-4 py-2 lg:px-8 lg:py-4">Register</Link>
        
      </>
    }
  </>
  return (
    <div className="navbar w-11/12 mx-auto mb-20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-sky-200  rounded-box z-1 mt-3 w-52 p-2 space-y-4 shadow">
           {links}
          </ul>
        </div>
        <h2 className="font-semibold text-3xl text-black font-primary">My<span className="text-blue-500 ">Task</span></h2>

      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-8 flex items-center">
         {links}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;