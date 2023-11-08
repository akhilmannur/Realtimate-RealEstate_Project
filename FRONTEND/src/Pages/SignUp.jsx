import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const SignUp = () => {
  return (
    <div className='bg-white p-10 max-w-md mx-auto border shadow-lg mt-10 ' >
      <h1 className='text-3xl text-center font-bold p-5 uppercase'>Sign up</h1>
      <form className='flex flex-col gap-4'>
        <input type='text' className='border p-2' id='name' placeholder='Full Name' />
        <input type='email' className='border p-2' id='email' placeholder='Email Id' />
        <input type='text' className='border p-2' id='username' placeholder='Username' />
        <input type='password' className='border p-2' id='password' placeholder='Password' />
        <button className='bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-80'>Sign up</button>
        <button className='bg-blue-500 text-white p-3 rounded-lg flex justify-center items-center uppercase hover:opacity-75 disabled:opacity-80'>
          <span className='pr-2'>
            <FaGoogle size={24} />
          </span>
          Continue with Google
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Already Had Account?</p>
        <span className='text-blue-800'>clickhere</span>
      </div>
    </div>
  );
};

export default SignUp;

