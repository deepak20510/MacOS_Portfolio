#  Deepak's macOS Portfolio

A sleek, professional, and fully interactive portfolio application inspired by the macOS and iOS interfaces. Built with a focus on smooth animations, responsive design, and a premium user experience.

---

## 📱 Dual-Interface Experience

This portfolio isn't just a website—it's a complete operating system experience that adapts to your device:

*   **🖥️ Desktop (macOS Style):** A high-end desktop interface featuring a top menu bar, interactive dock, and a multi-window management system.
*   **📱 Mobile (iOS Style):** A native iPhone-inspired interface with a status bar, notch, app grid, and fullscreen navigation when your screen size is below 768px.

---

## ✨ Key Features

### 🎵 Music Experience
*   **Desktop Music Widget:** A floating glassmorphism music player that stays accessible while you browse
*   **Mobile Music App:** Full-screen iOS-style music player with album artwork, progress bar, and playback controls
*   **Integrated Playlist:** Four carefully curated tracks with smooth playback and seamless transitions
*   **Cross-Platform Sync:** Consistent music experience across both desktop and mobile views

### 🖼️ Interactive Gallery
*   **Masonry Collage:** A professional photo grid that handles different aspect ratios perfectly.
*   **Image Viewer:** Click any photo to open it in a dedicated macOS-style preview window with focus handling.

### 📁 Advanced Finder (Portfolio)
*   **Hierarchical Navigation:** Browse through "Favourites" and "My Projects" just like the native Files app.
*   **Project Linking:** Open code files, project links, and Figma designs directly from the interface.

### 📄 Pro Resume Viewer
*   **In-App Display:** View my PDF resume without leaving the site.
*   **Quick Download:** A prominent, beautiful download button for easy offline access.

### ⌨️ Terminal (Skills)
*   **Tech Stack:** A command-line inspired view showing my proficiency in Frontend, Backend, Mobile, and Dev Tools.

### 🌐 Safari (Articles)
*   **Developer Blog:** A clean, iOS-native style list view for reading my latest articles and technical deep dives.

### 🌗 Global Dark Mode
*   **Seamless Transition:** A beautiful circle-reveal animation when switching themes.
*   **Adaptive UI:** Every component, icon (including the Apple logo), and window header adjusts perfectly to your preferred theme.
*   **Theme-Aware Widgets:** All interactive elements adapt to light/dark mode automatically

### 🔍 Spotlight Search
*   **Global Access:** Press `Cmd + Space` or `Cmd + K` to search for apps, skills, and links instantly.
*   **Intelligent Indexing:** Real-time filtering across projects, tech stack, and navigation links.

### 👁️ Quick Look
*   **Instant Preview:** Highlight any project and press `Spacebar` for a professional, high-speed preview.
*   **Seamless Integration:** Native-style file inspection without opening full applications.

### 🍏 Apple Boot Experience
*   **Authentic Startup:** macOS-style boot sequence with logo and loading progress.
*   **Polished Entry:** Smooth transition from boot screen to the desktop environment.

### 🎨 UI/UX Enhancements
*   **Dynamic Glassmorphism:** State-of-the-art frosted glass effects with real-time backdrop-blur.
*   **Focus-Responsive Shadows:** Windows dynamically adjust depth shadows when focused, creating a realistic layered OS feel.
*   **iPhone-Style Interface:** Authentic iOS status bar with dynamic notch integration.
*   **Smooth Animations:** 60 FPS performance with GSAP and Framer Motion transitions.
*   **Responsive Layout:** Perfect adaptation to all screen sizes and orientations.

---

## 🛠️ Built With

*   **[React](https://reactjs.org/):** Core framework for component-driven architecture.
*   **[Tailwind CSS](https://tailwindcss.com/):** For rapid, utility-first styling and responsive design.
*   **[GSAP](https://greensock.com/gsap/):** Powers the smooth window dragging and dock animations.
*   **[Framer Motion](https://www.framer.com/motion/):** Used for micro-interactions and theme transitions.
*   **[Zustand](https://github.com/pmndrs/zustand):** Lightweight state management for window controls and theme persistence.
*   **[Lucide React](https://lucide.dev/):** For clean, consistent iconography.

---

## 🚀 Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/deepak20510/MacOS-Portfolio.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```

---

## 📂 Project Structure

```text
├── src/
│   ├── components/   # Reusable UI (Dock, Navbar, MobileHome, MusicWidget)
│   ├── constants/    # Data for projects, skills, links, and window configurations
│   ├── store/        # Zustand state (Window, Theme, Spotlight, Location)
│   ├── windows/      # App components (Safari, Finder, Photos, Music, Terminal)
│   ├── hoc/          # WindowWrapper for window behavior
│   ├── hooks/        # Custom React hooks (Mobile navigation, event listeners)
│   └── utils/        # Helper functions (Time, string formatting)
└── public/           # Static assets (Images, Icons, Music files, PDFs)
```

---

### 🎯 Latest Updates

### v2.2 - Advanced Interaction & Polish
*   **Spotlight Search:** Implemented global search with `Cmd + Space` / `Cmd + K` shortcuts
*   **Quick Look:** Added Spacebar project preview functionality
*   **Dynamic Shadows:** Added focus-responsive depth shadows for windows
*   **Boot Screen:** Implemented authentic macOS startup sequence
*   **Performance:** Optimized window management and mobile navigation responsiveness

### v2.1 - Music Integration
* Added desktop music widget with glassmorphism design
* Implemented mobile music player app with iOS-style interface
* Integrated four-track playlist with smooth playback
* Enhanced theme adaptability for all interactive components
* Improved mobile interface with clean status bar design

### v2.0 - Dual Interface System
* Complete desktop/macOS interface implementation
* Native iOS mobile experience with status bar and notch
* Window management system with drag-and-drop functionality
* Responsive design for all screen sizes
* Dark/light mode with seamless transitions

---

Designed and Developed with ❤️ by **Deepak**.