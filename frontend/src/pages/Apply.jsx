import React, { useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import '../styles/apply.css';
import image8 from '../assets/gallery/image-25.webp';
import founderMessage from '../assets/videos/founder-message.mp4';
import founderMessagePoster from '../assets/videos/founder-message-poster.webp';
import JoinUs from '../components/JoinUs.jsx';
import ApplicantFormModal from '../components/ApplicantFormModal.jsx';

const Apply = () => {
  const [showModal, setShowModal] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef(null);

  const replayVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setVideoEnded(false);
    video.play().catch(() => {});
  };

  return (
    <div className="apply-page">
      {/* Header Section */}
      <div className="apply-header" style={{ backgroundImage: `url(${image8})` }}>
        <div className="apply-header-overlay">
          <h1 className="apply-title">Join the Culture. <br /> Shape the Standard.</h1>
          <button className="apply-now-button" onClick={() => setShowModal(true)}>Apply Now</button>
        </div>
      </div>

      <ApplicantFormModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Apply to Join Our Team"
        subtitle="Fill out the form below and we'll get back to you within 24-48 hours."
      />

      {/* Why Join Clip Culture Bento Grid */}
      <div className="apply-bento-section">
        <div className="apply-bento-grid">
          <div className="apply-bento-card">
            <h3 className="apply-card-title">Build Your Brand</h3>
            <p className="apply-card-text">
              At Clip Culture, you're not just cutting hair — you're building your own legacy. 
              We help you grow your clientele, boost your presence, and create a name people remember.
            </p>
          </div>
          
          <div className="apply-bento-card">
            <h3 className="apply-card-title">Fresh Vibes, Real Support</h3>
            <p className="apply-card-text">
              We're all about culture — good energy, good people, and a clean, professional space 
              that lets you do your best work without the drama.
            </p>
          </div>
          
          <div className="apply-bento-card">
            <h3 className="apply-card-title">Elevate Your Craft</h3>
            <p className="apply-card-text">
              Surround yourself with talented barbers who push you to be better. From advanced 
              techniques to staying on top of trends, Clip Culture is where barbers grow and greatness shows.
            </p>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="apply-video-section">
        <div className="apply-video-container">
          <div className="apply-video-wrapper">
            <video
              ref={videoRef}
              controls={!videoEnded}
              playsInline
              preload="metadata"
              poster={founderMessagePoster}
              aria-label="A message from Clip Culture founder David Brown"
              onPlay={() => setVideoEnded(false)}
              onEnded={(event) => {
                event.currentTarget.currentTime = 0;
                setVideoEnded(true);
              }}
            >
              <source
                src={founderMessage}
                type="video/mp4"
              />
              Your browser does not support video playback.
            </video>
            {videoEnded && (
              <>
                <img className="apply-video-end-poster" src={founderMessagePoster} alt="" aria-hidden="true" />
                <button className="apply-video-replay" type="button" onClick={replayVideo} aria-label="Replay founder video">
                  <RotateCcw size={18} aria-hidden="true" />
                  <span>Replay</span>
                </button>
              </>
            )}
          </div>
          
          <div className="apply-video-content">
            <h3 className="apply-video-title">A message from the founder</h3>
            <p className="apply-video-subtitle">David Brown</p>
            
            <div className="apply-founder-callouts">
              <div className="apply-callout-item">
                <span className="apply-callout-text">VISIONARY ENTREPRENEUR</span>
              </div>
              <div className="apply-callout-item">
                <span className="apply-callout-text">Published Author</span>
              </div>
              <div className="apply-callout-item">
                <span className="apply-callout-text">Mentor</span>
              </div>
              <div className="apply-callout-item">
                <span className="apply-callout-text">BUSINESS PROFESSIONAL (M.S.)</span>
              </div>
              <div className="apply-callout-item">
                <span className="apply-callout-text">Community Leader</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Join Us Component */}
      <div className="apply-joinus-wrapper">
        <JoinUs />
      </div>
    </div>
  );
};

export default Apply;
