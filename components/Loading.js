import Image from 'next/image'

export default function Loading() {
  return (
    <div className="border-3 rounded-xl border-black bg-white w-full h-full flex justify-center items-center min-h-halfscreen">
      <Image src="/loading.svg" width={40} height={40} alt="loading" />
    </div>
  )
}
