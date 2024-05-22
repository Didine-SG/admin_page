import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="bg-gray-200 min-h-screen"> {/* Set the background color here */}
      <App />
    </div>
  </React.StrictMode>,
)
