import { profile } from '@/data/profile'
import { ArrowUp } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="page-shell footer-inner">
        <a href="#hero" className="wordmark">{profile.handle}</a>
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <a href="#hero" className="text-link">Back to top <ArrowUp aria-hidden="true" /></a>
      </div>
    </footer>
  )
}
