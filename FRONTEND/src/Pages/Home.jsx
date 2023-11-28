import React from 'react'
import HomeTop from '../Components/HomeTop'
import HomeListing from '../Components/HomeListing'
import About from './About'

const Home = () => {
  return (
    <div>
        <HomeTop/>
        <About/>
        <HomeListing/>
        
    </div>
  )
}

export default Home