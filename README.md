# Coral Studios - Web Presence & Google AdMob / Play Store Deployment Guide

This project is the official single-page studio website for **Coral Studios**, built to strictly comply with Google Play Store and Google AdMob verification requirements. Designed with a deep dark palette (`#090a0f`), glassmorphism cards, and high-performance native HTML/CSS/JS.

---

## 📁 Project Structure

```text
├── app-ads.txt          # Google AdMob authorized digital seller file (Critical!)
├── robots.txt           # Search engine and Mediapartners-Google crawler directives
├── .htaccess            # Apache / cPanel configuration for HTTPS and text/plain MIME type
├── index.html           # Main studio showcase (Hero, Apps, Philosophy, Privacy Dialog)
├── privacy.html         # Dedicated standalone Privacy Policy URL for Google Play Console
├── style.css            # Deep dark theme (#090a0f), glassmorphism, responsive grid
├── script.js            # Privacy modal handling, email clipboard copy & toast feedback
└── assets/
    ├── logo.svg         # Coral Studios brand logo
    ├── favicon.svg      # Favicon
    ├── icon-prayer.png  # Simple Prayer Times & Widget official 1024x1024 app icon
    └── icon-paperless.svg # Paperless Studio vector app icon
```

---

## 🚀 Deployment Options

No build step or Node.js runtime required. Simply drop the files into your web host:

### 1. cPanel / Apache / LiteSpeed Hosting
1. Open cPanel File Manager or connect via FTP.
2. Navigate to your root directory (`public_html`).
3. Upload all files (`.htaccess`, `app-ads.txt`, `index.html`, `privacy.html`, `style.css`, `script.js`, `robots.txt`, and the `assets/` directory) directly into `public_html`.

### 2. Vercel / Netlify / Cloudflare Pages / GitHub Pages
- Push the repository to GitHub and deploy directly as a static site without any build command.

---

## ✅ AdMob & Google Play Console Verification

### 1. app-ads.txt Verification (Google AdMob)
Test your domain root:
```bash
curl -i https://yourdomain.com/app-ads.txt
```
- **Expected Status:** `200 OK`
- **Expected Content-Type:** `text/plain`
- **Expected Content (Exact single line):**
  ```
  google.com, pub-2316053825118684, DIRECT, f08c47fec0942fa0
  ```
- **AdMob Console:** Navigate to *Apps > app-ads.txt* in your Google AdMob console and verify your domain.

### 2. Google Play Console Privacy Policy URL
- In Google Play Console under **Policy and programs > App Content > Privacy Policy**, provide:
  `https://yourdomain.com/privacy.html`
- This page covers all 5 mandatory Google policies (Zero PII collection, local on-device location calculation, Google AdMob, Google Play Billing, and official developer contact `coralstudiosdev@yandex.com`).
