import axios from './axios'

export const getTasksRequest =
    () => axios.get('/tasks');

export const getTaskRequest =
    (id) => axios.get(`/task/${id}`);

export const createTasksRequest =
    (task) => axios.post('/task', task);

export const updateTasksRequest =
    (id,task) => axios.put(`/task/${id}`, task);

export const deleteTasksRequest =
    (id) => axios.delete(`/task/${id}`);