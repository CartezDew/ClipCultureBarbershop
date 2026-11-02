import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import clipCultureOil from '../assets/videos/clip-culture-oil.mp4';
import clipCultureOilPoster from '../assets/videos/clip-culture-oil-poster.webp';
import beardOilRoutine from '../assets/videos/beard-oil-routine.mp4';
import beardOilRoutinePoster from '../assets/videos/beard-oil-routine-poster.webp';
import '../styles/product-stories.css';

const stories = [
  {
    video: clipCultureOil,
    poster: clipCultureOilPoster,
    name: "Eric's Routine",
    title: 'In his own routine.',
    description: 'Eric works Premium Beard Oil through his beard as part of his morning routine.',
    duration: '0:47',
  },
  {
    video: beardOilRoutine,
    poster: beardOilRoutinePoster,
    name: "Vick's Routine",
    title: 'The everyday finish.',
    description: 'Vick reaches for Premium Beard Oil while getting his look ready for the day.',
    duration: '0:35',
  },
];

export default function ProductStories() {
  const videoRefs = useRef([]);
  const soundIndexRef = useRef(null);
  const manualIndexRef = useRef(null);
  const manualPausedRef = useRef(new Set());
  const dragRef = useRef(null);
  const [soundIndex, setSoundIndex] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [started, setStarted] = useState([false, false]);

  useEffect(() => {
    const videos = [...videoRefs.current];
    if (!('IntersectionObserver' in window)) return;
    const ratios = videos.map(() => 0);
    const allowAutoplay = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !navigator.connection?.saveData;

    const syncPlayback = () => {
      if (document.hidden) {
        videos.forEach((video) => video.pause());
        return;
      }

      let selected = soundIndexRef.current ?? manualIndexRef.current;
      if (selected !== null && ratios[selected] < 0.5) {
        videos[selected].muted = true;
        soundIndexRef.current = null;
        manualIndexRef.current = null;
        setSoundIndex(null);
        selected = null;
      }

      if (selected === null && allowAutoplay) {
        selected = ratios[0] >= 0.6 && !manualPausedRef.current.has(0)
          ? 0
          : ratios[1] >= 0.6 && !manualPausedRef.current.has(1) ? 1 : null;
      }

      videos.forEach((video, index) => {
        if (index === selected) {
          if (soundIndexRef.current === null) video.muted = true;
          if (video.paused && !video.ended) video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = videos.indexOf(entry.target);
        if (index !== -1) ratios[index] = entry.intersectionRatio;
      });
      syncPlayback();
    }, { threshold: [0, 0.5, 0.6, 1] });

    videos.forEach((video) => observer.observe(video));
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      videos.forEach((video) => video.pause());
    };
  }, []);

  const toggleSound = (index) => {
    const video = videoRefs.current[index];
    if (soundIndexRef.current === index) {
      video.muted = true;
      soundIndexRef.current = null;
      setSoundIndex(null);
      return;
    }

    videoRefs.current.forEach((other) => {
      other.pause();
      other.muted = true;
    });
    manualPausedRef.current.delete(index);
    manualIndexRef.current = index;
    soundIndexRef.current = index;
    setSoundIndex(index);
    video.muted = false;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const togglePlayback = (index) => {
    const video = videoRefs.current[index];
    if (video.paused) {
      manualPausedRef.current.delete(index);
      manualIndexRef.current = index;
      videoRefs.current.forEach((other, otherIndex) => {
        if (otherIndex !== index) {
          other.pause();
          other.muted = true;
        }
      });
      if (soundIndexRef.current !== index) {
        soundIndexRef.current = null;
        setSoundIndex(null);
        video.muted = true;
      }
      if (video.ended) video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      manualPausedRef.current.add(index);
      manualIndexRef.current = null;
      soundIndexRef.current = null;
      setSoundIndex(null);
      video.muted = true;
      video.pause();
    }
  };

  const startDrag = (event) => {
    if (event.pointerType !== 'mouse' || window.innerWidth > 640 || event.target.closest('button')) return;
    dragRef.current = { x: event.clientX, left: event.currentTarget.scrollLeft };
    event.currentTarget.classList.add('is-dragging');
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const moveDrag = (event) => {
    if (!dragRef.current) return;
    event.currentTarget.scrollLeft = dragRef.current.left + dragRef.current.x - event.clientX;
  };

  const endDrag = (event) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    event.currentTarget.classList.remove('is-dragging');
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <section className="product-stories" id="product-stories" aria-labelledby="product-stories-title">
      <div className="product-stories__inner">
        <div className="product-stories__intro">
          <span className="product-stories__eyebrow">Beyond the chair / Real routines</span>
          <h2 id="product-stories-title">The Culture <em>at Home.</em></h2>
          <p>See how customers make our beard oil part of their day, in their own way.</p>
          <Link to="/products/premium-beard-oil" className="product-stories__link">
            Explore the beard oil <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <div
          className="product-stories__videos"
          aria-label="Customers using Clip Culture beard oil"
          tabIndex={0}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {stories.map((story, index) => (
            <article className="product-story" key={story.video}>
              <div className="product-story__media">
                <img className="product-story__poster" src={story.poster} alt="" loading="lazy" decoding="async" aria-hidden="true" />
                <video
                  className={started[index] ? 'has-started' : ''}
                  ref={(node) => { videoRefs.current[index] = node; }}
                  src={story.video}
                  poster={story.poster}
                  preload="none"
                  playsInline
                  muted
                  aria-label={`${story.name}. ${story.description}`}
                  onTimeUpdate={(event) => {
                    if (event.currentTarget.currentTime > 0.1 && !started[index]) {
                      setStarted((current) => current.map((value, item) => item === index ? true : value));
                    }
                  }}
                  onPlay={() => setPlayingIndex(index)}
                  onPause={() => setPlayingIndex((current) => current === index ? null : current)}
                  onEnded={(event) => {
                    setPlayingIndex((current) => current === index ? null : current);
                    manualIndexRef.current = null;
                    if (soundIndexRef.current === index) {
                      event.currentTarget.muted = true;
                      soundIndexRef.current = null;
                      setSoundIndex(null);
                    }
                  }}
                />
                <span className="product-story__number" aria-hidden="true">0{index + 1} / 02</span>
                <button
                  className="product-story__sound"
                  type="button"
                  onClick={() => toggleSound(index)}
                  aria-label={soundIndex === index ? `Mute ${story.name}` : `Watch ${story.name} with sound`}
                >
                  {soundIndex === index ? <VolumeX size={17} aria-hidden="true" /> : <Volume2 size={17} aria-hidden="true" />}
                  <span>{soundIndex === index ? 'Mute' : 'Watch with sound'}</span>
                </button>
                <button
                  className="product-story__play"
                  type="button"
                  onClick={() => togglePlayback(index)}
                  aria-label={playingIndex === index ? `Pause ${story.name}` : `Play ${story.name}`}
                >
                  {playingIndex === index ? <Pause size={18} fill="currentColor" aria-hidden="true" /> : <Play size={18} fill="currentColor" aria-hidden="true" />}
                </button>
              </div>
              <div className="product-story__caption">
                <span>{story.name} <span aria-hidden="true">·</span> {story.duration}</span>
                <h3>{story.title}</h3>
                <p>{story.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
