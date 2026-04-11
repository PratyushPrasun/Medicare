import React, { useEffect } from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { API_BASE as BASE_URL } from "../frontend/src/apiConfig";
const API_BASE = BASE_URL;

const VerifyServicePaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let cancelled = false;
        const VerifyPayment = async () => {
            const params = new URLSearchParams(location.search || "");
            const sessionId = params.get("session_id");
            if(location.pathname === '/service-appointment/cancel'){
                if(!cancelled)
                    navigate("/appointments?service_payment=Cancelled", { replace: true });
                return;
            }
            if(!sessionId){
                if(!cancelled)
                    navigate("/appointments?service_payment=Cancelled", { replace: true });
                return;
            }

            try {
                const res = await axios.get(`${API_BASE}/api/service-appointments/confirm` , {
                    params: { session_id: sessionId},
                    timeout: 15000,
                })

                if (cancelled) return;
                if (res?.data?.success){
                    navigate("/appointments?service_payment=paid", {replace:true,})
                }else{
                    navigate("/appointments?service_payment=Failed", {replace:true,})
                }
            } catch (error) {
                console.error("Srvice payment verification failed :" , error);
                if (cancelled)
                    navigate("/appointments?service_payment=Failed", {replace:true,})
            }
        };
        VerifyPayment();
        return()=>{
            cancelled = true;
        };
    }, [location, navigate]);
  return null
}

export default VerifyServicePaymentPage