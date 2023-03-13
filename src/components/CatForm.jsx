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
    supabase.storage
      .from('catimages')
      .upload(`public/${formData.catname}.jpg`, file)
      
      .then((res) => {
        setFormData((prev) => ({ ...prev, imageReference:res.data?.Key }));
        console.log(res);
      }
      )
      .catch((err) => {
        console.log(err);
      }
      );
      supabase.from('catclicker').insert([
        {
          catname: formData.catname,
          catImageReference: formData.imageReference,
          Description: formData.description,
          numberOfClicks: 0,
        },
      ]).then((res) => {
        console.log(res);
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
    <div className='border-2 px-6 border-gray-500 ml-4 pt-4'>
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
        <input
          type='text'
          placeholder='Cat Name'
          className='w-[250px] border-2 rounded-lg border-gray-500 h-14'
          value={formData.catname}
          onChange={(e) =>
            setFormData({ ...formData, catname: e.target.value })
          }
        />
        <br />
        <h1>Image</h1>
        <input
          type='file'
          placeholder='Choose Image'
          className='w-[250PX]'
          onChange={
            (e) => {
            setFile(e.target.files[0])}
          }
        />
        <br />
        <input
          type='text'
          placeholder='Description'
          className='w-[250px] border-2 rounded-lg border-gray-400 h-14'
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
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
          className='bg-blue-500 mb-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CatForm;
