// One chess piece per skill. The piece bursts out in the hero, then docks into its
// own panel in the About section. `piece` must match a piece in Hero3DScene.
const heroSkills = [
  {
    piece: 'queen',
    pieceName: 'Queen',
    label: 'Performance Marketer',
    tagline: 'Paid media that has to earn its budget.',
    description:
      'I plan, launch and optimise paid campaigns, testing creative and audiences quickly, then putting spend behind what the numbers prove.',
    points: ['Campaign structure & bidding', 'Creative & audience testing', 'ROAS, CAC & conversion tracking'],
  },
  {
    piece: 'knight',
    pieceName: 'Knight',
    label: 'Content Creator',
    tagline: 'Content that stops the scroll.',
    description:
      'Short-form video, social content and visual storytelling built around one clear idea, made for the way people actually watch.',
    points: ['Short-form video', 'Social content systems', 'Visual storytelling'],
  },
  {
    piece: 'king',
    pieceName: 'King',
    label: 'Growth Strategist',
    tagline: 'Every move is part of a bigger plan.',
    description:
      'Research, positioning and channel planning that connect each campaign to a clear goal, so growth compounds instead of starting over.',
    points: ['Audience & market research', 'Positioning & messaging', 'Funnel & channel planning'],
  },
  {
    piece: 'pawn',
    pieceName: 'Pawn',
    label: 'Coder',
    tagline: 'Small piece. Big promotion.',
    description:
      'AI-assisted development and modern web tools to turn ideas into working sites, landing pages and interactive experiences, like this one.',
    points: ['React & modern web', 'AI-assisted builds', 'Landing pages & prototypes'],
  },
  {
    piece: 'rook',
    pieceName: 'Rook',
    label: 'Digital Marketer',
    tagline: 'Solid foundations across every channel.',
    description:
      'SEO, email, social and analytics working together so the brand stays consistent, measurable and easy to find.',
    points: ['SEO & content distribution', 'Email & CRM journeys', 'Analytics & reporting'],
  },
  {
    piece: 'bishop',
    pieceName: 'Bishop',
    label: 'Copywriter',
    tagline: 'Words that move people to act.',
    description:
      'Hooks, headlines, ad copy and brand messaging that make the next step feel obvious, from the first line to the final click.',
    points: ['Hooks & headlines', 'Ad & landing page copy', 'Brand voice & messaging'],
  },
]

export default heroSkills
