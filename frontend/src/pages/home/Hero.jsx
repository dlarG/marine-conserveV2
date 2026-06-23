import { useRef, useEffect, useCallback, useState } from "react";

// ─── Spotlight config ─────────────────────────────────────────────────────────
const SPOTLIGHT = {
  radius: 150,
  feather: 150,
  glowRadius: 60,
  enterSpeed: 0.1,
  leaveSpeed: 0.07,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function coverFit(imgW, imgH, canvasW, canvasH) {
  const ir = imgW / imgH;
  const cr = canvasW / canvasH;
  let sw, sh, sx, sy;
  if (ir > cr) {
    sh = imgH;
    sw = sh * cr;
    sx = (imgW - sw) / 2;
    sy = 0;
  } else {
    sw = imgW;
    sh = sw / cr;
    sx = 0;
    sy = (imgH - sh) / 2;
  }
  return { sx, sy, sw, sh };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CoralSpotlight() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const stateRef = useRef({
    healthyImg: null,
    deadImg: null,
    mouse: null,
    alpha: 0,
    targetAlpha: 0,
    imageOpacity: 0, // For image fade-in
    targetImageOpacity: 1, // Target full opacity
  });

  const [loaded, setLoaded] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: -300, y: -300, on: false });
  const [contentVisible, setContentVisible] = useState(false);

  // ── Trigger content animation after load ──────────────────────────────────
  useEffect(() => {
    if (loaded) {
      // Stagger the content animation slightly after image starts fading in
      const timer = setTimeout(() => {
        setContentVisible(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  // ── Resize ─────────────────────────────────────────────────────────────────
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const { width, height } = container.getBoundingClientRect();
    if (
      canvas.width !== Math.round(width) ||
      canvas.height !== Math.round(height)
    ) {
      canvas.width = Math.round(width);
      canvas.height = Math.round(height);
    }
  }, []);

  // ── Paint one frame ────────────────────────────────────────────────────────
  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = stateRef.current;
    if (!s.healthyImg || !s.deadImg) return;

    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    // Lerp image opacity for fade-in effect
    const imageFadeSpeed = 0.03;
    s.imageOpacity += (s.targetImageOpacity - s.imageOpacity) * imageFadeSpeed;

    // Lerp alpha toward target each frame → smooth enter / leave fade
    const speed =
      s.targetAlpha > s.alpha ? SPOTLIGHT.enterSpeed : SPOTLIGHT.leaveSpeed;
    s.alpha += (s.targetAlpha - s.alpha) * speed;
    const a = s.alpha;

    // Clear canvas
    ctx.clearRect(0, 0, W, H);

    // Apply global alpha for image fade-in
    ctx.save();
    ctx.globalAlpha = s.imageOpacity;

    // ── 1. Draw healthy reef as permanent base ──────────────────────────────
    const hf = coverFit(s.healthyImg.width, s.healthyImg.height, W, H);
    ctx.drawImage(s.healthyImg, hf.sx, hf.sy, hf.sw, hf.sh, 0, 0, W, H);

    // ── 2. Build dead reef layer with spotlight hole ────────────────────────
    const off = document.createElement("canvas");
    off.width = W;
    off.height = H;
    const oc = off.getContext("2d");

    const df = coverFit(s.deadImg.width, s.deadImg.height, W, H);
    oc.drawImage(s.deadImg, df.sx, df.sy, df.sw, df.sh, 0, 0, W, H);

    if (s.mouse && a > 0.001) {
      const { x, y } = s.mouse;
      const innerR = SPOTLIGHT.radius;
      const outerR = SPOTLIGHT.radius + SPOTLIGHT.feather;

      const grad = oc.createRadialGradient(x, y, 0, x, y, outerR);
      grad.addColorStop(0, `rgba(0,0,0,${a})`);
      grad.addColorStop((innerR / outerR) * 0.6, `rgba(0,0,0,${a})`);
      grad.addColorStop(innerR / outerR, `rgba(0,0,0,${a * 0.85})`);
      grad.addColorStop((innerR / outerR) * 1.35, `rgba(0,0,0,${a * 0.55})`);
      grad.addColorStop((innerR / outerR) * 1.65, `rgba(0,0,0,${a * 0.22})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");

      oc.globalCompositeOperation = "destination-out";
      oc.fillStyle = grad;
      oc.beginPath();
      oc.arc(x, y, outerR, 0, Math.PI * 2);
      oc.fill();
      oc.globalCompositeOperation = "source-over";
    }

    ctx.drawImage(off, 0, 0);

    // ── 3. Bioluminescent rim glow ────
    if (s.mouse && a > 0.01) {
      const { x, y } = s.mouse;
      const rimR = SPOTLIGHT.radius + SPOTLIGHT.feather * 0.5;

      const rimGrad = ctx.createRadialGradient(
        x,
        y,
        SPOTLIGHT.radius * 0.7,
        x,
        y,
        rimR
      );
      rimGrad.addColorStop(0, "rgba(0,0,0,0)");
      rimGrad.addColorStop(0.5, `rgba(0,200,255,${0.06 * a})`);
      rimGrad.addColorStop(0.8, `rgba(60,160,230,${0.1 * a})`);
      rimGrad.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = rimGrad;
      ctx.beginPath();
      ctx.arc(x, y, rimR, 0, Math.PI * 2);
      ctx.fill();
    }

    // ── 4. Vignette + bottom gradient ───────────────────
    const vign = ctx.createRadialGradient(
      W / 2,
      H / 2,
      H * 0.3,
      W / 2,
      H / 2,
      H * 0.85
    );
    vign.addColorStop(0, "rgba(0,0,0,0)");
    vign.addColorStop(1, "rgba(0,8,20,0.35)");
    ctx.fillStyle = vign;
    ctx.fillRect(0, 0, W, H);

    const btm = ctx.createLinearGradient(0, H * 0.55, 0, H);
    btm.addColorStop(0, "rgba(2,12,24,0)");
    btm.addColorStop(1, "rgba(2,12,24,0.68)");
    ctx.fillStyle = btm;
    ctx.fillRect(0, 0, W, H);

    ctx.restore();
  }, []);

  // ── RAF loop ───────────────────────────────────────────────────────────────
  const loop = useCallback(() => {
    paint();
    // eslint-disable-next-line react-hooks/immutability
    rafRef.current = requestAnimationFrame(loop);
  }, [paint]);

  // ── Init ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [healthy, dead] = await Promise.all([
          loadImage("/hero/healthy_corals.png"),
          loadImage("/hero/unhealthy_corals.png"),
        ]);
        if (cancelled) return;
        stateRef.current.healthyImg = healthy;
        stateRef.current.deadImg = dead;
        resize();
        setLoaded(true);
        rafRef.current = requestAnimationFrame(loop);
      } catch (err) {
        console.error("Image load failed:", err);
      }
    })();
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loop, resize]);

  // ── Resize observer ────────────────────────────────────────────────────────
  useEffect(() => {
    const ro = new ResizeObserver(resize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [resize]);

  // ── Pointer events ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const toCanvas = (cx, cy) => {
      const r = canvas.getBoundingClientRect();
      return { x: cx - r.left, y: cy - r.top };
    };

    const onMove = (e) => {
      const pos = toCanvas(e.clientX, e.clientY);
      stateRef.current.mouse = pos;
      stateRef.current.targetAlpha = 1;
      setGlowPos({ x: e.clientX, y: e.clientY, on: true });
    };

    const onTouch = (e) => {
      e.preventDefault();
      const t = e.touches[0];
      const pos = toCanvas(t.clientX, t.clientY);
      stateRef.current.mouse = pos;
      stateRef.current.targetAlpha = 1;
      setGlowPos({ x: t.clientX, y: t.clientY, on: true });
    };

    const onLeave = () => {
      stateRef.current.targetAlpha = 0;
      setGlowPos((g) => ({ ...g, on: false }));
    };

    canvas.addEventListener("mousemove", onMove, { passive: true });
    canvas.addEventListener("touchmove", onTouch, { passive: false });
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchend", onLeave);
    canvas.addEventListener("mouseenter", (e) => {
      stateRef.current.mouse = toCanvas(e.clientX, e.clientY);
      stateRef.current.targetAlpha = 1;
    });

    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchend", onLeave);
    };
  }, []);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#010c18",
        cursor: "none",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Main canvas */}
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />

      {/* Loading screen */}
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#010c18",
            color: "#5cc8e8",
            gap: "18px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              border: "3px solid rgba(92,200,232,0.18)",
              borderTopColor: "#5cc8e8",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <span
            style={{
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            Diving in…
          </span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Hero Content - Centered Layout with Fade-in Animation */}
      {loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
            padding: "0 24px",
            pointerEvents: "none",
          }}
        >
          {/* Top Label */}
          <p
            style={{
              fontSize: "clamp(9px,1.1vw,12px)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#5cc8e8",
              marginBottom: "16px",
              fontWeight: 600,
              opacity: contentVisible ? 0.9 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
              transitionDelay: "0.2s",
            }}
          >
            Coral Restoration Project since 2013
          </p>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: "clamp(36px,6vw,80px)",
              fontWeight: 800,
              lineHeight: 1.08,
              margin: "0 0 20px",
              letterSpacing: "-0.03em",
              maxWidth: "800px",
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
              transitionDelay: "0.4s",
            }}
          >
            What We Stand
            <br />
            To Lose
          </h1>

          {/* Description */}
          <p
            className="mt-4 text-base md:text-lg text-white/85 leading-relaxed"
            style={{
              fontSize: "clamp(14px,1.3vw,17px)",
              opacity: contentVisible ? 0.75 : 0,
              maxWidth: "900px",
              lineHeight: 1.7,
              margin: "0 0 36px",
              color: "white",
              fontWeight: 600,
              transform: contentVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
              transitionDelay: "0.6s",
            }}
          >
            GREEN, Inc. launches a full-time marine conservation operation in
            Malitbog, Southern Leyte, focusing on coral restoration, marine
            debris removal, and science-based conservation to protect Sogod
            Bay's rich marine ecosystems.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
              pointerEvents: "auto",
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
              transitionDelay: "0.8s",
            }}
          >
            <button
              style={{
                padding: "15px 34px",
                backgroundColor: "#0d9488",
                color: "#fff",
                border: "none",
                borderRadius: "50px",
                fontSize: "clamp(13px,1.1vw,15px)",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.02em",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(13,148,136,0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#0f766e";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(13,148,136,0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#0d9488";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(13,148,136,0.3)";
              }}
            >
              Support Our Mission
            </button>
            <button
              style={{
                padding: "15px 34px",
                backgroundColor: "transparent",
                color: "#fff",
                border: "2px solid rgba(255,255,255,0.5)",
                borderRadius: "50px",
                fontSize: "clamp(13px,1.1vw,15px)",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.02em",
                transition: "all 0.3s ease",
                backdropFilter: "blur(4px)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(255,255,255,0.12)";
                e.target.style.borderColor = "rgba(255,255,255,0.8)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.borderColor = "rgba(255,255,255,0.5)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Explore Our Impact
            </button>
          </div>
        </div>
      )}

      {loaded && (
        <div
          style={{
            position: "absolute",
            top: "22%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
            color: "rgba(255,255,255,0.5)",
            fontSize: "clamp(10px,1.1vw,13px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textAlign: "center",
            opacity: contentVisible ? 1 : 0,
            transition: "opacity 1s ease-out",
            transitionDelay: "1s",
            animation: contentVisible
              ? "breathe 3.5s ease-in-out infinite"
              : "none",
          }}
        ></div>
      )}

      {/* Custom cursor orb */}
      {loaded && (
        <div
          style={{
            position: "fixed",
            left: glowPos.x,
            top: glowPos.y,
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
            zIndex: 200,
            opacity: glowPos.on ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          {/* Diffuse outer halo */}
          <div
            style={{
              position: "absolute",
              width: `${SPOTLIGHT.glowRadius * 1.6}px`,
              height: `${SPOTLIGHT.glowRadius * 1.6}px`,
              top: `${-SPOTLIGHT.glowRadius * 0.8}px`,
              left: `${-SPOTLIGHT.glowRadius * 0.8}px`,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(40,180,255,0.13) 0%, rgba(0,120,210,0.04) 55%, transparent 75%)",
              animation: "pulse 2.4s ease-in-out infinite",
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1);    opacity: 1;    }
          50%       { transform: scale(1.15); opacity: 0.72; }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
