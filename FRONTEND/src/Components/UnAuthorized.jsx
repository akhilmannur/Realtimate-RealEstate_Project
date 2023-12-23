import React,{ useEffect } from 'react'
import { useRef } from 'react'
import lottie from 'lottie-web'
import unauthorised from '../assets/Animation - 1703240783292.json'
import { useNavigate } from 'react-router-dom'


const UnAuthorized = () => {
    const lottieContainer = useRef(null);
    const navigate=useNavigate();
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: lottieContainer.current, // Reference to the container element
      animationData: unauthorised, // Your animation JSON data
      loop: true, // Set to true if you want the animation to loop
      autoplay: true, // Set to true if you want the animation to play immediately
    });

    // Optionally, you can control the animation using the animation object:
    // animation.play(); // Play the animation
    // animation.pause(); // Pause the animation
    // animation.stop(); // Stop the animation
    animation.setSpeed(0.9); // Adjust the animation speed

    // Clean up the animation when the component unmounts
    return () => {
      animation.destroy();
    };
  }, []);
  return (
    <div className=' mx-auto sm:w-[30rem] w-[20rem] mt-20'>
    <div className="text-center ">
      <div ref={lottieContainer}></div>
      <h1 className='font-bold text-3xl m-3 cursor-pointer'>please Login again<span className='mx-2 text-blue-800' onClick={()=>{navigate('/sign-in')}}>Login</span></h1>
    </div>
  </div>
  )
}

export default UnAuthorized