import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { taskSchema } from '../schemas'

import { useUserSelector } from '../../../../hooks/store'
import useTaskActions from '../../../../hooks/useTaskActions'

import CrossButton from '../../../../components/CrossButton'
import PlusButton from '../../../../components/PlusButton'
import SubmitButton from '../../../../components/SubmitButton'

const FormTask = ({
  callback,
  defaultValues = {
    status: 'pending',
    title: '',
    description: '',
    steps: []
  }
}) => {
  const {
    dataUser: { id_user: idUser }
  } = useUserSelector()

  const { createTask } = useTaskActions()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, submitCount },
    control,
    reset
  } = useForm({
    defaultValues: { ...defaultValues, id_user: idUser },
    mode: 'onChange',
    resolver: zodResolver(taskSchema)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps'
  })

  const handleStepAdd = () => append({ label: '' })
  const onSubmit = (data) =>
    createTask(data)
      .then(() => {
        reset()
        callback()
      })
      .catch((error) => {
        console.log(error)
      })

  return (
    <form
      className='p-1 rounded-lg bg-gray-800'
      onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Datos de la tarea</legend>

        <input
          type='text'
          className='w-full p-1 mt-4 bg-gray-600 rounded-md'
          placeholder='Titulo'
          {...register('title')}
        />
        <p className='text-red-600 mt-2'>{errors.title?.message}</p>
        <textarea
          autoComplete='off'
          className='w-full p-1 mt-4 bg-gray-600 rounded-md'
          placeholder='Descripción'
          {...register('description')}
        />
      </fieldset>

      <fieldset className='flex flex-col gap-2'>
        <legend>Definir pasos (opcional)</legend>

        {fields.map((step, index) => (
          <div
            key={step.id}
            className='flex gap-2 justify-center items-center'>
            <Controller
              name={`steps.${index}.label`}
              control={control}
              rules={{
                onBlur: (event) => {
                  if (!event.target.value) {
                    remove(index)
                  }
                }
              }}
              render={({ field: { value, name, ref, onBlur, onChange } }) => (
                <input
                  autoComplete='off'
                  className='p-2 m-1 w-full bg-gray-600 rounded-md'
                  onBlur={onBlur}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleStepAdd()
                    }
                  }}
                  {...{ name, value, ref, onChange }}
                />
              )}
            />

            <CrossButton onClick={() => remove(index)} />
          </div>
        ))}

        <PlusButton onClick={handleStepAdd} />
      </fieldset>

      <SubmitButton
        disabled={submitCount === 0 ? false : !isDirty || !isValid}
        label='Crear Tarea'
      />
    </form>
  )
}

export default FormTask
