import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "../styles/barbershop_gallery.css";

const rawImages = import.meta.glob(
  "/src/assets/gallery/*.{webp,png,jpg,jpeg,gif}",
  { eager: true }
);

// Services gallery image order - same as ServicesGallery component
const servicesImageOrder = [7, 2, 3, 10, 62, 13, 15, 16, 22, 27, 28, 29, 37, 18, 23, 25, 26, 31, 37, 47, 65];

// Speaking engagements gallery image order
const speakingImageOrder = [61, 68, 71, 63, 14, 40, 1, 3, 5, 20, 53, 57, 65, 67, 69, 70, 71];

// Auto-scroll speed (pixels per frame at 60fps)
// 0.5 = ~30px/second (slow, subtle), 1.0 = ~60px/second
const AUTO_SCROLL_SPEED = 0.5;

const BarbershopGallery = () => {
  const location = useLocation();
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const animationRef = useRef(null);
  const isUserInteractingRef = useRef(false);
  const resumeTimeoutRef = useRef(null);
  const countHideTimeoutRef = useRef(null);
  const previousVisibleIndexRef = useRef(0);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showCounts, setShowCounts] = useState(true);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [snapEnabled, setSnapEnabled] = useState(false);
  const isGalleryVisibleRef = useRef(true);

  // Check if we're on the services route
  const isServicesRoute = location.pathname === "/services";
  // Check if we're on the speaking route
  const isSpeakingRoute = location.pathname === "/speaking-engagements";

  // Process all images and filter based on route
  const baseImageEntries = useMemo(() => {
    // Process all images
    const allImageEntries = Object.entries(rawImages)
      .map(([path, mod]) => {
        const filename = path.split("/").pop() || "";
        const numMatch = filename.match(/(\d+)/);
        const id = numMatch ? parseInt(numMatch[1], 10) : Number.MAX_SAFE_INTEGER;
        return { path, src: mod.default, filename, id };
      });

    // Filter images based on route
    if (isServicesRoute) {
      // On services route: only show images from servicesImageOrder
      return servicesImageOrder
        .map((id) => allImageEntries.find((img) => img.id === id))
        .filter(Boolean);
    } else if (isSpeakingRoute) {
      // On speaking route: only show images from speakingImageOrder
      return speakingImageOrder
        .map((id) => allImageEntries.find((img) => img.id === id))
        .filter(Boolean);
    } else {
      // On other routes: show all images sorted by ID
      return allImageEntries.sort(
        (a, b) => a.id - b.id || a.filename.localeCompare(b.filename)
      );
    }
  }, [isServicesRoute, isSpeakingRoute]);

  // Total images count - dynamically updates based on route (original count, not duplicated)
  const totalImages = baseImageEntries.length;

  // Duplicate images for seamless infinite loop
  const imageEntries = useMemo(() => {
    return [...baseImageEntries, ...baseImageEntries];
  }, [baseImageEntries]);

  const updateUI = () => {
    const slider = sliderRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!slider || !track || !thumb) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const ratio = maxScroll > 0 ? slider.scrollLeft / maxScroll : 0;
    const maxThumbLeft = track.clientWidth - thumb.offsetWidth;
    thumb.style.left = `${ratio * Math.max(maxThumbLeft, 0)}px`;

    const AT_START_TOL = 2;
    const AT_END_TOL = 2;
    const atStart = slider.scrollLeft <= AT_START_TOL;
    const atEnd = slider.scrollLeft >= maxScroll - AT_END_TOL;

    setCanScrollLeft(!atStart);
    setCanScrollRight(!atEnd);

    // Calculate current visible image index - find the first image that's visible from the left
    const imageWrappers = slider.querySelectorAll('.gallery-image-wrapper');
    if (imageWrappers.length > 0) {
      const sliderRect = slider.getBoundingClientRect();
      const sliderLeft = sliderRect.left;
      const sliderRight = sliderRect.right;
      
      // Find the first image that has any part visible in the viewport
      let firstVisibleIndex = 0;
      let found = false;
      
      for (let i = 0; i < imageWrappers.length; i++) {
        const wrapper = imageWrappers[i];
        const wrapperRect = wrapper.getBoundingClientRect();
        const imageLeft = wrapperRect.left;
        const imageRight = wrapperRect.right;
        
        // Check if image overlaps with the visible area
        // Image is visible if its right edge is past slider left AND its left edge is before slider right
        if (imageRight > sliderLeft && imageLeft < sliderRight) {
          // Check how much of the image is visible
          const visibleWidth = Math.min(imageRight, sliderRight) - Math.max(imageLeft, sliderLeft);
          const imageWidth = wrapperRect.width;
          const visibilityRatio = visibleWidth / imageWidth;
          
          // Use the first image that has at least 30% visibility
          if (visibilityRatio >= 0.3) {
            firstVisibleIndex = i;
            found = true;
            break;
          }
        }
      }
      
      // Fallback: if at start, use index 0; otherwise find closest to left edge
      if (!found) {
        if (slider.scrollLeft <= 2) {
          firstVisibleIndex = 0;
        } else {
          // Find the image closest to the left edge of the slider
          let closestIndex = 0;
          let minDistance = Infinity;
          
          imageWrappers.forEach((wrapper, index) => {
            const wrapperRect = wrapper.getBoundingClientRect();
            const imageLeft = wrapperRect.left;
            // Only consider images that are to the right of or at the slider left edge
            if (imageLeft >= sliderLeft - 50) {
              const distance = Math.abs(imageLeft - sliderLeft);
              if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
              }
            }
          });
          firstVisibleIndex = closestIndex;
        }
      }
      
      setCurrentVisibleIndex(firstVisibleIndex);
    }
  };

  // Auto-scroll animation with seamless infinite loop
  const startAutoScroll = useCallback(() => {
    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    let lastTime = 0;
    const scrollSpeed = AUTO_SCROLL_SPEED * 60; // Convert to pixels per second

    const animate = (currentTime) => {
      const slider = sliderRef.current;
      
      // Continue animation loop even if paused
      if (!slider) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = lastTime ? (currentTime - lastTime) / 1000 : 0.016;
      lastTime = currentTime;
      
      // Only scroll if not interacting AND gallery is visible
      if (!isUserInteractingRef.current && isGalleryVisibleRef.current) {
        // Use delta time for frame-rate independent scrolling
        const scrollAmount = scrollSpeed * deltaTime;
        slider.scrollLeft += scrollAmount;
        
        // Check for loop reset - when we reach the duplicated set, jump back
        const imageWrappers = slider.querySelectorAll('.gallery-image-wrapper');
        if (imageWrappers.length > 0) {
          let totalWidth = 0;
          const halfCount = Math.floor(imageWrappers.length / 2);
          for (let i = 0; i < halfCount; i++) {
            totalWidth += imageWrappers[i].offsetWidth;
            if (i < halfCount - 1) totalWidth += 16; // gap
          }
          
          if (totalWidth > 0 && slider.scrollLeft >= totalWidth) {
            slider.scrollLeft = slider.scrollLeft - totalWidth;
          }
        }
        
        // Update UI periodically (not every frame to save performance)
        updateUI();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Stop auto-scroll
  const stopAutoScroll = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  // Pause auto-scroll on user interaction
  const pauseAutoScroll = useCallback(() => {
    isUserInteractingRef.current = true;
    setIsAutoScrolling(false);
    setSnapEnabled(true); // Enable scroll-snap for user interaction
    
    // Clear any existing resume timeout
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    
    // Resume after 3 seconds of no interaction
    resumeTimeoutRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
      setIsAutoScrolling(true);
      setSnapEnabled(false); // Disable scroll-snap for auto-scroll
    }, 3000);
  }, []);

  // Update UI when route changes
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollLeft = 0;
    }
    updateUI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isServicesRoute, isSpeakingRoute]);

  // Show count briefly when a new image becomes visible during auto-scroll
  useEffect(() => {
    const currentIndex = currentVisibleIndex % totalImages;
    const previousIndex = previousVisibleIndexRef.current % totalImages;
    
    // Only trigger when index actually changes and we're auto-scrolling
    if (currentIndex !== previousIndex && isAutoScrolling) {
      // Show the count
      setShowCounts(true);
      
      // Clear any existing hide timeout
      if (countHideTimeoutRef.current) {
        clearTimeout(countHideTimeoutRef.current);
      }
      
      // Hide count after 2.5 seconds
      countHideTimeoutRef.current = setTimeout(() => {
        if (isAutoScrolling) {
          setShowCounts(false);
        }
      }, 2500);
    }
    
    previousVisibleIndexRef.current = currentVisibleIndex;
    
    return () => {
      if (countHideTimeoutRef.current) {
        clearTimeout(countHideTimeoutRef.current);
      }
    };
  }, [currentVisibleIndex, totalImages, isAutoScrolling]);

  // Track gallery visibility using IntersectionObserver
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isGalleryVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 } // Trigger when 10% is visible
    );

    observer.observe(slider);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Start auto-scroll on mount and when visibility/scroll function changes
  useEffect(() => {
    // Delay start to allow images to load
    const startDelay = setTimeout(() => {
      startAutoScroll();
    }, 1000);

    return () => {
      clearTimeout(startDelay);
      stopAutoScroll();
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [startAutoScroll, stopAutoScroll]);

  // scroll listener
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let isTouchHorizontal = false;

    const handleScroll = () => {
      // Only hide counts during manual user scrolling, not auto-scroll
      if (isUserInteractingRef.current) {
        setShowCounts(false);

        // reset timer
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        // bring counts back after scroll stops
        scrollTimeoutRef.current = setTimeout(() => {
          setShowCounts(true);
        }, 200);
      }

      updateUI();
    };

    // Pause auto-scroll on user interaction (desktop only for mousedown)
    const handleMouseDown = () => {
      pauseAutoScroll();
    };

    // Track touch start position to determine scroll direction
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      if (touch) {
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        isTouchHorizontal = false;
      }
    };

    // Only pause auto-scroll if user is scrolling horizontally
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (!touch) return;

      const deltaX = Math.abs(touch.clientX - touchStartX);
      const deltaY = Math.abs(touch.clientY - touchStartY);

      // If horizontal movement is greater than vertical, user is scrolling the gallery
      if (deltaX > deltaY && deltaX > 10) {
        isTouchHorizontal = true;
        pauseAutoScroll();
      }
    };

    const handleWheel = () => {
      pauseAutoScroll();
    };

    updateUI();
    slider.addEventListener("scroll", handleScroll);
    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("touchstart", handleTouchStart, { passive: true });
    slider.addEventListener("touchmove", handleTouchMove, { passive: true });
    slider.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("resize", updateUI);

    return () => {
      slider.removeEventListener("scroll", handleScroll);
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
      slider.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", updateUI);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isServicesRoute, isSpeakingRoute, pauseAutoScroll]);

  // draggable thumb - supports both mouse and touch events
  useEffect(() => {
    const slider = sliderRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!slider || !track || !thumb) return;

    let isDragging = false;
    let startX = 0;
    let startLeft = 0;
    let touchStartedOnScrollbar = false;
    let activeTimeout = null;

    const setThumbActive = () => {
      thumb.classList.add("active");
      // Clear any existing timeout
      if (activeTimeout) {
        clearTimeout(activeTimeout);
        activeTimeout = null;
      }
    };

    const clearThumbActive = () => {
      // Delay removing active class on mobile to keep it active longer
      if (activeTimeout) {
        clearTimeout(activeTimeout);
      }
      activeTimeout = setTimeout(() => {
        thumb.classList.remove("active");
      }, 300); // Keep active for 300ms after touch ends
    };

    const startDrag = (clientX, isTrackClick = false) => {
      isDragging = true;
      startX = clientX;
      
      // Pause auto-scroll when user drags scrollbar
      isUserInteractingRef.current = true;
      setIsAutoScrolling(false);
      setSnapEnabled(true);
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
      
      if (isTrackClick) {
        // If clicking on track, calculate position and jump thumb there
        const trackRect = track.getBoundingClientRect();
        const clickX = clientX - trackRect.left;
        const maxLeft = track.clientWidth - thumb.offsetWidth;
        const newLeft = Math.max(0, Math.min(clickX - thumb.offsetWidth / 2, maxLeft));
        thumb.style.left = `${newLeft}px`;
        startLeft = newLeft;
        
        // Update slider scroll position
        const scrollRatio = maxLeft > 0 ? newLeft / maxLeft : 0;
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        slider.scrollLeft = scrollRatio * maxScroll;
        updateUI();
      } else {
        startLeft = thumb.offsetLeft;
      }
      
      setThumbActive();
      document.body.style.userSelect = "none";
      setShowCounts(false);
    };

    const onDrag = (clientX) => {
      if (!isDragging) return;
      const dx = clientX - startX;
      const maxLeft = track.clientWidth - thumb.offsetWidth;
      let newLeft = startLeft + dx;
      if (newLeft < 0) newLeft = 0;
      if (newLeft > maxLeft) newLeft = maxLeft;
      thumb.style.left = `${newLeft}px`;

      const scrollRatio = maxLeft > 0 ? newLeft / maxLeft : 0;
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      slider.scrollLeft = scrollRatio * maxScroll;

      updateUI();
    };

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      touchStartedOnScrollbar = false;
      document.body.style.userSelect = "";

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setShowCounts(true);
      }, 200);
      
      // Resume auto-scroll after 3 seconds
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
      resumeTimeoutRef.current = setTimeout(() => {
        isUserInteractingRef.current = false;
        setIsAutoScrolling(true);
        setSnapEnabled(false); // Disable scroll-snap for auto-scroll
      }, 3000);
      
      // Keep thumb active for a bit longer on mobile
      clearThumbActive();
    };

    // Mouse events (desktop)
    const onMouseDown = (e) => {
      e.preventDefault();
      startDrag(e.clientX);
    };

    const onMouseMove = (e) => {
      onDrag(e.clientX);
    };

    const onMouseUp = () => {
      endDrag();
      thumb.classList.remove("active");
    };

    // Track click handler for desktop
    const onTrackClick = (e) => {
      if (e.target === track || track.contains(e.target)) {
        e.preventDefault();
        startDrag(e.clientX, true);
        // On desktop, end immediately after click
        setTimeout(() => {
          endDrag();
          thumb.classList.remove("active");
        }, 100);
      }
    };

    // Touch events for mobile
    const onTouchStart = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      
      const target = e.target;
      const isOnThumb = thumb.contains(target) || target === thumb;
      const isOnTrack = track.contains(target) || target === track;
      
      if (isOnThumb || isOnTrack) {
        touchStartedOnScrollbar = true;
        e.preventDefault();
        e.stopPropagation();
        
        if (isOnTrack) {
          // If touching track, jump thumb to that position and start dragging
          startDrag(touch.clientX, true);
        } else {
          // If touching thumb, start dragging from current position
          startDrag(touch.clientX, false);
        }
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging || !touchStartedOnScrollbar) return;
      const touch = e.touches[0];
      if (touch) {
        e.preventDefault();
        e.stopPropagation();
        onDrag(touch.clientX);
        // Keep thumb active while dragging
        setThumbActive();
      }
    };

    const onTouchEnd = (e) => {
      if (!isDragging || !touchStartedOnScrollbar) return;
      e.preventDefault();
      e.stopPropagation();
      endDrag();
    };

    // Add event listeners
    thumb.addEventListener("mousedown", onMouseDown);
    track.addEventListener("click", onTrackClick);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    
    // Touch listeners - attach to both thumb and track
    thumb.addEventListener("touchstart", onTouchStart, { passive: false });
    track.addEventListener("touchstart", onTouchStart, { passive: false });
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd, { passive: false });
    document.addEventListener("touchcancel", onTouchEnd, { passive: false });

    return () => {
      thumb.removeEventListener("mousedown", onMouseDown);
      track.removeEventListener("click", onTrackClick);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      
      thumb.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("touchcancel", onTouchEnd);
      
      if (activeTimeout) {
        clearTimeout(activeTimeout);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScrollBtn = (dir) => {
    const slider = sliderRef.current;
    if (!slider) return;
    
    // Pause auto-scroll when user clicks navigation buttons
    pauseAutoScroll();
    
    setShowCounts(false);
    const amount = 350;
    slider.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setShowCounts(true);
      updateUI();
    }, 250);
  };

  return (
    <div className="barbershop-gallery-outer">
      <div
        className={`barbershop-gallery-section ${
          showCounts ? "show-counts" : "hide-counts"
        }`}
      >
        {canScrollLeft && (
          <button
            type="button"
            className="gallery-nav-btn gallery-nav-left"
            onClick={() => handleScrollBtn("left")}
            aria-label="Scroll left"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
        )}
  
        <div 
          className={`gallery-slider-wrapper ${snapEnabled ? 'snap-enabled' : ''}`} 
          ref={sliderRef}
        >
          {imageEntries.map((img, index) => {
            // Calculate the display index (modulo for duplicated images)
            const displayIndex = index % totalImages;
            const isActive = displayIndex === (currentVisibleIndex % totalImages);
            return (
              <div
                className="gallery-image-wrapper"
                key={`${img.path}-${index}`}
                onClick={pauseAutoScroll}
              >
                <img
                  src={img.src}
                  alt={img.filename}
                  loading="lazy"
                  className="barbershop-gallery-image"
                />
                <span
                  className={`gallery-image-count ${
                    isActive ? "active" : ""
                  }`}
                >
                  {displayIndex + 1} of {totalImages}
                </span>
              </div>
            );
          })}
        </div>
  
        {canScrollRight && (
          <button
            type="button"
            className="gallery-nav-btn gallery-nav-right"
            onClick={() => handleScrollBtn("right")}
            aria-label="Scroll right"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        )}
  
        <div className="gallery-slider-scrollbar">
          <div className="gallery-slider-scrollbar-track" ref={trackRef}>
            <div className="scrollbar-thumb" ref={thumbRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarbershopGallery;
