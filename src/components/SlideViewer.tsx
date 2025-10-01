import { useEffect, useState, useRef, Suspense, useCallback } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import "../styles/slides.css";

interface SlideModule {
  default: React.ComponentType;
  metadata?: {
    title?: string;
    author?: string;
    date?: string;
  };
}

const slideModules = import.meta.glob<SlideModule>("../slides/*.mdx");

export default function SlideViewer() {
  const { filename } = useParams<{ filename: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [SlideComponent, setSlideComponent] =
    useState<React.ComponentType | null>(null);
  const [totalSlides, setTotalSlides] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  // Get current slide from URL
  const currentSlide = parseInt(searchParams.get("slide") || "1", 10) - 1;

  useEffect(() => {
    async function loadSlide() {
      if (!filename) return;

      try {
        const modulePath = Object.keys(slideModules).find((path) =>
          path.endsWith(filename)
        );

        if (!modulePath) {
          throw new Error("Slide not found");
        }

        const module = await slideModules[modulePath]();
        setSlideComponent(() => module.default);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load slide");
        setLoading(false);
      }
    }

    loadSlide();
  }, [filename]);

  useEffect(() => {
    if (slideRef.current) {
      const slides = slideRef.current.querySelectorAll(".slide");
      setTotalSlides(slides.length);

      // Show only current slide
      slides.forEach((slide, index) => {
        const element = slide as HTMLElement;
        element.style.display = index === currentSlide ? "flex" : "none";
      });
    }
  }, [SlideComponent, currentSlide]);

  // Navigate to a specific slide
  const goToSlide = useCallback(
    (slideIndex: number) => {
      const validIndex = Math.max(0, Math.min(slideIndex, totalSlides - 1));
      setSearchParams({ slide: String(validIndex + 1) });
    },
    [setSearchParams, totalSlides]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goToSlide(currentSlide + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      } else if (e.key === "Escape") {
        e.preventDefault();
        document.exitFullscreen?.();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        containerRef.current?.requestFullscreen?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, totalSlides, goToSlide]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading slide...</div>
      </div>
    );
  }

  if (error || !SlideComponent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 mb-4">{error || "No slides found"}</div>
        <Link to="/" className="text-blue-500 hover:underline">
          Back to slides list
        </Link>
      </div>
    );
  }

  return (
    <MDXProvider>
      <div
        ref={containerRef}
        className="min-h-screen bg-gray-100 flex flex-col"
      >
        <div className="flex-1 flex items-center justify-center p-4">
          <div
            className="bg-white shadow-2xl rounded-lg overflow-hidden"
            style={{
              width: "960px",
              height: "720px",
              maxWidth: "90vw",
              maxHeight: "90vh",
            }}
          >
            <div ref={slideRef} className="w-full h-full">
              <Suspense fallback={<div>Loading...</div>}>
                <SlideComponent />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg px-4 py-3">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="text-blue-500 hover:underline">
              ← Back to list
            </Link>

            <div className="flex items-center gap-4">
              <button
                onClick={() => goToSlide(currentSlide - 1)}
                disabled={currentSlide === 0}
                className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Previous
              </button>

              <span className="text-gray-600">
                {currentSlide + 1} / {totalSlides}
              </span>

              <button
                onClick={() => goToSlide(currentSlide + 1)}
                disabled={currentSlide === totalSlides - 1}
                className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Next
              </button>

              <button
                onClick={() => containerRef.current?.requestFullscreen?.()}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Fullscreen (F)
              </button>
            </div>

            <div className="text-sm text-gray-500">
              Use arrow keys to navigate
            </div>
          </div>
        </div>
      </div>
    </MDXProvider>
  );
}
