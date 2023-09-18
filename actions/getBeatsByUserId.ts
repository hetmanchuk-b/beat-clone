import {Beat} from "@/types";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

const getBeatsByUserId = async (): Promise<Beat[]> => {
  const supabase = createServerComponentClient({
    cookies
  });

  const {
    data: sessionData,
    error: sessionError
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message)
    return []
  }

  const {data, error} = await supabase
    .from('beats')
    .select('*')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', {ascending: false});

  if (error) {
    console.log(error.message)
  }

  return (data as any) || [];

}

export default getBeatsByUserId;
