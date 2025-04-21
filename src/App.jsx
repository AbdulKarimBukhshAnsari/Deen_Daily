import { useState } from 'react'
import Header from './components/Header'
import HeroSection from './view/Dashboard/components/HeroSection'
import FeatureSection from './view/Dashboard/components/FeatureSection'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <HeroSection />
    <FeatureSection />
    </>
  )
}

export default App
