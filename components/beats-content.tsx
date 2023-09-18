"use client";

import { FC } from 'react';
import {Beat} from "@/types";
import BeatItem from "@/components/beat-item";
import useOnPlay from "@/hooks/useOnPlay";

interface BeatsContentProps {
  beats: Beat[]
}

const BeatsContent: FC<BeatsContentProps> = ({beats}) => {
  const onPlay = useOnPlay(beats);

  if (beats.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">
        No beats available.
      </div>
    )
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {beats.map((beat) => (
        <BeatItem
          key={beat.id}
          onClick={(id: string) => onPlay(id)}
          beat={beat}
        />
      ))}
    </div>
  )
}

export default BeatsContent;
