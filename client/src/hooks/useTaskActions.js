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

  const clearAllTasks = useCallback(() => {
    dispatch(Task.clearAll())
  }, [])

  const getAllTasks = useCallback(async (id) => {
    try {
      const { data } = await axios.get(`${ApiRoutes.task.all}?idUser=${id}`)
      dispatch(Task.getAll(data))
    } catch (error) {
      toast.error('Problema de Conexión')
      throw error
    }
  }, [])

  const getTaskDetail = useCallback(async (id) => {
    try {
      const { data } = await axios.get(`${ApiRoutes.task.base}/${id}`)
      dispatch(Task.getDetail(data))
    } catch (error) {
      toast.error('Problema de Conexión')
      throw error
    }
  }, [])

  const createTask = useCallback(async (info) => {
    try {
      const { data } = await axios.post(ApiRoutes.task.create, info)
      dispatch(Task.create(data))
      toast.success('Tarea Creada Correctamente')
    } catch (error) {
      toast.error('Problema de Conexión')
      throw error
    }
  }, [])

  const deleteTask = useCallback(async (id) => {
    try {
      await axios.put(`${ApiRoutes.task.delete}/${id}`)
      dispatch(Task.remove(id))
      toast.success('Tarea Borrada Correctamente')
    } catch (error) {
      toast.error('Problema de Conexión')
      throw error
    }
  }, [])

  const restoreTask = useCallback(async (id) => {
    try {
      await axios.put(`${ApiRoutes.task.restore}/${id}`)
      const { data } = await axios.get(`${ApiRoutes.task.base}/${id}`)
      dispatch(Task.restore(data))
      toast.success('Tarea Restaurada Correctamente')
    } catch (error) {
      toast.error('Problema de Conexión')
      throw error
    }
  }, [])

  const updateTask = useCallback(async (data) => {
    try {
      const updatedTask = await axios.put(
        `${ApiRoutes.task.update}/${data.id_task}`,
        data
      )

      dispatch(Task.update(updatedTask))
      toast.success('Tarea Actualizada Correctamente')
    } catch (error) {
      toast.error('Problema de Conexión')
      throw error
    }
  }, [])

  return {
    clearTaskDetail,
    clearAllTasks,
    getAllTasks,
    getTaskDetail,
    createTask,
    deleteTask,
    restoreTask,
    updateTask
  }
}

export default useTaskActions
