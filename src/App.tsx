import React from "react"
import "./styles/global.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {
    Login,
    Notifications,
    ReportDetail,
    Reports,
    Signup,
    Start,
} from "./pages"
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
                <Route path="/report/:id" element={<ReportDetail />} />
                <Route path="/notifications" element={<Notifications />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
