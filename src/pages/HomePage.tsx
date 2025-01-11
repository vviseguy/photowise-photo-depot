import React from 'react';
// import Grid from '../components/images/ImageGrid';
import Carousel from '../components/images/Carousel';
// import ImageContainer from '../components/images/ImageContainer';

const images = Array.from({ length: 10 }, (_, index) => `https://picsum.photos/500?project=2&random=${index}`);

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Capture the Moment Photography</h1>
        <p>Professional photography services for every occasion. Follow us on Instagram!</p>
        <div className="instagram-links">
          <a
            href="https://www.instagram.com/yourbusiness"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram Profile
          </a>
        </div>
        <p>Contact us at: <strong>contact@capturemoment.com</strong></p>
      </header>
      <section className="homepage-gallery">
        <h2>Our Work</h2>
        <Carousel imageUrls={images} />
        {/* <Grid gridWidth={800} emptySquareProbability={0.05} /> */}
      </section>
    </div>
  );
};

export default HomePage;
