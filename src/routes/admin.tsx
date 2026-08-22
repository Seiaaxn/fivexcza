import { createFileRoute } from "@tanstack/react-router";
import { Bot, Crown, Shield, ShieldCheck, Sparkles, UserRound, Users, BadgeCheck, Layers } from "lucide-react";
import { img, onImgError } from "../lib/site-images";
import { BackButton } from "../components/BackButton";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { FAVICON_URL } from "../lib/site-config";
import { useI18n } from "../lib/i18n";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Five Fail Family - Admin" },
      { name: "description", content: "Tim admin Five Fail Family yang menjaga marga tetap solid." },
      { property: "og:title", content: "Admin - Five Fail Family" },
      { property: "og:description", content: "Admin Five Fail Family." },
    ],
  }),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-muted-foreground">Gagal memuat halaman admin. Coba refresh.</p>
        {process.env.NODE_ENV === "development" && (
          <pre className="mt-4 text-xs text-destructive">{String(error)}</pre>
        )}
      </div>
    </div>
  ),
  component: AdminPage,
});

const admins: { name: string; role: string; image?: string; owner?: boolean }[] = [
  { name: "@radzyprst1", role: "Owner Five Fail", image: "https://cdn.nekohime.site/file/7xbftxr3.jpeg", owner: true },
  { name: "@hanzyy_perset2", role: "Admin & Co Owner", image: "https://cdn.nekohime.site/file/gsgmhbku.jpg" },
  { name: "@z4nsprst", role: "Admin & Leader", image: "https://cdn.nekohime.site/file/tk05xeuf.jpg" },
  { name: "@yanzjeje_", role: "Admin Utama & Collab", image: "https://cdn.nekohime.site/file/uz7jd7mp.jpg" },
  { name: "𝟓𝐅 𝙁𝙞𝙠𝙠 𝗳𝘁 | 𝗖𝗚", role: "Admin Utama & Select", image: "https://cdn.nekohime.site/file/4pmprnmm.jpg" },
  { name: "@sei_mieayam", role: "Admin Utama & Bot", image: "https://cdn.nekohime.site/file/g9g4s4yw.jpg" },
  { name: "@fazzraijinup", role: "Admin Utama & Collab", image: "https://cdn.nekohime.site/file/u254l04v.jpg" },
  { name: "Aomi Haru", role: "Bot & Security", image: "https://cdn.nekohime.site/file/k8kkynxf.jpg" },
  { name: "𝘿𝙖𝙣𝙪𝙥𝙧𝙨𝙩`𝗳𝘁 𝟓𝐅", role: "Admin Utama & Select", image: "https://cdn.nekohime.site/file/pypmkob6.jpeg" },
  { name: "Fiku", role: "Admin Gen 1 & Select", image: "https://cdn.nekohime.site/file/tvnvsfyk.jpeg" },
  { name: "@stevenprsttt", role: "Admin Utama & Select", image: "https://cdn.nekohime.site/file/dq6xs5r0.jpeg" },
  { name: "@yato.kragyy", role: "Admin Gen 1 & Select", image: "https://cdn.nekohime.site/file/j5ecxa0k.jpg" },
  { name: "@kyysz_prst", role: "Admin Gen 3", image: "https://cdn.nekohime.site/file/jscrn7mc.jpg" },
  { name: "@mas.biasa.x.ruri", role: "Admin Gen 3", image: "https://cdn.nekohime.site/file/y6o7u6wg.jpg" },
  { name: "@shinpejeje", role: "Admin Gen 3", image: "https://cdn.nekohime.site/file/9h56xw3s.jpg" },
  { name: "@tianprst_50", role: "Admin Gen 2", image: "https://cdn.nekohime.site/file/tjlirecc.jpg" },
  { name: "@panz_editz", role: "Admin Partner", image: "https://cdn.nekohime.site/file/tin9lwzp.jpg" },
  { name: "@rikkalien", role: "Admin Partner", image: "https://cdn.nekohime.site/file/iyodlgq9.jpg" },
  { name: "@karrz01", role: "Admin Partner", image: "https://cdn.nekohime.site/file/s4q4i24y.jpg" },
  { name: "@guin_prst", role: "Admin Live", image: "https://cdn.nekohime.site/file/9g131bgj.jpg" },
];

function getRoleMeta(role: string) {
  const r = role.toLowerCase();
  if (r.includes("security")) return { Icon: ShieldCheck, tone: "text-blue-600 dark:text-blue-400" };
  if (r.includes("bot")) return { Icon: Bot, tone: "text-violet-600 dark:text-violet-400" };
  if (r.includes("co owner") || r.includes("co-owner")) return { Icon: Shield, tone: "text-amber-600 dark:text-amber-400" };
  if (r.includes("select") || r.includes("collab")) return { Icon: Sparkles, tone: "text-emerald-600 dark:text-emerald-400" };
  return { Icon: UserRound, tone: "text-foreground" };
}

function AdminPage() {
  const { t } = useI18n();
  const owner = admins.find((a) => a.owner);
  const team = admins.filter((a) => !a.owner);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20">
      <div className="pt-8">
        <BackButton />
      </div>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl pt-4 text-center">
        <img
          src={FAVICON_URL}
          alt="Five Fail Family"
          onError={onImgError}
          className="mx-auto h-16 w-16 rounded-2xl border-2 border-foreground object-cover shadow-[3px_3px_0_0_var(--color-foreground)]"
        />
        <span className="chip mt-5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          {t.admin.badge}
        </span>
        <h1 className="font-display mt-5 text-4xl font-bold tracking-tight md:text-5xl">
          {t.admin.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t.admin.desc}</p>

        {/* Trust bar */}
        <div className="mx-auto mt-7 flex max-w-2xl flex-wrap items-center justify-center gap-3">
          <span className="chip">
            <Users className="h-3.5 w-3.5" />
            <AnimatedCounter value={admins.length} /> {t.admin.count}
          </span>
          <span className="chip">
            <BadgeCheck className="h-3.5 w-3.5" />
            {t.admin.verified}
          </span>
          <span className="chip">
            <Layers className="h-3.5 w-3.5" />
            {t.admin.genLabel}
          </span>
        </div>
      </section>

      {/* Owner spotlight */}
      {owner && (
        <div className="glass-card relative mx-auto mt-14 flex max-w-6xl flex-col items-center gap-5 overflow-hidden p-6 sm:flex-row md:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--color-foreground) 0, var(--color-foreground) 1px, transparent 1px, transparent 14px)",
            }}
          />
          <div className="relative shrink-0">
            <img
              src={img(owner.image)}
              alt={owner.name}
              className="h-24 w-24 rounded-2xl border-2 border-foreground object-cover shadow-[3px_3px_0_0_var(--color-foreground)] md:h-28 md:w-28"
              loading="lazy"
              onError={onImgError}
            />
            <span className="absolute -top-3 -right-3 grid h-9 w-9 place-items-center rounded-full border-2 border-foreground bg-accent text-accent-foreground shadow-[2px_2px_0_0_var(--color-foreground)]">
              <Crown className="h-4 w-4" />
            </span>
          </div>
          <div className="relative min-w-0 text-center sm:text-left">
            <span className="chip bg-accent text-accent-foreground">{t.admin.owner}</span>
            <h2 className="mt-2 truncate text-2xl font-bold md:text-3xl">{owner.name}</h2>
            <p className="mt-1 font-mono text-sm text-muted-foreground">{owner.role}</p>
          </div>
        </div>
      )}

      {/* Team grid */}
      <div className="mx-auto mt-10 max-w-6xl">
        <p className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {team.length} {t.admin.count}
        </p>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {team.map((a, i) => {
          const { Icon, tone } = getRoleMeta(a.role);
          return (
            <div
              key={a.name}
              className="glass-card glass-card-hover relative flex flex-col items-center p-4 text-center sm:p-5"
            >
              <span className="absolute top-2 left-2 font-mono text-[0.65rem] font-bold text-muted-foreground">
                #{String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative mt-2">
                <img
                  src={img(a.image)}
                  alt={a.name}
                  className="h-16 w-16 rounded-xl border-2 border-foreground object-cover shadow-[2px_2px_0_0_var(--color-foreground)] sm:h-18 sm:w-18"
                  loading="lazy"
                  onError={onImgError}
                />
                <span
                  className={`absolute -right-2 -bottom-2 grid h-6 w-6 place-items-center rounded-full border-2 border-foreground bg-card ${tone}`}
                >
                  <Icon className="h-3 w-3" />
                </span>
              </div>
              <h3 className="mt-3 line-clamp-1 w-full font-semibold">{a.name}</h3>
              <p className="mt-1 inline-block truncate rounded-full border border-border bg-secondary/40 px-2.5 py-0.5 text-[0.7rem] text-muted-foreground">
                {a.role}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
