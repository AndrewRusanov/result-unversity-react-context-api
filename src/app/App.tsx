import { Category } from '@pages/Category'
import { Details } from '@pages/Details'
import { Home } from '@pages/Home'
import { Login } from '@pages/Login'
import { NotFound } from '@pages/NotFound'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './layout'

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route
            path='/characters'
            element={<Category category='characters' />}
          />
          <Route
            path='/characters/:id'
            element={<Details category='characters' />}
          />
          <Route path='/episodes' element={<Category category='episodes' />} />
          <Route
            path='/episodes/:id'
            element={<Details category='episodes' />}
          />
          <Route
            path='/locations'
            element={<Category category='locations' />}
          />
          <Route
            path='/locations/:id'
            element={<Details category='locations' />}
          />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
