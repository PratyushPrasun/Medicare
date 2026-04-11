import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {navbarStyles as ns} from '../assets/dummyStyles.js'
import logoImg from "../assets/logo.png"
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import {Calendar, Grid, Home, List, LogIn, LogOut, Menu, PlusSquare, UserPlus, Users, X} from "lucide-react";
import {SignedIn, SignedOut, SignInButton, useAuth, useClerk, useUser} from "@clerk/clerk-react";
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navInnerRef = useRef(null);
    const indicatorRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const clerk = useClerk();
    const {getToken, isLoaded: authLoaded} = useAuth();
    const {isSignedIn, user, isLoaded:userLoaded} = useUser();


      const moveIndicator = useCallback(() => {
    const container = navInnerRef.current;
    const ind = indicatorRef.current;
    if (!container || !ind) return;

    const active = container.querySelector(".nav-item.active");
    if (!active) {
      ind.style.opacity = "0";
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    const left = activeRect.left - containerRect.left + container.scrollLeft;
    const width = activeRect.width;

    ind.style.transform = `translateX(${left}px)`;
    ind.style.width = `${width}px`;
    ind.style.opacity = "1";
  }, []);

  useLayoutEffect(() => {
    moveIndicator();
    const t = setTimeout(() => {
      moveIndicator();
    }, 120);
    return () => clearTimeout(t);
  }, [location.pathname, moveIndicator]);

  useEffect(() => {
    const container = navInnerRef.current;
    if (!container) return;

    const onScroll = () => {
      moveIndicator();
    };
    container.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => {
      moveIndicator();
    });
    ro.observe(container);
    if (container.parentElement) ro.observe(container.parentElement);

    window.addEventListener("resize", moveIndicator);

    moveIndicator();

    return () => {
      container.removeEventListener("scroll", onScroll);
      ro.disconnect();
      window.removeEventListener("resize", moveIndicator);
    };
  }, [moveIndicator]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() =>{
    let mounted = true;
    const storetoken = async ()=>{
      if(!authLoaded || !userLoaded) return ;
      if (!isSignedIn) {
        try {
          localStorage.removeItem("clerk_token")
        } catch (e) {
          //ignore any error
          console.error(e);
        }
        return;
      } 
      try {
        if(getToken){
          const token =await getToken();
          if(!mounted) return;
          if(token) {
            try {
              localStorage.setItem("clerk_token", token);
            } catch (error) {
              console.warn("Failed to write clerk token in the localStorage", error);
            }
          }
        }
      } catch (error) {
        console.warn("Couldnot retrive the token", error)
      }
    }

    storetoken();
    return ()=>{
      mounted = false;
    };
  }, [isSignedIn,authLoaded, userLoaded, getToken]);

const handleOpenSignin = () => {
  if (!clerk) {
    console.warn("Clerk is not available");
    return;
  }
  // ✅ Correct way to open sign-in modal
  clerk.openSignIn({ afterSignInUrl: "/h" });
};

const handleSignout = async () => {
  try {
    await clerk.signOut();
    localStorage.removeItem("clerk_token");
    navigate("/");
  } catch (error) {
    console.error("Sign out failed", error);
  }
};
  return (
    <header className={ns.header}>
        <nav className={ns.navContainer}>
            <div className={ns.flexContainer}>
                <div className={ns.logoContainer}>
                    <img src={logoImg} alt='logo' className={ns.logoImage}/>
                    <Link to='/'>
                    <div className={ns.logoLink}>Medicare</div>
                    </Link>
                </div>

                <div className={ns.centerNavContainer}>
                    <div className={ns.glowEffect}>
                        <div className={ns.centerNavInner}>
                            <div ref={navInnerRef} tabIndex={0} className={ns.centerNavScrollContainer} style={{
                                WebkitOverflowScrolling: "touch"
                            }}>
                <CenterNavItem
                    to="/h"
                    label="Dashboard"
                    icon={<Home size={16} />}
                  />
                  <CenterNavItem
                    to="/add"
                    label="Add Doctor"
                    icon={<UserPlus size={16} />}
                  />
                  <CenterNavItem
                    to="/list"
                    label="List Doctors"
                    icon={<Users size={16} />}
                  />
                  <CenterNavItem
                    to="/appointments"
                    label="Appointments"
                    icon={<Calendar size={16} />}
                  />
                  <CenterNavItem
                    to="/service-dashboard"
                    label="Service Dashboard"
                    icon={<Grid size={16} />}
                  />
                  <CenterNavItem
                    to="/add-service"
                    label="Add Service"
                    icon={<PlusSquare size={16} />}
                  />
                  <CenterNavItem
                    to="/list-service"
                    label="List Services"
                    icon={<List size={16} />}
                  />
                  <CenterNavItem
                    to="/service-appointments"
                    label="Service Appointments"
                    icon={<Calendar size={16} />}
                  />
                            </div>
                        </div>
                    </div>
                </div>

<div className={ns.rightContainer}>
  <SignedIn>
    <button onClick={handleSignout} className={ns.signOutButton + " " + ns.cursorPointer}>
      Sign out
    </button>
  </SignedIn>
  <SignedOut>
    <div className='hidden lg:flex items-center gap-2'>
      <SignInButton mode="modal" forceRedirectUrl="/h">
        <button className={ns.loginButton + " " + ns.cursorPointer}>
          Login
        </button>
      </SignInButton>
    </div>
  </SignedOut>
  <button className={ns.mobileMenuButton} onClick={()=>setOpen((v) => !v)}  >
    {open ? <X size={18}/> :<Menu size={18}/>}
  </button>
</div>
            </div>
            {open && (
              <div className={ns.mobileOverlay} onClick={() => setOpen(false)}/>
            )}
            {open && (
              <div className={ns.mobileMenuContainer} id="mobile-menu">
                <div className={ns.mobileMenuInner}>
              <MobileItem
                to="/h"
                label="Dashboard"
                icon={<Home size={16} />}
                onClick={() => setOpen(false)}
              />

              <MobileItem
                to="/add"
                label="Add Doctor"
                icon={<UserPlus size={16} />}
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/list"
                label="List Doctors"
                icon={<Users size={16} />}
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/appointments"
                label="Appointments"
                icon={<Calendar size={16} />}
                onClick={() => setOpen(false)}
              />

              <MobileItem
                to="/service-dashboard"
                label="Service Dashboard"
                icon={<Grid size={16} />}
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/add-service"
                label="Add Service"
                icon={<PlusSquare size={16} />}
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/list-service"
                label="List Services"
                icon={<List size={16} />}
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/service-appointments"
                label="Service Appointments"
                icon={<Calendar size={16} />}
                onClick={() => setOpen(false)}
              />
              <SignedIn>
  <button
    onClick={handleSignout}
    className="flex items-center gap-2 w-full px-4 py-3 rounded-lg font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
  >
    <span><LogOut size={16} /></span>
    <span className="font-medium">Sign Out</span>
  </button>
</SignedIn>
<SignedOut>
  <SignInButton mode="modal" forceRedirectUrl="/h">
    <button
      onClick={() => setOpen(false)}
      className="flex items-center gap-2 w-full px-4 py-3 rounded-lg font-medium text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-all duration-200"
    >
      <span><LogIn size={16} /></span>
      <span className="font-medium">Login</span>
    </button>
  </SignInButton>
</SignedOut>
            </div>
              </div>
            )}
        </nav>
    </header>
  )
}

export default Navbar

function CenterNavItem({to, icon, label}) {
    return (
        <NavLink
        to={to}
        end
        className={({isActive}) => 
        `nav-items ${isActive ? "active" : ""} ${ns.centerNavItemBase} ${isActive? ns.centerNavItemActive : ns.centerNavItemInactive}`
        }
        >
            <span>{icon}</span>
            <span className='font-medium'>{label}</span>
        </NavLink>
    )
}
function MobileItem({to, icon, label}) {
    return (
        <NavLink
        to={to}
        end
        className={({isActive}) => 
        `nav-items ${isActive ? "active" : ""} ${ns.mobileItemBase} ${isActive? ns.mobileItemActive : ns.mobileItemInactive}`
        }
        >
            <span>{icon}</span>
            <span className='font-medium'>{label}</span>
        </NavLink>
    )
}