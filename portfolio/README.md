# Sameer Shameem — Personal Portfolio Website ("mnmlst.")

A high-performance personal portfolio website for **Sameer Shameem** (Performance Marketer, Content Creator & Growth Strategist). Built with React 19, Vite, Tailwind CSS v4, and React Router v7.

Designed with a minimal editorial aesthetic, black-and-white photography, big bold typography, and signature accent yellow (`#E8B93A`).

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ installed

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
The optimized bundle will be compiled to the `dist/` folder.

---

## 📁 How to Update Your Content

All website content lives in data files inside `src/data/`. You never need to touch React components to edit projects, services, or details:

- **Case Studies / Projects**: [`src/data/projects.js`](./src/data/projects.js) — Add, edit, or reorder projects, metrics, and tags.
- **Services Offered**: [`src/data/services.js`](./src/data/services.js) — Update service packages, deliverables, starting prices, and 4-step process.
- **Skills & Quick Facts**: [`src/data/skills.js`](./src/data/skills.js) — Manage skills grouped into pills and top quick facts.
- **Experience Timeline**: [`src/data/experience.js`](./src/data/experience.js) — Update career milestones and academic background.
- **Journal / Articles**: [`src/data/posts.js`](./src/data/posts.js) — Publish new growth insights, playbooks, or essays.
- **Navigation Links**: [`src/data/navLinks.js`](./src/data/navLinks.js) — Modify navbar items and routes.
- **Social Media Links**: [`src/data/socials.js`](./src/data/socials.js) — Update Instagram, Twitter, Facebook, and WhatsApp URLs.

---

## 📬 Contact Form Configuration

To connect the contact form to your inbox:
1. Create a free form at [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com).
2. Copy your form endpoint URL.
3. In the project root, create a `.env` file (copy from [`.env.example`](./.env.example)):
   ```env
   VITE_FORM_ENDPOINT=https://formspree.io/f/your_form_id
   ```

---

## 🌐 Deployment

### Deploy to Vercel
1. Push this repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Root Directory to `portfolio` (or project root).
4. Add the environment variable `VITE_FORM_ENDPOINT` under Project Settings if desired.
5. Deploy! Client-side routing is configured via [`vercel.json`](./vercel.json).

### Deploy to Netlify
1. Connect your repository to [Netlify](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Client-side routing is configured via [`public/_redirects`](./public/_redirects).
