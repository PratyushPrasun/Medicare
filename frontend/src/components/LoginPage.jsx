import React, { useState } from 'react'
import { loginPageStyles , toastStyles } from '../assets/dummyStyles';
import logo from '../assets/logo.png'
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {ArrowLeft, Eye, EyeOff, LocateFixed} from "lucide-react";
import { API_BASE as BASE_URL } from '../apiConfig';


const STORAGE_KEY = "doctorToken_v1";
const LoginPage = () => {
    const API_BASE = BASE_URL;
    const [formData, setFormData ]= useState({email:"", password:""});
    const [busy, setBusy] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((s) =>({
            ...s,
            [e.target.name] : e.target.value
        }))
    };

    const handleLogin = async (e) =>{
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error("All fields are required.",{
                style:toastStyles.errorToast
            });
            return;
        }

        setBusy(true);

        try {
            const res = await fetch(`${API_BASE}/api/doctors/login`, {
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body: JSON.stringify(formData)
            });

            const json = await res.json().catch(()=> null);
            
              if (!res.ok) {
        toast.error(json?.message || "Login failed", { duration: 4000 });
        setBusy(false);
        return;
      }
      const token = json?.token || json?.data?.token;
      if (!token) {
        toast.error("Authentication token missing");
        setBusy(false);
        return;
      }

      const doctorId =
        json?.data?._id || json?.doctor?._id || json?.data?.doctor?._id;
      if (!doctorId) {
        toast.error("Doctor ID missing from server response");
        setBusy(false);
        return;
      }

      localStorage.setItem(STORAGE_KEY, token);
      window.dispatchEvent(
        new StorageEvent("storage", { key: STORAGE_KEY, newValue: token }),
      );
      toast.success("Login successful — redirecting...", {
        style: toastStyles.successToast,
      });
      setTimeout(() => {
        navigate(`/doctor-admin/${doctorId}`);
      }, 700);
        }
    catch (err) {
      console.error("login error", err);
      toast.error("Network error during login");
    } finally{
        setBusy(false);
    }
    }
  return (
    <div className={loginPageStyles.mainContainer}>
        <Toaster position='top-right' reverseOrder={false}/>
        <button onClick={() => navigate("/")}
        className={loginPageStyles.backButton}>
            <ArrowLeft className={loginPageStyles.backButtonIcon}/>
            Back to Home.
        </button>
        <div className={loginPageStyles.loginCard}>
            <div className={loginPageStyles.logoContainer}>
                <img src={logo} alt='logo' className={loginPageStyles.logo}/>
            </div>

            <h2 className={loginPageStyles.title}>Doctor Admin</h2>
            <p className={loginPageStyles.subtitle}>
                Sign in to manage your profile and schedule.
            </p>

            <form onSubmit={handleLogin} className={loginPageStyles.form}>
                <input type='email' name='email' placeholder='Email Address'
                value={formData.email} onChange={handleChange} className={loginPageStyles.input} required/>
                <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    className={loginPageStyles.input}
    required
  />

  {/* 👁️ Eye Icon */}
  <button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>

                <button type="submit"
                disabled={busy}
                className={loginPageStyles.submitButton}>
                    {busy ? "Signing in..." : "Login"}
                </button>
            </form>
        </div>
    </div>
  )
}

export default LoginPage