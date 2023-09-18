"use client"

import usePlayer from "@/hooks/usePlayer";
import useGetBeatById from "@/hooks/useGetBeatById";
import useLoadBeatUrl from "@/hooks/useLoadBeatUrl";
import PlayerContent from "@/components/player-content";

const Player = () => {
  const player = usePlayer();
  const {beat} = useGetBeatById(player.activeId);

  const beatUrl = useLoadBeatUrl(beat!);

  // @ts-ignore
  if (!beat || !beatUrl || !beatUrl?.data?.publicUrl || !player.activeId) return null;



  return (
    <div className="fixed bottom-0 bg-slate-100 w-full py-2 h-[80px] px-4">
      <PlayerContent
        key={beatUrl.data.publicUrl}
        beat={beat}
        beatUrl={beatUrl.data.publicUrl}
      />
    </div>
  )
}

export default Player;
