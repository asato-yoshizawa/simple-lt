import { Link } from "react-router-dom";

interface SlideModule {
  default: React.ComponentType;
  metadata?: {
    title?: string;
    author?: string;
    date?: string;
  };
}

const slideModules = import.meta.glob<SlideModule>("../slides/*.mdx", {
  eager: true,
});

export default function SlideList() {
  const slides = Object.entries(slideModules).map(([path, module]) => {
    const filename = path.split("/").pop() || "";
    const metadata = module.metadata || {};

    // Extract info from filename if metadata is not available
    const [author, ...titleParts] = filename.replace(".mdx", "").split("_");

    return {
      filename,
      title:
        metadata.title || titleParts.join("_").replace(/-/g, " ") || "Untitled",
      author: metadata.author || author || "Unknown",
      path,
    };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">LT Slides</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <Link
            key={slide.filename}
            to={`/view/${encodeURIComponent(slide.filename)}`}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {slide.title}
            </h2>
            <div className="text-sm text-gray-600">
              <p>By: {slide.author}</p>
            </div>
          </Link>
        ))}
      </div>

      {slides.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No slides found</p>
          <p className="text-sm text-gray-400">
            Add MDX files to the src/slides/ directory
          </p>
        </div>
      )}
    </div>
  );
}
