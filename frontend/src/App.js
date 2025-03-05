import { BrowserRouter, Routes, Route } from 'react-router-dom'

// PAGES
import AuthPage from './pages/AuthPage'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<AuthPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )

}

export default App