import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/barber-bio.css';
import Image1 from '../assets/Barbers/Image_1.webp';
import Image2 from '../assets/Barbers/Image_2.webp';
import Image3 from '../assets/Barbers/Image_3.webp';
import Image4 from '../assets/Barbers/Image_4.webp';
import Image5 from '../assets/Barbers/Image_5.webp';
import Image6 from '../assets/Barbers/Image_6.webp';
import Image7 from '../assets/Barbers/Image_7.webp';
import Image8 from '../assets/Barbers/Image_8.webp';
import Image9 from '../assets/Barbers/Image_9.webp';
import Image10 from '../assets/Barbers/Image_10.webp';
import Image11 from '../assets/Barbers/Image_11.webp';
import Image12 from '../assets/Barbers/Image_12.webp';
import Image13 from '../assets/Barbers/Image_13.webp';
import GalleryImage1 from '../assets/gallery/image-1.webp';
import GalleryImage2 from '../assets/gallery/image-2.webp';
import GalleryImage3 from '../assets/gallery/image-3.webp';
import GalleryImage4 from '../assets/gallery/image-4.webp';
import GalleryImage5 from '../assets/gallery/image-5.webp';
import GalleryImage6 from '../assets/gallery/image-6.webp';

const BarberBio = () => {
  const { barberId } = useParams();
  const navigate = useNavigate();

  const portfolioImages = [
    GalleryImage1, GalleryImage2, GalleryImage3,
    GalleryImage4, GalleryImage5, GalleryImage6
  ];

  const allBarbers = [
    {
      id: 'david-brown',
      name: "David Brown",
      title: "Owner/Master Barber",
      location: "Sandy Springs",
      image: Image1,
      bio: "Founder and master barber with over 15 years of experience. Specializes in precision cuts and classic styles with a modern twist. David's passion for the craft and dedication to excellence has made Clip Culture a premier destination."
    },
    {
      id: 'daniel-l',
      name: "Daniel L.",
      title: "Barber",
      location: "Sandy Springs",
      image: Image2,
      bio: "Creative stylist with 8 years of experience specializing in fades and modern cuts. Known for his attention to detail and ability to bring clients' visions to life. Daniel stays current with the latest trends and techniques."
    },
    {
      id: 'leelee-s',
      name: "LeeLee S.",
      title: "Barber",
      location: "Sandy Springs",
      image: Image3,
      bio: "Expert in textured cuts and creative designs with 6 years of experience. LeeLee's artistic approach and friendly demeanor make every appointment enjoyable. Specializes in trendy styles and beard sculpting."
    },
    {
      id: 'justin-h',
      name: "Justin H.",
      title: "Barber",
      location: "Sandy Springs",
      image: Image4,
      bio: "Master of classic and contemporary styles with 10 years behind the chair. Justin's precision and consistency keep clients coming back. Known for exceptional beard trims and traditional hot towel shaves."
    },
    {
      id: 'tyrel-y',
      name: "Tyrel Y",
      title: "Barber",
      location: "Sandy Springs",
      image: Image5,
      bio: "Skilled barber with 7 years of experience specializing in skin fades and line work. Tyrel's meticulous approach ensures every cut is sharp and clean. Great with clients of all ages and hair types."
    },
    {
      id: 'doug-l',
      name: "Doug L.",
      title: "Barber",
      location: "Sandy Springs",
      image: Image6,
      bio: "Veteran barber with 12 years of experience in both traditional and modern techniques. Doug's laid-back personality and expert skills create a comfortable atmosphere. Specializes in tapers and executive cuts."
    },
    {
      id: 'aaron-w',
      name: "Aaron W.",
      title: "Barber",
      location: "Summerhill",
      image: Image7,
      bio: "Dynamic barber with 9 years of experience known for creative fades and bold designs. Aaron brings energy and artistry to every cut. Excellent at consulting with clients to achieve their perfect look."
    },
    {
      id: 'tj-s',
      name: "TJ S.",
      title: "Barber",
      location: "Summerhill",
      image: Image8,
      bio: "Precision stylist with 5 years of experience specializing in clean cuts and sharp lines. TJ's friendly approach and consistent results have built a loyal following. Expert in modern gentleman's cuts."
    },
    {
      id: 'cass-b',
      name: "Cass B.",
      title: "Barber",
      location: "Summerhill",
      image: Image9,
      bio: "Talented barber with 6 years of experience excelling in textured styles and natural hair care. Cass's versatility and creativity shine in every appointment. Known for personalized consultations and style advice."
    },
    {
      id: 'desean-p',
      name: "DeSean P.",
      title: "Barber",
      location: "Summerhill",
      image: Image10,
      bio: "Skilled craftsman with 8 years of experience specializing in bald fades and edge-ups. DeSean's technical precision and perfectionist approach deliver consistently excellent results. Great with intricate designs."
    },
    {
      id: 'tray-w',
      name: "Tray W.",
      title: "Barber",
      location: "Summerhill",
      image: Image11,
      bio: "Professional barber with 7 years of experience mastering both classic and contemporary styles. Tray's attention to detail and personable nature create an exceptional experience. Specializes in tapers and line work."
    },
    {
      id: 'hugo-d',
      name: "Hugo D.",
      title: "Barber",
      location: "Summerhill",
      image: Image12,
      bio: "Experienced barber with 10 years in the industry focusing on precision cuts and beard grooming. Hugo's steady hand and eye for detail ensure impeccable results. Known for his professionalism and expertise."
    },
    {
      id: 'mula-s',
      name: "Mula S.",
      title: "Barber",
      location: "Summerhill",
      image: Image13,
      bio: "Creative stylist with 6 years of experience bringing fresh perspectives to classic cuts. Mula's innovative techniques and engaging personality make every visit memorable. Excellent at modern fades and styling."
    }
  ];

  const barber = allBarbers.find(b => b.id === barberId);

  if (!barber) {
    return (
      <div className="barber-bio-page">
        <div className="barber-bio-container">
          <p>Barber not found</p>
          <button onClick={() => navigate(-1)} className="back-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    const locationParam = barber.location === 'Sandy Springs'
      ? 'sandy-springs'
      : 'summerhill';

    window.dispatchEvent(new CustomEvent('openBookingForm', {
      detail: {
        barberId: barber.id,
        location: locationParam,
        skipBarber: true
      }
    }));
  };

  return (
    <div className="barber-bio-page">
      <div className="barber-bio-container">
        <div className="barber-bio-header">
          <div className="barber-bio-image-wrapper">
            <img src={barber.image} alt={barber.name} />
          </div>
          <div className="barber-bio-info">
            <h1 className="barber-bio-name">{barber.name}</h1>
            {barber.id === 'david-brown' && (
              <p className="barber-bio-title">{barber.title}</p>
            )}
            <p className="barber-bio-location">{barber.location}</p>
            {barber.id === 'david-brown' && (
              <div className="barber-bio-social">
                <a 
                  href="https://www.instagram.com/clipculturebarbershop/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="barber-bio-social-link"
                  aria-label="Follow on Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
                <a 
                  href="https://www.facebook.com/clipculturebarbershop/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="barber-bio-social-link"
                  aria-label="Follow on Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="barber-bio-text">
          <p>{barber.bio}</p>
        </div>

        <div className="barber-bio-gallery-section">
          <h2 className="barber-bio-gallery-title">Signature Work</h2>
          <div className="barber-bio-gallery-grid">
            {portfolioImages.map((image, index) => (
              <div key={index} className="barber-bio-gallery-item">
                <img src={image} alt={`${barber.name}'s work ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="barber-bio-actions">
          <button onClick={() => navigate(-1)} className="barber-bio-back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
          <button className="barber-bio-book-btn" onClick={handleBookNow}>
            Book with {barber.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarberBio;

