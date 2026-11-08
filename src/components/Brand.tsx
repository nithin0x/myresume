import Image from 'next/image'

export default function Brand() {
  return (
    <>
      <Image className="brand-logo brand-logo-dark" src="/logo.svg" alt="nithin0x.space" width={370} height={60} unoptimized />
      <Image className="brand-logo brand-logo-light" src="/logo-light.svg" alt="nithin0x.space" width={370} height={60} unoptimized />
    </>
  )
}
