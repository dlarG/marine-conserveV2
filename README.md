# 🌊 GREEN Inc. - Marine Conservation Organization

<div align="center">

![GREEN Inc. Logo](https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384195/GREEN_stouub.jpg)

**Protecting Sogod Bay's Marine Ecosystems Through Science, Community, and Action**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-6.21.0-CA4245?logo=reactrouter)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Components](#-components)
- [Routes](#-routes)
- [Image Assets](#-image-assets)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 About the Project

GREEN Inc. is a full-time marine conservation NGO based in Malitbog, Southern Leyte, Philippines. This website serves as the organization's digital platform to showcase their conservation efforts, attract volunteers, offer PADI diving courses, and raise awareness about coral reef protection in Sogod Bay.

### Key Highlights:

- 🪸 **Interactive Hero Section** - Spotlight effect revealing healthy vs. bleached coral reefs
- 📱 **Fully Responsive** - Optimized for all devices from mobile to desktop
- 🎨 **Modern Design** - Clean, professional UI with smooth animations
- ♿ **Accessible** - Built with accessibility best practices
- ⚡ **Performance Focused** - Canvas-based animations for optimal performance

---

## ✨ Features

### 🎯 Core Pages & Sections

- **Interactive Hero Section** - Canvas-based coral reef spotlight reveal effect
- **Why Choose Us** - Feature cards with scroll-triggered animations
- **Reviews/Testimonials** - Community feedback with star ratings
- **FAQ Accordion** - Expandable questions with smooth transitions
- **Call-to-Action** - Engaging donation and volunteer sections
- **Responsive Navbar** - Transparent-to-white scroll effect with dropdowns

### 🎬 Animations

- Canvas-based interactive spotlight on hero
- Scroll-triggered fade-in and slide-up animations
- Animated counter statistics
- Smooth page transitions
- Hover effects and micro-interactions
- Parallax scrolling effects
- Bubble animations in CTA section

### 🧭 Navigation

- Multi-level dropdown menus
- Mobile-responsive hamburger menu
- Two-column mega dropdown for courses
- Social media integration
- Quick action buttons (Apply, Donate)

---

## 🛠 Tech Stack

| Technology                | Purpose                           |
| ------------------------- | --------------------------------- |
| **React 18**              | Frontend framework                |
| **Vite**                  | Build tool and development server |
| **TailwindCSS**           | Utility-first CSS framework       |
| **React Router v6**       | Client-side routing               |
| **Lucide React**          | Icon library                      |
| **Canvas API**            | Interactive hero section graphics |
| **Intersection Observer** | Scroll-based animations           |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/green-inc-website.git
   cd green-inc-website
   ```

2. **Install dependencies**

   ```
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```
   cp .env.example .env

   Edit the .env with your configurations value
   ```

4. **_Start the development server_**

   ```
   npm run dev
   # or
   yarn dev
   ```

5. **_Open your browser_**

   ````
   Navigate to http://localhost:5173 ```
   ````

green-inc-website/
├── public/
│ └── hero/
│ ├── healthy_corals.png # Healthy reef image for hero
│ └── unhealthy_corals.png # Bleached reef image for hero
├── src/
│ ├── components/
│ │ └── home/
│ │ ├── Hero.jsx # Interactive coral spotlight hero
│ │ ├── WhyUs.jsx # Features section with counters
│ │ ├── Review.jsx # Testimonials section
│ │ ├── FAQ.jsx # FAQ accordion
│ │ └── CTA.jsx # Call-to-action section
│ ├── layouts/
│ │ ├── Navbar.jsx # Main navigation
│ │ └── Footer.jsx # Site footer
│ ├── pages/
│ │ ├── Home.jsx # Homepage composition
│ │ ├── courses/
│ │ │ ├── padi/
│ │ │ │ ├── DiscoverScubaDiving.jsx
│ │ │ │ ├── OpenWaterDiver.jsx
│ │ │ │ └── ...
│ │ │ └── specialty/
│ │ │ ├── MarinePhotography.jsx
│ │ │ └── ...
│ │ ├── volunteer/
│ │ │ ├── CoralConservation.jsx
│ │ │ └── ...
│ │ └── organization/
│ │ ├── History.jsx
│ │ └── ...
│ ├── hooks/
│ │ └── useScrollAnimation.js # Custom scroll animation hook
│ ├── config/
│ │ └── routes.js # Route constants
│ ├── App.jsx # Main app with router
│ ├── main.jsx # Entry point
│ └── index.css # Global styles & Tailwind imports
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
