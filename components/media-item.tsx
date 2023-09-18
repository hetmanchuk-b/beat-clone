import { FC } from 'react';
import {Beat} from "@/types";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";
import {cn} from "@/lib/utils";

interface MediaItemProps {
  beat: Beat;
  onClick?: (id: string) => void;
}

const MediaItem: FC<MediaItemProps> = ({beat, onClick}) => {
  const player = usePlayer();

  const imageUrl = useLoadImage(beat);

  const handleClick = () => {
    if (onClick) {
      return onClick(beat.id);
    }

    return player.setId(beat.id);
  };
  return (
    <div
      onClick={handleClick}
      className={cn(`
        flex
        items-center
        gap-x-3
        cursor-pointer
        hover:bg-neutral-400/20
        w-full
        p-2
        rounded-md
      `, player.activeId === beat.id ? 'bg-neutral-400/20' : '')}
    >
      <div
        className="
          relative
          rounded-md
          min-h-[48px]
          min-w-[48px]
          overflow-hidden
        "
      >
        <Image
          fill
          src={imageUrl || "/images/music-placeholder.png"}
          alt="MediaItem"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-accent-foreground font-medium truncate">{beat.title}</p>
        <p className="text-neutral-800 text-sm truncate">
          By {beat.author}
        </p>
      </div>
    </div>
  )
}

export default MediaItem
