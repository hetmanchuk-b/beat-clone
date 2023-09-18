"use client"

import {FC, useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {useSessionContext} from "@supabase/auth-helpers-react";
import useAuthModal from "@/hooks/useAuthModal";
import {useUser} from "@/hooks/useUser";
import {Icons} from "@/components/icons"
import {useToast} from "@/components/ui/use-toast";

interface LikeButtonProps {
  beatId: string
}

const LikeButton: FC<LikeButtonProps> = ({beatId}) => {
  const router = useRouter();
  const {supabaseClient} = useSessionContext();
  const authModal = useAuthModal();
  const {user} = useUser();
  const {toast} = useToast();


  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const {data, error} = await supabaseClient
        .from('liked_beats')
        .select('*')
        .eq('user_id', user.id)
        .eq('beat_id', beatId)
        .single();

      if (!error && data) {
        setIsLiked(true)
      }
    }

    fetchData();

  }, [beatId, supabaseClient, user?.id]);

  const iconName = isLiked ? 'heartOff' : 'heart';
  const Icon = Icons[iconName];

  const handleClick = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const {error} = await supabaseClient
        .from('liked_beats')
        .delete()
        .eq('user_id', user.id)
        .eq('beat_id', beatId);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong with unliking',
          description: error.message
        });
      } else {
        setIsLiked(false);
      }
    } else {
      const {error} = await supabaseClient
        .from('liked_beats')
        .insert({
          beat_id: beatId,
          user_id: user.id
        });
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong with liking',
          description: error.message
        });
      } else {
        setIsLiked(true);
      }
    }

    router.refresh()
  }

  return (
    <button
      onClick={handleClick}
      className="hover:opacity-75 transition"
      title={'Add to favorites'}
    >
      <Icon className="h-6 w-6 text-slate-800" />
    </button>
  )
}

export default LikeButton
