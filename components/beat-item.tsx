"use client"

import { FC } from 'react';
import {Beat} from "@/types";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import PlayButton from "@/components/play-button";
import usePlayer from "@/hooks/usePlayer";
import {cn} from "@/lib/utils";
import {Icons} from '@/components/icons'
import Link from "next/link";

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
          bg-stone-400/5
          hover:bg-stone-400/10
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
        <div className="flex w-full items-center gap-2 justify-between">
          <p className="font-semibold truncate w-full">
            <Link href={'/'} className="hover:text-slate-800">{beat.title}</Link>
          </p>
          {beat.price ? (
            <p className="font-semibold truncate text-right min-w-[60px]">${beat.price}</p>
          ) : (
            <p className="font-semibold truncate text-right min-w-[60px] flex items-center justify-end gap-1 text-xs">
              FREE
              <Icons.download className="w-3 h-3" />
            </p>
          )}
        </div>

        <div className="flex w-full items-center justify-between pb-2 gap-2">
          <p className="text-neutral-600 text-sm w-full truncate">
            By <Link href={`/c/${beat.author}`} className="font-semibold hover:text-slate-800">{beat.author}</Link>
          </p>
          <div className="flex flex-col items-end min-w-[60px] gap-y-2 text-neutral-700 text-xs text-end">
            {beat.tempo ? (
              <p className="truncate w-full text-slate-700">
                {beat.tempo} BPM
              </p>
            ) : null}
          </div>
        </div>

        <div className="w-full flex flex-wrap gap-1.5">
          <p className="text-xs text-slate-700 py-1 px-1.5 border border-slate-700 font-medium rounded-sm truncate">#Klass</p>
          <p className="text-xs text-slate-700 py-1 px-1.5 border border-slate-700 font-medium rounded-sm truncate">#Hardbass</p>
          <p className="text-xs text-slate-700 py-1 px-1.5 border border-slate-700 font-medium rounded-sm truncate">#DNB</p>
          <p className="text-xs text-slate-700 py-1 px-1.5 border border-slate-700 font-medium rounded-sm truncate">#Puuaf apawd asd</p>
        </div>

      </div>
      <div
        onClick={() => onClick(beat.id)}
        className="absolute top-5 right-5"
      >
        <PlayButton
          isActive={player.activeId === beat.id}
        />
      </div>
    </div>
  )
}

export default BeatItem
