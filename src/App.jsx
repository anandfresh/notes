import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Edit from './components/Edit'
import Main from './components/Main'




function App() {
  return (

    <div className='wrapper d-flex'>
   <BrowserRouter>
    <Routes>
     
     <Route path='/sidebar' element={<Sidebar/>}/>
     <Route path='/edit/:id' element={ <> <Sidebar/> <Edit/> </>}/>
     <Route path='/' element={ <><Sidebar/> <Main/> </>}/>
     <Route path='*' element={<Main/>}/>

     
    </Routes>
   </BrowserRouter>
   </div>
  )
}

export default App