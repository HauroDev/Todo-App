import { useState } from 'react'

const FieldsUserData = ({ label, state, field, setState, updateFunction }) => {
  const [isEdit, setIsEdit] = useState(false)

  const changeState = ({ target: { name, value } }) => {
    setState((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <p className='mb-1 mt-2'>{label}</p>
      <div
        className='w-[40ch] border-2 rounded-lg'
        onTouchStart={() => setIsEdit(true)}
        onDoubleClick={() => setIsEdit(true)}>
        {!isEdit && <p className='p-2 font-bold'>{state}</p>}
        {isEdit && (
          <input
            type='text'
            name={field}
            className='p-2 w-full bg-transparent'
            value={state}
            onChange={changeState}
            onBlur={(event) => {
              setIsEdit(false)
              updateFunction(event)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                updateFunction(event)
              }
            }}
          />
        )}
      </div>
    </>
  )
}

export default FieldsUserData
