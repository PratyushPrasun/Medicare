import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import { Route, Routes, useLocation  } from "react-router-dom";
import Doctors from './pages/Doctors';
import DoctorDetails from './pages/DoctorDetails';
import Service from './pages/Service';
import ServiceDetail from './pages/ServiceDetail';
import ContactPage from './pages/Contactpage';
import Login from './pages/Login';
import DHome from './pages/DHome';
import List from './doctor/List';
import Editprofile from './pages/Editprofile';
import Appointments from './pages/Appointments';
import VerifyPaymentPage from '../VerifyPaymentPage';
import VerifyServicePaymentPage from '../VerifyServicePaymentPage';
import { CircleChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const {pathname} = useLocation();
  
  useEffect(() => {
    window.scrollTo(0,0);
    document.body.scrollTop = 0;
    document.body.scrollTop = 0;
  },[pathname]);
  return null;
}

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollTop}
      className={`fixed right-4 bottom-6 z-50 w-11 h-11 rounded-full flex items-center justify-center 
      bg-emerald-600 text-white shadow-lg transition-all duration-300 
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} 
      hover:scale-110 hover:shadow-xl`}
      title="Go to top"
    >
      <CircleChevronUp size={22} />
    </button>
  );
};
const App = () => {

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
      document.documentElement.style.overflowX = "auto";
    };
  }, []);
  return (
    <>
    <ScrollToTop/>
    <div className='overflow-x-hidden bg-white text-gray-900'>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/doctors' element={<Doctors/>}></Route>
        <Route path='/doctors/:id' element={<DoctorDetails/>}></Route>
        <Route path='/services' element={<Service/>}></Route>
        <Route path='/services/:id' element={<ServiceDetail/>}></Route>
        <Route path='/appointments' element={<Appointments/>}></Route>
        <Route path='/contact' element={<ContactPage/>}></Route>
        <Route path='/doctor-admin/login' element={<Login/>}></Route>
        <Route path='/doctor-admin/:id' element={<DHome/>}></Route>
        <Route path='/doctor-admin/:id/appointments' element={<List/>}></Route>
        <Route path='/doctor-admin/:id/profile/edit' element={<Editprofile/>}></Route>
        <Route path='/appointment/success' element={<VerifyPaymentPage/>}></Route>
        <Route path='/appointment/cancel' element={<VerifyPaymentPage/>}></Route>
        <Route path='/service-appointment/success' element={<VerifyServicePaymentPage/>}></Route>
        <Route path='/service-appointment/cancel' element={<VerifyServicePaymentPage/>}></Route>
      </Routes>
    </div>
    <ScrollButton/>
    </>
  )
}

export default App