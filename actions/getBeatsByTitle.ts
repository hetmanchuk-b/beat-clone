import {Beat} from "@/types";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import getBeats from "@/actions/getBeats";

const getBeatsByTitle = async (title: string): Promise<Beat[]> => {
  const supabase = createServerComponentClient({
    cookies
  });

  if (!title) {
    const allBeats = await getBeats();
    return allBeats;
  }

  const {data, error} = await supabase
    .from('beats')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', {ascending: false});

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
}

export default getBeatsByTitle;
