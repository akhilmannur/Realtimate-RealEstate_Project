import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Contact = ({listing}) => {

    const [owner,setOwner] = useState(null);
    const [message, setMessage] = useState('');
    const onChange = (e) => {
      setMessage(e.target.value);
    };

    const { currentuser } = useSelector((state) => state.user);

    
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await axios.get(`/api/user/${listing?.userRef}`,{
            
                headers: {
                  Authorization: `${currentuser?.data}`,
                },
              }
        );
        const data = await res.data;
        setOwner(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <div>
         {owner && (
        <div className='flex flex-col gap-2 w-[20rem] sm:[40rem]'>
          <p>
            Contact <span className='font-semibold'>{owner?.rest?.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <Link
          to={`mailto:${owner?.rest?.email}?subject=Regarding ${listing.name}&body=${message}`}
          className='bg-black text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message          
          </Link>
        </div>
      )}

    </div>
  )
}

export default Contact