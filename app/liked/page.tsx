import getLikedBeats from "@/actions/getLikedBeats";
import Image from "next/image";

import {Icons} from '@/components/icons';
import LikedContent from "@/components/liked-content";

export const revalidate = 0;

const LikedPage = async () => {
  const beats = await getLikedBeats();


  return (
    <div className="bg-neutral-100 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <div className="p-4">
        <div className="flex flex-col md:flex-row items-center gap-x-5">
          <div className="relative h-32 w-32 lg:h-44 lg:w-44 flex items-center justify-center bg-primary text-primary-foreground">
            <Icons.store className="w-20 h-20" />
          </div>
          <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
            <p className="hidden md:block font-semibold text-sm">Playlist</p>
            <h1 className="text-primary text-4xl sm:text-5xl lg:text-7xl font-bold">Liked beats</h1>
          </div>
        </div>
      </div>

      <LikedContent beats={beats} />
    </div>
  )
}

export default LikedPage;
