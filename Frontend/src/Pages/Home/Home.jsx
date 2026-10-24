import React from 'react'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Catagory from '../../Components/Catagory/Catagory'
import ShopByCraft from '../../Components/ShopByCraft/ShopByCraft'

const Home = () => {
  return (
    <div>
        <HeroSection/>
        <Catagory />
        <ShopByCraft />
    </div>
  )
}

export default Home