import { SignInFormData } from '@features/SignIn/ui/SignIn'
import { createContext } from 'react'

interface AuthContext {
  user: SignInFormData | null
  signIn: (user: SignInFormData, callback: () => void) => void
  signUp: (newUser: FormData, callback: () => void) => void
  signOut: (callback: () => void) => void
}

export const AuthContext = createContext<AuthContext | null>(null)
