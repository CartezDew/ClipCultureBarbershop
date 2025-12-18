import React, { useEffect, useRef, useState } from 'react';
import '../styles/about.css';
import visionImage from '../assets/gallery/image-11.webp';
import communityImage from '../assets/gallery/image-4.webp';
import businessImage from '../assets/gallery/image-3.webp';
import leapImage from '../assets/gallery/image-20.webp';
import birthImage from '../assets/gallery/image-42.webp';
import movementImage from '../assets/gallery/image-6.webp';
import JoinUs from '../components/JoinUs.jsx';

const About = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el, index) => {
    if (el) sectionRefs.current[index] = el;
  };

  return (
    <div className="about-page">
      {/* Hero Header */}
      <header className="about-hero">
        <div className="about-hero__content">
          <span className="about-hero__eyebrow">Est. 2017 • Atlanta, GA</span>
          <h1 className="about-hero__title">About Clip Culture</h1>
          <p className="about-hero__tagline">Defining the Standard. Shaping the Culture.</p>
          <div className="about-hero__accent"></div>
        </div>
      </header>

      {/* Stats Bar */}
      <section className="about-stats">
        <div className="about-stats__container">
          <div className="about-stats__item">
            <span className="about-stats__number">135K+</span>
            <span className="about-stats__label">Clients Served</span>
          </div>
          <div className="about-stats__divider"></div>
          <div className="about-stats__item">
            <span className="about-stats__number">94%</span>
            <span className="about-stats__label">Client Satisfaction</span>
          </div>
          <div className="about-stats__divider"></div>
          <div className="about-stats__item">
            <span className="about-stats__number">8+</span>
            <span className="about-stats__label">Years Strong</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="about-content">
        
        {/* The Vision */}
        <section
          className={`about-section about-section--vision ${visibleSections.vision ? 'animate-in' : ''}`}
          data-section="vision"
          ref={(el) => addToRefs(el, 0)}
        >
          <div className="about-section__inner">
            <div className="about-section__image-wrapper about-section__image-wrapper--left">
              <img src={visionImage} alt="Clip Culture Vision" className="about-section__image" />
              <div className="about-section__image-accent"></div>
            </div>
            <div className="about-section__content">
              <span className="about-section__label">Our Foundation</span>
              <h2 className="about-section__title">The Vision</h2>
              <div className="about-section__text">
                <p>
                  At <strong>Clip Culture</strong>, we believe barbering is more than a service — it's a lifestyle, a legacy, and a platform for impact.
                </p>
                <p>
                  Rooted in craftsmanship and powered by modern luxuries, our barbershop experience sets the <strong>gold standard</strong> for what grooming should feel like: personal, premium, and community-driven.
                </p>
                <p>
                  From publishing books to developing grooming products, from launching two thriving locations to <strong>mentoring the next generation of barbers</strong>, Clip Culture is more than a brand—it's a movement. We're here to <strong>shape the culture</strong> of grooming locally, nationally, and globally.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* From Humble Beginnings */}
        <section
          className={`about-section about-section--humble ${visibleSections.humble ? 'animate-in' : ''}`}
          data-section="humble"
          ref={(el) => addToRefs(el, 1)}
        >
          <div className="about-section__inner about-section__inner--reverse">
            <div className="about-section__content">
              <span className="about-section__label">The Journey</span>
              <h2 className="about-section__title">From Humble Beginnings to a Cultural Brand</h2>
              <div className="about-section__text">
                <p>
                  <strong>David Brown</strong>, founder of Clip Culture Barbershop, turned a dream born in Charleston, South Carolina, into a cultural movement. Like many, David once worked a traditional 9-to-5 job where profit often outweighed passion and customer experience.
                </p>
                <p>
                  Feeling unfulfilled, he returned to his roots and set out to create a space where <strong>barbering was more than a service—it was an experience</strong>. His vision was simple: deliver exceptional cuts, modern luxuries, and a genuine sense of community all under one roof.
                </p>
              </div>
            </div>
            <div className="about-section__image-wrapper about-section__image-wrapper--right">
              <img src={communityImage} alt="David Brown - Clip Culture Founder" className="about-section__image" />
              <div className="about-section__image-accent"></div>
            </div>
          </div>
        </section>

        {/* Business Meets Barbering */}
        <section
          className={`about-section about-section--business ${visibleSections.business ? 'animate-in' : ''}`}
          data-section="business"
          ref={(el) => addToRefs(el, 2)}
        >
          <div className="about-section__inner">
            <div className="about-section__image-wrapper about-section__image-wrapper--left about-section__image-wrapper--small">
              <img src={businessImage} alt="Business Education" className="about-section__image" />
              <div className="about-section__image-accent"></div>
            </div>
            <div className="about-section__content">
              <span className="about-section__label">Education & Growth</span>
              <h2 className="about-section__title">Business Meets Barbering</h2>
              <div className="about-section__text">
                <p>
                  Before launching Clip Culture, David Brown earned a <strong>Bachelor's degree</strong> in Business Administration with a concentration in Marketing from South Carolina State University, followed by a <strong>Master's degree</strong> in Human Resource Development from Webster University.
                </p>
                <p>
                  Although he once envisioned himself climbing the corporate ladder, destiny had other plans. What began as a professional pursuit soon became a personal calling—a <strong>shift from boardrooms to barbershops</strong>, where David found his purpose behind the chair rather than behind a desk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Leap of Faith */}
        <section
          className={`about-section about-section--leap ${visibleSections.leap ? 'animate-in' : ''}`}
          data-section="leap"
          ref={(el) => addToRefs(el, 3)}
        >
          <div className="about-section__inner about-section__inner--reverse">
            <div className="about-section__content">
              <span className="about-section__label">Taking the Risk</span>
              <h2 className="about-section__title">The Leap of Faith</h2>
              <div className="about-section__text">
                <p>
                  In 2012, David made a bold move to Atlanta, determined to chase his passion. By March of 2013, he enrolled at the Cutting Edge Institute, where his talent quickly stood out. After leaving his corporate job in 2014, he earned his <strong>Master Barber License</strong> in early 2015 and began his professional journey in barbering.
                </p>
                <p>
                  Each step reflected his belief that greatness comes when you align your purpose with your passion.
                </p>
              </div>
            </div>
            <div className="about-section__image-wrapper about-section__image-wrapper--right about-section__image-wrapper--small">
              <img src={leapImage} alt="The Leap of Faith" className="about-section__image" />
              <div className="about-section__image-accent"></div>
            </div>
          </div>
        </section>

        {/* The Birth of Clip Culture */}
        <section
          className={`about-section about-section--birth ${visibleSections.birth ? 'animate-in' : ''}`}
          data-section="birth"
          ref={(el) => addToRefs(el, 4)}
        >
          <div className="about-section__inner">
            <div className="about-section__image-wrapper about-section__image-wrapper--left">
              <img src={birthImage} alt="The Birth of Clip Culture" className="about-section__image" />
              <div className="about-section__image-accent"></div>
            </div>
            <div className="about-section__content">
              <span className="about-section__label">The Beginning</span>
              <h2 className="about-section__title">The Birth of Clip Culture</h2>
              <div className="about-section__text">
                <p>
                  After four years of sharpening his craft and gaining experience in the Sandy Springs area, David launched Clip Culture Barbershop on <strong>December 12, 2017</strong>.
                </p>
                <p>
                  What started as a single shop has since become a recognized brand—one that blends top-tier grooming with cultural pride and community spirit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* More Than a Barbershop */}
        <section
          className={`about-section about-section--movement ${visibleSections.movement ? 'animate-in' : ''}`}
          data-section="movement"
          ref={(el) => addToRefs(el, 5)}
        >
          <div className="about-section__inner about-section__inner--reverse">
            <div className="about-section__content">
              <span className="about-section__label">The Movement</span>
              <h2 className="about-section__title">More Than a Barbershop</h2>
              <div className="about-section__text">
                <p>
                  Clip Culture is more than a barbershop—it's a movement built on <strong>mentorship, education, and empowerment</strong>. Founder David Brown has written books, launched grooming products, and trained barbers to turn passion into purpose.
                </p>
                <p>
                  In Fall 2024, Clip Culture opened its second location in <strong>Summerhill</strong>, expanding its reach across Atlanta. With every cut, every product, and every lesson shared, Clip Culture continues to shape the culture—locally and globally.
                </p>
              </div>
            </div>
            <div className="about-section__image-wrapper about-section__image-wrapper--right">
              <img src={movementImage} alt="More Than a Barbershop" className="about-section__image" />
              <div className="about-section__image-accent"></div>
            </div>
          </div>
        </section>

        {/* Closing Quote */}
        <section className="about-closing">
          <div className="about-closing__content">
            <div className="about-closing__quote-marks">"</div>
            <p className="about-closing__text">Defining the Standard. Shaping the Culture.</p>
            <div className="about-closing__accent"></div>
          </div>
        </section>

        {/* Video Section */}
        <section className="about-video">
          <div className="about-video__container">
            <div className="about-video__header">
              <span className="about-video__eyebrow">Milestone</span>
              <h2 className="about-video__title">
                A <span className="about-video__highlight">Flashback</span> To
              </h2>
              <p className="about-video__subtitle">Our 5 Year Anniversary Celebration</p>
            </div>
            
            <div className="about-video__wrapper">
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/ChdMhO7E5EA?si=AnbrpcXuxktnpr1Q" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="about-video__iframe"
              ></iframe>
            </div>
            
            <p className="about-video__credit">
              — David Brown, Clip Culture Barbershop Owner
            </p>
          </div>
        </section>
        
        <div className="about-joinus-wrapper">
          <JoinUs />
        </div>
          
      </main>
    </div>
  );
};

export default About;
