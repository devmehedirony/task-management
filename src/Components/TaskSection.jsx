
import { useDrop } from "react-dnd";
import { useAxios } from "../Hooks/useAxios";
import { FcTodoList } from "react-icons/fc";
import TodoCard from "./TodoCard";
import Progress from "./Progress";
import Done from "./Done";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import io from "socket.io-client";
import { useEffect } from "react";

const socket = io.connect("http://localhost:5000");

const TaskSection = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const { data: taskTodo = [], refetch: todoUpdate } = useQuery({
    queryKey: ['todo'],
    queryFn: async () => {
      const res = await axios.get("/tasks?category=TODO")
      return res.data
    }
  })
 
  const { data: taskProgress = [], refetch: progressUpdate } = useQuery({
    queryKey: ['progress'],
    queryFn: async () => {
      const res = await axios.get("/tasks?category=PROGRESS")
      return res.data
    }
  })

  const { data: taskDone = [], refetch: doneUpdate  } = useQuery({
    queryKey: ['done'],
    queryFn: async () => {
      const res = await axios.get("/tasks?category=DONE")
      return res.data
    }
  })
  useEffect(() => {
    socket.on("taskUpdated", (updatedTask) => {
    
      console.log("Task updated:", updatedTask);

     
      queryClient.invalidateQueries(['todo']);
      queryClient.invalidateQueries(['progress']);
      queryClient.invalidateQueries(['done']);
    });
    
    return () => {
      socket.off("taskUpdated");
    };
  }, [queryClient]);

 

  // TODOS Drop Zone
  const [{ isOver: isOverTodo }, dropTodo] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item, "TODO"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // PROGRESS Drop Zone
  const [{ isOver: isOverProgress }, dropProgress] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item, "PROGRESS"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // DONE Drop Zone
  const [{ isOver: isOverDone }, dropDone] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item, "DONE"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = (item, newCategory) => {
    todoUpdate()
    progressUpdate()
    doneUpdate()
    console.log(
      `Task ID: ${item.id}, Previous Category: ${item.category}, New Category: ${newCategory}`
    );

    const updated = {
      category: newCategory,
    };

    axios.patch(`/taskDrop/${item.id}`, updated).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className={`flex flex-wrap gap-20 justify-center`}>
      {/* TODOS Section */}
      <div>
        <h2 className="text-3xl font-black py-2 text-center mb-8 flex items-center gap-1">
          <FcTodoList />
          TODOS
        </h2>
        <div ref={dropTodo} className={`space-y-4 ${isOverTodo ? "bg-gray-300 " : ""} lg:min-h-96`}>
          {taskTodo.map((todo, idx) => (
            <TodoCard key={idx} todo={todo} refetch={todoUpdate} />
          ))}
        </div>
      </div>

      {/* PROGRESS Section */}
      <div>
        <h2 className="text-3xl font-black py-2 text-center mb-8 flex items-center gap-1">
          <FcTodoList />
          PROGRESS
        </h2>
        <div ref={dropProgress} className={`space-y-4 ${isOverProgress ? "bg-gray-300 " : ""} lg:min-h-96`}>
          {taskProgress.map((prog, idx) => (
            <Progress key={idx} prog={prog} refetch={progressUpdate} />
          ))}
        </div>
      </div>

      {/* DONE Section */}
      <div>
        <h2 className="text-3xl font-black py-2 text-center mb-8 flex items-center gap-1">
          <FcTodoList />
          DONE
        </h2>
        <div ref={dropDone} className={`space-y-4 ${isOverDone ? "bg-gray-300 " : ""} lg:min-h-96`}>
          {taskDone.map((dones, idx) => (
            <Done key={idx} dones={dones} refetch={doneUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskSection;
