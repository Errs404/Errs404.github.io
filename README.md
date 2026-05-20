# Squeezy Portfolio

Personal landing page / portfolio milik **Squeezy** ([Errs404](https://github.com/Errs404)) — streamer dan programmer Indonesia. Dibuat dengan HTML, CSS, dan JavaScript murni, di-deploy via GitHub Pages.

## Preview

![Preview](main.png)

Live: <https://errs404.github.io>

## Fitur

- Hero section dengan typing animation (JS-driven, bukan CSS keyframe)
- Section About, Services, Skills, Contact
- **Dark / Light theme toggle** dengan persist via `localStorage` dan deteksi `prefers-color-scheme`
- Mobile responsive (breakpoint 1200, 1000, 850, 500 px) + hamburger menu
- Smooth scroll + active link tracking (scroll spy)
- Reveal-on-scroll animation pakai `IntersectionObserver`
- Contact form dengan validasi client-side dan `mailto:` fallback
- Back-to-top button
- Aksesibilitas: ARIA labels, `prefers-reduced-motion`, alt text, semantic HTML

## Tech Stack

- HTML5 semantic markup
- CSS3 dengan custom properties (variables) untuk theming
- Vanilla JavaScript (zero dependency)
- [Font Awesome 6.5.2](https://fontawesome.com/) untuk icon
- [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)

## Struktur File

```
errs404.github.io/
├── index.html      # Markup utama
├── style.css       # Styling + theme variables + responsive
├── script.js       # Theme toggle, typing, nav, scroll, form
├── main.png        # Foto profil
└── README.md
```

## Cara Menjalankan Lokal

Karena ini static site, tidak perlu build tool. Cukup buka file di browser:

```bash
# Opsi 1: buka langsung
start index.html       # Windows
open index.html        # macOS
xdg-open index.html    # Linux

# Opsi 2: pakai live server (rekomendasi untuk dev)
npx serve .
# atau
python -m http.server 8080
```

Lalu akses `http://localhost:8080`.

## Deploy ke GitHub Pages

1. Pastikan repo bernama `username.github.io` (sudah benar di repo ini).
2. Push ke branch `main` atau `master`.
3. Di **Settings → Pages**, pilih branch sumber dan folder root (`/`).
4. Tunggu beberapa menit, situs akan tersedia di `https://username.github.io`.

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

## Kustomisasi

### Ganti email tujuan form kontak

Edit `script.js`, cari baris:

```js
const recipient = 'hello@example.com';
```

Ganti dengan email tujuan. Kalau mau pakai backend beneran (Formspree, EmailJS, dst), ganti blok `mailto` dengan `fetch` ke endpoint pilihan kamu.

### Ganti warna tema

Edit `style.css` di blok `:root` dan `[data-theme="light"]`:

```css
:root {
    --accent: #b74b4b;       /* Warna utama */
    --accent-hover: #d65a5a; /* Saat hover */
    /* ... */
}
```

### Tambah / ubah kata typing animation

Edit `script.js`:

```js
const words = ['Web Developer', 'Streamer', 'Content Creator', 'Gamer', 'Programmer'];
```

### Tambah skill / service

Edit `index.html` di section `#skills` atau `#services`. Ikuti pola elemen yang sudah ada.

## Browser Support

Modern browsers (Chrome, Firefox, Edge, Safari versi terbaru). `IntersectionObserver` punya fallback untuk browser lama.

## Lisensi

Personal use. Boleh dipakai sebagai referensi.

## Kontak

- GitHub: [@Errs404](https://github.com/Errs404)
- Discord: [dsc.gg/mechacraft](https://dsc.gg/mechacraft)
- Instagram: [@sgt_prstyo](https://www.instagram.com/sgt_prstyo)
- Saweria: [saweria.co/squeezy](https://saweria.co/squeezy)
