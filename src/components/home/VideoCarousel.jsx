import React, { useRef, useState, useEffect } from "react";
import styles from "./VideoCarousel.module.css"; // CSS module

const videos = [
  { name: "SAMSRUTHI", video: "/assets/images/video/student4.mp4" },
  { name: "AMITH REDDY", video: "/assets/images/video/student8.mp4" },
  { name: "BEDRE VISHWAS", video: "/assets/images/video/student7.mp4" },
  { name: "DEEKSHITHA", video: "/assets/images/video/student1.mp4" },
  { name: "SHAIK MUNEER AHMED", video: "/assets/images/video/student6.mp4" },
  { name: "KHASHIKA", video: "/assets/images/video/student2.mp4" },
  { name: "SATHVIKA", video: "/assets/images/video/student5.mp4" }, 
  { name: "LOVLISH REDDY", video: "/assets/images/video/student3.mp4" },
];

const OFFSET = 3;
const displayedVideos = [
  ...videos.slice(-OFFSET),
  ...videos,
  ...videos.slice(0, OFFSET),
];

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(OFFSET);
  const [playingIndex, setPlayingIndex] = useState(null); // which displayed index is playing
  const carouselRef = useRef(null);
  const sectionRef = useRef(null);
  const videoRefs = useRef([]); // refs to <video> in displayedVideos order
  const [cardCalculatedWidth, setCardCalculatedWidth] = useState(300);
  const gapSize = 10;

  const updateCardWidthAndPadding = () => {
    const container = carouselRef.current;
    if (!container || container.children.length === 0) return;

    let newCardWidth;
    if (window.innerWidth >= 1024) {
      newCardWidth = (container.offsetWidth - 2 * gapSize) / 3;
      newCardWidth = Math.min(300, newCardWidth);
    } else if (window.innerWidth >= 768) {
      newCardWidth = (container.offsetWidth - gapSize) / 2;
      newCardWidth = Math.min(300, newCardWidth);
    } else {
      newCardWidth = container.offsetWidth - 2 * gapSize;
      newCardWidth = Math.min(300, newCardWidth);
    }
    setCardCalculatedWidth(newCardWidth);

    const padding = `calc(50% - ${newCardWidth / 2}px)`;
    container.style.paddingLeft = padding;
    container.style.paddingRight = padding;
  };

  const scrollToIndex = (index, behavior = "smooth") => {
    const container = carouselRef.current;
    if (!container) return;

    const videoCards = Array.from(container.children);
    const targetElement = videoCards[index];

    if (targetElement) {
      const containerWidth = container.offsetWidth;
      const elementOffsetLeft = targetElement.offsetLeft;
      const elementWidth = targetElement.offsetWidth;

      const scrollLeft =
        elementOffsetLeft - containerWidth / 2 + elementWidth / 2;

      container.scrollTo({ left: scrollLeft, behavior });
    }

    setCurrentIndex(index);
  };

  const goPrev = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= OFFSET) scrollToIndex(prevIndex);
  };

  const goNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < videos.length + OFFSET) scrollToIndex(nextIndex);
  };

  // Pause & reset non-active videos when active card changes
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index !== currentIndex) {
        video.pause();
        video.currentTime = 0;
      }
    });
    setPlayingIndex(null); // hide controls when active changes
  }, [currentIndex]);

  // Initial layout / center on initial active
  useEffect(() => {
    if (!carouselRef.current) return;
    const timer = setTimeout(() => {
      updateCardWidthAndPadding();
      scrollToIndex(currentIndex, "auto");
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Scroll listener to compute active (closest to center) + infinite looping
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerCenter = container.scrollLeft + container.offsetWidth / 2;
      let newActiveIndex = currentIndex;
      let minDistance = Infinity;

      Array.from(container.children).forEach((child, index) => {
        const el = child;
        const childCenter = el.offsetLeft + el.offsetWidth / 2;
        const distance = Math.abs(containerCenter - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          newActiveIndex = index;
        }
      });

      if (newActiveIndex !== currentIndex) setCurrentIndex(newActiveIndex);

      // Infinite loop logic
      const videoCards = Array.from(container.children);
      if (newActiveIndex >= videos.length + OFFSET) {
        container.scrollTo({
          left:
            videoCards[newActiveIndex - videos.length].offsetLeft -
            container.offsetWidth / 2 +
            videoCards[newActiveIndex - videos.length].offsetWidth / 2,
          behavior: "auto",
        });
        setCurrentIndex(newActiveIndex - videos.length);
      } else if (
        newActiveIndex < OFFSET &&
        newActiveIndex >= 0 &&
        container.scrollLeft < 10
      ) {
        container.scrollTo({
          left:
            videoCards[videos.length + newActiveIndex].offsetLeft -
            container.offsetWidth / 2 +
            videoCards[videos.length + newActiveIndex].offsetWidth / 2,
          behavior: "auto",
        });
        setCurrentIndex(videos.length + newActiveIndex);
      }
    };

    let scrollTimeout;
    const debounced = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    container.addEventListener("scroll", debounced);
    window.addEventListener("resize", updateCardWidthAndPadding);

    return () => {
      container.removeEventListener("scroll", debounced);
      window.removeEventListener("resize", updateCardWidthAndPadding);
      clearTimeout(scrollTimeout);
    };
  }, [currentIndex]);

  const handlePlayClick = (index) => {
    const v = videoRefs.current[index];
    if (!v) return;

    // If someone clicks play on a duplicated edge item, make sure it is active
    if (index !== currentIndex) {
      scrollToIndex(index);
      // Allow the scroll to settle, then play
      setTimeout(() => {
        const vNow = videoRefs.current[index];
        if (vNow) {
          vNow.play().catch(() => {});
          setPlayingIndex(index);
        }
      }, 200);
      return;
    }

    v.play().catch(() => {});
    setPlayingIndex(index);
  };

  const onVideoPause = (index) => {
    if (playingIndex === index) setPlayingIndex(null);
  };

  const onVideoEnded = () => {
    setPlayingIndex(null);
  };

  const isLeftArrowDisabled = currentIndex === OFFSET;
  const isRightArrowDisabled = currentIndex === videos.length + OFFSET - 1;

  return (
    <div ref={sectionRef} className={styles.wrapper}>
      <h2 className={styles.title}>Our Student Testimonials</h2>

      <div className={styles.carouselContainer}>
        <button
          onClick={goPrev}
          className={styles.arrowButtonLeft}
          disabled={isLeftArrowDisabled}
        >
          ❮
        </button>

        <div className={styles.carousel} ref={carouselRef}>
          {displayedVideos.map((vid, index) => {
            const isActive = index === currentIndex;
            const isPlaying = playingIndex === index;

            return (
              <div
                key={`${vid.name}-${index}`}
                className={`${styles.videoCard} ${isActive ? styles.activeCard : ""}`}
                style={{ width: cardCalculatedWidth + "px" }}
              >
                {/* Keep overlays centered relative to the VIDEO area */}
                <div className={styles.videoArea}>
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={vid.video}
                    className={styles.video}
                    muted
                    loop
                    playsInline
                    controls={isPlaying}
                    onPause={() => onVideoPause(index)}
                    onEnded={onVideoEnded}
                  />

                  {/* Centered Play Button: only when active and not playing */}
                  {isActive && !isPlaying && (
                    <button
                      className={styles.playButton}
                      onClick={() => handlePlayClick(index)}
                      aria-label="Play video"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="90" />
                        <polygon points="80,60 150,100 80,140" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Labels only on active card */}
                {isActive && (
                  <>
                    <div className={styles.videoCardText}>
                      <span className={styles.studentTestimonials}>› Student </span>
                      <span className={styles.testimonialText}>Testimonials</span>
                    </div>
                    <div className={styles.nameTag}>{vid.name}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={goNext}
          className={styles.arrowButtonRight}
          disabled={isRightArrowDisabled}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;
