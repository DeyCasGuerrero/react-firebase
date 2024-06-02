import Links from "./components/Links";
import { background } from "./utils/defaultBg";
import { Routes, Route } from 'react-router-dom';
import AuthProvider from "./Context/AuthContext";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute, {ProtectedRouteSignUp, ProtectedRoutesRegister} from "./components/protectedRoutes/ProtectedRoutes";
import Profile from "./components/profile";
import NotFound from "./components/NotFound";

function App() {
  return (
    <AuthProvider>
      <main className="flex min-h-screen overflow-hidden flex-col items-center justify-center p-8" style={{ background: `url(${background[0]}) 0% 0%`, imageRendering: 'pixelated', filter: 'brightness(90%)', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Routes>
          <Route path="*" element={<NotFound></NotFound>}></Route>
          
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

          <Route path="/login" element={<ProtectedRouteSignUp/>}></Route>
          <Route path="/register" element={<ProtectedRoutesRegister/>}></Route>

        </Routes>
      </main>
    </AuthProvider>
  )
}

export default App