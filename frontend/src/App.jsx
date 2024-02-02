import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { TaskProvider } from './context/TaskContext'

import LoginPage from './pages/LoginPages'
import RegisterPage from './pages/RegisterPages'
import TaskPages from './pages/TaskPages'
import TaskFormPages from './pages/TaskFormPages'
import ProfilePages from './pages/ProfilePages'
import HomePages from './pages/HomePages'
import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar'

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar />
            <Routes>
              <Route path='/' element={<HomePages />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path='/tasks' element={<TaskPages />} />
                <Route path='/add-task' element={<TaskFormPages />} />
                <Route path='/tasks/:id' element={<TaskFormPages />} />
                <Route path='/profile' element={<ProfilePages />} />
              </Route>
              {/* <Route path='/profile' element={<h1>Profile</h1>} /> */}
            </Routes>

          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App