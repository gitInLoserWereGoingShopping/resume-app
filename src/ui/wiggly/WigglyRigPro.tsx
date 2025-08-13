import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./wiggly-rig.css";

type Droplet = {
  id: number;
  dx: number;
  dy: number;
  size: number;
  duration: number;
  delay: number;
};

export interface PhysicsConfig {
  angleCenterDeg?: number; // default -90 (straight up)
  angleSpreadDeg?: number; // total spread around center; default 40
  powerMin?: number; // default 60
  powerMax?: number; // default 120
  sizeMin?: number; // px, default 3
  sizeMax?: number; // px, default 8
  durationMin?: number; // ms, default 650
  durationMax?: number; // ms, default 1200
  delayMax?: number; // ms, default 120
}

export interface WigglyRigProProps extends PhysicsConfig {
  className?: string;
  size?: number;
  idle?: boolean;
  colorRig?: string;
  colorOil?: string;
  droplets?: number;
  onErupt?: () => void;
  ariaLabel?: string;
  /** For Storybook/testing: override prefers-reduced-motion */
  forceReducedMotion?: boolean | null;
}

export default function WigglyRigPro({
  className,
  size = 160,
  idle = true,
  colorRig = "#2b2f36",
  colorOil = "#0b0b0b",
  droplets = 14,
  onErupt,
  ariaLabel = "Drilling rig (click to gush oil)",
  forceReducedMotion = null,
  angleCenterDeg = -90,
  angleSpreadDeg = 80,
  powerMin = 60,
  powerMax = 125,
  sizeMin = 3,
  sizeMax = 8,
  durationMin = 650,
  durationMax = 1200,
  delayMax = 120,
}: WigglyRigProProps) {
  const [erupts, setErupts] = useState(false);
  const [spray, setSpray] = useState<Droplet[]>([]);
  const idRef = useRef(0);

  const nozzle = useMemo(() => ({ x: 80, y: 18 }), []);

  const rand = (min: number, max: number) => min + Math.random() * (max - min);

  const makeDroplets = useCallback((): Droplet[] => {
    const arr: Droplet[] = [];
    for (let i = 0; i < droplets; i++) {
      const half = angleSpreadDeg / 2;
      const angle = (angleCenterDeg + rand(-half, half)) * (Math.PI / 180);
      const power = rand(powerMin, powerMax);
      const dx = Math.cos(angle) * power;
      const dy = Math.sin(angle) * power;
      arr.push({
        id: ++idRef.current,
        dx,
        dy,
        size: rand(sizeMin, sizeMax),
        duration: rand(durationMin, durationMax),
        delay: rand(0, delayMax),
      });
    }
    return arr;
  }, [
    droplets,
    angleCenterDeg,
    angleSpreadDeg,
    powerMin,
    powerMax,
    sizeMin,
    sizeMax,
    durationMin,
    durationMax,
    delayMax,
  ]);

  const erupt = useCallback(() => {
    setErupts(true);
    setSpray(makeDroplets());
    onErupt?.();
    window.setTimeout(() => setErupts(false), 1000);
    window.setTimeout(() => setSpray([]), 1400);
  }, [makeDroplets, onErupt]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      erupt();
    }
  };

  // reduced motion
  const [prefReduced, setPrefReduced] = useState(false);
  useEffect(() => {
    if (forceReducedMotion !== null) {
      setPrefReduced(forceReducedMotion);
      return;
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setPrefReduced(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, [forceReducedMotion]);

  return (
    <button
      className={[
        "wiggly-rig_btn",
        idle && !prefReduced ? "wr_idle" : "",
        erupts ? "wr_rumble" : "",
        className || "",
      ].join(" ")}
      style={{ width: size, height: size }}
      onClick={erupt}
      onMouseOver={erupt}
      onKeyDown={onKeyDown}
      aria-label={ariaLabel}
      title="Click to gush oil"
      type="button"
    >
      <svg
        className="wiggly-rig_svg"
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-hidden="true"
      >
        {/* Ground pad under rig stays fixed */}
        <g className="wr_pad">
          <rect x="0" y="120" width="160" height="2`0" fill="#e6e2da" />
          <rect x="0" y="120" width="160" height="6" fill="#c7bfb2" />
        </g>

        {/* Oil plume stays anchored to nozzle */}
        <g
        //   className={`wr_plume ${erupts ? "wr_plume--active" : ""}`}
        //   transform={`translate(${nozzle.x}, ${nozzle.y})`}
        >
          <path
            d="M0 0 C -6 -12, 6 -12, 0 -28 C -4 -18, 4 -18, 0 0 Z"
            fill={colorOil}
          />
          <circle cx="-6" cy="-18" r="2.5" fill={colorOil} />
          <circle cx="6" cy="-16" r="2" fill={colorOil} />
        </g>

        {/* Rig tower*/}
        <g
          className="wr_tower"
          stroke={colorRig}
          fill="none"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path d="M50 120 L80 20 L110 120 Z" />
          <path d="M60 100 L100 100" />
          <path d="M55 85 L105 85" />
          <path d="M62 70 L98 70" />
          <path d="M67 55 L93 55" />
          <path d="M72 40 L88 40" />
          <path d="M55 115 L80 95 L105 115" />
          <path d="M60 100 L80 85 L100 100" />
          <path d="M65 85 L80 75 L95 85" />
          <path d="M70 70 L80 62 L90 70" />
          <path d="M74 55 L80 50 L86 55" />
          <rect
            x="70"
            y="18"
            width="20"
            height="6"
            fill={colorRig}
            stroke="none"
          />
          <path d="M80 24 L80 120" stroke={colorRig} />
        </g>
        <circle cx={nozzle.x} cy={nozzle.y} r="0.5" fill="transparent" />
      </svg>

      <div className="wr_droplets">
        {spray.map((d) => (
          <span
            key={d.id}
            className="wr_drop"
            style={
              {
                "--dx": `${d.dx}px`,
                "--dy": `${d.dy}px`,
                "--dur": `${d.duration}ms`,
                "--delay": `${d.delay}ms`,
                "--sz": `${d.size}px`,
                "--oil": colorOil,
                left: `80px`, // nozzle.x
                top: `18px`, // nozzle.y
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </button>
  );
}
