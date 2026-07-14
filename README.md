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

```
GREEN_Inc
├─ backend
│  ├─ .env
│  ├─ app.py
│  ├─ applications.db
│  ├─ contact_messages.db
│  ├─ course_applications.db
│  ├─ donations.db
│  ├─ requirements.txt
│  ├─ reset_limit.py
│  ├─ routes
│  │  ├─ admin.py
│  │  ├─ apply.py
│  │  ├─ contact.py
│  │  ├─ courses.py
│  │  ├─ donate.py
│  │  ├─ volunteer.py
│  │  ├─ __init__.py
│  │  └─ __pycache__
│  │     ├─ admin.cpython-310.pyc
│  │     ├─ apply.cpython-310.pyc
│  │     ├─ contact.cpython-310.pyc
│  │     ├─ courses.cpython-310.pyc
│  │     ├─ donate.cpython-310.pyc
│  │     ├─ volunteer.cpython-310.pyc
│  │     └─ __init__.cpython-310.pyc
│  ├─ uploads
│  │  ├─ course_certificates
│  │  │  ├─ experience_20260709_083052_Gerald_Catina_PersonalRecord.pdf
│  │  │  └─ medical_20260709_083052_Gerald_Catina_SCREENSHOT.png
│  │  └─ medical_certificates
│  │     ├─ 20260704_164009_asd_CatinaGerald_Resume.pdf
│  │     └─ 20260704_165643_asd_CatinaGerald_Resume.pdf
│  ├─ utils
│  │  ├─ email_service.py
│  │  └─ __pycache__
│  │     └─ email_service.cpython-310.pyc
│  └─ volunteer_applications.db
├─ frontend
│  ├─ .env
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ asset
│  │  │  ├─ community.jpg
│  │  │  ├─ global.jpg
│  │  │  ├─ qr.jpg
│  │  │  ├─ qr_cropped.jpg
│  │  │  ├─ science.jpg
│  │  │  └─ track.jpg
│  │  ├─ favicon.svg
│  │  ├─ hero
│  │  │  ├─ healthy_corals.png
│  │  │  └─ unhealthy_corals.png
│  │  ├─ icons.svg
│  │  └─ logo
│  │     └─ GREEN_Circ.png
│  ├─ README.md
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ config
│  │  │  └─ routes.js
│  │  ├─ index.css
│  │  ├─ layouts
│  │  │  ├─ Footer.jsx
│  │  │  └─ Navbar.jsx
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ Admin
│  │  │  │  ├─ AdminDashboard.jsx
│  │  │  │  └─ AdminLogin.jsx
│  │  │  ├─ ApplyPage.jsx
│  │  │  ├─ ApplyPageNavbar.jsx
│  │  │  ├─ ContactPage.jsx
│  │  │  ├─ courses
│  │  │  │  ├─ PADI
│  │  │  │  │  ├─ AdvancedOpenWater.jsx
│  │  │  │  │  ├─ Divemaster.jsx
│  │  │  │  │  ├─ DSD.jsx
│  │  │  │  │  ├─ OpenWater.jsx
│  │  │  │  │  ├─ RescueDiver.jsx
│  │  │  │  │  └─ utils
│  │  │  │  │     ├─ ApplyModal.jsx
│  │  │  │  │     └─ ApplyModalWithCert.jsx
│  │  │  │  ├─ Specialty
│  │  │  │  │  ├─ DeepDiver.jsx
│  │  │  │  │  ├─ DiveNavigation.jsx
│  │  │  │  │  ├─ MarinePhotography.jsx
│  │  │  │  │  ├─ NightDiver.jsx
│  │  │  │  │  └─ PerformanceBouyancy.jsx
│  │  │  │  └─ volunteer
│  │  │  │     ├─ CoralRestoration.jsx
│  │  │  │     ├─ CoralRestorationApplication.jsx
│  │  │  │     ├─ COTSMonitoring.jsx
│  │  │  │     ├─ COTSMonitoringApplication.jsx
│  │  │  │     ├─ DataCollection.jsx
│  │  │  │     ├─ DataCollectionApplication.jsx
│  │  │  │     ├─ DiveAgainstDebris.jsx
│  │  │  │     └─ DiveAgainstDebrisApplication.jsx
│  │  │  ├─ DonateModal.jsx
│  │  │  ├─ DonatePage.jsx
│  │  │  ├─ home
│  │  │  │  ├─ CTA.jsx
│  │  │  │  ├─ FAQ.jsx
│  │  │  │  ├─ Hero.jsx
│  │  │  │  ├─ Review.jsx
│  │  │  │  └─ WhyUs.jsx
│  │  │  ├─ organization
│  │  │  │  ├─ blog
│  │  │  │  │  ├─ AllBlogPost.jsx
│  │  │  │  │  ├─ BlogHero.jsx
│  │  │  │  │  ├─ Blogs.jsx
│  │  │  │  │  └─ specificblogs
│  │  │  │  │     ├─ CotsMonitoringAbgao.jsx
│  │  │  │  │     ├─ DoubleActOfSogod.jsx
│  │  │  │  │     ├─ FloraAndFauna.jsx
│  │  │  │  │     ├─ MalitbogCoralRes.jsx
│  │  │  │  │     └─ VsuMarineBiologyPartnership.jsx
│  │  │  │  ├─ history
│  │  │  │  │  ├─ About1.jsx
│  │  │  │  │  ├─ About2.jsx
│  │  │  │  │  └─ HistoryHero.jsx
│  │  │  │  ├─ mission
│  │  │  │  │  ├─ MissionBody.jsx
│  │  │  │  │  ├─ MissionHero.jsx
│  │  │  │  │  └─ MissionVisionHome.jsx
│  │  │  │  └─ team
│  │  │  │     ├─ TeamBody.jsx
│  │  │  │     ├─ TeamHero.jsx
│  │  │  │     └─ TeamMemberModal.jsx
│  │  │  └─ VolunteerPage.jsx
│  │  └─ utilities
│  │     └─ useScrollAnimation.js
│  └─ vite.config.js
└─ README.md

```
