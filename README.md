# 🎓 Eduobi — by Obi Enterprises

India's most affordable EdTech platform for JEE, NEET & Board preparation.

---

## 🚀 Setup Instructions (Run on Your PC)

### Requirements
- Node.js (v18 or above): https://nodejs.org/
- npm (comes with Node.js)

### Steps

```bash
# 1. Extract this zip
# 2. Open terminal in the extracted folder

# 3. Install dependencies
npm install

# 4. Start the app (development)
npm run dev

# 5. Open in browser
# Go to: http://localhost:5173
```

### Build for Production (Website Deploy)
```bash
npm run build
# Output will be in /dist folder — upload to any web host
```

---

## 📱 Want Android APK?

To convert to Android APK, use **Capacitor**:
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init
npx cap add android
npm run build
npx cap sync
npx cap open android
# Then build APK from Android Studio
```

---

## 📁 PDF Notes
Place all PDF files inside the `/public` folder (already included).

## 📺 YouTube
https://youtube.com/@eduobi-learn

---
Built with ❤️ by Obi Enterprises
