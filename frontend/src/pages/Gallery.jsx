import { useEffect, useState } from 'react';
import { getGallery } from '../lib/mockApi.js';
import '../styles/gallery.css';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    getGallery().then(setGallery);
  }, []);

  return (
    <div>
      <section className="section section--light">
        <div className="container">
          <h1 className="text-center mb-4">Our Work</h1>
          <p className="text-center mb-4">
            See the quality and artistry of our barbers' work.
          </p>
          
          <div className="grid grid--3">
            {gallery.map((item) => (
              <div key={item.id} className="card">
                <div className="gallery__image-placeholder">
                  Image Placeholder
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <a href="#contact" className="btn btn--primary btn--large">
              Book Your Cut
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
