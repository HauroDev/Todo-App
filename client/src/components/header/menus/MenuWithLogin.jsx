import { useState } from 'react'
import { ChevronDown, ChevronUp } from './MenuIcons'
import AccessLinks from './AccessLinks'

const MovilMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='relative flex sm:hidden flex-col w-32'>
      <button
        className='w-full p-1 border-2 rounded-md active:text-gray-500 active:border-gray-500 hover:bg-gray-600 duration-200'
        onClick={() => setIsOpen((prev) => !prev)}>
        <span className='flex gap-2 justify-between'>
          Menu
          {!isOpen ? <ChevronDown /> : <ChevronUp />}
        </span>
      </button>
      {isOpen && (
        <div className='flex flex-col gap-y-1 absolute top-14 bg-gray-800 border-2 rounded-md p-2 w-full'>
          <AccessLinks />
        </div>
      )}
    </div>
  )
}

const MenuWithLogin = () => {
  return (
    <>
      <MovilMenu />
      <div className='hidden sm:flex flex-row gap-x-2'>
        <AccessLinks />
      </div>
    </>
  )
}

export default MenuWithLogin
