import React from 'react'
import { createClient } from '@supabase/supabase-js'
import { dataAtomOne } from '../atoms/dataAtomOne'
import { useRecoilValue } from 'recoil'
import { useRecoilState } from 'recoil'
import { dataAtomTwo } from '../atoms/dataAtomTwo'

const supabaseUrl="https://tblreflntfstusictxrk.supabase.co"
const supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibHJlZmxudGZzdHVzaWN0eHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgwOTc3NjcsImV4cCI6MTk5MzY3Mzc2N30.Z7qoRGapi2Pn4z_rVdg9cohZV3C7po3gdjo_SVGKOmc"

const supabase = createClient(supabaseUrl, supabaseAnonKey);


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
    
    <div className='w-max ml-[30%] border-2 border-gray-400'>
        <h1>{data?data.catname:"Loading..."}</h1>
        <h1 className='w-max'>Number Of Clicks: {data?data.numberOfClicks:"Loading..."}</h1>
        <div
        className=' h-[300px] w-[300px] bg-gray-800 text-gray-100 p-2 transition-all duration-500 ease-in-out mt-1'
        onClick={handleClick}
        >

        <image src="/rj" className='w-[400px] h-[300px]' alt="cat"
        
        
        />
        </div>
        <h1>{data.Description}</h1>
        <h1></h1>
        <a href='https://www.google.com'>Google</a>

    </div>
  )
}

export default CatShow