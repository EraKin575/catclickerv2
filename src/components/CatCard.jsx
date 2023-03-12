import React,{useState,useEffect} from "react";
import { createClient } from '@supabase/supabase-js';
import { dataAtomOne } from '../atoms/dataAtomOne';
import { useRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';

const supabaseUrl = 'https://tblreflntfstusictxrk.supabase.co';
const supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibHJlZmxudGZzdHVzaWN0eHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgwOTc3NjcsImV4cCI6MTk5MzY3Mzc2N30.Z7qoRGapi2Pn4z_rVdg9cohZV3C7po3gdjo_SVGKOmc"

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CatCard = ({cat}) => {
    const [data, setData] = useRecoilState(dataAtomOne);
    const [clicks, setClicks] = useState(cat.numberOfClicks);
    const handleClick=()=>{
        setClicks(clicks+1)
        setData(
            {
                ...cat,
                numberOfClicks:clicks
            }
        )
    }


    return (
        <div className="w-[200px] ">
            <h1>{cat.catname}</h1>
            <h1>{clicks}</h1>
            <div className="flex justify-between border-2 border-gray-500 py-3 w-full"
            onClick={
                handleClick
            }
            >
                <img src='/d' alt="cat"/>
            </div>
            <h1>{cat.description}</h1>
        </div>


    )
}

export default CatCard


    

