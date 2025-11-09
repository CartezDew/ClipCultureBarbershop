import React, { useEffect, useRef, useState } from "react";
import "../styles/barbershop_gallery.css";

const images = import.meta.glob("/src/assets/gallery/*.webp", { eager: true });

const BarbershopGallery = () => {
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const thumbRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const imageEntries = Object.entries(images);
  const totalImages = imageEntries.length;

  // helper
  const updateUI = () => {
    const slider = sliderRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!slider || !track || !thumb) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;

    // update thumb position
    const ratio = maxScroll > 0 ? slider.scrollLeft / maxScroll : 0;
    const maxThumbLeft = track.clientWidth - thumb.offsetWidth;
    thumb.style.left = `${ratio * Math.max(maxThumbLeft, 0)}px`;

    // button visibility with a small tolerance
    const AT_START_TOL = 2;
    const AT_END_TOL = 2;
    const atStart = slider.scrollLeft <= AT_START_TOL;
    const atEnd = slider.scrollLeft >= maxScroll - AT_END_TOL;

    setCanScrollLeft(!atStart);
    setCanScrollRight(!atEnd);
  };

  // sync on scroll & resize
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    updateUI();
    slider.addEventListener("scroll", updateUI);
    window.addEventListener("resize", updateUI);

    return () => {
      slider.removeEventListener("scroll", updateUI);
      window.removeEventListener("resize", updateUI);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const maxLeft = track.clientWidth - thumb.offsetWidth;
      let newLeft = startLeft + dx;
      if (newLeft < 0) newLeft = 0;
      if (newLeft > maxLeft) newLeft = maxLeft;
      thumb.style.left = `${newLeft}px`;

      // scroll slider according to thumb
      const scrollRatio = maxLeft > 0 ? newLeft / maxLeft : 0;
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      slider.scrollLeft = scrollRatio * maxScroll;

      // update buttons too
      updateUI();
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      thumb.classList.remove("active");
      document.body.style.userSelect = "";
      updateUI();
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

  const handleScroll = (dir) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const amount = 350;
    slider.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
    // small timeout to let smooth scroll happen, then recalc buttons
    setTimeout(updateUI, 220);
  };

  return (
    <div className="barbershop-gallery-section">
      {canScrollLeft && (
        <button
          type="button"
          className="gallery-nav-btn gallery-nav-left"
          onClick={() => handleScroll("left")}
          aria-label="Scroll left"
        >
          ‹
        </button>
      )}

      <div className="gallery-slider-wrapper" ref={sliderRef}>
        {imageEntries.map(([path, module], index) => (
          <div className="gallery-image-wrapper" key={index}>
            <img
              src={module.default}
              alt={`Barbershop gallery image ${index + 1}`}
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
          onClick={() => handleScroll("right")}
          aria-label="Scroll right"
        >
          ›
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
