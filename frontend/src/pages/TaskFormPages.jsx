import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TaskContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { updateTasksRequest } from '../api/tasks';

function TaskFormPages() {

    const { register, handleSubmit, setValue } = useForm();
    const { tasks, createTask, getTask, updateTask } = useTasks()
    // console.log(tasks);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        // console.log(params);
        async function loadTask() {
            if (params.id) {
                const task = await getTask(params.id);
                // console.log(task);
                // console.log(task.title);
                // console.log(task.description);
                setValue('title', task.title)
                setValue('description', task.description)
            }
        }
        loadTask()
    }, [])

    const onSubmit = handleSubmit((data) => {
        //console.log('crear tarea');
        //console.log(data);
        if (params.id) {
            // console.log(data);
            updateTask(params.id,data);
        } else {
            createTask(data);
        }
        navigate('/tasks');
    })

    return (
        <div className="bg-zinc-800 w-full p-10 rounded-md">
            <form onSubmit={onSubmit}>
                <input type="text"
                    placeholder="Title"
                    {...register('title')}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    autoFocus
                />
                <textarea
                    rows="3" placeholder="Description"
                    {...register('description')}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                ></textarea>
                <button>Save</button>
            </form>
        </div>
    )
}

export default TaskFormPages