import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import CatShow from './components/CatShow'
import CatList from './components/CatList'
import { RecoilRoot } from 'recoil'
import CatGallery from './components/CatGallery'

function App() {
  const [count, setCount] = useState(0)

  return (
    <RecoilRoot>
    <div className="">
      <CatList/>
      <CatShow/>
      <CatGallery/>
    </div>

    </RecoilRoot>
  )
}

export default App
