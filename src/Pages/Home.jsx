
import TodoCard from "../Components/TodoCard";
import { FcTodoList } from "react-icons/fc";


const Home = () => {

 
  return (
    <div className="flex flex-wrap gap-20 justify-center">
      <div>
        <h2 className="text-3xl font-black  py-2 text-center mb-8 flex items-center gap-1"><FcTodoList />TODOS</h2>
        <TodoCard></TodoCard>
      </div>
      
      <div>
        <h2 className="text-3xl font-black  py-2 text-center mb-8 flex items-center gap-1"><FcTodoList />TODOS</h2>
        <TodoCard></TodoCard>
      </div>

      <div>
        <h2 className="text-3xl font-black  py-2 text-center mb-8 flex items-center gap-1"><FcTodoList />TODOS</h2>
        <TodoCard></TodoCard>
      </div>
    </div>
  );
};

export default Home;