import axios from 'axios'

import { ApiRoutes } from '../utils/routes/apiRoutes'
import { useTaskDispatch } from './store'

import * as Task from '../store/slices/taskSlice'
import { useCallback } from 'react'

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
      throw new Error(error.message)
    }
  }, [])

  const getTaskDetail = useCallback(async (id) => {
    try {
      const { data } = await axios.get(`${ApiRoutes.task.base}/${id}`)
      dispatch(Task.getDetail(data))
    } catch (error) {
      throw new Error(error.message)
    }
  }, [])

  const createTask = useCallback(async (info) => {
    try {
      const { data } = await axios.post(ApiRoutes.task.create, info)
      dispatch(Task.create(data))
    } catch (error) {
      throw new Error(error.message)
    }
  }, [])

  const deleteTask = useCallback(async (id) => {
    try {
      await axios.put(`${ApiRoutes.task.delete}/${id}`)
      dispatch(Task.remove(id))
    } catch (error) {
      throw new Error(error.message)
    }
  }, [])

  const restoreTask = useCallback(async (id) => {
    try {
      await axios.put(`${ApiRoutes.task.restore}/${id}`)
      const { data } = await axios.get(`${ApiRoutes.task.base}/${id}`)
      dispatch(Task.restore(data))
    } catch (error) {
      throw new Error(error.message)
    }
  }, [])

  const updateTask = useCallback(async (data) => {
    try {
      const updatedTask = await axios.put(
        `${ApiRoutes.task.update}/${data.id_task}`,
        data
      )

      dispatch(Task.update(updatedTask))
    } catch (error) {
      throw new Error(error.message)
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
