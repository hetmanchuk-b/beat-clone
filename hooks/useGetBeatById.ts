import {useState, useEffect, useMemo} from "react";
import {Beat} from "@/types";
import {useSessionContext} from "@supabase/auth-helpers-react";
import {useToast} from "@/components/ui/use-toast";

const useGetBeatById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [beat, setBeat] = useState<Beat | undefined>(undefined);
  const {supabaseClient} = useSessionContext();
  const {toast} = useToast();

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    const fetchBeat = async () => {
      const {data, error} = await supabaseClient
        .from('beats')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setIsLoading(false);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        });
        return
      }

      setBeat(data as Beat);
      setIsLoading(false);
    }

    fetchBeat();
  }, [id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    beat
  }), [isLoading, beat])

}

export default useGetBeatById;
