import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Zap, Clock, Server, Cpu, MemoryStick } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BackButton } from "../components/BackButton";

export const Route = createFileRoute("/system")({
  head: () => ({
    meta: [
      { title: "Status Sistem - Five Fail Family" },
      { name: "description", content: "Status server & metrik sistem Five Fail Family secara realtime." },
      { property: "og:title", content: "Status Sistem - Five Fail Family" },
      { property: "og:description", content: "Latency, uptime, CPU, dan penggunaan RAM server." },
    ],
  }),
  component: SystemPage,
});

const OS_UPTIME_HEAD_START = 1 * 3600 + 32 * 60 + 1; // OS boots before the app process
const CORES = 4;
const NODE_VERSION = "v22.23.2";
const CPU_MODEL = "AMD EPYC 7532 32-Core Pro...";
const RAM_TOTAL_GB = 8;
const TICKS = 10;

function formatDuration(totalSeconds: number) {
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

function useElapsedSeconds(offset = 0) {
  const [seconds, setSeconds] = useState(offset);
  useEffect(() => {
    const start = Date.now() - offset * 1000;
    const id = setInterval(() => {
      setSeconds(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [offset]);
  return seconds;
}

function useTicks(seed: number, min: number, max: number) {
  const [values, setValues] = useState<number[]>(() =>
    Array.from({ length: TICKS }, () => seed),
  );
  const ref = useRef(seed);
  useEffect(() => {
    const id = setInterval(() => {
      ref.current = Math.min(max, Math.max(min, ref.current + (Math.random() * 6 - 3)));
      setValues((prev) => [...prev.slice(1), ref.current]);
    }, 1800);
    return () => clearInterval(id);
  }, [min, max]);
  return values;
}

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const w = 600;
  const h = 90;
  const max = 100;
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - (v / max) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">{label}</p>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-accent">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="font-display mt-3 text-2xl font-bold md:text-3xl">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}

function UsagePanel({
  icon: Icon,
  title,
  sub,
  percent,
  values,
  color,
  chartLabel,
  chartRight,
}: {
  icon: React.ElementType;
  title: string;
  sub: string;
  percent: number;
  values: number[];
  color: string;
  chartLabel: string;
  chartRight: string;
}) {
  return (
    <section className="glass-card p-6 md:p-7">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
            style={{ background: `color-mix(in oklab, ${color} 16%, var(--color-secondary))`, color }}
          >
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-semibold">{title}</h2>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
        </div>
        <p className="font-display text-2xl font-bold md:text-3xl">{Math.round(percent)}%</p>
      </div>

      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percent}%`, background: color }}
        />
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
        <span>{chartLabel}</span>
        <span>{chartRight}</span>
      </div>
      <div className="mt-2 rounded-xl bg-secondary/50 p-2">
        <Sparkline values={values} color={color} />
      </div>
    </section>
  );
}

function SystemPage() {
  const appUptime = useElapsedSeconds(0);
  const osUptime = useElapsedSeconds(OS_UPTIME_HEAD_START);
  const [latency, setLatency] = useState(580);
  const cpuTicks = useTicks(27, 8, 60);
  const ramTicks = useTicks(7, 4, 18);

  useEffect(() => {
    const id = setInterval(() => {
      setLatency(Math.round(400 + Math.random() * 400));
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const cpuPercent = cpuTicks[cpuTicks.length - 1];
  const ramPercent = ramTicks[ramTicks.length - 1];
  const ramUsedMb = (ramPercent / 100) * RAM_TOTAL_GB * 1024;
  const ramFreeGb = RAM_TOTAL_GB - ramUsedMb / 1024;

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24">
      <div className="pt-8">
        <BackButton />
      </div>

      {/* ── 16:9 Banner ────────────────────────────────────────── */}
      <AspectRatio ratio={16 / 9} className="glass-card overflow-hidden">
        <div className="relative flex h-full flex-col justify-between overflow-hidden p-6 md:p-10">
          {/* Decorative abstract shapes instead of a stock illustration */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-30 blur-2xl"
              style={{ background: "var(--color-accent)" }}
            />
            <div
              className="absolute -right-6 bottom-0 h-72 w-72 rounded-full opacity-20 blur-2xl"
              style={{ background: "var(--accent-2)" }}
            />
            <svg
              className="absolute right-4 bottom-4 h-2/3 w-1/2 opacity-70 md:right-10"
              viewBox="0 0 240 240"
              fill="none"
            >
              <circle cx="120" cy="120" r="90" stroke="var(--color-accent)" strokeOpacity="0.25" strokeWidth="2" />
              <circle cx="120" cy="120" r="60" stroke="var(--accent-2)" strokeOpacity="0.3" strokeWidth="2" />
              <circle cx="120" cy="120" r="34" fill="var(--color-accent)" fillOpacity="0.18" />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const x = 120 + Math.cos(angle) * 90;
                const y = 120 + Math.sin(angle) * 90;
                return <circle key={i} cx={x} cy={y} r="4" fill="var(--color-accent)" fillOpacity="0.5" />;
              })}
            </svg>
          </div>

          <div className="relative">
            <span className="chip bg-secondary/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              System Metrics
            </span>
            <h1 className="font-display mt-4 text-2xl font-bold tracking-tight md:text-4xl">
              Status <span style={{ color: "var(--color-accent)" }}>Server Realtime</span>
            </h1>
          </div>

          <div className="relative">
            <span className="chip">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Online
            </span>
          </div>
        </div>
      </AspectRatio>

      {/* ── Metric grid ────────────────────────────────────────── */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MetricCard icon={Zap} label="Latency Ping" value={`${latency} ms`} sub="Client to Server" />
        <MetricCard icon={Clock} label="App Uptime" value={formatDuration(appUptime)} sub="Node.js Process" />
        <MetricCard icon={Server} label="OS Uptime" value={formatDuration(osUptime)} sub="Host System" />
        <MetricCard icon={Cpu} label="CPU / Node" value={`${CORES} Cores`} sub={NODE_VERSION} />
      </div>

      {/* ── CPU ────────────────────────────────────────────────── */}
      <div className="mt-6">
        <UsagePanel
          icon={Cpu}
          title="CPU Load Realtime"
          sub={CPU_MODEL}
          percent={cpuPercent}
          values={cpuTicks}
          color="var(--color-accent)"
          chartLabel="Grafik Performa (10 Tick)"
          chartRight="Max: 100%"
        />
      </div>

      {/* ── RAM ────────────────────────────────────────────────── */}
      <div className="mt-6">
        <UsagePanel
          icon={MemoryStick}
          title="Penggunaan RAM"
          sub={`Used: ${ramUsedMb.toFixed(2)} MB / ${RAM_TOTAL_GB.toFixed(2)} GB`}
          percent={ramPercent}
          values={ramTicks}
          color="var(--accent-3)"
          chartLabel="Grafik Memori (10 Tick)"
          chartRight={`Free: ${ramFreeGb.toFixed(2)} GB`}
        />
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Angka pada halaman ini disimulasikan di sisi klien untuk keperluan tampilan, bukan data
        server sungguhan.
      </p>
    </main>
  );
}
