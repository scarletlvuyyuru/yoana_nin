import React, { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';

interface Testimonial {
  id: number;
  text: string;
  author: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "Not only is Yoana an amazing life coach, she is a wonderful human being who understands people deeply. She has helped me on my path to success in everything I set out to do, especially when I felt scattered and overwhelmed. She has been a real 'friend' who truly cares about the people she works with. Yoana will embrace you and hold you until you're ready to let go. I highly recommend working with her. It was an eye-opening and great experience.",
      author: "Lizzie Maxwell"
    },
    {
      id: 2,
      text: "I went through a rough period in my life and I needed a lot of help. I found out about Yoana Nin through a friend, and she saved my life. Literally. I was lost, had major decisions to make, and my thoughts felt all over the place. Yoana supported me in finding my path, getting back to my true self, and fighting for what matters most, which is my family. I will forever be grateful for her. She is the best coach out there!",
      author: "S. Demess"
    },
    {
      id: 3,
      text: "Yoana Nin is an exceptional transformational life coach who has made a significant impact on my life. With her unique approach and deep understanding of my needs, Yoana helped me remove blocks around professional challenges I kept avoiding. After one month of one-on-one coaching, I changed my approach and finally signed up for the job I have always wanted. Her ADHD-friendly way of breaking things down into clear steps made a huge difference. I am still working actively with her, and I cannot say enough about how amazing her sessions are.",
      author: "Nicoleta Heshley"
    },
    {
      id: 4,
      text: "I strongly recommend Yoana Nin as a life coach. It will be a pivotal moment in your life and your future self will thank you for it! During the very first session, Yoana helped me clarify my short and long-term goals and priorities. As sessions progressed, I discovered many long-term dreams had gone dormant. Yoana has strong intuition, asks effective questions, and is an excellent listener. Most importantly, she helped me turn big ideas into an actual step-by-step roadmap I can follow. I now have a clearer vision for the next two decades of my life. Many thanks, Yoana!",
      author: "Adrian Duciuc"
    },
    {
      id: 5,
      text: "Yoana is an amazing human being and a force of nature! I am grateful to know Yoana, and if you are unsure how to navigate the overwhelming areas of your life or business, then you need a Yoana in your life. She is a powerful source of support, guidance, strength, and motivation. Yoana does everything with so much passion and excitement, and you can see it in her eyes. I always find it refreshing to see her results and the patience and love she brings to helping others.",
      author: "Laura Murdorf"
    },
    {
      id: 6,
      text: "I am a young professional entrepreneur andI was suffering from anxiety, low self-esteem, and I could not sleep when I hired Yoana. One key aspect that sets her apart is her ability to create a safe, supportive, but kick-ass environment. She understands that growth can be vulnerable, especially when your nervous system is overloaded, and she supports you every step of the way. But yes, she will also tell you the hard truths. I could not thank her enough!",
      author: "Ada H."
    },
    {
      id: 7,
      text: "One of the most remarkable aspects of Yoana's coaching is her ability to uncover and address root causes, not just surface-level symptoms. She helps you work through underlying beliefs, patterns, and emotions that may be keeping you stuck. I learned so much about myself through her guidance. Yoana's approach helped me discover more about my strengths and how to use them in daily life.",
      author: "Shalini Singh"
    },
    {
      id: 8,
      text: "Yoana's energy is unparalleled! You know immediately you are better off having her in your life. She is insightful, authentic, and full of goodwill. Yoana always has your best interests at heart!",
      author: "Ashley G"
    },
    {
      id: 9,
      text: "Yoana's coaching transformed my confidence on camera. I now attract clients with much more ease. Her strategies are practical, ADHD-friendly, and effective. Highly recommend her services!",
      author: "Alex Smith"
    },
    {
      id: 10,
      text: "I'm incredibly grateful to have met Yoana. She's an exceptional coach who helped me grow my business when I relocated to a new area. Thanks to her guidance, I was able to build a strong network, stay consistent with my action steps, and establish myself in the community. I truly appreciate all of her support and can't thank her enough for being such an amazing coach!",
      author: "Ervin Kulenica"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of user interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.tagline}>Real Women. Real Results.</p>
          <h2 className={styles.title}>What will your success story be?</h2>
        </div>

        <div className={styles.carousel}>
          <button 
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <svg viewBox="0 0 1000 1000" className={styles.navIcon}>
              <path d="M646 125C629 125 613 133 604 142L308 442C296 454 292 471 292 487 292 504 296 521 308 533L604 854C617 867 629 875 646 875 663 875 679 871 692 858 704 846 713 829 713 812 713 796 708 779 692 767L438 487 692 225C700 217 708 204 708 187 708 171 704 154 692 142 675 129 663 125 646 125Z"></path>
            </svg>
          </button>

          <div className={styles.testimonialWrapper}>
            <div 
              className={styles.testimonialSlider}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className={styles.testimonialSlide}>
                  <div className={styles.testimonialContent}>
                    <blockquote className={styles.testimonialText}>
                      "{testimonial.text}"
                    </blockquote>
                    <cite className={styles.testimonialAuthor}>
                      {testimonial.author}
                    </cite>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <svg viewBox="0 0 1000 1000" className={styles.navIcon}>
              <path d="M696 533C708 521 713 504 713 487 713 471 708 454 696 446L400 146C388 133 375 125 354 125 338 125 325 129 313 142 300 154 292 171 292 187 292 204 296 221 308 233L563 492 304 771C292 783 288 800 288 817 288 833 296 850 308 863 321 871 338 875 354 875 371 875 388 867 400 854L696 533Z"></path>
            </svg>
          </button>
        </div>

        <div className={styles.pagination}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;