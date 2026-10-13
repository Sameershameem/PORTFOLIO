import portrait from '../../assets/images/hero-portrait.png'
import ReadMoreText from '../ui/ReadMoreText.jsx'

export default function Hero() {
  return (
    <main className="hero-section" id="home">
      <section className="hero-description">
        <ReadMoreText />
      </section>
      <div className="hero-art" aria-label="Portrait against a yellow circle">
        <div className="hero-circle" />
        <img
          className="hero-portrait"
          src={portrait}
          alt="Black-and-white portrait facing left"
        />
      </div>
      <h1 className="hero-title">less is<br />more.</h1>
    </main>
  )
}
