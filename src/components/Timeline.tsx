import SectionHeading from './SectionHeading'
import { experience } from '@/data/experience'

export default function Timeline() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section"
    >
      <div className="page-shell experience-layout">
        <SectionHeading id="experience-heading">Experience &amp; education</SectionHeading>
        <ol className="experience-list">
          {experience.map((item) => (
            <li
              key={item.title}
              className="experience-item"
            >
              <div className="experience-date">
                <p>{item.date}</p>
                {item.duration && <p>{item.duration}</p>}
                <p className="experience-type">
                  {item.type === 'work' ? 'Work' : 'Education'}
                </p>
              </div>

              <div>
                <h3>
                  {item.title}
                </h3>
                <p className="experience-org">{item.org}</p>

                {item.bullets && (
                  <ul className="experience-bullets">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
