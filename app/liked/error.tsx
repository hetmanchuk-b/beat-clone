"use client"

import {Icons} from '@/components/icons'

const Error = () => {
  return (
    <div className="w-full h-full flex gap-x-1 items-center justify-center bg-slate-100 text-neutral-700">
      <Icons.warning className="w-6 h-6" />
      <div className="font-semibold">Something went wrong.</div>
    </div>
  )
}

export default Error;
