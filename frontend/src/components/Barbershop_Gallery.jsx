import React, { useEffect, useRef, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "../styles/barbershop_gallery.css";

const rawImages = import.meta.glob(
  "/src/assets/gallery/*.{webp,png,jpg,jpeg,gif}",
  { eager: true }
);

// Services gallery image order - same as ServicesGallery component
const servicesImageOrder = [7, 2, 20, 10, 13, 22, 37, 15, 16, 18, 23, 25, 26, 29, 31, 47];

const BarbershopGallery = () => {
  const location = useLocation();
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showCounts, setShowCounts] = useState(true);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);

  // Check if we're on the services route
  const isServicesRoute = location.pathname === "/services";

  // Process all images and filter based on route
  const imageEntries = useMemo(() => {
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
    } else {
      // On other routes: show all images sorted by ID
      return allImageEntries.sort(
        (a, b) => a.id - b.id || a.filename.localeCompare(b.filename)
      );
    }
  }, [isServicesRoute]);

  // Total images count - dynamically updates based on route
  const totalImages = imageEntries.length;

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

    // Calculate current visible image index
    const imageWrappers = slider.querySelectorAll('.gallery-image-wrapper');
    if (imageWrappers.length > 0) {
      const sliderRect = slider.getBoundingClientRect();
      const sliderCenter = sliderRect.left + sliderRect.width / 2;
      
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      imageWrappers.forEach((wrapper, index) => {
        const wrapperRect = wrapper.getBoundingClientRect();
        const wrapperCenter = wrapperRect.left + wrapperRect.width / 2;
        const distance = Math.abs(wrapperCenter - sliderCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      
      setCurrentVisibleIndex(closestIndex);
    }
  };

  // Update UI when route changes
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollLeft = 0;
    }
    updateUI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isServicesRoute]);

  // scroll listener
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      // hide counts while scrolling
      setShowCounts(false);

      // reset timer
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      // bring counts back after scroll stops
      scrollTimeoutRef.current = setTimeout(() => {
        setShowCounts(true);
      }, 200);

      updateUI();
    };

    updateUI();
    slider.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateUI);

    return () => {
      slider.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateUI);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isServicesRoute]);

  // draggable thumb - supports both mouse and touch events
  useEffect(() => {
    const slider = sliderRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!slider || !track || !thumb) return;

    let isDragging = false;
    let startX = 0;
    let startLeft = 0;
    let touchStartedOnThumb = false;

    const startDrag = (clientX) => {
      isDragging = true;
      startX = clientX;
      startLeft = thumb.offsetLeft;
      thumb.classList.add("active");
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
      touchStartedOnThumb = false;
      thumb.classList.remove("active");
      document.body.style.userSelect = "";

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setShowCounts(true);
      }, 200);
    };

    // Mouse events
    const onMouseDown = (e) => {
      e.preventDefault();
      startDrag(e.clientX);
    };

    const onMouseMove = (e) => {
      onDrag(e.clientX);
    };

    const onMouseUp = () => {
      endDrag();
    };

    // Touch events for mobile
    const onTouchStart = (e) => {
      // Check if touch started on thumb or track
      const touch = e.touches[0];
      if (!touch) return;
      
      const target = e.target;
      const isOnThumb = thumb.contains(target) || target === thumb;
      const isOnTrack = track.contains(target) || target === track;
      
      if (isOnThumb || isOnTrack) {
        touchStartedOnThumb = true;
        e.preventDefault();
        e.stopPropagation();
        startDrag(touch.clientX);
      }
    };

    const onTouchMove = (e) => {
      // Only prevent default if we started dragging on the thumb
      if (!isDragging || !touchStartedOnThumb) return;
      const touch = e.touches[0];
      if (touch) {
        e.preventDefault();
        e.stopPropagation();
        onDrag(touch.clientX);
      }
    };

    const onTouchEnd = (e) => {
      // Only prevent default if we were dragging from the thumb
      if (!isDragging || !touchStartedOnThumb) return;
      e.preventDefault();
      e.stopPropagation();
      endDrag();
    };

    // Add event listeners
    thumb.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    
    // Only attach touch listeners to the thumb, not window
    thumb.addEventListener("touchstart", onTouchStart, { passive: false });
    // Use document instead of window for touchmove/touchend to be more specific
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd, { passive: false });
    document.addEventListener("touchcancel", onTouchEnd, { passive: false });

    return () => {
      thumb.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      
      thumb.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("touchcancel", onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScrollBtn = (dir) => {
    const slider = sliderRef.current;
    if (!slider) return;
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
  
        <div className="gallery-slider-wrapper" ref={sliderRef}>
          {imageEntries.map((img, index) => (
            <div className="gallery-image-wrapper" key={img.path}>
              <img
                src={img.src}
                alt={img.filename}
                loading="lazy"
                className="barbershop-gallery-image"
              />
              <span className="gallery-image-count">
                {currentVisibleIndex + 1} of {totalImages}
              </span>
            </div>
          ))}
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
