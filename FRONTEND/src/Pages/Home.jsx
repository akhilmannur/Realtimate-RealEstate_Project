import React from 'react'
import HomeTop from '../Components/HomeTop'
import HomeListing from '../Components/HomeListing'
import About from './About'
import HomeAnime from '../Components/HomeAnime'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

const Home = ( {socket}) => {
  return (
    <div>
      <Header scoket={socket}/>
        <HomeTop/>
        <About/>
        <HomeListing/>
        <HomeAnime/>
        <Footer/>
     
    </div>
  )
}

export default Home