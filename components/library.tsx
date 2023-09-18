"use client"

import useAuthModal from "@/hooks/useAuthModal";
import {useUser} from "@/hooks/useUser";
import {Button} from "@/components/ui/button";
import useUploadModal from "@/hooks/useUploadModal";

const Library = () => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const {user} = useUser();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  }

  return (
    <div>
      <Button
        onClick={onClick}
      >
        Add track
      </Button>
    </div>
  )
}

export default Library
