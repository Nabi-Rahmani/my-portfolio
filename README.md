# 💼 Modern Portfolio Website

A sleek, modern portfolio website built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**, featuring a beautiful dark/light theme toggle and responsive design.

![Portfolio Preview](https://img.shields.io/badge/Next.js-15.4.7-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss)

## ✨ Features

- 🎨 **Modern Design**: Clean, professional layout with glassmorphism effects
- 🌙 **Dark/Light Theme**: Seamless theme switching with system preference detection
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Fast Performance**: Built with Next.js 15 and optimized for speed
- 🎯 **Multi-Page Layout**: Home, Projects, and About pages with smooth navigation
- 🔥 **Separated Brand Navigation**: Clean brand positioning with centered popup navigation
- 💅 **Custom Color Scheme**: Beautiful peachy-pink gradient (#fcb4b0) theme
- ✨ **Smooth Animations**: Hover effects and transitions throughout

## 🚀 Tech Stack

- **Framework**: Next.js 15.4.7 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Custom CSS Properties
- **Theme System**: Custom dark/light mode implementation
- **Animations**: CSS3 transitions and transforms
- **Icons**: Custom SVG icons
- **Deployment Ready**: Vercel/Netlify compatible

## 🏗️ Project Structure

```
my-portfolio/
├── src/
│   └── app/
│       ├── about/
│       │   └── page.tsx          # About page with experience & skills
│       ├── projects/
│       │   └── page.tsx          # Projects showcase
│       ├── globals.css           # Global styles & theme variables
│       ├── layout.tsx            # Root layout component
│       └── page.tsx              # Home page with hero section
├── public/                       # Static assets
├── package.json                  # Dependencies & scripts
└── README.md                     # Project documentation
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nabi-Rahmani/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see your portfolio

## 🎨 Customization

### Theme Colors
The portfolio uses custom CSS properties for theming. You can modify colors in `src/app/globals.css`:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
  --accent-gradient: linear-gradient(135deg, #fcb4b0 0%, #ffc0cb 100%);
  /* ... more variables */
}
```

### Content Updates
- **Personal Info**: Update `src/app/page.tsx` for hero section
- **Projects**: Modify `src/app/projects/page.tsx` to showcase your work
- **About**: Edit `src/app/about/page.tsx` with your experience
- **Brand**: Change "codewithnabi" to your brand name across components

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically with zero configuration

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to [Netlify](https://netlify.com)

### Manual Deployment
```bash
npm run build
npm run start
```

## 🎯 Features Breakdown

- **🏠 Home Page**: Hero section with call-to-action and tech stack showcase
- **📂 Projects Page**: Interactive project cards with hover effects
- **👨‍💻 About Page**: Professional experience, skills, and background
- **🧭 Navigation**: Popup navigation with glassmorphism and theme toggle
- **🎨 Brand Identity**: Separated logo positioning for better visual hierarchy

## 📱 Responsive Design

- **Desktop**: Full-width layout with optimal spacing
- **Tablet**: Adjusted grid layouts and navigation
- **Mobile**: Stacked layouts with touch-friendly interactions

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio! If you make improvements, pull requests are welcome.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Noor Mohammad Rahmani**
- Portfolio: [codewithnabi.dev](https://your-portfolio-url.vercel.app)
- GitHub: [@Nabi-Rahmani](https://github.com/Nabi-Rahmani)
- LinkedIn: [Muhammad Nabi Rahmani 🇵🇸](https://www.linkedin.com/in/muhammad-nabi-rahmani-%F0%9F%87%B5%F0%9F%87%B8-8945b21ba/)
- Twitter: [@nabirahmani_dev](https://x.com/nabirahmani_dev)
- Email: [codewithnabi@gmail.com](mailto:codewithnabi@gmail.com)

---

⭐ **Star this repo if you found it helpful!**
