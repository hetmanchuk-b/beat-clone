"use client";

// @ts-ignore
import useSound from "use-sound";
import {FC, useEffect, useState} from 'react';
import {Beat} from "@/types";
import MediaItem from "@/components/media-item";
import LikeButton from "@/components/like-button";
import {Icons} from '@/components/icons'
import PlayerSlider from "@/components/player-slider";
import usePlayer from "@/hooks/usePlayer";
import {formatMillisecondsToTime} from "@/lib/utils";


interface PlayerContentProps {
  beat: Beat;
  beatUrl: string;
}

const PlayerContent: FC<PlayerContentProps> = (
  {
    beat, beatUrl
  }
) => {
  const player = usePlayer();
  const [volume, setVolume] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const Icon = Icons[isPlaying ? 'pause' : 'play'];
  const VolumeIcon = Icons[volume === 0 ? 'volumeMute' : 'volume'];

  const onPlayNext = () => {
    if (player.ids.length === 0) return;
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextBeat = player.ids[currentIndex + 1];

    if (!nextBeat) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextBeat);
  }
  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousBeat = player.ids[currentIndex - 1];

    if (!previousBeat) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousBeat);
  }

  const [play, {pause, sound, duration}] = useSound(
    beatUrl,
    {
      volume,
      onplay: () => setIsPlaying(true),
      onend: () => {
        setIsPlaying(false);
        onPlayNext();
      },
      onpause: () => setIsPlaying(false),
      format: ['mp3'],
    }
  );

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    }

  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  }

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0)
    }
  }


  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem beat={beat} />
          <LikeButton beatId={beat.id} />
        </div>
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon className="w-6 h-6 text-black" />
        </div>
      </div>

      <div className="hidden h-full md:flex flex-col justify-center items-center w-full max-w-[722px] gap-x-6">
        <div className="flex justify-center items-center w-full gap-x-6">
          <Icons.stepBack
            onClick={onPlayPrevious}
            className="w-6 h-6 cursor-pointer text-slate-800 transition hover:text-slate-600"
          />
          <div
            onClick={handlePlay}
            className="flex items-center justify-center h-10 w-10 text-slate-800 transition hover:text-slate-600 rounded-full bg-slate-200 p-1 cursor-pointer"
          >
            <Icon className="w-6 h-6" />
          </div>
          <Icons.stepForward
            onClick={onPlayNext}
            className="w-6 h-6 cursor-pointer text-slate-800 transition hover:text-slate-600"
          />
        </div>

        <div className="text-slate-900">{formatMillisecondsToTime(duration)}</div>
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="w-6 h-6 cursor-pointer text-slate-800 transition hover:text-slate-600"
          />
          <PlayerSlider
            value={volume}
            onChange={(value) => setVolume(value)}
          />
        </div>
      </div>

    </div>
  )
}

export default PlayerContent
