import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import RegisterPage from "./pages/RegisterPage"
import LogIn from "./pages/LogIn"
import HomePage from "./pages/HomePage"
import { createContext, useEffect, useState } from "react"
import axios from "axios"
import CreatePost from "./pages/CreatePost"
import PostPage from "./pages/PostPage"
import EditPost from "./pages/EditPostPage"

export const userContext = createContext()
function App() {

  const [user, setUser] = useState({})

  axios.defaults.withCredentials = true
  useEffect(() => {

    const getValue = async () => {
      const user = await axios.get('http://localhost:5000/')
      setUser(user.data)

    }
    getValue()

  }, [])

  return (
    <>
      <userContext.Provider value={user}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/editpost/:id" element={<EditPost />} />
        </Routes>
      </userContext.Provider>
    </>
  )
}

export default App
