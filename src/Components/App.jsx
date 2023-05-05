import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import io from 'socket.io-client'
import Login from './Generics/Login-Register/Login'
import Register from './Generics/Login-Register/Register'
import Main from './Generics/Main-Page/Main'
import Upload from './Generics/Upload-Page/Upload'
import Profile from './Generics/Profile-Page/Profile'
import Search from './Generics/Search-Page/Search'
import Lists from './Generics/Lists/Lists'
import PostPage from './Generics/Post/PostPage/PostPage'
import GaleryPage from './Generics/Galery-Page/GaleryPage'
import GaleryView from './Generics/Galery-Page/GaleryView/GaleryView'
import { useContext, useEffect, useState } from 'react'
import UserState from '../Context/User/user.state'
import LoginContext from '../Context/User/user.context'

const socket = io('https://backendweb2-prueba-production.up.railway.app')

// function AppHeaderLogged() {

//   return (
//     <>
//       {/* <div className='Postproccess'></div> */}
//       <header>
//         <nav>
//           <ul>
//             <li><Link to="/home">Home</Link></li>
//           </ul>
//         </nav>
//         <input type="search" name="" id="" />
//       </header>
//     </>
//   )
// }

function AppHeaderLogin() {
  const { login, getLogin } = useContext(LoginContext)

  useEffect(() => {
    getLogin()
  }, [])

  const borrar = () => {
    console.log("intento de borrar")
    getLogin(false)
    sessionStorage.clear()
  }

  return (
    <>
      {/* <div className='Postproccess'></div> */}
      <header>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
          </ul>
          <ul>
            {
              login == false ? <li><Link to="/login">Login</Link></li> : <li><Link to="/login" onClick={() => borrar()}>Logout</Link></li>
            }
            <li><Link to="/register">Registro</Link></li>
          </ul>
        </nav>
      </header>
    </>
  )
}

function App() {
  return (
    <UserState>
      <AppHeaderLogin />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Main />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} >
          <Route path=':id' element={<Profile />}></Route>
        </Route>
        <Route path="/search" element={<Search />} >
          <Route path='posts/:idCat' element={<Search searchPosts={true} />}></Route>
          <Route path='users/:qry' element={<Search searchUser={true} />}></Route>
        </Route>
        <Route path="/lists" element={<Lists />} />
        <Route path="/post/:id" element={<PostPage />}></Route>
        <Route path="/galeries" element={<GaleryPage />}></Route>
        <Route path="/galeries/all" element={<GaleryPage allGaleries={true} />}></Route>
        <Route path="/user/:userid/galeries" element={<GaleryPage />}></Route>
        <Route path='/galery/:id' element={<GaleryView />}></Route>
      </Routes>
    </UserState>
  )
}

export default App
