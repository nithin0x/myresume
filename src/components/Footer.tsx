import { profile } from '@/data/profile'
import { ArrowUp } from 'lucide-react'
import Brand from './Brand'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="page-shell footer-inner">
        <a href="#hero" className="wordmark" aria-label="nithin0x.space, back to top"><Brand /></a>
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <a href="#hero" className="text-link">Back to top <ArrowUp aria-hidden="true" /></a>
      </div>
    </footer>
  )
}
