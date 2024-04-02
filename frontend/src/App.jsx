import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import Signin from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import Book from './pages/Book'
import CreateMovie from './pages/CreateMovie'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/book' element={<Book />} />
          <Route path='/createMovie' element={<CreateMovie />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
