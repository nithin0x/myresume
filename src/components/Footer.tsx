import { ArrowUp } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="page-shell footer-inner">
        <a href="#hero" className="wordmark">nithin0x</a>
        <p>© {new Date().getFullYear()} Nithin Kumar M</p>
        <a href="#hero" className="text-link">Back to top <ArrowUp aria-hidden="true" /></a>
      </div>
    </footer>
  )
}
