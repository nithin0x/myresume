import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { projects } from '@/data/projects'

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="section projects-section">
      <div className="page-shell">
        <SectionHeading id="projects-heading">Projects</SectionHeading>
        <div className="project-list">
          {projects.map((project) => (
            <article key={project.title} className="project">
              <p className="project-category">{project.category}</p>
              <h3>
                {project.href ? (
                  <a href={project.href} target="_blank" rel="noopener noreferrer" className="project-link">
                    {project.title}<ArrowUpRight aria-hidden="true" />
                  </a>
                ) : project.title}
              </h3>
              <p className="project-description">{project.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
