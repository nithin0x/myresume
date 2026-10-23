import { skillCategories } from '@/data/skills'
import SectionHeading from './SectionHeading'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section">
      <div className="page-shell skills-layout">
        <SectionHeading id="skills-heading">Technical skills</SectionHeading>
        <div className="skills-list">
          {skillCategories.map((category) => (
            <div key={category.title} className="skill-category">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <ul className="skill-list">
                {category.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
