import { FC } from 'react';
import {Icons} from '@/components/icons'
import {cn} from "@/lib/utils";

interface PlayButtonProps {
  isActive?: boolean
}

const PlayButton: FC<PlayButtonProps> = ({isActive = false}) => {

  return (
    <button
      className={cn(
        `
        transition
        opacity-0
        rounded-full
        flex
        items-center
        bg-green-500
        p-4
        drop-shadow-md
        translate
        translate-y-1/4
        group-hover:opacity-100
        group-hover:translate-y-0
        hover:scale-110`,
        isActive ? 'opacity-100 translate-y-0 bg-neutral-400/10 hover:scale-100 cursor-default' : ''
      )}
    >
      <Icons.play className={cn('text-black', isActive ? 'animate-spin opacity-75 text-neutral-900' : '')} />
    </button>
  )
}

export default PlayButton
