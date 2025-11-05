import React from "react"
import "./styles/global.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login, Reports, Signup, Start } from "./pages"
import { Header } from "./components/common"

function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reports" element={<Reports />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
