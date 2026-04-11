import React from 'react'
import Banner from '../components/Banner'
import Certification from '../components/Certification'
import HomeDoctors from '../components/HomeDoctors'
import Testimonial from '../components/Testimonial'
import Navbar from "../components/Navbar"
import Footer from '../components/Footer';
const Home = () => {
  return (
    <div>
      <Navbar/>
        <Banner/>
        <Certification/>
        <HomeDoctors/> 
        <Testimonial/>
        <Footer/>
    </div>
  )
}

export default Home