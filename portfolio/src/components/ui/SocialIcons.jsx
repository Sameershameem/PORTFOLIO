import socials from '../../data/socials.js'

export default function SocialIcons() {
  return (
    <nav className="social-links" aria-label="Social media">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url || social.href}
          aria-label={social.name}
          target="_blank"
          rel="noreferrer"
        >
          <img src={social.icon} alt={social.name} />
        </a>
      ))}
    </nav>
  )
}
