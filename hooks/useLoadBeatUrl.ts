import {Beat} from "@/types";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

const useLoadBeatUrl = (beat: Beat) => {
  const supabaseClient = useSupabaseClient();

  if (!beat) return '';

  console.log(beat)

  const publicUrl = supabaseClient
    .storage
    .from('beats')
    .getPublicUrl(beat.beat_path);

  return publicUrl;

}

export default useLoadBeatUrl;
