

import { useForm } from 'react-hook-form';
import {  FaGoogle, FaUserAlt } from 'react-icons/fa';
import { MdOutlinePassword } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import { useAxios } from '../Hooks/useAxios';
import Swal from 'sweetalert2';

const Register = () => {
  const { createUserWithGoogle, createUser, updatedUser } = useAuth()
  const navigate = useNavigate()
  const axios = useAxios()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => { 

    console.log(data);
    createUser(data.email, data.password)
      .then(res => {
        updatedUser(data.name)
          .then(res => {
            // user data save to the database
            const userData = {
              userName: data.name,
              mail: data.email
            }
            axios.post('/users', userData)
              .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                  Swal.fire({
                    title: `${data.name}`,
                    text: "Registration Done",
                    icon: "success"
                  });
                  navigate('/')

                }
              })
        })
    })
    

  }

  const signUpGoogle = () => {
    createUserWithGoogle()
      .then(res => {
        const userData = {
          userName: res.user.displayName,
          mail: res.user.email
        }
        axios.post('/users', userData)
          .then(res => {
            console.log(res.data);
            if (res.data.insertedId) {
              Swal.fire({
                title: `${res.user.displayName}`,
                text: "Registration Done",
                icon: "success"
              });
              navigate('/')

            }
          })
    })
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-8">Register</h2>

        <form className='my-6' onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="sr-only">Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex top-4 pointer-events-none">
                <FaUserAlt />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-3 py-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              {errors.name && <span className='text-red-500 mt-1'>This field is required</span>}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex top-4 pointer-events-none">
                <FaUserAlt />
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-3 py-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && <span className='text-red-500 mt-1'>This field is required</span>}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex top-4 pointer-events-none">
                <MdOutlinePassword />
              </div>
              <input
                type="password"
                className="w-full pl-10 pr-3 py-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && <span className='text-red-500 mt-1'>This field is required</span>}
            </div>
          </div>

          <button type='submit' className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 mb-4 cursor-pointer">
            Register
          </button>
        </form>


        <button onClick={signUpGoogle} className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring focus:border-blue-300 flex items-center justify-center cursor-pointer">
          <FaGoogle className="mr-2" /> Sign in with Google
        </button>
        <Link to={`/login`} className='flex justify-center mt-4 text-blue-800 font-medium text-sm '>Already Exits Account Please Login</Link>
      </div>
    </div>
  );
};

export default Register;