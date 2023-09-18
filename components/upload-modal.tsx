"use client"

import uniqid from 'uniqid'
import Modal from "@/components/modal";
import useUploadModal from "@/hooks/useUploadModal";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {useUser} from "@/hooks/useUser";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/navigation";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const {user} = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const {toast} = useToast();

  const {
    register,
    handleSubmit,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null
    },
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const beatFile = values.beat?.[0];

      if (!imageFile || !beatFile || !user) {
        return toast({
          variant: 'destructive',
          title: 'Missing fields',
          description: 'All fields must be filled in'
        })

      }

      const uniqueID = uniqid();

      // Upload beat
      const {
        data: beatData,
        error: beatError
      } = await supabaseClient
        .storage
        .from('beats')
        .upload(`beats-${values.title}-${uniqueID}`, beatFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (beatError) {
        setIsLoading(false);
        toast({
          variant: 'destructive',
          title: 'Failed beat upload',
          description: beatError.message
        });
        return;
      }

      // Upload image
      const {
        data: imageData,
        error: imageError
      } = await supabaseClient
        .storage
        .from('images')
        .upload(`images-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (imageError) {
        setIsLoading(false);
        toast({
          variant: 'destructive',
          title: 'Failed image upload',
          description: imageError.message
        });
        return;
      }

      const {error: supabaseError} = await supabaseClient
        .from('beats')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          cover_path: imageData.path,
          beat_path: beatData.path
        });

      if (supabaseError) {
        setIsLoading(false);
        toast({
          variant: 'destructive',
          title: 'Failed image upload',
          description: supabaseError.message
        });
        return;
      }

      router.refresh();
      setIsLoading(false);
      toast({
        title: 'Beat created!',
        description: 'Yeah'
      });
      reset();
      uploadModal.onClose();

    } catch (error) {
      console.log(error)
      return toast({
        variant: 'destructive',
        title: 'Something went wrong..',
        description: 'Please try again later.'
      })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title={'Add a track!'}
      description={'Upload your beat'}
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4">
          <Input
            placeholder={'Beat title'}
            id={'title'}
            disabled={isLoading}
            {...register('title', {required: true})}
          />
          <Input
            placeholder={'Song author'}
            id={'author'}
            disabled={isLoading}
            {...register('author', {required: true})}
          />
          <div>
            <div className="pb-1">
              Select a mp3 file
            </div>
            <Input
              type={'file'}
              id={'beat'}
              disabled={isLoading}
              accept={'.mp3'}
              {...register('beat', {required: true})}
            />
          </div>
          <div>
            <div className="pb-1">
              Select an image
            </div>
            <Input
              type={'file'}
              id={'image'}
              disabled={isLoading}
              accept={'image/*'}
              {...register('image', {required: true})}
            />
          </div>

          <Button disabled={isLoading} type={'submit'}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default UploadModal
