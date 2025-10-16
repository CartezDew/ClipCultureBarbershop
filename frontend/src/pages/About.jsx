import '../styles/about.css';
import visionImage from '../assets/gallery/image-11.webp';
import communityImage from '../assets/gallery/image-4.webp';
import businessImage from '../assets/gallery/image-3.webp';
import leapImage from '../assets/gallery/image-20.webp';
import birthImage from '../assets/gallery/image-42.webp';
import movementImage from '../assets/gallery/image-6.webp';
// icons removed per design; no icon imports needed

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title">About Clip Culture</h1>
          <p className="about-subtitle">Defining the Standard. Shaping the Culture.</p>
        </div>
        
        <div className="about-stats">
          <div className="about-stats-container">
            <div className="about-stat">
              <div className="about-stat-content">
                <div className="about-stat-value">135K+</div>
                <div className="about-stat-label">clients served</div>
              </div>
            </div>
            <div className="about-stat-divider" aria-hidden="true"></div>
            
            <div className="about-stat">
              <div className="about-stat-content">
                <div className="about-stat-value">94%</div>
                <div className="about-stat-label">client satisfaction</div>
              </div>
            </div>
            <div className="about-stat-divider" aria-hidden="true"></div>
            
            <div className="about-stat">
              <div className="about-stat-content">
                <div className="about-stat-value">7+</div>
                <div className="about-stat-label">years strong</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="about-content">
          <div className="about-section about-vision-grid">
            <div className="about-vision-content">
              <img src={visionImage} alt="Clip Culture Vision" className="vision-image about-vision-image" />
              <h2 className="about-section__title">The Vision</h2>
              <p>
                At <strong> Clip Culture</strong>, we believe barbering is more than a service — it's a lifestyle, a legacy, and a platform for impact.
              </p>
              <p>
                Rooted in craftsmanship and powered by modern luxuries, our barbershop experience sets the <strong>gold standard</strong> for what grooming should feel like: personal, premium, and community-driven.
              </p>
              <p>
                From publishing books to developing grooming products, from launching two thriving locations to <strong>mentoring the next generation of barbers</strong>, Clip Culture is more than a brand—it's a movement. We’re here to <strong>shape the culture</strong> of grooming locally, nationally, and globally.
              </p>
            </div>
          </div>
          
          <div className="about-intro about-humble-grid">
            <div className="about-humble-content">
              <img src={communityImage} alt="David Brown - Clip Culture Founder" className="humble-image about-humble-image" />
              <h2 className="about-intro__title">
               From Humble Beginnings to a Cultural Brand
              </h2>
              <p>
               <strong>David Brown</strong>, founder of Clip Culture Barbershop, turned a dream born in Charleston, South Carolina, into a cultural movement. Like many, David once worked a traditional 9-to-5 job where profit often outweighed passion and customer experience. Feeling unfulfilled, he returned to his roots and set out to create a space where <strong>barbering was more than a service—it was an experience</strong>. His vision was simple: deliver exceptional cuts, modern luxuries, and a genuine sense of community all under one roof.
              </p>
            </div>
          </div>
          
          <div className="about-section about-business-grid">
            <div className="about-business-content">
              <img src={businessImage} alt="Business Education" className="business-image about-business-image" />
              <h2 className="about-section__title">Business Meets Barbering</h2>
              <p>
                Before launching Clip Culture, David Brown earned a <strong>Bachelor's degree</strong> in Business Administration with a concentration in Marketing from South Carolina State University, followed by a <strong>Master's degree</strong> in Human Resource Development from Webster University.
              </p>
              <p>
                Although he once envisioned himself climbing the corporate ladder, destiny had other plans. What began as a professional pursuit soon became a personal calling—a <strong>shift from boardrooms to barbershops</strong>, where David found his purpose behind the chair rather than behind a desk.
              </p>
            </div>
          </div>
          
          <div className="about-section about-leap-grid">
            <div className="about-leap-content">
              <img src={leapImage} alt="The Leap of Faith" className="leap-image about-leap-image" />
              <h2 className="about-section__title">The Leap of Faith</h2>
              <p>
                In 2012, David made a bold move to Atlanta, determined to chase his passion. By March of 2013, he enrolled at the Cutting Edge Institute, where his talent quickly stood out. After leaving his corporate job in 2014, he earned his <strong>Master Barber License</strong> in early 2015 and began his professional journey in barbering. Each step reflected his belief that greatness comes when you align your purpose with your passion.
              </p>
            </div>
          </div>
          
          <div className="about-section about-birth-grid">
            <div className="about-birth-content">
              <img src={birthImage} alt="The Birth of Clip Culture" className="birth-image about-birth-image" />
              <h2 className="about-section__title">The Birth of Clip Culture</h2>
              <p>
                After four years of sharpening his craft and gaining experience in the Sandy Springs area, David launched Clip Culture Barbershop on <strong>December 12, 2017</strong>. What started as a single shop has since become a recognized brand—one that blends top-tier grooming with cultural pride and community spirit.
              </p>
            </div>
          </div>
          
          <div className="about-section about-movement-grid">
            <div className="about-movement-content">
              <img src={movementImage} alt="More Than a Barbershop" className="movement-image about-movement-image" />
              <h2 className="about-section__title">More Than a Barbershop</h2>
              <p>
                Clip Culture is more than a barbershop—it's a movement built on <strong>mentorship, education, and empowerment</strong>. Founder David Brown has written books, launched grooming products, and trained barbers to turn passion into purpose.
              </p>
              <p>
                <br/>
                <strong>In Fall 2024</strong>, Clip Culture opened its second location in <strong>Summerhill</strong>, expanding its reach across Atlanta. With every cut, every product, and every lesson shared, Clip Culture continues to shape the culture—locally and globally.
              </p>
              <p className="about-closing">
                "Defining the Standard. Shaping the Culture."
              </p>
            </div>
          </div>
          
          <div className="about-video-section">
            <div className="about-video-container">
              <h2 className="about-video-title">HERE'S A <em>FLASH</em>BACK TO</h2>
              <p className="about-video-subtitle">Our 5 Year Anniversary Celebration:</p>
              
              <div className="about-video-wrapper">
                <iframe 
                  width="560" 
                  height="315" 
                  src="https://www.youtube.com/embed/ChdMhO7E5EA?si=AnbrpcXuxktnpr1Q" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="about-video-iframe"
                ></iframe>
              </div>
              
              <p className="about-video-credit">
                - David Brown, Clip Culture Barbershop owner; Five year anniversary, 2022
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

