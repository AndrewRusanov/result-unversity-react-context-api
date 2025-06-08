import { SignInFormData } from '@features/SignIn/ui/SignIn'
import { FormData } from '@features/SignUp/ui/SignUp'
import { FC, ReactNode, useState } from 'react'
import { AuthContext } from '../model/AuthContext'

interface Props {
  children: ReactNode
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<SignInFormData | null>(null)

  const signUp = (newUser: FormData, callback: () => void) => {
    localStorage.setItem(newUser.email, JSON.stringify(newUser))
    callback()
  }

  const signIn = (user: SignInFormData, callback: () => void) => {
    setUser(user)
    callback()
  }

  const signOut = (callback: () => void) => {
    setUser(null)
    callback()
  }

  const value = {
    user,
    signIn,
    signUp,
    signOut,
  }
  return <AuthContext value={value}>{children}</AuthContext>
}
