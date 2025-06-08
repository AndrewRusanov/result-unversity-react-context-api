import { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../AuthProvider'

interface Props {
  children: ReactNode
}

const PrivateRoute: FC<Props> = ({ children }) => {
  const auth = useAuth()
  const location = useLocation()

  if (auth?.user === null) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />
  }

  return children
}

export default PrivateRoute
