"use client"

import { FC } from 'react';
import {Beat} from "@/types";
import MediaItem from "@/components/media-item";
import LikeButton from "@/components/like-button";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
  beats: Beat[]
}

const SearchContent: FC<SearchContentProps> = ({beats}) => {
  const onPlay = useOnPlay(beats);

  if (beats.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No beats found
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {beats.map((beat) => (
        <div
          key={beat.id}
          className="flex items-center gap-x-4 w-full"
        >
          <div className="flex-1">
            <MediaItem
              beat={beat}
              onClick={(id: string) => onPlay(id)}
            />
          </div>
          <LikeButton beatId={beat.id} />
        </div>
      ))}
    </div>
  )
}

export default SearchContent
