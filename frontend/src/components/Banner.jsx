import React from 'react'
import { bannerStyles } from '../assets/dummyStyles';
import { Calendar, Clock, Phone, Ribbon, ShieldUser, Star, Stethoscope, Users } from "lucide-react";
import {useNavigate} from 'react-router-dom';
import banner from '../assets/BannerImg.png'

const Banner = () => {
    const navigate = useNavigate();
  return (
    <div className={bannerStyles.bannerContainer}>
        <div className={bannerStyles.mainContainer}>
            <div className={bannerStyles.borderOutline}>
                <div className={bannerStyles.outerAnimatedBand}></div>
                <div className={bannerStyles.innerWhiteBorder}></div>
            </div>
            <div className={bannerStyles.contentContainer}>
                <div className={bannerStyles.flexContainer}>
                    <div className={bannerStyles.leftContent}>
                        <div className={bannerStyles.headerBadgeContainer}>
                            <div className={bannerStyles.stethoscopeContainer}>
                                <div className={bannerStyles.stethoscopeInner}>
                                    <Stethoscope className={bannerStyles.stethoscopeIcon}/>
                                </div>
                            </div>
                            <div className={bannerStyles.titleContainer}>
                                <h1 className={bannerStyles.title}>
                                    Medi
                                    <span className={bannerStyles.titleGradient}>Care+</span>
                                </h1>
                                <div className={bannerStyles.starsContainer}>
                                    <div className={bannerStyles.starsInner}>
                                        {[1,2,3,4,5].map((star) => (
                                            <Star className={bannerStyles.starIcon} key={star}/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className={bannerStyles.tagline}>
                            Premium Healthcare
                            <span className={`block ${bannerStyles.taglineHighlight}`}>
                                At your Fingertips
                            </span>
                        </p>
                        <div className={bannerStyles.featuresGrid}>
                            <div className={`${bannerStyles.featureItem} ${bannerStyles.featureBorderGreen}`}>
                                <Ribbon className={bannerStyles.featureIcon}/>
                                <span className={bannerStyles.featureText}>
                                    Certified Specialists
                                </span>
                            </div>
                            <div className={`${bannerStyles.featureItem} ${bannerStyles.featureBorderBlue}`}>
                                <Clock className={bannerStyles.featureIcon}/>
                                <span className={bannerStyles.featureText}>
                                    24/7 Availability
                                </span>
                            </div>
                            <div className={`${bannerStyles.featureItem} ${bannerStyles.featureBorderEmerald}`}>
                                <ShieldUser className={bannerStyles.featureIcon}/>
                                <span className={bannerStyles.featureText}>
                                    Safe &amp; Secure.
                                </span>
                            </div>
                            <div className={`${bannerStyles.featureItem} ${bannerStyles.featureBorderEmerald}`}>
                                <Users className={bannerStyles.featureIcon}/>
                                <span className={bannerStyles.featureText}>
                                    500+ Doctors
                                </span>
                            </div>
                        </div>
                        <div className={bannerStyles.ctaButtonsContainer}>
                            <button onClick={() => navigate("/doctors")} 
                                className={bannerStyles.bookButton}>
                                    <div className={bannerStyles.bookButtonOverlay}></div>
                                    <div className={bannerStyles.bookButtonContent}>
                                        <Calendar className={bannerStyles.bookButtonIcon}/>
                                        <span>Book Appointment Now</span>
                                    </div>
                            </button>

                            <button className={bannerStyles.emergencyButton} onClick={()=> (window.location.href = "tel: 8210958679")}>
                                <div className={bannerStyles.emergencyButtonContent}>
                                    <Phone className={bannerStyles.emergencyButtonIcon}/>
                                    <span>Energency Call</span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className={bannerStyles.rightImageSection}>
                        <div className={bannerStyles.imageContainer}>
                            <div className={bannerStyles.imageFrame}>
                                <img src={banner} alt='banner' className={bannerStyles.image}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
  )
}

export default Banner