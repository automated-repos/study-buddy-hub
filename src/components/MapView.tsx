import { useEffect, useMemo, useState } from "react";
import { geoMercator, geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import type { MapPoint } from "@/lib/mapQuestions";

type Countries = FeatureCollection<Geometry, { name: string }>;

// Natural Earth 1:50m countries, loaded once on first use (kept out of the main bundle)
let cache: Promise<Countries> | null = null;
function loadCountries(): Promise<Countries> {
  cache ??= import("world-atlas/countries-50m.json").then((m) => {
    const topo = (m.default ?? m) as unknown as Parameters<typeof feature>[0];
    const objects = topo.objects as unknown as Record<string, Parameters<typeof feature>[1]>;
    return feature(topo, objects.countries) as unknown as Countries;
  });
  return cache;
}

const W = 640;
const H = 420;

/** Draws a map of an area with some countries highlighted and places marked. */
export function MapView({
  fit,
  highlight = [],
  points = [],
  refs = [],
  showLabels = false,
}: {
  fit: [number, number, number, number];
  highlight?: string[];
  points?: MapPoint[];
  /** grey reference places, always labelled */
  refs?: MapPoint[];
  /** show point labels (study mode) */
  showLabels?: boolean;
}) {
  const [countries, setCountries] = useState<Countries | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    loadCountries().then(
      (c) => alive && setCountries(c),
      () => alive && setFailed(true),
    );
    return () => {
      alive = false;
    };
  }, []);

  const { path, project } = useMemo(() => {
    const [w, s, e, n] = fit;
    const world = e - w > 200;
    const projection = (world ? geoNaturalEarth1() : geoMercator()).fitExtent(
      [
        [8, 8],
        [W - 8, H - 8],
      ],
      {
        type: "MultiPoint",
        coordinates: [
          [w, s],
          [e, s],
          [e, n],
          [w, n],
          [(w + e) / 2, (s + n) / 2],
        ],
      },
    );
    return { path: geoPath(projection), project: (p: [number, number]) => projection(p) };
  }, [fit]);

  if (failed) return <div className="text-sm text-destructive p-4">تعذّر تحميل الخريطة.</div>;
  if (!countries)
    return (
      <div className="aspect-[640/420] rounded-2xl bg-muted/40 animate-pulse flex items-center justify-center text-sm">
        جارٍ تحميل الخريطة…
      </div>
    );

  const hl = new Set(highlight);
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full rounded-2xl border border-border"
      style={{ background: "#0e2a47" }}
      role="img"
    >
      <defs>
        <clipPath id="map-clip">
          <rect width={W} height={H} rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#map-clip)">
        {countries.features.map((f, i) => (
          <path
            key={i}
            d={path(f) ?? undefined}
            fill={hl.has(f.properties.name) ? "#f59e0b" : "#d6dbe3"}
            stroke="#5b6b80"
            strokeWidth={0.5}
          />
        ))}
        {refs.map((p, i) => {
          const xy = project([p.lon, p.lat]);
          if (!xy) return null;
          return (
            <g key={`r${i}`}>
              <circle cx={xy[0]} cy={xy[1]} r={4} fill="#475569" stroke="#fff" strokeWidth={1.5} />
              <text
                x={xy[0]}
                y={xy[1] + 18}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="#334155"
                stroke="#fff"
                strokeWidth="3"
                paintOrder="stroke"
              >
                {p.label}
              </text>
            </g>
          );
        })}
        {points.map((p, i) => {
          const xy = project([p.lon, p.lat]);
          if (!xy) return null;
          return (
            <g key={`p${i}`}>
              <circle cx={xy[0]} cy={xy[1]} r={14} fill="#ef4444" opacity={0.25}>
                <animate attributeName="r" values="8;18;8" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle cx={xy[0]} cy={xy[1]} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2} />
              {showLabels && p.label && (
                <text
                  x={xy[0]}
                  y={xy[1] - 12}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="800"
                  fill="#111827"
                  stroke="#fff"
                  strokeWidth="4"
                  paintOrder="stroke"
                >
                  {p.label}
                </text>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
