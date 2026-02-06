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
      text: "Not only is Yoana an amazing life coach, she is a wonderful human being who understands the workings of the world and the people in it. She has helped me on my path to success in all that I endeavor to do, and she has been a real 'friend' who cares about the people she works with. Yoana will embrace you and hold you until you're ready to let go. I highly recommend working with her. It was an eye-opening and great experience.",
      author: "Lizzie Maxwell"
    },
    {
      id: 2,
      text: "I went through a rough period in my life and I needed a lot of help. I found out about Yoana Nin through a friend, and she saved my life. Literally. I was lost, not sure which way to go in my relationship, had a lot of major decisions to make, and Yoana was the person that supported me in finding my path, getting back to my true self, and fighting for what matters the most, which is my family. I will forever be grateful for her. She is the best coach out there!",
      author: "S. Demess"
    },
    {
      id: 3,
      text: "Yoana Nin is an exceptional transformational life coach who has made a significant impact on my life. With her unique approach and deep understanding of my needs, Yoana helped me remove all my blocks when it comes to professional challenges that I simply was refusing to take on. After one month of one on one coaching, I switched my approach and finally signed up for the job I have always wanted. I am still working actively with her, and I cannot say how amazing her sessions really are.",
      author: "Nicoleta Heshley"
    },
    {
      id: 4,
      text: "I strongly recommend Yoana Nin as Life Coach. It will be a pivotal moment in your life and your future self will thank you for it! During the very first session, Yoana helped me figure out my short and long term goals and priorities. As the sessions progressed, I've discovered that many of my long term dreams and goals were dormant maybe due to the surviving mode inflicted by the global pandemic or maybe I became too comfortable with the status quo. Yoana has good intuition, she asks effective questions and she is a good listener. I feel that I have a clearer vision and a solid road map for the next two decades of my life after the coaching sessions. Many thanks Yoana!",
      author: "Adrian Duciuc"
    },
    {
      id: 5,
      text: "Yoana is an amazing human being and a force of nature! I am grateful to know Yoana and if you are unsure how to navigate the overwhelming areas of your life, then you need a Yoana in your life. She is your best source of support, guidance, strength and motivation. Yoana does everything with so much passion and excitement, and you can see that in her eyes! She walks this life with confidence and a fire in her eyes and I always find it very refreshing to see the results she has and the patience and love for helping others.",
      author: "Laura Murdorf"
    },
    {
      id: 6,
      text: "I am a young professional that could not find her path in her career, where I spent way too many years. I was suffering from anxiety, low self esteem and I could not sleep when I hired Yoana. One of the key aspects that sets Yoana apart from other life coaches is her ability to create a safe, supportive but kick ass environment for her clients. She understands that personal growth and transformation can be a vulnerable process, and she ensures that her clients feel comfortable and supported every step of the way. But, she did tell me some hard core truths. Could not thank her enough!",
      author: "Ada H."
    },
    {
      id: 7,
      text: "One of the most remarkable aspects of Yoana's coaching is her ability to uncover and address the root causes of her clients' challenges. She goes beyond surface-level issues and delves deep into the underlying beliefs, patterns, trauma and emotions that may be holding individuals back. I have had my share of really traumatic experiences, and, although I have worked with a therapist for the last 5 years, I found that Yoana's approach led me to discover more about my strengths than I ever did.",
      author: "Shalini Singh"
    },
    {
      id: 8,
      text: "Yoana's energy is unparalleled! You know immediately you are better off having her in your life. She is insightful, authentic, and full of goodwill. Yoana always has your best interests at heart!",
      author: "Ashley G"
    },
    {
      id: 9,
      text: "Yoana's coaching transformed my confidence on camera! I now attract clients effortlessly. Her strategies are practical and effective. Highly recommend her services!",
      author: "Alex Smith"
    },
    {
      id: 10,
      text: "I'm incredibly grateful to have met Yoana. She's an exceptional coach who helped me grow my business when I relocated to a new area. Thanks to her guidance, I was able to build a strong network and establish myself in the community. I truly appreciate all of her support and can't thank her enough for being such an amazing coach!",
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
          <p className={styles.tagline}>Our Students Get Results</p>
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