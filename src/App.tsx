
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import {RegistrationPage} from '@/sections/auth/RegistrationPage'
import {LoginPage} from '@/sections/auth/LoginPage'
import {SettingsPage} from '@/pages/SettingsPage'
import {DashboardPage} from '@/pages/DashboardPage'
import {StatisticsPage} from '@/pages/StatisticsPage'
import {TemplatesPage} from '@/pages/TemplatesPage'

// Простая главная страница
const HomePage = () => (
    <LoginPage/>
)

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/dashboard" element={<DashboardPage/>}/>
                <Route path="/statistics" element={<StatisticsPage/>}/>
                <Route path="/templates" element={<TemplatesPage/>}/>
                <Route path="/settings" element={<SettingsPage/>}/>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </Router>
    )
}

export default App
