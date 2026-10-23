type SectionHeadingProps = {
  id: string
  number: string
  label: string
  children: React.ReactNode
}

export default function SectionHeading({ id, number, label, children }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow"><span>{number}</span>{label}</p>
      <h2 id={id}>{children}</h2>
    </div>
  )
}
