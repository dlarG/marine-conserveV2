import { useEffect, useMemo, useRef, useState } from "react";

const AboutHeroSkeleton = () => {
  return (
    <header className="relative w-full h-[50vh] min-h-[260px] overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(110deg, rgba(255,255,255,0) 25%, rgba(255,255,255,.10) 50%, rgba(255,255,255,0) 75%)",
          backgroundSize: "200% 100%",
          animation: "aboutHeroSkeleton 1.2s linear infinite",
        }}
        aria-hidden="true"
      />

      <div className="relative h-full max-w-7xl mx-auto px-4 flex mt-30">
        <div className="max-w-2xl w-full">
          <div className="h-10 md:h-14 w-64 md:w-96 rounded bg-white/15" />
          <div className="mt-5 space-y-3">
            <div className="h-4 w-full rounded bg-white/10" />
            <div className="h-4 w-11/12 rounded bg-white/10" />
            <div className="h-4 w-9/12 rounded bg-white/10" />
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <div className="h-11 w-32 rounded-full bg-teal-500/30" />
            <div className="h-11 w-40 rounded-full bg-white/10" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes aboutHeroSkeleton {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </header>
  );
};

const HistoryHero = ({
  title = "What We Do",
  subtitle = "We at GREEN Inc. protect and restore marine ecosystems through community-led conservation, research, and education.",
  backgroundVideoUrl = "https://res.cloudinary.com/dfsxmtyxk/video/upload/v1774838153/17454115-uhd_3840_2160_25fps_tkhd3n.mp4",
  maxWaitMs = 1200,
  onReady,
}) => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [forceShow, setForceShow] = useState(false);
  const notifiedRef = useRef(false);

  const shouldShowContent = useMemo(
    () => isVideoReady || forceShow,
    [isVideoReady, forceShow]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setForceShow(true), maxWaitMs);
    return () => clearTimeout(t);
  }, [maxWaitMs]);

  useEffect(() => {
    if (shouldShowContent && !notifiedRef.current) {
      notifiedRef.current = true;
      onReady?.();
    }
  }, [shouldShowContent, onReady]);

  if (!shouldShowContent) return <AboutHeroSkeleton />;

  return (
    <header className="relative w-full h-[50vh] min-h-[260px] overflow-hidden bg-black">
      <video
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          isVideoReady ? "opacity-100" : "opacity-0"
        }`}
        src={backgroundVideoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onLoadedData={() => setIsVideoReady(true)}
        onCanPlayThrough={() => setIsVideoReady(true)}
        onError={() => setForceShow(true)}
      />

      {!isVideoReady && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
          aria-hidden="true"
        />
      )}

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/60"
        aria-hidden="true"
      />

      <div className="relative h-full max-w-7xl mx-auto px-4 flex mt-30">
        <div className="max-w-2xl">
          <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-white">
            {title}
          </h1>

          <p className="mt-4 text-sm md:text-base text-white/85 leading-relaxed">
            {subtitle}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#team-content"
              className="px-4 py-2 text-sm rounded-full bg-teal-600 text-white font-normal hover:bg-teal-700 transition-colors"
            >
              Explore Posts
            </a>
            <a
              href="/donate"
              className="px-4 py-2 text-sm rounded-full bg-white/10 text-white font-normal border border-white/20 hover:bg-white/15 transition-colors"
            >
              Support our work
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HistoryHero;
