import { useForm } from "react-hook-form";
import { useAxios } from "../Hooks/useAxios";
import Swal from "sweetalert2";

const AddTasks = () => {
  const axios = useAxios()


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data);
    const task = {
      title: data.title,
      description: data.description,
      category: data.category,
      timestamp: new Date().toLocaleString()
    }

    axios.post('/tasks', task)
      .then(res => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Task",
            text: "Added Successfully",
            icon: "success"
          });
        }
    })
   }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">ADD TASK</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Task Title</label>
          <input {...register("title", { required: true })} type="text" className="w-full p-2 border rounded-md mt-1" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <input {...register("description", { required: true })} type="text" className="w-full p-2 border rounded-md mt-1" />
        </div>
        <div className=" mb-6">
          <div>
            <label className="block text-sm font-medium">Task Stage</label>
            <select className="w-full p-2 border rounded-md mt-1 " {...register("category", { required: true })}>
              <option value="TODO">TODO</option>
              <option value="IN PROGRESS">PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
        
        </div>
       
        <div className="flex justify-center items-center">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2  cursor-pointer">Add Task</button>
        </div>
      </form>
    </div>
  );
};

export default AddTasks;
