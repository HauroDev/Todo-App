import { useDispatch, useSelector } from 'react-redux'

export const useUserDispatch = useDispatch
export const useUserSelector = () => useSelector((state) => state.user)

export const useTaskDispatch = useDispatch
export const useTaskSelector = () => useSelector((state) => state.task)
