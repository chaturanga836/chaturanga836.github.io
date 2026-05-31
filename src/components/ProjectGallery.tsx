import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectScreenshot } from "../data/types";

interface ProjectGalleryProps {
  screenshots: ProjectScreenshot[];
}

export default function ProjectGallery({ screenshots }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((index) =>
      index === null ? null : (index - 1 + screenshots.length) % screenshots.length
    );
  }, [screenshots.length]);

  const showNext = useCallback(() => {
    setActiveIndex((index) =>
      index === null ? null : (index + 1) % screenshots.length
    );
  }, [screenshots.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, showNext, showPrev]);

  if (screenshots.length === 0) return null;

  const active = activeIndex === null ? null : screenshots[activeIndex];

  return (
    <>
      <div className="project-gallery">
        <p className="project-gallery-label">Screenshots</p>
        <div className="project-gallery-grid">
          {screenshots.map((shot, index) => (
            <button
              key={shot.src}
              type="button"
              className="project-gallery-thumb"
              onClick={() => setActiveIndex(index)}
              aria-label={`View screenshot: ${shot.caption}`}
            >
              <img src={shot.src} alt={shot.caption} loading="lazy" />
              <span className="project-gallery-caption">{shot.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {active && activeIndex !== null && (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={close}
        >
          <div className="project-lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="project-lightbox-close" onClick={close} aria-label="Close">
              <X size={20} />
            </button>
            <button type="button" className="project-lightbox-nav project-lightbox-prev" onClick={showPrev} aria-label="Previous screenshot">
              <ChevronLeft size={24} />
            </button>
            <figure className="project-lightbox-figure">
              <img src={active.src} alt={active.caption} />
              <figcaption>{active.caption}</figcaption>
              <p className="project-lightbox-count">
                {activeIndex + 1} / {screenshots.length}
              </p>
            </figure>
            <button type="button" className="project-lightbox-nav project-lightbox-next" onClick={showNext} aria-label="Next screenshot">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
