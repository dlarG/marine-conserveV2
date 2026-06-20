import { useRef, useEffect, useCallback, useState } from "react";

// ─── Spotlight config ─────────────────────────────────────────────────────────
const SPOTLIGHT = {
  radius: 140, // px – fully transparent core (healthy reef fully visible)
  feather: 200, // px – soft edge width beyond core
  glowRadius: 170, // px – CSS cursor glow ring size
  enterSpeed: 0.1, // lerp factor per frame when cursor enters (0–1)
  leaveSpeed: 0.07, // lerp factor per frame when cursor leaves
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

  // All mutable render state lives here — zero React re-renders per frame
  const stateRef = useRef({
    healthyImg: null,
    deadImg: null,
    mouse: null, // {x, y} canvas coords, or null when outside
    alpha: 0, // current interpolated reveal strength (0 = dead, 1 = full spotlight)
    targetAlpha: 0, // 1 when hovering, 0 when not
  });

  const [loaded, setLoaded] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: -300, y: -300, on: false });

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

    // Lerp alpha toward target each frame → smooth enter / leave fade
    const speed =
      s.targetAlpha > s.alpha ? SPOTLIGHT.enterSpeed : SPOTLIGHT.leaveSpeed;
    s.alpha += (s.targetAlpha - s.alpha) * speed;
    const a = s.alpha; // convenience

    // ── 1. Draw healthy reef as permanent base ──────────────────────────────
    const hf = coverFit(s.healthyImg.width, s.healthyImg.height, W, H);
    ctx.drawImage(s.healthyImg, hf.sx, hf.sy, hf.sw, hf.sh, 0, 0, W, H);

    // ── 2. Build dead reef layer with spotlight hole ────────────────────────
    //
    // Strategy: draw the dead reef onto an offscreen canvas, then paint a
    // radial gradient on top of it using "destination-out" compositing.
    // The gradient erases the dead reef in a soft circle at the cursor,
    // scaled by the current alpha (so entering / leaving eases smoothly).
    // Then stamp the offscreen onto the main canvas.
    //
    // This is recalculated from scratch every single frame — no state carried
    // between frames, no persistent mask.

    const off = document.createElement("canvas");
    off.width = W;
    off.height = H;
    const oc = off.getContext("2d");

    // Draw dead reef
    const df = coverFit(s.deadImg.width, s.deadImg.height, W, H);
    oc.drawImage(s.deadImg, df.sx, df.sy, df.sw, df.sh, 0, 0, W, H);

    // Punch spotlight hole only when cursor is present and alpha > 0
    if (s.mouse && a > 0.001) {
      const { x, y } = s.mouse;
      const innerR = SPOTLIGHT.radius;
      const outerR = SPOTLIGHT.radius + SPOTLIGHT.feather;

      const grad = oc.createRadialGradient(x, y, 0, x, y, outerR);
      //  center → clear (erases dead reef most here)
      //  edge   → opaque (dead reef fully restored here)
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

    // Stamp masked dead reef over the healthy base
    ctx.drawImage(off, 0, 0);

    // ── 3. Bioluminescent rim glow on canvas (inside the spotlight edge) ────
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

    // ── 4. Vignette + bottom gradient (purely aesthetic) ───────────────────
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
      // keep stateRef.current.mouse for the fade-out animation,
      // clear it once alpha reaches ~0 (handled in paint loop naturally)
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

      {/* Hero text */}
      {loaded && (
        <div
          style={{
            position: "absolute",
            bottom: "9%",
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            color: "#fff",
            padding: "0 24px",
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              fontSize: "clamp(9px,1.1vw,12px)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#5cc8e8",
              marginBottom: "12px",
              fontWeight: 600,
            }}
          >
            Coral Restoration Project
          </p>
          <h1
            style={{
              fontSize: "clamp(30px,5.2vw,68px)",
              fontWeight: 800,
              lineHeight: 1.06,
              margin: "0 0 14px",
              letterSpacing: "-0.025em",
            }}
          >
            What We Stand
            <br />
            To Lose
          </h1>
          <p
            style={{
              fontSize: "clamp(12px,1.4vw,16px)",
              opacity: 0.68,
              maxWidth: "420px",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Hover to shine a restoration light — and see the
            <br />
            living reef hidden beneath the bleached surface.
          </p>
        </div>
      )}

      {/* Hint */}
      {loaded && (
        <div
          style={{
            position: "absolute",
            top: "38%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
            color: "rgba(255,255,255,0.42)",
            fontSize: "clamp(10px,1.1vw,13px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textAlign: "center",
            animation: "breathe 3.5s ease-in-out infinite",
          }}
        >
          ✦ &nbsp; Shine your light &nbsp; ✦
        </div>
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
          {/* Mid ring */}
          <div
            style={{
              position: "absolute",
              width: "56px",
              height: "56px",
              top: "-28px",
              left: "-28px",
              borderRadius: "50%",
              border: "1.5px solid rgba(100,210,255,0.28)",
              boxShadow: "0 0 12px 2px rgba(60,180,240,0.15)",
            }}
          />
          {/* Inner bright dot */}
          <div
            style={{
              position: "absolute",
              width: "8px",
              height: "8px",
              top: "-4px",
              left: "-4px",
              borderRadius: "50%",
              background: "rgba(220,245,255,0.97)",
              boxShadow:
                "0 0 6px 3px rgba(100,210,255,0.7), 0 0 18px 8px rgba(40,170,230,0.35)",
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
          0%, 100% { opacity: 0.42; }
          50%       { opacity: 0.18; }
        }
      `}</style>
    </div>
  );
}
