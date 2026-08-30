# Five Fail Family — Website Resmi

Website resmi **Five Fail Family**, marga editor & kreator anime di TikTok. Dibangun dengan TanStack Start, React, TypeScript, dan Tailwind CSS.

---

## Struktur Website

```
fivexcza-main/
├── public/
│   └── robots.txt
├── src/
│   ├── assets/                    # Aset statis (favicon config, dll)
│   ├── components/
│   │   ├── ui/                    # Komponen UI dari shadcn/ui
│   │   ├── AnimatedCounter.tsx    # Komponen angka animasi
│   │   ├── BackButton.tsx         # Tombol kembali
│   │   ├── NavBar.tsx             # Navigasi atas
│   │   └── TikTokSections.tsx     # Seksi hashtag & data TikTok live
│   ├── hooks/
│   │   └── use-mobile.tsx         # Hook deteksi perangkat mobile
│   ├── lib/
│   │   ├── error-capture.ts       # Capture error global (server)
│   │   ├── error-page.ts          # Render halaman error fallback
│   │   ├── i18n.tsx               # Sistem multi-bahasa (ID / EN)
│   │   ├── lovable-error-reporting.ts  # Integrasi error reporting
│   │   ├── site-config.ts         # Konfigurasi utama (URL, jumlah member, dll)
│   │   ├── site-images.ts         # Helper gambar & fallback
│   │   └── utils.ts               # Utility umum (cn, dll)
│   ├── routes/
│   │   ├── __root.tsx             # Root layout (NavBar, Provider, Error boundary)
│   │   ├── index.tsx              # Halaman Beranda
│   │   ├── join.tsx               # Halaman Join / Pendaftaran
│   │   ├── admin.tsx              # Halaman Tim Admin
│   │   ├── generations.tsx        # Halaman Generasi
│   │   ├── readme.tsx             # Halaman Panduan Marga
│   │   ├── $.tsx                  # Halaman 404
│   │   └── sitemap[.]xml.ts      # Sitemap otomatis
│   ├── routeTree.gen.ts           # Route tree (auto-generated)
│   ├── router.tsx                 # Konfigurasi router
│   ├── server.ts                  # Entry point server (SSR)
│   ├── start.ts                   # Middleware TanStack Start
│   └── styles.css                 # Global CSS & design tokens
├── components.json                # Konfigurasi shadcn/ui
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Halaman & Fitur

### 🏠 Beranda (`/`)
- **Hero section** dengan foto generasi 1–3 dan tagline marga.
- **Slider otomatis** yang menampilkan tiap generasi beserta deskripsi, berganti setiap 4.5 detik. Bisa diklik manual.
- **Statistik member** — jumlah member per generasi dengan animasi counter.
- **Hashtag live** — data hashtag `#5fcreator` dan `#5ffamily` langsung dari TikTok public API (views & jumlah video).
- **Footer** dengan link ke TikTok pembuat website.

### 👥 Join (`/join`)
- **Jalur Seleksi** — Satu jalur dengan tombol langsung ke grup WhatsApp seleksi.
- **Mini gen summary** — ringkasan syarat followers per generasi (500+ / 200+ / Bebas) di dalam card jalur.
- **Syarat Umum** — Umur 13+, creator aktif, siap CN.
- **Alur Seleksi** — 5 langkah proses seleksi ditampilkan sebagai timeline berurutan.
- **FAQ** — 6 pertanyaan umum dengan Accordion collapsible.
- **CTA bawah** dengan link kembali ke Readme.

### 🛡️ Admin (`/admin`)
- **21 admin** ditampilkan dengan foto, nama, dan peran masing-masing.
- **Owner spotlight** — tampilan khusus owner dengan glow ring emas dan badge Crown.
- **Pengelompokan per Generasi** — Gen 1, Gen 2, Gen 3, dan Admin Partner ditampilkan dalam grup terpisah.
- **Badge gen** di pojok kanan atas tiap kartu admin (amber = Gen 1, violet = Gen 2, emerald = Gen 3).
- **Ikon peran** — setiap admin punya ikon sesuai perannya (Bot, Shield, Security, Star, dll).

### 🔢 Generasi (`/generations`)
- Penjelasan dan deskripsi tiap generasi Five Fail Family.

### 📖 Readme (`/readme`)
- Panduan lengkap marga: tujuan, divisi & peran, dan aturan singkat.
- CTA ke halaman Join.

---

## Konfigurasi Utama

Edit `src/lib/site-config.ts` untuk mengubah:

```ts
// URL grup WhatsApp seleksi
export const WA_URL_SELECTION = "https://chat.whatsapp.com/...";

// Jumlah member per generasi (ditampilkan di beranda & join)
export const GEN_MEMBER_COUNTS = [
  { gen: "Gen 1", count: 322 },
  { gen: "Gen 2", count: 74 },
  { gen: "Gen 3", count: 12 },
];
```

Edit `src/routes/admin.tsx` array `admins` untuk menambah/mengubah data admin.

---

## Multi-Bahasa

Website mendukung **Bahasa Indonesia** dan **English** via `src/lib/i18n.tsx`.
Toggle bahasa tersedia di NavBar. Preferensi disimpan di localStorage (`ff-lang`).

---

## Stack Teknologi

| Teknologi | Kegunaan |
|---|---|
| [TanStack Start](https://tanstack.com/start) | SSR framework berbasis Vite |
| [TanStack Router](https://tanstack.com/router) | File-based routing |
| React + TypeScript | UI & type safety |
| Tailwind CSS | Styling utility-first |
| [shadcn/ui](https://ui.shadcn.com/) | Komponen UI (Accordion, dll) |
| Bun | Package manager & runtime |

---

## Development

Pastikan sudah install [Bun](https://bun.sh) atau Node.js.

```sh
# Clone repo
git clone <url-repo>
cd fivexcza-main

# Install dependencies
bun install
# atau: npm install

# Jalankan dev server
bun run dev
# atau: npm run dev
```

Buka `http://localhost:3000` di browser.

---

## Deployment

Website ini di-deploy ke platform yang mendukung SSR (Cloudflare Workers, Node.js, dll) via `src/server.ts` sebagai entry point.

---

*Five Fail Family — Marga editor & kreator anime Indonesia.*  
*Website dibuat oleh [@zavedya_](https://www.tiktok.com/@zavedya_)*
