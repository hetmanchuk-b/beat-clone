import {Beat} from "@/types";
import usePlayer from "@/hooks/usePlayer";
import useAuthModal from "@/hooks/useAuthModal";
import {useUser} from "@/hooks/useUser";

const useOnPlay = (beats: Beat[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const {user} = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(beats.map((beat) => beat.id));
  }

  return onPlay;
}

export default useOnPlay;
