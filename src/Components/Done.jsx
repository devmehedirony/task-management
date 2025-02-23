
import { BsCalendarDate } from 'react-icons/bs';
import { FaEllipsisH } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAxios } from '../Hooks/useAxios';
import Swal from 'sweetalert2';
import { useDrag } from 'react-dnd';

const Done = ({ dones, refetch }) => {
  const { title, description, _id, timestamp , category } = dones
  

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: _id, category: category },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))



  const axios = useAxios()

  const handleDelete = (done) => {
    axios.delete(`/task/${done._id}`)
      .then(res => {
        if (res.data.deletedCount) {
          refetch()
          Swal.fire({
            title: `${done.title}`,
            text: "Has Been Deleted",
            icon: "success"
          });
        }
      })
  }


  return (
    <div ref={drag} className='space-y-4'>
      <div className=" rounded-lg shadow-md p-4 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="cursor-pointer m-1"> <FaEllipsisH /></div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li><Link to={`/update/${dones._id}`}>Update</Link></li>
                <li><button onClick={() => handleDelete(dones)}>Delete Task</button></li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          {description}
        </p>

        <div className="flex items-center">
          <BsCalendarDate className="mr-1" />
          <span className="text-sm">{timestamp}</span>
        </div>

      </div>
    </div>
  );
};

export default Done;