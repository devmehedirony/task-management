
import { BsCalendarDate } from 'react-icons/bs';
import { FaEllipsisH } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAxios } from '../Hooks/useAxios';

const Progress = () => {

  const [progress, setProgress] = useState([])
  const axios = useAxios()

  axios.get('/tasks?category=PROGRESS')
    .then(res => {
      console.log(res.data);
      setProgress(res.data)
    })


  return (
    <div className='space-y-4'>
      {
        progress.map((progress, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-4 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{progress.title}</h2>
              <button>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="cursor-pointer m-1"> <FaEllipsisH /></div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><Link to={`/update`}>Update</Link></li>
                    <li><button>Delete Task</button></li>
                  </ul>
                </div>
              </button>
            </div>

            <p className="text-gray-600 mb-4">
              {progress.description}
            </p>

            <div className="flex items-center">
              <BsCalendarDate className="mr-1" />
              <span className="text-sm">{progress.timestamp}</span>
            </div>

          </div>

        ))
      }
    </div>
  );
};

export default Progress;