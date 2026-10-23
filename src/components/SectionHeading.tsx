type SectionHeadingProps = {
  id: string
  children: React.ReactNode
}

export default function SectionHeading({ id, children }: SectionHeadingProps) {
  return <div className="section-heading"><h2 id={id}>{children}</h2></div>
}
