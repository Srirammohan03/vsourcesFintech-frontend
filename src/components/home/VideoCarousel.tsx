import React, { useRef, useState, useEffect, memo } from "react";
import styles from "./VideoCarousel.module.css";

type VideoItem = {
  name: string;
  video: string;
};

const videos: VideoItem[] = [
  {
    name: "SAMSRUTHI",
    video: "/assets/images/video/student4.mp4",
  },
  {
    name: "AMITH REDDY",
    video: "/assets/images/video/student8.mp4",
  },
  {
    name: "BEDRE VISHWAS",
    video: "/assets/images/video/student7.mp4",
  },
  {
    name: "DEEKSHITHA",
    video: "/assets/images/video/student1.mp4",
  },
  {
    name: "SHAIK MUNEER AHMED",
    video: "/assets/images/video/student6.mp4",
  },
  {
    name: "KHASHIKA",
    video: "/assets/images/video/student2.mp4",
  },
  {
    name: "SATHVIKA",
    video: "/assets/images/video/student5.mp4",
  },
  {
    name: "LOVLISH REDDY",
    video: "/assets/images/video/student3.mp4",
  },
];

const OFFSET = 3;
const displayedVideos = [
  ...videos.slice(-OFFSET),
  ...videos,
  ...videos.slice(0, OFFSET),
];

const VideoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(OFFSET);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Array of video DOM refs
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const [cardCalculatedWidth, setCardCalculatedWidth] = useState<number>(280);

  /* ---------- Update Card Width ---------- */
  const updateCardWidth = () => {
    let W = 280;
    if (window.innerWidth >= 1024) W = 300;
    else if (window.innerWidth >= 768) W = 260;
    else W = 220;

    setCardCalculatedWidth(W);
  };

  /* ---------- Initial Setup ---------- */
  useEffect(() => {
    updateCardWidth();

    setTimeout(() => {
      scrollToIndex(OFFSET, "auto");
    }, 60);

    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  /* ---------- Smooth Scroll to Index ---------- */
  const scrollToIndex = (
    index: number,
    behavior: ScrollBehavior = "smooth"
  ) => {
    const container = carouselRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    const target = cards[index];
    if (!target) return;

    const scrollPos =
      target.offsetLeft - container.clientWidth / 2 + target.clientWidth / 2;

    container.scrollTo({ left: scrollPos, behavior });
    setCurrentIndex(index);
  };

  const goPrev = () => scrollToIndex(currentIndex - 1);
  const goNext = () => scrollToIndex(currentIndex + 1);

  /* ---------- Detect Active Card While Scrolling ---------- */
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const center = container.scrollLeft + container.clientWidth / 2;

        let nearest = currentIndex;
        let minDist = Infinity;

        const children = Array.from(container.children) as HTMLElement[];

        children.forEach((child, i) => {
          const childCenter = child.offsetLeft + child.clientWidth / 2;

          const dist = Math.abs(center - childCenter);
          if (dist < minDist) {
            minDist = dist;
            nearest = i;
          }
        });

        setCurrentIndex(nearest);
        ticking = false;
      });
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- Stop Inactive Videos ---------- */
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (v && i !== playingIndex) {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [playingIndex]);

  /* ---------- Play Video ---------- */
  const handlePlay = (i: number) => {
    scrollToIndex(i);

    setTimeout(() => {
      const v = videoRefs.current[i];
      if (v) {
        v.play().catch(() => {});
        setPlayingIndex(i);
      }
    }, 150);
  };

  return (
    <div ref={sectionRef} className={styles.wrapper}>
      <h2 className={styles.title}>Our Student Testimonials</h2>

      <div className={styles.carouselContainer}>
        <button onClick={goPrev} className={styles.arrowButtonLeft}>
          ❮
        </button>

        <div ref={carouselRef} className={styles.carousel}>
          {displayedVideos.map((vid, index) => {
            const isActive = index === currentIndex;
            const isPlaying = index === playingIndex;

            return (
              <div
                key={index}
                className={`${styles.videoCard} ${
                  isActive ? styles.activeCard : ""
                }`}
                style={{ width: cardCalculatedWidth }}
              >
                <div className={styles.videoArea}>
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[index] = el;
                    }}
                    src={vid.video}
                    className={styles.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    controls={isPlaying}
                    onEnded={() => setPlayingIndex(null)}
                    onPause={() => setPlayingIndex(null)}
                  />

                  {!isPlaying && isActive && (
                    <button
                      className={styles.playButton}
                      onClick={() => handlePlay(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 200 200"
                      >
                        <circle cx="100" cy="100" r="90" />
                        <polygon points="80,60 150,100 80,140" />
                      </svg>
                    </button>
                  )}
                </div>

                {isActive && (
                  <>
                    <div className={styles.videoCardText}>
                      <span className={styles.studentTestimonials}>
                        › Student{" "}
                      </span>
                      <span className={styles.testimonialText}>
                        Testimonials
                      </span>
                    </div>
                    <div className={styles.nameTag}>{vid.name}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <button onClick={goNext} className={styles.arrowButtonRight}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default memo(VideoCarousel);
