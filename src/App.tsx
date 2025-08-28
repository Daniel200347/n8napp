
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {LoginPage} from '@/sections/auth/LoginPage'
import {RegistrationPage} from '@/sections/auth/RegistrationPage'
import {SettingsPage} from '@/pages/SettingsPage'
import {OverviewPage} from '@/pages/OverviewPage'
import {StatisticsPage} from '@/pages/StatisticsPage'
import {TemplatesPage} from '@/pages/TemplatesPage'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/overview" element={<OverviewPage/>}/>
                <Route path="/statistics" element={<StatisticsPage/>}/>
                <Route path="/templates" element={<TemplatesPage/>}/>
                <Route path="/settings" element={<SettingsPage/>}/>
                <Route path="/" element={<Navigate to="/settings" replace/>}/>
            </Routes>
        </Router>
    )
}

export default App
