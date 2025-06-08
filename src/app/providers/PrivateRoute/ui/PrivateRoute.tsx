import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../AuthProvider'

interface Props {
  children: ReactNode
}

const PrivateRoute: FC<Props> = ({ children }) => {
  const auth = useAuth()

  if (auth?.user === null) {
    return <Navigate to='/login' />
  }

  return children
}

export default PrivateRoute
