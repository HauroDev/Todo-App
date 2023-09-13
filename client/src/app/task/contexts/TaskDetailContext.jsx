import { createContext } from 'react'
import { useTaskSelector } from '../../../hooks/store'
import useTaskActions from '../../../hooks/useTaskActions'
import { useForm } from 'react-hook-form'
import { taskDetailSchema } from '../schemas'
import { zodResolver } from '@hookform/resolvers/zod'

const initialTaskDetailContext = {
  register: () => {},
  control: {},
  handleBlur: () => {},
  handleSubmit: () => {},
  setValue: () => {},
  taskDetail: {}
}

export const TaskDetailContext = createContext(initialTaskDetailContext)

export const TaskDetailProvider = ({ children }) => {
  const { taskDetail } = useTaskSelector()
  const { updateTask, getTaskDetail } = useTaskActions()

  const { register, getValues, control, setValue, reset } = useForm({
    defaultValues: { ...taskDetail },
    mode: 'onChange',
    resolver: zodResolver(taskDetailSchema)
  })

  const handleBlur = ({ target: { name, value } }) => {
    if (taskDetail[name] !== value) {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    const formData = getValues()

    updateTask(formData)
      .then(() => getTaskDetail(taskDetail.id_task))
      .then(() => reset())
      .catch((error) => console.log(error))
  }

  return (
    <TaskDetailContext.Provider
      value={{
        register,
        control,
        handleBlur,
        handleSubmit,
        setValue,
        taskDetail
      }}>
      {children}
    </TaskDetailContext.Provider>
  )
}
