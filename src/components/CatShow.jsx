import React from 'react'
import { createClient } from '@supabase/supabase-js'
import { dataAtomOne } from '../atoms/dataAtomOne'
import { useRecoilValue } from 'recoil'
import { useRecoilState } from 'recoil'
import { dataAtomTwo } from '../atoms/dataAtomTwo'
import Age from '../Age/Age'




const CatShow = () => {
  const data = useRecoilValue(dataAtomOne);
  const [dataTwo, setDataTwo] = useRecoilState(dataAtomTwo);
  console.log(data)
 
  const handleClick=()=>{
    setDataTwo(
      {
        ...data,
        numberOfClicks:data.numberOfClicks+1
        
      }
    )
    console.log(dataTwo)
    

    // supabase
    // .from('catclicker')
    // .update({ numberOfClicks: data.numberOfClicks + 1 })
    // .eq('id', data.id)
    // .then(({ data, error }) => {
    //   console.log(data)
    // })

    
  }


   

  return (
    
    <div className='w-[550px] md:w-max  sm:ml-[30%] px-6 border-2 rounded-md border-gray-400'>
      <h1
      className='text-2xl font-bold text-center'
      >Cat Info</h1>
        <h1><span className='font-bold'>Name</span>:{data?data.catname:"Loading..."}</h1>
        <h1 className='w-max'><span className='font-bold'>Number Of Clicks:</span> {data?data.numberOfClicks:"Loading..."}</h1>
        <div
        className=' h-[200px] md:w-[300px] bg-gray-800 text-gray-100 p-2 transition-all duration-500 ease-in-out mt-1'
        onClick={handleClick}
        >

        <image src="/rj" className='w-max md:w-[400px] h-[200px]' alt="cat"
        
        
        />
        </div>
        <h1
        className='font-bold'
        >  Description</h1>
        <h1>{data.Description}</h1>
        <h1><span className='font-bold'>Age:</span>{Age(data.numberOfClicks)}</h1>
        <a href='https://www.google.com'>Google</a>

    </div>
  )
}

export default CatShow