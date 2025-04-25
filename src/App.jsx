import { useState } from 'react'
import Header from './components/Header'
import HeroSection from './view/Dashboard/components/HeroSection'
import FeatureSection from './view/Dashboard/components/FeatureSection'
import AppRouter from './config/routing/router'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <AppRouter />
    </>
  )
}

export default App
