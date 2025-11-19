'use client'
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

import { Section } from "../Section";
import styles from "./PromoCarousel.module.scss";

const slides = [
  {
    title: "50% OFF First Order",
    subtitle: "Welcome to FreshWash!",
    description: "New customers get half off their first laundry service",
    cta: "Claim Offer",
    colorClass: "blue",
    image: "https://images.unsplash.com/photo-1761403460807-a89b7de9b4d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXVuZHJ5JTIwc2VydmljZSUyMGNsZWFufGVufDF8fHx8MTc2MjgzNjE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Free Pickup & Delivery",
    subtitle: "Same Day Service Available",
    description: "Schedule your pickup online and we'll handle the rest",
    cta: "Book Now",
    colorClass: "green",
    image: "https://images.unsplash.com/photo-1616757957712-6c8874a8c82b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHNlcnZpY2V8ZW58MXx8fHwxNzYyODQ2NTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Premium Dry Cleaning",
    subtitle: "20% OFF This Week",
    description: "Professional care for your delicate garments",
    cta: "Learn More",
    colorClass: "purple",
    image: "https://images.unsplash.com/photo-1627564359646-5972788cec65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb2xkZWQlMjBjbGVhbiUyMGNsb3RoZXN8ZW58MXx8fHwxNzYyODUyNDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function PromoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const clsxNavButtonPrev = clsx(styles.navButton, styles.prev);
  const clsxNavButtonNext = clsx(styles.navButton, styles.next);

  return (
    <Section className={styles.root}>
      {slides.map((slide, index) => {
        const clsxSlide = clsx(styles.slide, { [styles.slideActive]: index === currentSlide });
        const clsxOverlay = clsx(styles.slideOverlay, styles[slide.colorClass]);
        const styleBg = { backgroundImage: `url(${slide.image})` };

        return (
          <div key={slide.title} className={clsxSlide}>
            <div className={styles.slideBackground} style={styleBg}>
              <div className={clsxOverlay}></div>
            </div>

            <div className={styles.slideContent}>
              <p className={styles.subtitle}>{slide.subtitle}</p>
              <h2 className={styles.title}>{slide.title}</h2>
              <p className={styles.description}>{slide.description}</p>
              <button className={styles.ctaButton}>{slide.cta}</button>
            </div>
          </div>
        )
      })}

      <button
        onClick={prevSlide}
        className={clsxNavButtonPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className={clsxNavButtonNext}
        aria-label="Next slide"
      >
        <ChevronRight />
      </button>

      <div className={styles.dots}>
        {slides.map((_, index) => {
          const clsxDot = clsx(styles.dot, { [styles.active]: index === currentSlide })
          const handleGoToSlide = () => goToSlide(index);
          const label = `Go to slide ${index + 1}`;

          return (
            <button
              key={index}
              onClick={handleGoToSlide}
              className={clsxDot}
              aria-label={label}
            />
          )
        })}
      </div>
    </Section>
  );
}