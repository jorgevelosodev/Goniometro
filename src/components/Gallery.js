import { useEffect } from 'react';
import Image from 'next/image';
import 'glightbox/dist/css/glightbox.min.css';
import styles from '../styles/Gallery.module.css';


// Imagens da galeria
const images = [
  /*{ src: '/assets/img/gallery/gallery-1.jpg', alt: 'Gallery Image 1' },
  { src: '/assets/img/gallery/gallery-2.jpg', alt: 'Gallery Image 2' },
  { src: '/assets/img/gallery/gallery-3.jpg', alt: 'Gallery Image 3' },
  { src: '/assets/img/gallery/gallery-4.jpg', alt: 'Gallery Image 4' },
  { src: '/assets/img/gallery/gallery-5.jpg', alt: 'Gallery Image 5' },
  { src: '/assets/img/gallery/gallery-6.jpg', alt: 'Gallery Image 6' },
  { src: '/assets/img/gallery/gallery-7.jpg', alt: 'Gallery Image 7' },
  { src: '/assets/img/gallery/gallery-8.jpg', alt: 'Gallery Image 8' },*/
];

export default function Gallery() {
  useEffect(() => {
    import('glightbox').then((module) => {
      const GLightbox = module.default;
      GLightbox({ selector: '.glightbox' });
    });
  }, []);

  return (
    <section id="gallery" className={`gallery section ${styles.gallery}`}>
      {/* Título da seção */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Gallery</h2>
        <p></p>
      </div>

      <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-0">
          {images.map((image, index) => (
            <div key={index} className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href={image.src} className="glightbox" data-gallery="images-gallery">
                  <Image src={image.src} alt={image.alt} width={300} height={200} className="img-fluid" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
