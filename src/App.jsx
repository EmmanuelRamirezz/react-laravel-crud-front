
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//componentes
import ShowProducts from './components/ShowProducts'
import CreateProduct from './components/CreateProduct'
import EditProduct from './components/EditProduct'
import Error from './components/Error'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* No requiere un nav. Por eso no ocupa una Route padre */}
          <Route path='/' element={<ShowProducts/>}/>
          <Route path='/create' element={<CreateProduct/>}/>
          <Route path='/edit/:id' element={<EditProduct/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
