import React,{useState} from 'react'
import { createClient } from '@supabase/supabase-js'
import { dataAtomOne } from '../atoms/dataAtomOne'
import { useRecoilValue } from 'recoil'
import { useRecoilState } from 'recoil'
import { dataAtomTwo } from '../atoms/dataAtomTwo'
import Age from '../Age/Age'
import { dataEdit } from '../atoms/dataEdit'


const supabaseUrl = 'https://tblreflntfstusictxrk.supabase.co';
const supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibHJlZmxudGZzdHVzaWN0eHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgwOTc3NjcsImV4cCI6MTk5MzY3Mzc2N30.Z7qoRGapi2Pn4z_rVdg9cohZV3C7po3gdjo_SVGKOmc"

const supabase = createClient(supabaseUrl, supabaseAnonKey);




const CatShow = () => {
  const data = useRecoilValue(dataAtomOne);
  const [file,setfile]=useState(null)
  const [catData, setCatData] = useState(data);
  const [dataTwo, setDataTwo] = useRecoilState(dataAtomTwo);
  const [toggle,setToggle]=useState(true)
  console.log(data)
  const handleToggle=()=>{
    setToggle(!toggle)
  }
 
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
  const handleSave=()=>{

    supabase.storage.from('catimages').upload('public/'+data.catname, file[0], {
      cacheControl: '3600',
      upsert: false,
    })
    .then(({ data, error }) => {
      console.log(data)
    })


    supabase
    .from('catclicker')
    .update({ catname: catData.catname,Description:catData.Description,
      catImageReference:`https://tblreflntfstusictxrk.supabase.co/storage/v1/object/public/catimages/public/${data.catname}`
     })
    .eq(
      'catname',data.catname

    )
    .then(({ data, error }) => {
      setToggle(!toggle)

      window.location.reload(false)

  }
  )
  }
  


   

  return (
    
    <div className='w-[550px] md:w-max  sm:ml-[30%] border-2 shadow-md  rounded-md border-gray-400'>
           
        

        {toggle?<img src={data?.catImageReference} className='w-max md:w-[400px] h-[250px]' onClick={handleClick} alt="cat"

        
        
        />:
        <input
        className='w-full border-2 border-gray-400 rounded-md p-2 mt-2'
        type="file"
        onChange={(e)=>setfile([e.target.files[0],e.target.files[0].type])}
        />
        

  }
       
      <h1
      className='text-3xl font-bold text-center '
      >Cat Info</h1>
       <div className='pl-6 space-y-3'>
        {toggle?<h1 className='text-4xl'>{data?data.catname:"Loading..."}</h1>:
        <input
        className='w-full border-2 border-gray-400 rounded-md p-2 mt-2'
        type="text"
        value={catData?catData.catname:data.catname}
        onChange={(e)=>setCatData({...catData,catname:e.target.value})}
        />}
      <h1
        className='font-bold'
        >  Description</h1>
        {toggle?<h1>{data.Description}</h1>:
        <input
        className='w-full border-2 border-gray-400 rounded-md p-2 mt-2'
        type="text"
        value={catData?catData.Description:data.Description}
        onChange={(e)=>setCatData({...catData,Description:e.target.value})}
        />}
        <h1 className='w-max'><span className='font-bold'>Number Of Clicks:</span> {data?data.numberOfClicks:"Loading..."}</h1>
        
        <h1><span className='font-bold'>Age:</span>{Age(data.numberOfClicks)}</h1>
        </div>
        {toggle?
          <button 
        className='bg-blue-500 text-white p-2 rounded-md mt-2 ml-5'
        onClick={handleToggle}
        >Edit Cat</button>:
        <button
        className='bg-blue-500 text-white p-2 rounded-md mt-2 ml-5'
        onClick={handleSave}
        >Save Cat</button>

}


    </div>
  )
}

export default CatShow