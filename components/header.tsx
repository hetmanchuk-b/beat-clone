"use client"

import React from 'react';
import {Button, buttonVariants} from "@/components/ui/button";
import useAuthModal from "@/hooks/useAuthModal";
import {useRouter} from "next/navigation";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useUser} from "@/hooks/useUser";
import {Icons} from '@/components/icons'
import Link from "next/link";
import {useToast} from "@/components/ui/use-toast";
import {cn} from "@/lib/utils";
import useUploadModal from "@/hooks/useUploadModal";

const Header = ({}) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const {toast} = useToast();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleOpenUploadModal = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  }

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // TODO: player.reset();
    router.refresh();

    if (error) {
      console.log(error.message)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong...",
        description: "Login fail",
      })
    } else {
      toast({
        title: 'Successfully logged out.',
        description: '=['
      })
    }
  }

  return (
    <div className="w-full flex sm:justify-between sm:flex-row sm:items-center p-4 flex-col gap-2 justify-start items-start bg-slate-100">
      <div className="sm:flex sm:items-center sm:flex-wrap gap-x-4 gap-y-1.5 grid grid-cols-2">
        <Link
          href={'/'}
          className="flex items-center gap-x-2 text-md px-2 py-1.5 cursor-pointer rounded-md hover:bg-slate-200"
        >
          <Icons.play className="w-4 h-4" />
          Home page
        </Link>
        <Link
          href="/search"
          className="flex items-center gap-x-2 text-md px-2 py-1.5 cursor-pointer rounded-md hover:bg-slate-200"
        >
          Search
          <Icons.search className="w-4 h-4" />
        </Link>
        {user ? (
          <>
            <Link
              href="/liked"
              className={cn(buttonVariants({variant: 'outline'}), 'gap-x-2 text-md border-none')}
            >
              <Icons.star className="w-4 h-4"/>
              Liked beats
              <Icons.star className="w-4 h-4"/>
            </Link>
            <Button
              className="gap-2 bg-slate-600 text-md"
              onClick={handleOpenUploadModal}
            >
              Upload beat
              <Icons.upload className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>

      {user ? (
        <div className="flex items-center gap-x-4">
          <Button onClick={handleLogout}>Logout</Button>
          <Button variant={'outline'}>
            <Icons.user className="w-6 h-6" />
          </Button>
        </div>
      ) : (
        <Button onClick={authModal.onOpen} >Sign in</Button>
      )}

    </div>
  )
}

export default Header
