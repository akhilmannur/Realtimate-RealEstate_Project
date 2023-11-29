import React from 'react'
import HomeTop from '../Components/HomeTop'
import HomeListing from '../Components/HomeListing'
import About from './About'
import HomeAnime from '../Components/HomeAnime'

const Home = () => {
  return (
    <div>
        <HomeTop/>
        <About/>
        <HomeListing/>
        <HomeAnime/>
     
    </div>
  )
}

export default Home