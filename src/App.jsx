import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import CatShow from './components/CatShow'
import CatList from './components/CatList'
import { RecoilRoot } from 'recoil'
import CatGallery from './components/CatGallery'
import CatForm from './components/CatForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <RecoilRoot>
    <div className="">
      <h1
        className='text-4xl text-center font-bold pt-3 pb-[30px]'
      >
        CatClicker
      </h1>
      <CatList/>
      <div className='flex flex-wrap'>
      <CatShow/>
      <CatForm/>
      </div>
      <CatGallery/>
    </div>

    </RecoilRoot>
  )
}

export default App
