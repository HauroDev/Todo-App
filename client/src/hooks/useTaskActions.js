import axios from 'axios'

import { ApiRoutes } from '../utils/routes/apiRoutes'
import { useTaskDispatch } from './store'

import * as Task from '../store/slices/taskSlice'
import { useCallback } from 'react'
import { toast } from 'react-toastify'

const useTaskActions = () => {
  const dispatch = useTaskDispatch()

  const clearTaskDetail = useCallback(async () => {
    dispatch(Task.clearDetail())
  }, [])

  const clearTasks = useCallback(() => {
    dispatch(Task.clearAll())
  }, [])
  const clearTasksDeleted = useCallback(() => {
    dispatch(Task.clearAllDeleted())
  }, [])

  const getTasks = useCallback(async (idUser) => {
    try {
      const urlGetTask = `${ApiRoutes.task.all}?idUser=${idUser}`
      const { data } = await axios.get(urlGetTask)
      dispatch(Task.setTasks(data))
    } catch (error) {
      toast.error(`Error: ${error.message}`)
    }
  }, [])

  const getTasksDeleted = useCallback(async (idUser) => {
    try {
      const urlGetTask = `${ApiRoutes.task.all}?idUser=${idUser}&deleted=true`
      const { data } = await axios.get(urlGetTask)
      dispatch(Task.setTasksDeleted(data))
    } catch (error) {
      toast.error(`Error: ${error.message}`)
    }
  }, [])

  const getTaskDetail = useCallback(async (idTask) => {
    try {
      const { data } = await axios.get(`${ApiRoutes.task.base}/${idTask}`)
      dispatch(Task.setDetail(data))
    } catch (error) {
      toast.error(`Error: ${error.message}`)
    }
  }, [])

  const createTask = useCallback(async (dataTask) => {
    try {
      const { data } = await axios.post(ApiRoutes.task.create, dataTask)
      dispatch(Task.create(data))
      toast.success('Tarea Creada Correctamente')
    } catch (error) {
      toast.error(`Error: ${error.message}`)
    }
  }, [])

  const softDeleteTask = useCallback(async (idTask) => {
    try {
      dispatch(Task.remove(idTask))
      await axios.put(`${ApiRoutes.task.softDelete}/${idTask}`)
      toast.success('Tarea Borrada Correctamente')
    } catch (error) {
      toast.error(`Error: ${error.message}`)
    }
  }, [])

  const hardDeleteTask = useCallback(async (idTask) => {
    try {
      dispatch(Task.destroy(idTask))
      await axios.put(`${ApiRoutes.task.hardDelete}/${idTask}`)
      toast.success('Tarea Eliminada Correctamente')
    } catch (error) {
      toast.error(`Error: ${error.message}`)
    }
  }, [])

  const restoreTask = useCallback(async (idTask) => {
    try {
      await axios.put(`${ApiRoutes.task.restore}/${idTask}`)
      const { data } = await axios.get(`${ApiRoutes.task.base}/${idTask}`)
      dispatch(Task.restore(data))
      toast.success('Tarea Restaurada Correctamente')
    } catch (error) {
      toast.error(`Error: ${error.message}`)
    }
  }, [])

  const updateTask = useCallback(async (data) => {
    try {
      dispatch(Task.update(data))
      await axios.put(`${ApiRoutes.task.update}/${data.id_task}`, data)

      toast.success('Tarea Actualizada Correctamente')
    } catch (error) {
      toast.error(`Error: ${error.message}`)
    }
  }, [])

  return {
    clearTaskDetail,
    clearTasks,
    clearTasksDeleted,
    getTasks,
    getTaskDetail,
    getTasksDeleted,
    createTask,
    softDeleteTask,
    hardDeleteTask,
    restoreTask,
    updateTask
  }
}

export default useTaskActions
