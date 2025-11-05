import React from "react"
import "./styles/global.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login, Signup, Start } from "./pages"
import { Header } from "./components/common"

function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
