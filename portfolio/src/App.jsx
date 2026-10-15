import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import useScrollToTop from './hooks/useScrollToTop.js'

const Home = lazy(() => import('./pages/Home.jsx'))
const Work = lazy(() => import('./pages/Work.jsx'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
  useScrollToTop()

  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center bg-brand-paper text-xs font-bold uppercase tracking-widest text-brand-muted">
          Loading portfolio…
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}