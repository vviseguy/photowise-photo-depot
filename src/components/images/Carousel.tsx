import React, { useState, useRef, useEffect } from 'react';
import './Carousel.css'; // Ensure the CSS is scoped specifically to this carousel

interface CarouselProps {
  imageUrls: string[];
}

const Carousel: React.FC<CarouselProps> = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = imageUrls.length;
  const slideRefs = useRef<(HTMLLIElement | null)[]>([]);
  const carouselRef = useRef<HTMLUListElement | null>(null);

  const goToSlide = (index: number) => {
    const newIndex = (index + totalSlides) % totalSlides;
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    goToSlide(currentIndex + 1);
  };

  const goToPrevSlide = () => {
    goToSlide(currentIndex - 1);
  };

  useEffect(() => {
    if (slideRefs.current[currentIndex]) {
      slideRefs.current[currentIndex]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
      });
    }
  }, [currentIndex]);

  // Optional: Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="carousel" aria-label="Gallery">
      <button
        className="carousel__prev"
        onClick={goToPrevSlide}
        aria-label="Go to previous slide"
      />
      <button
        className="carousel__next"
        onClick={goToNextSlide}
        aria-label="Go to next slide"
      />
      <ol className="carousel__viewport">
        {imageUrls.map((image, index) => (
          <li
            key={`carousel__slide${index + 1}`}
            id={`carousel__slide${index + 1}`}
            tabIndex={0}
            className="carousel__slide"
            ref={(el) => (slideRefs.current[index] = el)}
          >
            <div className="carousel__snapper">
              {/* The image inside each slide */}
              <img src={image} alt={`Slide ${index + 1}`} loading="lazy" />
            </div>
          </li>
        ))}
      </ol>
      <aside className="carousel__navigation">
        <ol className="carousel__navigation-list">
          {imageUrls.map((_, index) => (
            <li key={`carousel__nav${index + 1}`} className="carousel__navigation-item" onClick={() => goToSlide(index)}>
              <button
                className={`carousel__navigation-button ${index === currentIndex ? 'active' : ''
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
};

export default Carousel;
