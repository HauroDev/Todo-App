import { useForm, useFieldArray, Controller } from 'react-hook-form' // Añade useFieldArray
import { zodResolver } from '@hookform/resolvers/zod'

import { taskSchema } from './schema'

import { useUserSelector } from '../../../hooks/store'
import { useTaskActions } from '../../../hooks/useTaskActions'

import XMark from './CrossMark'
import PlusMark from './PlusMark'
import useModal from '../../../hooks/useModal'

const CreateTask = () => {
  const {
    dataUser: { id_user: idUser }
  } = useUserSelector()

  const { createTask } = useTaskActions()
  const { ModalContainer, toggleModal } = useModal()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, submitCount },
    control
  } = useForm({
    defaultValues: {
      status: 'pending',
      title: '',
      description: '',
      steps: [],
      id_user: idUser
    },
    mode: 'onChange',
    resolver: zodResolver(taskSchema)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps'
  })

  const isDisabled = () => {
    if (submitCount === 0) return false

    return !isValid || !isDirty
  }
  const handleStepAdd = () => append({ label: '' })
  const onSubmit = (data) => createTask(data)

  return (
    <>
      <ModalContainer>
        <form
          className='p-2 rounded-lg bg-gray-800'
          onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Datos de la tarea</legend>
            <label htmlFor='title'>Título</label>
            <input
              className='w-full text-black'
              placeholder='actividad, obligacion o meta...'
              {...register('title', { required: true })}
            />
            <div
              className={`w-full pt-1 ${
                errors.title ? 'h-5' : 'h-0'
              } text-orange-600  mb-1 transform duration-200`}>
              <p>{errors.title?.message}</p>
            </div>
            <label htmlFor='description'>Descripcion (opcional)</label>
            <textarea
              className='w-full text-black'
              placeholder='descripcion de la tarea...'
              {...register('description')}
            />
          </fieldset>

          <fieldset className='flex flex-col gap-2'>
            <legend>Definir pasos (opcional)</legend>

            {fields.map((step, index) => (
              <div
                key={step.id}
                className='flex gap-2'>
                <Controller
                  name={`steps.${index}.label`}
                  control={control}
                  render={({
                    field: { onChange, value, name, ref, onBlur }
                  }) => (
                    <input
                      {...{ name, value, onChange, ref }}
                      className='text-black'
                      onBlur={(event) => {
                        if (!event.target.value) remove(index)
                        onBlur(event)
                      }}
                      onKeyDown={(event) => {
                        if (event.key.toLocaleLowerCase() === 'enter') {
                          handleStepAdd()
                        }
                      }}
                    />
                  )}
                />
                <button
                  type='button'
                  className='block w-fit bg-gray-700 rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-500 duration-200'
                  onClick={() => remove(index)}>
                  <XMark />
                </button>
              </div>
            ))}
            <button
              type='button'
              className='block w-fit bg-gray-700 rounded p-2 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-500 duration-200'
              onClick={handleStepAdd}>
              <PlusMark />
            </button>
          </fieldset>

          <button
            type='submit'
            disabled={isDisabled()}
            className='mt-2 block w-full bg-gray-800 rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-500 duration-200 disabled:bg-gray-400 disabled:hover:border-b-gray-950 disabled:active:text-red-400'>
            Crear Tarea
          </button>
        </form>

        <button
          className='mt-2 block w-full bg-gray-800 rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-500 duration-200 disabled:bg-gray-400 disabled:hover:border-b-gray-950 disabled:active:text-red-400'
          onClick={toggleModal}>
          Cerrar
        </button>
      </ModalContainer>
      <button
        className='mt-2 block w-full bg-gray-800 rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-500 duration-200 disabled:bg-gray-400 disabled:hover:border-b-gray-950 disabled:active:text-red-400'
        onClick={toggleModal}>
        Crear Tarea
      </button>
    </>
  )
}

export default CreateTask
