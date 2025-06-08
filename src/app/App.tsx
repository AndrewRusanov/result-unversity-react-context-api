import { Category } from '@pages/Category'
import { Details } from '@pages/Details'
import { Home } from '@pages/Home'
import { Login } from '@pages/Login'
import { NotFound } from '@pages/NotFound'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './layout'
import { PrivateRoute } from './providers'

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route element={<MainLayout />}>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path='/characters'
            element={
              <PrivateRoute>
                <Category category='characters' />
              </PrivateRoute>
            }
          />
          <Route
            path='/characters/:id'
            element={
              <PrivateRoute>
                <Details category='characters' />
              </PrivateRoute>
            }
          />
          <Route
            path='/episodes'
            element={
              <PrivateRoute>
                <Category category='episodes' />
              </PrivateRoute>
            }
          />
          <Route
            path='/episodes/:id'
            element={
              <PrivateRoute>
                <Details category='episodes' />
              </PrivateRoute>
            }
          />
          <Route
            path='/locations'
            element={
              <PrivateRoute>
                <Category category='locations' />
              </PrivateRoute>
            }
          />
          <Route
            path='/locations/:id'
            element={
              <PrivateRoute>
                <Category category='locations' />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
