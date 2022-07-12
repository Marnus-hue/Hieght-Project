import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const User = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');

  // function to login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/auth', { name, email, height });
      console.log(data);
      toast.success(data.message);
      setName('');
      setHeight('');
      setEmail('');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center mt-60'
      >
        <input
          type='text'
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          placeholder='Please Enter Your Name'
          className='p-2 mt-4 border border-red-600 rounded-lg w-96'
        />
        <input
          type='email'
          value={email}
          required
          className='p-2 border border-red-600 rounded-lg w-96 mt-4'
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Please Enter Your Email'
        />
        <input
          type='number'
          value={height}
          required
          step='any'
          className='p-2 border border-red-600 rounded-lg w-96 mt-4'
          onChange={(e) => setHeight(e.target.value)}
          placeholder='Please Enter Your Height'
        />

        <button className='py-2 mt-4 font-bold text-center text-white bg-blue-600 border-2 border-indigo-400 rounded w-96 focus:outline-none'>
          Submit
        </button>
      </form>
    </>
  );
};

export default User;
