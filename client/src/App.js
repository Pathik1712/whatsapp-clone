import { Navigate, Route, Routes, Outlet, useLocation } from "react-router-dom"
import { get_session } from "./func/use_session.js"
import Home from "./components/home/Home"
import Chats from "./components/chats/Chats"
import Log_main from "./components/log/components/Log_main"
import Log_forg from "./components/log/components/Log_forg"
import Log_signup from "./components/log/components/Log_signup"
import { useEffect, useState } from "react"

function App() {
  console.log(typeof process.env.REACT_APP_URL, process.env.REACT_APP_URL)
  const navigate = useLocation(),
    [trigger, set_trigger] = useState(true)

  useEffect(() => {
    if (
      navigate.pathname.includes("/login") ||
      navigate.pathname === "/home/chats"
    ) {
      set_trigger(!trigger)
    }
  }, [navigate])
  return (
    <Routes>
      <Route
        path='/'
        element={<Navigate to={"/login"} />}
      />
      <Route
        path='/home/*'
        element={
          get_session("auth_token") ? <Home /> : <Navigate to={"/login"} />
        }
      />
      <Route
        path='/login/*'
        element={
          get_session("auth_token") ? (
            <Navigate to={"/home/chats"} />
          ) : (
            <Outlet />
          )
        }
      >
        <Route
          index
          element={<Log_main />}
        />
        <Route
          path='forgotpassword'
          element={<Log_forg />}
        />
        <Route
          path='signup'
          element={<Log_signup />}
        />
      </Route>
    </Routes>
  )
}

export default App
