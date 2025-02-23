

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider} from 'react-dnd'
import TaskSection from "../Components/TaskSection";



const Home = () => {
 
 

 
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <TaskSection></TaskSection>
    </div>
    </DndProvider>
  );
};

export default Home;