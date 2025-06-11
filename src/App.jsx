import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import Header from './components/Header'
import AppRouter from './config/routing/router'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <AppRouter />
    {/* To show the temporary msg to the user  */}
    <Toaster position="bottom-right" />
    </>
  )
}

export default App
