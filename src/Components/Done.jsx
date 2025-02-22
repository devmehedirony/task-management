
import { BsCalendarDate } from 'react-icons/bs';
import { FaEllipsisH } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAxios } from '../Hooks/useAxios';

const Done = () => {

  const [done, setDone] = useState([])
  const axios = useAxios()

   useEffect(() => {
      axios.get('/tasks?category=DONE')
        .then(res => {
          setDone(res.data)
        })
  
   },[axios])


  return (
    <div className='space-y-4'>
      {
        done.map((todo, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-4 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{todo.title}</h2>
              <div>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="cursor-pointer m-1"> <FaEllipsisH /></div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><Link to={`/update`}>Update</Link></li>
                    <li><button>Delete Task</button></li>
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

export default Done;