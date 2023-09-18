"use client"

import { FC } from 'react';
import {Beat} from "@/types";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import PlayButton from "@/components/play-button";
import usePlayer from "@/hooks/usePlayer";
import {cn} from "@/lib/utils";

interface BeatItemProps {
  beat: Beat
  onClick: (id: string) => void
}

const BeatItem: FC<BeatItemProps> = ({beat, onClick}) => {
  const player = usePlayer();
  const imagePath = useLoadImage(beat);

  const handleClick = () => {
    // TODO: Default turn on player
  }

  return (
    <div
      onClick={() => onClick(beat.id)}
      className={cn(
        `
          relative
          group
          flex
          flex-col
          items-center
          justify-center
          rounded-md
          overflow-hidden
          gap-x-4
          bg-neutral-400/5
          cursor-pointer
          hover:bg-neutral-400/10
          transition
          p-3
        `,
        player.activeId === beat.id && 'bg-slate-200 hover:bg-slate-100'
      )}
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image className="object-cover" src={imagePath || '/images/liked.png'} fill alt={'Cover'} />
      </div>

      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">
          {beat.title}
        </p>
        <p className="text-neutral-600 text-sm pb-4 w-full truncate">
          By {beat.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton isActive={player.activeId === beat.id} />
      </div>
    </div>
  )
}

export default BeatItem
