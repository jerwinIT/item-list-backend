import './App.css'
import { Navbar } from './components.jsx'
import { GetData } from './functions.jsx'

function App() {

  return (
    <>
      <div className="container p-3">
        <GetData></GetData>
      </div>
    </>
  )
}

export default App
