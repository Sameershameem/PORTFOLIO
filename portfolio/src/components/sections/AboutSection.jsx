import ExperienceCounter from '../ui/ExperienceCounter.jsx'

// Text-presentation chess glyphs (U+FE0E) for the light, no-WebGL version.
const GLYPHS = { king: '♚︎', queen: '♛︎', rook: '♜︎', bishop: '♝︎', knight: '♞︎', pawn: '♟︎' }

export default function AboutSection({ skills = [], dockRefs = [], staticPieces = false }) {
  const total = String(skills.length).padStart(2, '0')

  return (
    <>
    <section className="experience-section about-experience" id="about" aria-labelledby="about-heading">
      <div className="about-index" aria-hidden="true" data-reveal="up">S / S</div>
      <div className="about-content">
        <p className="experience-kicker" data-reveal="up">A little about me</p>
        <h2 className="experience-heading" data-reveal="lines" id="about-heading">
          A marketer who thinks creatively. A creator who thinks strategically.
        </h2>
      </div>
      <div className="experience-copy" data-reveal="stagger">
        <p>
          I&apos;m Sameer Shameem — a marketing specialist, content creator,
          performance marketer and copywriter with a growing passion for vibe coding.
        </p>
        <p>
          I connect creative ideas with strategic thinking and AI-powered tools,
          turning ideas into attention, attention into action, and both into
          digital experiences.
        </p>
      </div>
      <div className="about-counter" data-reveal="up">
        <ExperienceCounter />
      </div>
    </section>

    {skills.length > 0 && (
      <section className="skill-board" id="skills" aria-labelledby="skills-heading">
        <header className="skill-board-head">
          <p className="experience-kicker" data-reveal="up">Six pieces. One game plan.</p>
          <h2 className="experience-heading" data-reveal="lines" id="skills-heading">
            Every skill has its place on the board.
          </h2>
        </header>

        {skills.map((skill, index) => {
          const number = String(index + 1).padStart(2, '0')
          return (
            <article className="skill-panel" id={`skill-${skill.piece}`} key={skill.piece}>
              <div className="skill-stage">
                <span className="skill-stage-number" aria-hidden="true">{number}</span>
                <span className="skill-plinth" aria-hidden="true" />
                {/* The 3D chess piece docks into this box. */}
                <div className="skill-dock" ref={dockRefs[index]} aria-hidden="true">
                  {staticPieces && <span className="skill-dock-glyph">{GLYPHS[skill.piece]}</span>}
                </div>
                <span className="skill-stage-piece">The {skill.pieceName}</span>
              </div>
              <div className="skill-copy" data-reveal="stagger">
                <p className="skill-kicker">
                  <span>{number}</span> / {total}
                </p>
                <h3>{skill.label}</h3>
                <p className="skill-tagline">{skill.tagline}</p>
                <p className="skill-description">{skill.description}</p>
                <ul className="skill-points">
                  {skill.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}
      </section>
    )}
    </>
  )
}
