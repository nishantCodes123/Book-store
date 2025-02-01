import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import CreateBook from './pages/createBook'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook'
import ShowBooks from './pages/ShowBooks'
import Home from './pages/Home'
function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books/create' element={<CreateBook/>}/>
      <Route path='/books/details/:id' element={<ShowBooks/>}/>
      <Route path='/books/delete/:id' element={<DeleteBook/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
    </Routes>
    </>
  )
}

export default App
