import Image from 'next/image'
import Library from "@/components/library";
import getBeats from "@/actions/getBeats";
import BeatsContent from "@/components/beats-content";

export const revalidate = 0;

export default async function Home() {
  const beats = await getBeats();

  return (
    <div className="p-2">
      <BeatsContent beats={beats} />
    </div>
  )
}
