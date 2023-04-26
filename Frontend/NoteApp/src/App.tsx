import Signup from './pages/Signup/Signup'
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Signin from './pages/Login/Signin';
import Home from './pages/Home/Home';
import Create from './pages/Create/Create';
import DetailNote from './components/DetailNote/DetailNote';

function App() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
 
  return (
    <>
      <BrowserRouter>
      <Routes>
         <Route path='/' element={<Signup />}/>
         <Route path='/login' element={<Signin />}/>
         { Object.keys(user).length !== 0 ? (
          <>
         <Route path='/home' element={<Home />}/>
          <Route path='/create' element={<Create />}/>
          <Route path="/note/:id" element={<DetailNote />}/> 
          </>
          ) : 
             ( <Route path="*" element ={ <Navigate to="/login" />} />)}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
