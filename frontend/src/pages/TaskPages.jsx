import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext' 
import { useTasks } from '../context/TaskContext'
import TaskCard from '../components/TaskCard'

function TaskPages() {

    const { user } = useAuth();
//    console.log( user );

    const { getTasks, tasks } = useTasks();

    useEffect(()=>{
        getTasks()
    },[])

    if(tasks.length==0) return <h2>No hay tareas</h2>;

    return (
        <div className='grid grid-cols-3 gap-2'>
            {tasks.map(task =>(
                <TaskCard task={task} key={task._id}/>
            ))}
        </div>
    )
}        

export default TaskPages