import React from 'react'
import { createClient } from '@supabase/supabase-js';
import CatCard from './CatCard';


const supabaseUrl = 'https://tblreflntfstusictxrk.supabase.co';
const supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibHJlZmxudGZzdHVzaWN0eHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgwOTc3NjcsImV4cCI6MTk5MzY3Mzc2N30.Z7qoRGapi2Pn4z_rVdg9cohZV3C7po3gdjo_SVGKOmc"

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const CatGallery = () => {
    const [cats, setCats] = React.useState([]);

    React.useEffect(() => {
        supabase
        .from('catclicker')
        .select('*')
        .then(({ data, error }) => {
            setCats(data);
        })
    }, [])
    console.log(cats);

    const catData=cats.map((cat)=>{
        return(
            <CatCard
            cat={cat}
            />
        )
    })



  return (
    <div>
        <h1
        className='text-4xl text-center font-bold'
        >Cat Gallery</h1>
    
    <div className='grid grid-cols-5 grid-flow-row '>
        {catData}


    </div>
    </div>
  )
}

export default CatGallery