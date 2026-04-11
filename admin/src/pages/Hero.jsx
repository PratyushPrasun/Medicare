import React from 'react'
import Navbar from '../components/Navbar'
import { heroStyles } from '../assets/dummyStyles.js'
import logoImg from "../assets/logo.png";
const Hero = ({role = "admin", username = "Doctor"}) => {

  const isDoctor = role == "doctor";
  return (
    <div className={heroStyles.container}>
        <Navbar/>
        <main className={heroStyles.mainContainer}>
          <section className={heroStyles.section}>
            <div className={heroStyles.decorativeBg.container}>
              <div className={heroStyles.decorativeBg.blurBackground}>
                <div className={heroStyles.decorativeBg.blurShape}></div>
              </div>
              <div className={heroStyles.contentBox}>
                <div className={heroStyles.logoContainer}>
                  <img src={logoImg} alt='logo' className={heroStyles.logo}/>
                </div>
                <h1 className={heroStyles.heading}>
                  {isDoctor? `Welcome, Dr. ${username}`: "Welcome to Medicare Admin Pannel."}
                </h1>
                <p className={heroStyles.description}>
                  {isDoctor 
 ? "Access your patient records, manage appointments, and review medical reports securely from your dashboard."
 : "Manage hospital operations, doctors, staff, patient records, and system settings from a centralized control panel."}
                </p>
                <div className={heroStyles.infoCards.container}>
                  <div className={heroStyles.infoCards.card}>
                    <h3 className={heroStyles.infoCards.cardTitle}>
                      Secure Access
                    </h3>
                    <p className={heroStyles.infoCards.cardText}>
                      Role-based login with protected medical data.
                    </p>
                  </div>
                  <div className={heroStyles.infoCards.card}>
                    <h3 className={heroStyles.infoCards.cardTitle}>
                      Real-time management
                    </h3>
                    <p className={heroStyles.infoCards.cardText}>
                      Monitor hospital activity and patient flow.
                    </p>
                  </div>
                  <div className={heroStyles.infoCards.card}>
                    <h3 className={heroStyles.infoCards.cardTitle}>
                      Medical Dashboard
                    </h3>
                    <p className={heroStyles.infoCards.cardText}>
                      Clean, Fast and Doctor-friendly interface.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
    </div>
  )
}

export default Hero