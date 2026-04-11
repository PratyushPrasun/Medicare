import React from 'react'
import DoctorsPage from '../components/DoctorsPage'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
const Doctors = () => {
  return (
    <div>
      <Navbar/>
        <DoctorsPage/>
        <Footer/>
    </div>
  )
}

export default Doctors