/**
 * Procedural ink brushstrokes: the site's signature mark.
 *
 * A stroke follows a "spine" (one or more cubic Bézier segments). Its body is a filled
 * shape with rough edges that starts heavy and loaded, then breaks into dry bristle
 * streaks towards the tail, with a spray of ink dots behind the start, like a real
 * brush dragged across paper. Everything is seeded, so the same options always give
 * the same SVG: strokes are generated once at build time and ship as static markup.
 */

type Pt = [number, number];
/** A cubic Bézier segment: start, control 1, control 2, end. Consecutive segments share end/start points. */
export type Segment = [Pt, Pt, Pt, Pt];

export type BrushOptions = {
  spine: Segment[];
  /** Full width of the loaded brush, in viewBox units. */
  width: number;
  seed: number;
  /** Where the solid ink gives way to dry bristles, 0-1 along the spine (default 0.62). */
  dryFrom?: number;
  /** Number of ink dots sprayed behind the start (default 18). */
  splatter?: number;
  /** Edge roughness as a fraction of the width (default 0.05). */
  roughness?: number;
};

export type Brush = {
  /** The solid ink body. */
  body: string;
  /** Dry-brush streaks, grouped by stroke width so each group is one path. */
  bristles: { d: string; width: number }[];
  /** Wet highlights on the body (drawn in a lighter tone at low opacity). */
  sheen: string;
  dots: { x: number; y: number; r: number }[];
  /** The centreline, for mask reveals that "paint" the stroke along its length. */
  spinePath: string;
  /** Approximate spine length, for stroke-dasharray. */
  length: number;
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Smooth 1D value noise in [-1, 1], from a seeded lattice. */
function noise1d(rand: () => number, cells: number) {
  const lattice = Array.from({ length: cells + 2 }, () => rand() * 2 - 1);
  return (x: number) => {
    const p = Math.max(0, Math.min(1, x)) * cells;
    const i = Math.floor(p);
    const f = p - i;
    const s = f * f * (3 - 2 * f);
    return lattice[i]! * (1 - s) + lattice[i + 1]! * s;
  };
}

function cubic([p0, p1, p2, p3]: Segment, t: number): Pt {
  const u = 1 - t;
  const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
  return [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]];
}

/** Samples the spine evenly by arc length, with unit normals. */
function sampleSpine(spine: Segment[], n: number) {
  const dense: Pt[] = [];
  for (const seg of spine) for (let i = 0; i <= 200; i++) dense.push(cubic(seg, i / 200));
  const acc = [0];
  for (let i = 1; i < dense.length; i++) {
    acc.push(acc[i - 1]! + Math.hypot(dense[i]![0] - dense[i - 1]![0], dense[i]![1] - dense[i - 1]![1]));
  }
  const length = acc[acc.length - 1]!;
  const pts: { p: Pt; n: Pt }[] = [];
  let j = 0;
  for (let k = 0; k < n; k++) {
    const target = (k / (n - 1)) * length;
    while (j < acc.length - 2 && acc[j + 1]! < target) j++;
    const span = acc[j + 1]! - acc[j]! || 1;
    const f = (target - acc[j]!) / span;
    const a = dense[j]!, b = dense[j + 1]!;
    const p: Pt = [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
    const tx = b[0] - a[0], ty = b[1] - a[1], tl = Math.hypot(tx, ty) || 1;
    pts.push({ p, n: [-ty / tl, tx / tl] });
  }
  return { pts, length };
}

const fmt = (v: number) => (Math.round(v * 10) / 10).toString();
const poly = (pts: Pt[], close = false) =>
  "M" + pts.map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join("L") + (close ? "Z" : "");

export function brushStroke({ spine, width, seed, dryFrom = 0.62, splatter = 18, roughness = 0.05 }: BrushOptions): Brush {
  const rand = mulberry32(seed);
  const N = 160;
  const { pts, length } = sampleSpine(spine, N);
  const at = (t: number) => pts[Math.max(0, Math.min(N - 1, Math.round(t * (N - 1))))]!;

  // Width: a loaded, slightly blunt start, a long even middle, a gentle fade as the brush dries.
  const wobble = noise1d(rand, 6);
  const widthAt = (t: number) =>
    width * (0.72 + 0.28 * Math.min(1, t / 0.12)) * (1 - 0.25 * Math.max(0, (t - 0.55) / 0.45)) * (1 + 0.06 * wobble(t));
  const lane = (t: number, u: number, jitter = 0): Pt => {
    const { p, n } = at(t);
    const off = (u + jitter) * widthAt(t);
    return [p[0] + n[0] * off, p[1] + n[1] * off];
  };

  // Edge roughness: a slow wave plus fine tooth, independently for each edge.
  const topSlow = noise1d(rand, 9), topFine = noise1d(rand, 70);
  const botSlow = noise1d(rand, 9), botFine = noise1d(rand, 70);
  const edge = (slow: (x: number) => number, fine: (x: number) => number, t: number) =>
    roughness * (slow(t) * 0.7 + fine(t) * 0.45);

  // Bristle lanes across the width. Each lane's solid ink ends at its own point (a ragged
  // dry edge), then continues as broken streaks to its own tail.
  const LANES = 64;
  const lanes = Array.from({ length: LANES }, (_, k) => {
    const u = -0.5 + (k + 0.5) / LANES;
    const edgeFade = 1 - Math.abs(u) * 1.2;
    const solidEnd = dryFrom + (rand() - 0.5) * 0.16;
    const tail = Math.min(1, solidEnd + 0.12 + rand() * 0.5 * Math.max(0.35, edgeFade));
    return { u, solidEnd, tail };
  });

  const top: Pt[] = [], bottom: Pt[] = [];
  const topEnd = lanes[0]!.solidEnd, botEnd = lanes[LANES - 1]!.solidEnd;
  for (let i = 0; i <= 90; i++) {
    const t = (i / 90) * topEnd;
    top.push(lane(t, -0.5, -edge(topSlow, topFine, t)));
  }
  const ragged = lanes.map(({ u, solidEnd }) => lane(solidEnd + (rand() - 0.5) * 0.015, u));
  for (let i = 90; i >= 0; i--) {
    const t = (i / 90) * botEnd;
    bottom.push(lane(t, 0.5, edge(botSlow, botFine, t)));
  }
  // A rounded, slightly uneven heel where the brush first touched the paper.
  const { p: p0, n: n0 } = at(0);
  const tx = n0[1], ty = -n0[0]; // forward tangent at the start
  const heel: Pt[] = [];
  const r0 = widthAt(0) / 2;
  for (let i = 1; i < 14; i++) {
    const a = (i / 14) * Math.PI; // from the bottom edge (+normal), round the back, to the top (-normal)
    const rr = r0 * (1 + (rand() - 0.5) * 0.12);
    heel.push([p0[0] + n0[0] * Math.cos(a) * rr - tx * Math.sin(a) * rr * 0.55,
               p0[1] + n0[1] * Math.cos(a) * rr - ty * Math.sin(a) * rr * 0.55]);
  }
  const body = poly([...top, ...ragged, ...bottom, ...heel], true);

  // Dry streaks: each lane breaks into a few dashes after its solid end.
  const groups = [0.35, 0.8, 1.5, 2.4].map((f) => ({ width: (width / LANES) * f, segs: [] as string[] }));
  for (const { u, solidEnd, tail } of lanes) {
    let t = solidEnd - 0.02;
    while (t < tail) {
      const len = 0.02 + rand() * rand() * 0.3;
      const end = Math.min(tail, t + len);
      const seg: Pt[] = [];
      const steps = Math.max(2, Math.round((end - t) * 60));
      const drift = (rand() - 0.5) * 0.05 + u * 0.04; // bristles fan out slightly as the brush lifts
      for (let s = 0; s <= steps; s++) seg.push(lane(t + ((end - t) * s) / steps, u + drift * (s / steps)));
      // thin hairs are most common; heavy streaks stay near the middle of the brush
      const g = rand() < 0.45 ? 0 : rand() < 0.6 ? 1 : Math.abs(u) < 0.3 ? 2 + Math.floor(rand() * 2) : 1;
      groups[g]!.segs.push(poly(seg));
      t = end + rand() * rand() * 0.08; // a gap where the bristle skipped the paper
    }
  }
  const bristles = groups.filter((g) => g.segs.length).map((g) => ({ d: g.segs.join(""), width: Math.round(g.width * 10) / 10 }));

  // Wet sheen: a few thin streaks near the upper edge of the loaded part.
  const sheen: string[] = [];
  for (let s = 0; s < 6; s++) {
    const u = -0.32 + rand() * 0.3;
    const from = 0.04 + rand() * 0.2, to = from + 0.12 + rand() * 0.3;
    const seg: Pt[] = [];
    for (let i = 0; i <= 24; i++) seg.push(lane(from + ((to - from) * i) / 24, u + (rand() - 0.5) * 0.01));
    sheen.push(poly(seg));
  }

  // Ink spray flicked off the heel: strung out behind the start, drifting downward,
  // bigger drops close in, fine mist further out.
  const dots: Brush["dots"] = [];
  for (let s = 0; s < splatter; s++) {
    const reach = rand() ** 1.25;
    const dist = r0 * (1.1 + reach * 5.5);
    const side = (rand() - 0.4) * r0 * (0.4 + reach * 2.2);
    const x = p0[0] - tx * dist + n0[0] * side;
    const y = p0[1] - ty * dist + n0[1] * side + reach * r0 * 0.6;
    const r = (width / 22) * (1 - reach * 0.8) * (0.35 + rand() * 0.9);
    dots.push({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, r: Math.round(Math.max(0.8, r) * 10) / 10 });
  }

  const spinePath = "M" + spine.map((s, i) =>
    `${i === 0 ? `${fmt(s[0][0])} ${fmt(s[0][1])}` : ""}C${[s[1], s[2], s[3]].map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join(" ")}`).join("");

  return { body, bristles, sheen: sheen.join(""), dots, spinePath, length: Math.ceil(length) };
}
