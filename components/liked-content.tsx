"use client";

import {FC, useEffect} from 'react';
import {Beat} from "@/types";
import {useRouter} from "next/navigation";
import {useUser} from "@/hooks/useUser";
import MediaItem from "@/components/media-item";
import LikeButton from "@/components/like-button";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContentProps {
  beats: Beat[]
}

const LikedContent: FC<LikedContentProps> = ({beats}) => {
  const onPlay = useOnPlay(beats);
  const router = useRouter();
  const {isLoading, user} = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if (beats.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-slate-600">
        No liked beats
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {beats.map((beat) => (
        <div
          key={beat.id}
          className="flex items-center gap-x-4 w-full"
        >
          <div className="flex-1">
            <MediaItem
              onClick={(id: string) => onPlay(id)}
              beat={beat}
            />
          </div>
          <LikeButton beatId={beat.id} />

        </div>
      ))}
    </div>
  )
}

export default LikedContent
