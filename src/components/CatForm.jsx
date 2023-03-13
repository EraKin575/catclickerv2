import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRecoilState } from 'recoil';
import { dataAtomOne } from '../atoms/dataAtomOne';

const supabaseUrl = 'https://tblreflntfstusictxrk.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibHJlZmxudGZzdHVzaWN0eHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgwOTc3NjcsImV4cCI6MTk5MzY3Mzc2N30.Z7qoRGapi2Pn4z_rVdg9cohZV3C7po3gdjo_SVGKOmc';
const supabase = createClient(supabaseUrl, supabaseKey);

const CatForm = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    catname: '',
    imageReference: '',
    description: '',
  });
  const [data, setData] = useRecoilState(dataAtomOne);

  const handleSubmit = () => {
    const {data,error}=supabase.storage
      .from('catimages')
      .upload(`public/${formData.catname}`, file[0]) 
      .then( 
        setFormData(
          {...formData,
           imageReference:`https://tblreflntfstusictxrk.supabase.co/storage/v1/object/public/catimages/public/${formData.catname}.${file[1]}` })       
      )
    
      supabase.from('catclicker').insert([
        {
          catname: formData.catname,
          catImageReference:`https://tblreflntfstusictxrk.supabase.co/storage/v1/object/public/catimages/public/${formData.catname}`,
          Description: formData.description,
          numberOfClicks: 0,
        },
      ]).then((res) => {
        console.log(formData)
      }
      )
      .catch((err) => {
        console.log(err);
      }
      );
      
      const recentRecordData =supabase
        .from('catclicker')
        .select('*')
        .eq('catname', formData.catname);
      setData(recentRecordData.data[0]);
  };

  const handleCancel = () => {
    setFormData({
      catname: '',
      imageReference: '',
      description: '',
    });
  };

  return (
    <div className='border-2 px-6 border-gray-500 pt-4 rounded-[10px] ml-[10%]'>
      <button
        className='bg-blue-500 mb-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => {
          setFormData({
            catname: '',
            imageReference: '',
            description: '',
          });
        }}
      >
        Open New Form
      </button>
      <div className='flex-col space-y-6 py-3'>
      <div class="relative">
    <input type="text" id={'asd'} className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-bg text-gray-900 bg-gray-50 dark:bg-gray-300 border-2 appearance-none dark:text-black dark:border-gray-600 focus:border-orange-300 peer" placeholder=" " value={formData.catname}
          onChange={(e) =>
            setFormData({ ...formData, catname: e.target.value })
          } />
    <label for={'asd'} className="absolute text- text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 bg-white px-1.5 origin-[0] left-2.5 peer-focus:text-blue-600 focus:bg-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 bg-transparent">
        <span className='text-red-500' ></span>
        Cat Name
   </label>
</div>
        <br />
        <h1>Image</h1>
        <input
          type='file'
          placeholder='Choose Image'
          className='w-[250PX]'
          onChange={
            (e) => {
            setFile([e.target.files[0],e.target.files[0].type])}
          }
        />
        <br />
        <div class="relative">
    <input type="text" id={"asd"} className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-bg text-gray-900 bg-gray-50 dark:bg-gray-200 border-2 appearance-none dark:text-black dark:border-gray-600 focus:border-orange-300 peer" placeholder=" " value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          } />
    <label for={"asd"} className="absolute text- text-gray-900 dark:text-gray-900 duration-300 transform -translate-y-4 scale-75 top-4 z-10 bg-white px-1.5 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">
        <span className='text-red-500'></span>
        Description
    </label>
</div>
      </div>
      <div className='flex space-x-4 mt-4'>
        <button
          onClick={handleSubmit}
          className='bg-blue-500 mb-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Submit
        </button>
        <button
          onClick={handleCancel}
          className='bg-red-500 mb-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Cancel
        </button> 
      </div>
    </div>
  );
};

export default CatForm;
