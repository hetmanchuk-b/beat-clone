"use client"

import {Icons} from '@/components/icons'

const Loading = () => {
  return (
    <div className="w-full h-full flex gap-x-1 items-center justify-center bg-slate-100 text-neutral-700">
      <Icons.view className="w-6 h-6 animate-spin" />
      <div className="font-semibold">Loading..</div>
    </div>
  )
}

export default Loading;
