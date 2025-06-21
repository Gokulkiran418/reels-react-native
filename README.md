# 🎬 ReelsPlayerApp (React Native)

A modern, full-featured **short video feed mobile application** built using **React Native (Expo)**. This project replicates a TikTok/Instagram Reels-style UI with vertical scrolling videos, interactive overlays, and a clean, responsive layout.

---
### Tech Stack

- react native

- @react-navigation for screen navigation

- @react-native-async-storage/async-storage for persistent login

- Jest + @testing-library/react-native for testing

- React.memo, useCallback, useMemo for performance

### Getting started

```bash
git clone https://github.com/Gokulkiran418/reels-react-native.git
cd reels-react-native
npm install
```

# Start the Expo server
```bash
npx expo start
```
- Open local link from terminal 
- or
- Download expo go app
- Scan QR code

## 📱 Features

### 🎥 Core Video Feed

- Infinite vertical scroll (`FlatList`) — one video per screen
- Auto-play on scroll into view
- Tap to **play/pause**, **mute/unmute**
- Optimized video loading and performance

### 🧑‍🎤 Creator Overlay UI

- Hashtag + Creator name (with "Follow" toggle)
- Title, Episode tag, and 3-line clamped description
- Right-side interaction bar:
  - ❤️ Like count
  - 💬 Comment count
  - 🔄 Share count
  - 💸 Tips earned
  - ⋮ Options menu

### 🔐 Authentication

- Dummy login flow
- User ID stored in `AsyncStorage`
- Blocks feed access unless logged in

### 📦 Mock Data & Simulated API

- Uses mock data file (`mockData.js`)
- Simulates async API fetch with delay
- Handles loading and API failure gracefully

---

### ⚙️ Global State Management

- Built using React Context API (`AppContext.js`)
- Handles:
  - `userID` login state
  - Liked videos (per session)
  - Global auth logic

---

## 🚀 Bonus Features



| Feature                         | Status |
|----------------------------------|--------|
| Optimistic UI (Like button)      | ✅     |
| Infinite scroll (pagination)     | ✅     |
| Dummy login & access control     | ✅     |
| Global state (Context API)       | ✅     |
| Basic unit testing (Jest)        | ✅     |

---

## 🧪 Unit Testing

Tests are written using **Jest** and **React Native Testing Library**.

### Example test:

```bash
npm test
