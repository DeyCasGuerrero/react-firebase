import Links from "./components/Links";
import Lins from "./components/LinkForm";
import SignUpForm from "./components/auth/SignUpForm";
import { background } from "./utils/defaultBg";
import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import RegisterForm from "./components/auth/RegisterForm";

function App() {
  return (
    <main className="flex h-screen items-center justify-center" style={{ background: `url(${background[0]}) 0% 0%`, imageRendering: 'pixelated', filter: 'brightness(90%)', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Routes>
        <Route path="/" element={<Links/>}></Route>
        <Route path="/login" element={<SignUpForm />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
      </Routes>
    </main>
  )
}

export default App