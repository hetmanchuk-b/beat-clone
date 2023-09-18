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

const Header = ({}) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const {toast} = useToast();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handle2 = () => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    })
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
      <div className="flex items-center gap-x-4 gap-y-1.5 flex-wrap">
        <Link className="text-md" href={'/'}>Home page</Link>
        <Link
          href="/search"
          className={cn(buttonVariants({variant: 'outline'}), 'gap-x-2 text-md')}
        >
          Search
          <Icons.search className="w-4 h-4" />
        </Link>
        {user ? (<Link
          href="/liked"
          className={cn(buttonVariants({variant: 'outline'}), 'gap-x-2 text-md')}
        >
          <Icons.star className="w-4 h-4"/>
          Liked beats
          <Icons.star className="w-4 h-4"/>
        </Link>) : (
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
