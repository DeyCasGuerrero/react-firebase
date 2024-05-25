import Links from "./components/Links";
import SignUpForm from "./components/auth/SignUpForm";
import { background } from "./utils/defaultBg";
import { Routes, Route } from 'react-router-dom';
import RegisterForm from "./components/auth/RegisterForm";
import AuthProvider from "./Context/AuthContext";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoutes";
import Profile from "./components/profile";

function App() {
  return (
    <AuthProvider>
      <main className="flex flex-col min-h-screen items-center justify-center" style={{ background: `url(${background[0]}) 0% 0%`, imageRendering: 'pixelated', filter: 'brightness(90%)', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <>
                <NavBar />
                <Links />
              </>
            </ProtectedRoute>
          }>
          </Route>
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }>
          </Route>
          <Route path="/login" element={<SignUpForm />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>
        </Routes>
      </main>
    </AuthProvider>
  )
}

export default App