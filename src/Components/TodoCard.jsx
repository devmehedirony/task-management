
import { BsCalendarDate } from 'react-icons/bs';
import { FaEllipsisH } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAxios } from '../Hooks/useAxios';
import Swal from 'sweetalert2';

const TodoCard = () => {

  const [todos, setTodo] = useState([])
  const axios = useAxios()

  useEffect(() => {
    axios.get('/tasks?category=TODO')
      .then(res => {
        setTodo(res.data)
      })
 },[axios])
  
  const handleDelete = (todo) => {
    axios.delete(`/task/${todo._id}`)
      .then(res => {
        if (res.data.deletedCount) {
          Swal.fire({
            title: `${todo.title}`,
            text: "Has Been Deleted",
            icon: "success"
          });
        }
    })
  }

 
  return (
    <div className='space-y-4'>
      {
        todos.map((todo,idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-4 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{todo.title}</h2>
              <div>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="cursor-pointer m-1"> <FaEllipsisH /></div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><Link to={`/update/${todo._id}`}>Update</Link></li>
                    <li><button onClick={() => handleDelete(todo)}>Delete Task</button></li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">
              {todo.description}
            </p>

            <div className="flex items-center">
              <BsCalendarDate className="mr-1" />
              <span className="text-sm">{todo.timestamp}</span>
            </div>

          </div>

        ))
      }
   </div>
  );
};

export default TodoCard;