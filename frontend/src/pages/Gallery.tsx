import { useEffect, useState } from 'react';
import type { GalleryItem } from '../types/gallery';
import { getGallery } from '../lib/mockApi';

const Gallery = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

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
                <div 
                  style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#666'
                  }}
                >
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
