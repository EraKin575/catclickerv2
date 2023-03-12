
import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { dataAtomOne } from '../atoms/dataAtomOne';
import { useRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { dataAtomTwo } from '../atoms/dataAtomTwo';

const supabaseUrl = 'https://tblreflntfstusictxrk.supabase.co';
const supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibHJlZmxudGZzdHVzaWN0eHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgwOTc3NjcsImV4cCI6MTk5MzY3Mzc2N30.Z7qoRGapi2Pn4z_rVdg9cohZV3C7po3gdjo_SVGKOmc"

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CatList = () => {
    const [data, setData] = useRecoilState(dataAtomOne);
    const dataTwo = useRecoilValue(dataAtomTwo);
    
    console.log(data)
    const [catList, setCatList] = React.useState([]);
  
    React.useEffect(() => {

      if(dataTwo){
        supabase.
        from('catclicker')         
        .update({ numberOfClicks: dataTwo.numberOfClicks })
        .eq('catname', dataTwo.catname)
        .then(({ data, error }) => {
            console.log(error)
            }
        )
      }
      supabase
        .from('catclicker')
        .select('*')
        .then(({ data, error }) => {
          setCatList(data);
        });
    }, [dataTwo]);
  
    const handleCatClick = (cat) => {
      setData(cat);
    };
  
    const catListItems = catList.map((cat) => {
      return (
        <div className="flex justify-between border-2 border-gray-500 py-3 w-full" onClick={() => handleCatClick(cat)}>
          <h1>{cat.catname}</h1>
          <h1
          className=''
          >{(data.catname===cat.catname)?data.numberOfClicks:cat.numberOfClicks}</h1>
        </div>
      );
    });
  
    return (
      <div className="w-1/2 relative">
        <button
          className="bg-gray-800 text-gray-100 rounded p-2 absolute top-0 left-0 z-10"
          onClick={() => {
            const menu = document.getElementById('menu');
            menu.style.left = menu.style.left === '-100%' ? '0' : '-100%';
          }}
        >
          Menu
        </button>
        <div
          id="menu"
          className="absolute top-0 left-0 w-1/2 bg-gray-800 text-gray-100 p-2 transition-all duration-500 ease-in-out  pt-12"
          style={{ left: '-100%' }}
        >
          {catListItems}
        </div>
      </div>
    );
  };

  
    export default CatList;