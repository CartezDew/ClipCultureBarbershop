import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import clipCultureOil from '../assets/videos/clip-culture-oil.mp4';
import clipCultureOilPoster from '../assets/videos/clip-culture-oil-poster.webp';
import beardOilRoutine from '../assets/videos/beard-oil-routine.mp4';
import beardOilRoutinePoster from '../assets/videos/beard-oil-routine-poster.webp';
import jasonBeardOilRoutine from '../assets/videos/jason-beard-oil-routine.mp4';
import jasonBeardOilRoutinePoster from '../assets/videos/jason-beard-oil-routine-poster.webp';
import '../styles/product-stories.css';

const stories = [
  {
    video: clipCultureOil,
    poster: clipCultureOilPoster,
    name: "Eric's Routine",
    title: 'A look she loves.',
    description: 'Eric uses Premium Beard Oil in his morning routine. He likes the natural ingredients, and his girl loves the look.',
    duration: 48,
  },
  {
    video: beardOilRoutine,
    poster: beardOilRoutinePoster,
    name: "Vick's Routine",
    title: 'Moisture for his routine.',
    description: 'Vick uses Premium Beard Oil on his hair, skin, and beard to keep them well moisturized.',
    duration: 35,
  },
  {
    video: jasonBeardOilRoutine,
    poster: jasonBeardOilRoutinePoster,
    name: "Jason's Routine",
    title: 'A little goes a long way.',
    description: 'Jason likes the rosemary scent, the shine, and how soft his beard feels to the touch.',
    duration: 47,
  },
];

const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

export default function ProductStories() {
  const videoRefs = useRef([]);
  const soundIndexRef = useRef(null);
  const manualIndexRef = useRef(null);
  const dragRef = useRef(null);
  const [soundIndex, setSoundIndex] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [started, setStarted] = useState(() => stories.map(() => false));
  const [ended, setEnded] = useState(() => stories.map(() => false));
  const [elapsed, setElapsed] = useState(() => stories.map(() => 0));
  const [durations, setDurations] = useState(() => stories.map((story) => story.duration));

  useEffect(() => {
    const videos = [...videoRefs.current];
    if (!('IntersectionObserver' in window)) return;
    const ratios = videos.map(() => 0);

    const syncPlayback = () => {
      if (document.hidden) {
        videos.forEach((video) => video.pause());
        return;
      }

      let selected = manualIndexRef.current;
      if (selected !== null && ratios[selected] < 0.5) {
        videos[selected].muted = true;
        soundIndexRef.current = null;
        manualIndexRef.current = null;
        setSoundIndex(null);
        selected = null;
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

    videoRefs.current.forEach((other, otherIndex) => {
      if (otherIndex !== index) other.muted = true;
    });
    soundIndexRef.current = index;
    setSoundIndex(index);
    video.muted = false;
  };

  const togglePlayback = (index) => {
    const video = videoRefs.current[index];
    if (video.paused) {
      if (window.innerWidth <= 640) {
        video.closest('.product-story')?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
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
                  onLoadedMetadata={(event) => {
                    const duration = event.currentTarget.duration;
                    if (Number.isFinite(duration)) {
                      setDurations((current) => current.map((value, item) => item === index ? duration : value));
                    }
                  }}
                  onTimeUpdate={(event) => {
                    const currentTime = event.currentTarget.currentTime;
                    setElapsed((current) => current.map((value, item) => item === index ? currentTime : value));
                    if (currentTime > 0.1 && !started[index]) {
                      setStarted((current) => current.map((value, item) => item === index ? true : value));
                    }
                  }}
                  onPlay={() => {
                    setPlayingIndex(index);
                    setEnded((current) => current.map((value, item) => item === index ? false : value));
                  }}
                  onPause={() => setPlayingIndex((current) => current === index ? null : current)}
                  onEnded={(event) => {
                    setPlayingIndex((current) => current === index ? null : current);
                    manualIndexRef.current = null;
                    event.currentTarget.muted = true;
                    event.currentTarget.currentTime = 0;
                    setElapsed((current) => current.map((value, item) => item === index ? 0 : value));
                    soundIndexRef.current = null;
                    setSoundIndex(null);
                    setStarted((current) => current.map((value, item) => item === index ? false : value));
                    setEnded((current) => current.map((value, item) => item === index ? true : value));
                  }}
                />
                <span className="product-story__number" aria-hidden="true">{String(index + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}</span>
                <button
                  className="product-story__sound"
                  type="button"
                  onClick={() => toggleSound(index)}
                  aria-label={soundIndex === index ? `Turn sound off for ${story.name}` : `Turn sound on for ${story.name}`}
                  aria-pressed={soundIndex === index}
                  title={soundIndex === index ? 'Sound on' : 'Sound off'}
                >
                  {soundIndex === index ? <Volume2 size={19} aria-hidden="true" /> : <VolumeX size={19} aria-hidden="true" />}
                </button>
                <button
                  className="product-story__play"
                  type="button"
                  onClick={() => togglePlayback(index)}
                  aria-label={playingIndex === index ? `Pause ${story.name}` : ended[index] ? `Replay ${story.name}` : `Play ${story.name}`}
                >
                  {playingIndex === index ? <Pause size={18} fill="currentColor" aria-hidden="true" /> : ended[index] ? <><RotateCcw size={18} aria-hidden="true" /><span>Replay</span></> : <Play size={18} fill="currentColor" aria-hidden="true" />}
                </button>
              </div>
              <div className="product-story__timeline">
                <progress
                  className="product-story__progress"
                  value={elapsed[index]}
                  max={durations[index]}
                  aria-label={`${story.name} playback progress`}
                />
                <span className="product-story__remaining">{formatTime(Math.max(0, Math.ceil(durations[index] - elapsed[index])))} left</span>
              </div>
              <div className="product-story__caption">
                <span>{story.name}</span>
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
