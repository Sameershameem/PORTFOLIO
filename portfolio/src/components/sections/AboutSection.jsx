export default function AboutSection({ skills = [], dockRefs = [] }) {
  const total = String(skills.length).padStart(2, '0')

  return (
    <>
    <section className="experience-section about-experience" id="about" aria-labelledby="about-heading">
      <div className="about-index" aria-hidden="true">S / S</div>
      <div className="about-content">
        <p className="experience-kicker">A little about me</p>
        <h2 className="experience-heading" id="about-heading">
          A marketer who thinks creatively. A creator who thinks strategically.
        </h2>
      </div>
      <div className="experience-copy">
        <p>
          I turn ideas into attention, attention into action, and ideas into
          digital experiences.
        </p>
        <p>
          I&apos;m Sameer Shameem — a marketing specialist, content creator,
          performance marketer, and copywriter with a growing passion for vibe
          coding. I enjoy connecting creative ideas with strategic thinking and
          using modern AI-powered tools to bring digital experiences to life.
        </p>
        <p>
          From developing a compelling campaign message to building an
          interactive web experience, I like being involved in the process of
          turning an idea into something real.
        </p>
      </div>
    </section>

    {skills.length > 0 && (
      <section className="skill-board" id="skills" aria-labelledby="skills-heading">
        <header className="skill-board-head">
          <p className="experience-kicker">Six pieces. One game plan.</p>
          <h2 className="experience-heading" id="skills-heading">
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
                <div className="skill-dock" ref={dockRefs[index]} aria-hidden="true" />
                <span className="skill-stage-piece">The {skill.pieceName}</span>
              </div>
              <div className="skill-copy">
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
