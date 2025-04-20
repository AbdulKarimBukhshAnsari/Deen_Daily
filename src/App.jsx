import { useState } from 'react'
import Header from './components/Header'
import HeroSection from './view/Dashboard/components/HeroSection'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <HeroSection />
    </>
  )
}

export default App
