import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from './MenuIcons'
import AccessLinks from './AccessLinks'
import { useLocation } from 'react-router-dom'
import ButtonStyled from '../../buttons/ButtonStyled'

const MovilMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { pathname } = useLocation()

  const toggleOpen = () => setIsOpen(!isOpen)

  useEffect(() => {
    return () => setIsOpen(false)
  }, [pathname])

  return (
    <div className='relative flex sm:hidden flex-col w-32'>
      <ButtonStyled onClick={toggleOpen}>
        <span className='flex justify-between'>
          Menu
          {!isOpen ? <ChevronDown /> : <ChevronUp />}
        </span>
      </ButtonStyled>
      {isOpen && (
        <div className='flex flex-col gap-y-1 absolute top-[3.2rem] bg-gray-800 border-2 rounded-md p-2 w-full'>
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
