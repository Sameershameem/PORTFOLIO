import { Link } from 'react-router-dom'

const description =
  'I’m Sameer Shameem, a marketing specialist, content creator, and performance marketer. I help brands bring clear ideas to the right audience.'

export default function ReadMoreText() {
  return (
    <div className="read-more">
      <p>{description}</p>
      <Link
        to="/about"
        className="inline-flex items-center gap-1 font-bold text-xs text-brand-ink hover:text-brand-yellow transition-colors underline"
      >
        Read More <span aria-hidden="true">↗</span>
      </Link>
    </div>
  )
}
