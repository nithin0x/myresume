import { ChevronDown } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { skillCategories } from '@/data/skills'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section">
      <div className="page-shell skills-layout">
        <div><SectionHeading id="skills-heading">Technical skills</SectionHeading><p className="section-intro">The methods and tools I use for testing, control implementation, and security operations.</p></div>
        <div className="skills-list">{skillCategories.map((category, index) => <details key={category.title} className="skill-category" open={index < 2}>
          <summary><span><span className="skill-index">0{index + 1}</span><span className="skill-title">{category.title}</span><span className="skill-count">{category.skills.length}</span></span><ChevronDown aria-hidden="true" /></summary>
          <div className="skill-content"><p>{category.description}</p><ul className="skill-list">{category.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>
        </details>)}</div>
      </div>
    </section>
  )
}
