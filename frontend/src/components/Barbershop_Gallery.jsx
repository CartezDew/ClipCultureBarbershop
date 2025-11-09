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

  // draggable thumb
  useEffect(() => {
    const slider = sliderRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!slider || !track || !thumb) return;

    let isDragging = false;
    let startX = 0;
    let startLeft = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX;
      startLeft = thumb.offsetLeft;
      thumb.classList.add("active");
      document.body.style.userSelect = "none";
      setShowCounts(false);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
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

    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      thumb.classList.remove("active");
      document.body.style.userSelect = "";

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setShowCounts(true);
      }, 200);
    };

    thumb.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      thumb.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
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
              {index + 1}/{totalImages}
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
  );
};

export default BarbershopGallery;
