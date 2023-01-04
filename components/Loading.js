import Image from 'next/image'

export default function Loading() {
  return (
    <div className={`h-full w-full flex justify-center items-center`}>
      <Image src="/loading.svg" width={40} height={40} alt="loading" />
    </div>
  )
}
