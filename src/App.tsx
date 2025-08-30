
import {HashRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {LoginPage} from '@/sections/auth/LoginPage'
import {RegistrationPage} from '@/sections/auth/RegistrationPage'
import {SettingsPage} from '@/pages/SettingsPage'
import {DashboardPage} from '@/pages/DashboardPage'
import {StatisticsPage} from '@/pages/StatisticsPage'
import {TemplatesPage} from '@/pages/TemplatesPage'

// Простая тестовая страница для проверки
const TestPage = () => (
  <div style={{ 
    padding: '20px', 
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <h1 style={{ color: '#333', marginBottom: '20px' }}>N8N App работает! 🎉</h1>
    <p style={{ color: '#666', marginBottom: '10px' }}>Страница входа загружается...</p>
    <div style={{ 
      backgroundColor: 'white', 
      padding: '30px', 
      borderRadius: '8px', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      minWidth: '300px'
    }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Вход в систему</h2>
      <form>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Email:
          </label>
          <input 
            type="email" 
            placeholder="Введите email"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Пароль:
          </label>
          <input 
            type="password" 
            placeholder="Введите пароль"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>
        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Войти
        </button>
      </form>
    </div>
  </div>
)

// Простая главная страница
const HomePage = () => (
  <div style={{ 
    padding: '20px', 
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <h1 style={{ color: '#333', marginBottom: '20px' }}>Добро пожаловать в N8N App! 🚀</h1>
    <p style={{ color: '#666', marginBottom: '30px', textAlign: 'center' }}>
      Это главная страница приложения. Выберите раздел для продолжения.
    </p>
    <div style={{ 
      display: 'flex', 
      gap: '15px', 
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}>
      <a 
        href="#/login"
        style={{
          padding: '12px 24px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '16px'
        }}
      >
        Войти
      </a>
      <a 
        href="#/registration"
        style={{
          padding: '12px 24px',
          backgroundColor: '#28a745',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '16px'
        }}
      >
        Регистрация
      </a>
      <a 
        href="#/templates"
        style={{
          padding: '12px 24px',
          backgroundColor: '#6c757d',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '16px'
        }}
      >
        Шаблоны
      </a>
    </div>
  </div>
)

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<TestPage/>}/>
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
